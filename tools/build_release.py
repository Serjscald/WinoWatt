#!/usr/bin/env python3
"""Build a self-contained, verifiable WinoWatt source-and-app time capsule."""
from __future__ import annotations
import argparse
import datetime as dt
import hashlib
import io
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import zipfile

ROOT = Path(__file__).resolve().parent.parent
RELEASE_PATTERN = re.compile(r"^v[0-9]+\.[0-9]+\.[0-9]+$")
BLOCKED_NAMES = {".env", ".env.local", ".env.production", "id_rsa", "id_ed25519"}
BLOCKED_EXTENSIONS = {".pdf", ".p12", ".pfx", ".pem", ".key", ".crt", ".cer"}
REQUIRED = {
    "index.html", "css/style.css", "js/app.js",
    "README.md", "PROJECT_CANON.md", "SOURCES.md",
    "CHANGELOG.md", "CONTENT_PLAN.md", "RELEASE_CHECKLIST.md",
    "data/reverse-questions.js",
    *(f"data/lesson{i:02d}-content.js" for i in range(1, 7)),
    *(f"LESSON_{i:02d}.md" for i in range(1, 7)),
}
FIXED_TIMESTAMP = (2020, 1, 1, 0, 0, 0)

def tracked_files() -> list[Path]:
    result = subprocess.run(
        ["git", "-C", str(ROOT), "ls-files", "-z"],
        check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    )
    entries = [Path(os.fsdecode(n)) for n in result.stdout.split(b"\0") if n]
    files = []
    for item in entries:
        norm = item.as_posix()
        if item.is_absolute() or ".." in item.parts:
            raise ValueError(f"Unsafe path in Git index: {norm}")
        p = ROOT / item
        if not p.exists() or not p.is_file() or p.is_symlink():
            raise ValueError(f"Tracked file is missing or unsafe: {norm}")
        name = p.name.lower()
        if name in BLOCKED_NAMES or p.suffix.lower() in BLOCKED_EXTENSIONS:
            raise ValueError(f"Private or forbidden material is tracked: {norm}")
        if norm.startswith(("dist/", "node_modules/", ".git/")):
            raise ValueError(f"Build dependency or output tracked: {norm}")
        files.append(item)
    missing = REQUIRED - {x.as_posix() for x in files}
    if missing:
        raise ValueError(f"Required release files missing: {', '.join(sorted(missing))}")
    return sorted(files, key=lambda x: x.as_posix())

def git_head() -> str:
    return subprocess.check_output(
        ["git", "-C", str(ROOT), "rev-parse", "HEAD"], text=True
    ).strip()

def build(version: str, output: Path, release_date: str) -> dict:
    if not RELEASE_PATTERN.fullmatch(version):
        raise ValueError("Version must have the form v0.1.0")
    dt.date.fromisoformat(release_date)
    files = tracked_files()
    manifest = {
        "project": "ВиноВатт!",
        "technical_name": "WinoWatt",
        "slogan": "Мощность вина",
        "version": version,
        "release_date": release_date,
        "source_commit": git_head(),
        "file_count": len(files),
        "files": [],
        "note": "All file hashes are SHA-256. Personal reference PDF books are not included.",
    }
    payload = {}
    for path in files:
        raw = (ROOT / path).read_bytes()
        rel = path.as_posix()
        payload[rel] = raw
        manifest["files"].append({
            "path": rel, "size_bytes": len(raw),
            "sha256": hashlib.sha256(raw).hexdigest()
        })
    manifest_raw = (json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True)+"\n").encode("utf-8")
    path_prefix = f"WinoWatt-{version}/"
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for name, raw in sorted(payload.items()):
            info = zipfile.ZipInfo(path_prefix + name, FIXED_TIMESTAMP)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, raw)
        info = zipfile.ZipInfo(path_prefix+"RELEASE_MANIFEST.json", FIXED_TIMESTAMP)
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o644 << 16
        archive.writestr(info, manifest_raw)
    return manifest

def main() -> None:
    cli = argparse.ArgumentParser()
    cli.add_argument("--version", required=True)
    cli.add_argument("--output", type=Path)
    cli.add_argument("--date", default=dt.datetime.now(dt.timezone.utc).date().isoformat())
    args = cli.parse_args()
    filename = args.output or (ROOT / "dist" / f"WinoWatt-{args.version}-{args.date.replace('-', '')}.zip")
    manifest = build(args.version, filename, args.date)
    checksum = hashlib.sha256(filename.read_bytes()).hexdigest()
    checksum_path = filename.with_suffix(filename.suffix+".sha256")
    checksum_path.write_text(checksum+"  "+filename.name+"\n", encoding="utf-8")
    print(f"ZIP={filename}")
    print(f"SHA256={checksum}")
    print(f"FILES={manifest['file_count']}")

if __name__ == "__main__":
    main()
