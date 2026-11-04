#!/usr/bin/env python3
"""Check a WinoWatt ZIP archive against the embedded manifest and file hashes."""
import hashlib
import json
from pathlib import Path
import sys
import zipfile

def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python3 tools/verify_release.py path/to/archive.zip")
    zip_path = Path(sys.argv[1])
    with zipfile.ZipFile(zip_path, "r") as archive:
        bad = archive.testzip()
        if bad: raise AssertionError("Corrupt ZIP entry: "+bad)
        names = archive.namelist()
        manifests = [n for n in names if n.endswith("/RELEASE_MANIFEST.json")]
        assert len(manifests) == 1, "Archive must have exactly one manifest"
        prefix = manifests[0].removesuffix("RELEASE_MANIFEST.json")
        manifest = json.loads(archive.read(manifests[0]))
        assert prefix == f"WinoWatt-{manifest['version']}/"
        listed = {prefix+x["path"] for x in manifest["files"]}
        assert len(listed) == len(manifest["files"]) == manifest["file_count"]
        assert set(names) == listed | set(manifests), "Unexpected or omitted archive entries"
        for item in manifest["files"]:
            path = item["path"]
            assert not path.startswith("/") and ".." not in Path(path).parts
            data = archive.read(prefix+path)
            assert len(data) == item["size_bytes"], "Wrong file length: "+path
            assert hashlib.sha256(data).hexdigest() == item["sha256"], "Invalid checksum: "+path
            assert Path(path).suffix.lower() not in {".pdf",".pem",".key",".p12",".pfx"}
        assert prefix+"index.html" in listed
        for i in range(1,7):
            assert prefix+f"data/lesson{i:02d}-content.js" in listed
        assert prefix+"data/reverse-questions.js" in listed
    sha_path = zip_path.with_suffix(zip_path.suffix+".sha256")
    if sha_path.exists():
        digest = hashlib.sha256(zip_path.read_bytes()).hexdigest()
        expected = sha_path.read_text(encoding="utf-8").split()[0]
        assert expected == digest, "Archive checksum mismatch"
    print(f"PASS: {zip_path.name}, {manifest['file_count']} tracked files, all hashes OK")

if __name__ == "__main__":
    main()
