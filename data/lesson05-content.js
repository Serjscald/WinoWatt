/* ВиноВатт! — урок 05. Сорт, регион, технология: этикетка и её подсказки. */
(function(){
"use strict";
const d=window.VinoVattData;
const unit={
  "lesson": {
    "id": "grape-region",
    "title": "Сорт, регион и технология: прочитай биографию вина",
    "subtitle": "Расшифровываем этикетку без снобизма",
    "storyTitle": "Этикетка — паспорт, а не автобиография",
    "storyTakeaway": "Сорт даёт подсказку о характере, регион — о происхождении и возможных условиях, а технология — о решениях винодела. Этикетка содержит факты и сигналы, но не гарантирует вкус и качество без знания конкретной бутылки.",
    "processTitle": "Пять ключей к винной этикетке",
    "goal": "Ученик различает сорт и географическое обозначение, объясняет винтаж, производителя, маркировку стиля и выдержки, избегает ложных обещаний гостю и умеет составлять понятную консультацию.",
    "guestStory": [
      "Представьте бутылку вина как незнакомого человека на вокзале. У него есть паспорт, место рождения, фамилия и дата — но паспорт не способен пересказать весь его характер.",
      "На одной бутылке крупно написано «Chardonnay». На другой — «Chablis». Покупатель думает, что это два совершенно разных винограда. Но кавист знает: Шабли — винодельческая территория Бургундии, где основой тихих белых вин этого наименования является Шардоне. Просто одна бутылка представилась сортом, а другая — своим адресом.",
      "Вот ещё два героя нашей истории. Один пишет на этикетке «Malbec» и охотно называет родину — Аргентину. Другой представляется словом «Barolo» и будто бы оставляет имя винограда за кадром: чтобы понять его, придётся узнать, что вино этого наименования делают из Неббиоло.",
      "Затем на этикетке появляется год. Это не дата, когда бутылку поставили на полку, а, как правило, год урожая винограда. Но и он не расскажет, сколько времени вино провело в бочке или насколько оно уже созрело.",
      "Некоторые слова напоминают награды на мундире: Reserva, Grand Cru, méthode traditionnelle. Они могут означать важные правила или приёмы, но их смысл зависит от страны, региона и конкретной системы. Профессионал не обещает величие из-за красивого шрифта.",
      "И вот покупатель задаёт самый правильный вопрос: «А какое оно на вкус?» Тогда кавист соединяет подсказки этикетки с реальными знаниями о сорте, регионе, технологии и производителе — и говорит не загадками, а человеческим языком.",
      "Этикетка — хорошее начало знакомства. Но узнать человека только по паспорту невозможно. С вином происходит то же самое."
    ],
    "narrativeCaution": "Образы этикетки и паспорта — метафоры. Примеры Chablis/Chardonnay и Barolo/Nebbiolo относятся к указанным регулируемым наименованиям, а не ко всем винам Бургундии или Пьемонта. Правила маркировки различаются по стране и классу вина.",
    "professional": [
      {
        "title": "1. На этикетке может говорить сорт или регион",
        "body": "Одни виноделы выносят на первый план сорт винограда, другие — защищённое наименование происхождения. В европейских регионах название места нередко указывает на традиционно разрешённые сорта и правила изготовления. Вина Chablis AOC относятся к Шардоне, а Barolo DOCG — к Неббиоло. Надпись «Chardonnay» без других сведений, напротив, сама по себе не раскрывает ни место выращивания, ни способ выдержки.",
        "takeaway": "Не путай сорт винограда с адресом вина: разные этикетки могут говорить об одном сорте разными словами.",
        "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels; WSET, How to read wine labels: piecing the clues together (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-two-piecing-the-clues-together/"
      },
      {
        "title": "2. Географическое происхождение и система правил",
        "body": "AOC/AOP, DOC/DOCG, DO и другие сокращения относятся к различным национальным системам географических обозначений и регламентов. Они могут определять территорию, допустимые сорта и методы. Но их нельзя переводить в универсальную шкалу «хорошее — лучшее — превосходное»: качество конкретной бутылки зависит также от производителя, урожая и хранения. Правила следует проверять по стране и актуальной спецификации наименования.",
        "takeaway": "Географическое обозначение — сведения о происхождении и правилах, а не магическая оценка вкуса.",
        "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels; OIV, International Standard for the Labelling of Wines, edition 2025, https://www.oiv.int/sites/default/files/publication/2025-03/OIV%20Wine%20Labelling%20Standard%20EN_2025%20complet.pdf"
      },
      {
        "title": "3. Винтаж — год урожая, не год розлива",
        "body": "Год на винной этикетке обычно относится к сбору винограда. Он помогает оценить возраст и контекст погодных условий урожая, но не сообщает автоматически дату розлива и не гарантирует зрелость. Невинтажные вина могут быть получены из виноматериалов разных лет, особенно в некоторых стилях игристого. Условия и правила указания года зависят от юрисдикции.",
        "takeaway": "Дата урожая — одна координата истории; стадия развития определяется конкретным вином.",
        "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels; OIV, International Standard for the Labelling of Wines, edition 2025, https://www.oiv.int/sites/default/files/publication/2025-03/OIV%20Wine%20Labelling%20Standard%20EN_2025%20complet.pdf; WSET, Why do we age wine? (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/march/21/why-do-we-age-wine"
      },
      {
        "title": "4. Производитель и конкретная линейка",
        "body": "Имя хозяйства, винодела или бренда помогает установить происхождение и стиль работы, но известность имени не заменяет анализ содержимого. У одного производителя могут быть молодое базовое вино, отдельная линейка с выдержкой и редкие участковые вина. Кависту важно сверить точное название, год, объём и происхождение, а не ориентироваться только на запомнившийся логотип.",
        "takeaway": "Не продавай репутацию вместо объяснения конкретной бутылки.",
        "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels; WSET, How to read wine labels: piecing the clues together (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-two-piecing-the-clues-together/"
      },
      {
        "title": "5. Подсказки технологии: дуб, ферментация и стиль",
        "body": "Указание на контакт с дубом может подсказать вкусовые ассоциации ванили, тоста и пряностей, но фактическая интенсивность зависит от длительности контакта, размера и состояния древесины. Надпись о традиционном методе игристого описывает технологию образования пузырьков, а не абсолютный уровень качества. Не каждое вино выдерживается в дубе; нержавеющая сталь и другие ёмкости помогают получить иные стили.",
        "takeaway": "Технологические слова описывают действия, а не обещают вкус без исключений.",
        "source": "WSET, A guide to wine types and styles (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/october/03/how-many-wine-types-and-styles-are-there; WSET, Why do we age wine? (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/march/21/why-do-we-age-wine"
      },
      {
        "title": "6. Reserva, Grand Cru и «старые лозы» — не универсальные медали",
        "body": "Термины Reserva, Riserva, Gran Reserva, Grand Cru, Vieilles Vignes и другие нельзя механически переносить между странами. В одной системе отдельное слово связано с законодательно установленными сроками или происхождением, в другой контекст и контроль могут отличаться. Например, испанская Rioja имеет собственные категории выдержки, а бургундское Grand Cru связано с классификацией виноградников. Значение всегда требует конкретного региона и действующего регламента.",
        "takeaway": "Красивое слово имеет значение только вместе с местом и правилами его применения.",
        "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels; WSET, Why do we age wine? (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/march/21/why-do-we-age-wine"
      },
      {
        "title": "7. Четыре вопроса профессионального кависта",
        "body": "Сначала определи цвет и стиль; затем выясни сорт или преобладающие сорта, место происхождения и возможные правила, год урожая и особенности производства. После этого спроси гостя о желаемой кислотности, танинности, теле и ароматах. Если данных на этикетке недостаточно, честно скажи об этом и проверь техническую карточку производителя. Спокойная уверенность полезнее придуманных деталей.",
        "takeaway": "Этикетку читаем как систему подсказок, а не как разрешение фантазировать.",
        "source": "WSET, How to find a wine you'll like (2025), https://www.wsetglobal.com/knowledge-centre/blog/2025/how-to-find-a-wine-youll-like; WSET, How to read wine labels: piecing the clues together (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-two-piecing-the-clues-together/"
      }
    ],
    "threeSteps": [
      {
        "name": "Сорт",
        "description": "Какой виноград формирует возможный характер?"
      },
      {
        "name": "Адрес",
        "description": "Что говорит происхождение и местный регламент?"
      },
      {
        "name": "Время",
        "description": "Какой урожай и что известно о выдержке?"
      },
      {
        "name": "Решения",
        "description": "Какие способы производства указаны или известны?"
      },
      {
        "name": "Гость",
        "description": "Какие ощущения он ищет и чем можем помочь?"
      }
    ],
    "myths": [
      {
        "myth": "«Если на этикетке не указан сорт, вино непонятного происхождения».",
        "fact": "В ряде европейских наименований сорт определяется правилами региона, даже если не написан крупно."
      },
      {
        "myth": "«Reserva всегда лучше вина без надписи Reserva».",
        "fact": "Смысл слова зависит от страны, региона и действующих правил; прямой рейтинг качества из одного слова не следует."
      },
      {
        "myth": "«Винтаж — это год розлива бутылки».",
        "fact": "Винтаж обычно означает год урожая винограда, а не момент розлива."
      }
    ],
    "sources": [
      "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels",
      "WSET, How to read wine labels: piecing the clues together (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-two-piecing-the-clues-together/",
      "WSET, A guide to wine types and styles (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/october/03/how-many-wine-types-and-styles-are-there",
      "WSET, Why do we age wine? (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/march/21/why-do-we-age-wine",
      "OIV, International Standard for the Labelling of Wines, edition 2025, https://www.oiv.int/sites/default/files/publication/2025-03/OIV%20Wine%20Labelling%20Standard%20EN_2025%20complet.pdf",
      "WSET, How to find a wine you'll like (2025), https://www.wsetglobal.com/knowledge-centre/blog/2025/how-to-find-a-wine-youll-like"
    ]
  },
  "cards": [
    {
      "id": "e-card-001",
      "topic": "grape-region",
      "front": "Почему на бутылке Chablis может не быть крупной надписи Chardonnay?",
      "back": "Chablis — регулируемое наименование происхождения белого вина, для которого используется Шардоне.",
      "why": "Название региона иногда заменяет явное указание сорта; нужно знать его правила.",
      "story": "«В этой бутылке сорт представился не именем, а адресом».",
      "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels"
    },
    {
      "id": "e-card-002",
      "topic": "grape-region",
      "front": "Что сообщает слово Barolo на этикетке?",
      "back": "Это итальянское защищённое наименование для вина из Неббиоло с установленными региональными правилами.",
      "why": "Не следует считать Barolo сортом винограда или всей категорией красных вин Пьемонта.",
      "story": "«Бароло — фамилия места, Неббиоло — имя винограда».",
      "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels"
    },
    {
      "id": "e-card-003",
      "topic": "grape-region",
      "front": "Что означает сортовое название Malbec?",
      "back": "Оно указывает на виноград Мальбек, но для понимания стиля важно также узнать место и производителя.",
      "why": "Название сорта — отправная точка, не исчерпывающий прогноз вкуса.",
      "story": "«Имя знакомо, но ещё надо узнать, где вырос наш герой».",
      "source": "WSET, How to find a wine you'll like (2025), https://www.wsetglobal.com/knowledge-centre/blog/2025/how-to-find-a-wine-youll-like"
    },
    {
      "id": "e-card-004",
      "topic": "grape-region",
      "front": "Что такое аппелласьон или географическое обозначение?",
      "back": "Регулируемое указание происхождения, иногда связанное с допустимыми сортами и методами производства.",
      "why": "Одинаковые аббревиатуры в разных странах не всегда имеют одинаковый юридический смысл.",
      "story": "«Это адрес с местными правилами, а не оценка звёздами».",
      "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels"
    },
    {
      "id": "e-card-005",
      "topic": "grape-region",
      "front": "Что называют винтажом?",
      "back": "Год сбора урожая винограда, если год указан в соответствии с применимыми правилами.",
      "why": "Он не равен дате розлива и не раскрывает автоматически зрелость вина.",
      "story": "«На этикетке написан год рождения урожая, а не день появления бутылки».",
      "source": "OIV, International Standard for the Labelling of Wines, edition 2025, https://www.oiv.int/sites/default/files/publication/2025-03/OIV%20Wine%20Labelling%20Standard%20EN_2025%20complet.pdf"
    },
    {
      "id": "e-card-006",
      "topic": "grape-region",
      "front": "Почему вина одного урожая могут быть разными по зрелости?",
      "back": "У сортов и стилей разный потенциал выдержки; влияют технология, хранение и структура.",
      "why": "Пять лет для раннего вина и долгоживущего могут означать разную стадию развития.",
      "story": "«Одному пять лет — время расцвета, другому — начало пути».",
      "source": "WSET, Why do we age wine? (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/march/21/why-do-we-age-wine"
    },
    {
      "id": "e-card-007",
      "topic": "grape-region",
      "front": "Что можно предположить по указанию на дуб?",
      "back": "Вероятны определённые изменения текстуры и ароматов, но интенсивность зависит от деталей выдержки.",
      "why": "Дуб не гарантирует сильную ванильность и не обязателен для качественного вина.",
      "story": "«Дуб может оставить след пряностей, но не всегда пишет всю историю».",
      "source": "WSET, A guide to wine types and styles (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/october/03/how-many-wine-types-and-styles-are-there"
    },
    {
      "id": "e-card-008",
      "topic": "grape-region",
      "front": "Можно ли по слову Reserva гарантировать качество?",
      "back": "Нет: смысл и регламент слова зависят от страны и региона.",
      "why": "Нельзя переносить испанские нормы выдержки на любое итальянское или другое вино.",
      "story": "«Сначала узнаем, кто выдал медаль и за что».",
      "source": "WSET, Why do we age wine? (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/march/21/why-do-we-age-wine"
    },
    {
      "id": "e-card-009",
      "topic": "grape-region",
      "front": "Что означает Grand Cru без указания региона?",
      "back": "Требует уточнения региона и его классификации; это не универсальная международная оценка.",
      "why": "Например, в Бургундии термин связан с конкретными классифицированными виноградниками.",
      "story": "«Звание понятно только вместе со страной и её правилами».",
      "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels"
    },
    {
      "id": "e-card-010",
      "topic": "grape-region",
      "front": "Что может подсказать метод изготовления игристого?",
      "back": "Как получают и сохраняют CO₂, а также какие технологические этапы применены.",
      "why": "Метод не позволяет одной фразой гарантировать точный аромат или качество.",
      "story": "«Пузырьки тоже имеют биографию — узнай, как они родились».",
      "source": "WSET, A guide to wine types and styles (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/october/03/how-many-wine-types-and-styles-are-there"
    },
    {
      "id": "e-card-011",
      "topic": "grape-region",
      "front": "Почему имя производителя важно, но недостаточно?",
      "back": "Оно помогает узнать хозяйство, однако один производитель может выпускать много разных стилей.",
      "why": "Для совета нужны конкретная линейка, год и характеристики бутылки.",
      "story": "«Одна подпись — множество произведений».",
      "source": "WSET, How to read wine labels: piecing the clues together (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-two-piecing-the-clues-together/"
    },
    {
      "id": "e-card-012",
      "topic": "grape-region",
      "front": "Как ответить гостю, когда данных на лицевой этикетке мало?",
      "back": "Проверить обратную этикетку и сведения производителя, затем уточнить предпочтения гостя.",
      "why": "Профессионал не выдумывает сорт, срок выдержки или аромат по дизайну.",
      "story": "«Паспорт — начало знакомства, а не весь разговор».",
      "source": "WSET, How to read wine labels: piecing the clues together (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-two-piecing-the-clues-together/"
    }
  ],
  "questions": [
    {
      "id": "e-q001",
      "topic": "grape-region",
      "prompt": "Покупатель видит Chablis без слова Chardonnay. Что ответить?",
      "options": [
        "Шабли — сорт винограда",
        "Шабли — региональное наименование, для этих вин используется Шардоне",
        "Сорт неизвестен и его нельзя узнать"
      ],
      "answer": 1,
      "why": "Chablis — наименование происхождения; сорт надо знать из правил региона.",
      "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels"
    },
    {
      "id": "e-q002",
      "topic": "grape-region",
      "prompt": "На этикетке написано Barolo. Какой сорт связан с этим наименованием?",
      "options": [
        "Неббиоло",
        "Пино Нуар",
        "Мальбек"
      ],
      "answer": 0,
      "why": "Barolo DOCG делают из Неббиоло.",
      "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels"
    },
    {
      "id": "e-q003",
      "topic": "grape-region",
      "prompt": "Что обозначает винтаж 2021 на этикетке?",
      "options": [
        "Обязательный год покупки",
        "Год урожая винограда согласно правилам маркировки",
        "Обязательный год розлива"
      ],
      "answer": 1,
      "why": "Год урожая не совпадает обязательно с годом розлива.",
      "source": "OIV, International Standard for the Labelling of Wines, edition 2025, https://www.oiv.int/sites/default/files/publication/2025-03/OIV%20Wine%20Labelling%20Standard%20EN_2025%20complet.pdf"
    },
    {
      "id": "e-q004",
      "topic": "grape-region",
      "prompt": "Как лучше понимать защищённое обозначение происхождения?",
      "options": [
        "Как гарантию самого вкусного вина",
        "Как рекламный рисунок без требований",
        "Как сведения о происхождении и соблюдении установленных правил"
      ],
      "answer": 2,
      "why": "Территория и регламент не превращаются автоматически в оценку вкуса.",
      "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels"
    },
    {
      "id": "e-q005",
      "topic": "grape-region",
      "prompt": "Почему два вина из сорта Chardonnay могут быть разными?",
      "options": [
        "Сорта никогда не влияют на стиль",
        "Влияют климат, место, винтаж и технология",
        "Потому что одно всегда сладкое"
      ],
      "answer": 1,
      "why": "Сорт лишь одна из причин характера вина.",
      "source": "WSET, How to find a wine you'll like (2025), https://www.wsetglobal.com/knowledge-centre/blog/2025/how-to-find-a-wine-youll-like"
    },
    {
      "id": "e-q006",
      "topic": "grape-region",
      "prompt": "Что можно предположить по надписи о выдержке в дубе?",
      "options": [
        "Возможны древесные, пряные и текстурные оттенки",
        "Вино обязательно красное",
        "Вино обязательно самого высокого качества"
      ],
      "answer": 0,
      "why": "Контакт с дубом может менять профиль; точность зависит от подробностей.",
      "source": "WSET, A guide to wine types and styles (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/october/03/how-many-wine-types-and-styles-are-there"
    },
    {
      "id": "e-q007",
      "topic": "grape-region",
      "prompt": "Как следует обращаться со словом Reserva?",
      "options": [
        "Во всех странах означает одно и то же",
        "Всегда обозначает только сладость",
        "Проверять страну, регион и местные правила применения"
      ],
      "answer": 2,
      "why": "Термин не универсален и не равен автоматическому рейтингу.",
      "source": "WSET, Why do we age wine? (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/march/21/why-do-we-age-wine"
    },
    {
      "id": "e-q008",
      "topic": "grape-region",
      "prompt": "Что вернее относительно Grand Cru?",
      "options": [
        "Во всех странах он означает одно и то же",
        "Его смысл зависит от региональной классификации",
        "Это название сорта винограда"
      ],
      "answer": 1,
      "why": "Классификационные слова нужно привязывать к конкретному месту.",
      "source": "WSET, How to read wine labels: common features (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-one-common-features-on-wine-labels"
    },
    {
      "id": "e-q009",
      "topic": "grape-region",
      "prompt": "Как читать слово Malbec без сведений о месте?",
      "options": [
        "Как подсказку о сорте, но не полную характеристику вкуса",
        "Как прямое доказательство страны происхождения",
        "Как обозначение традиционного метода игристого"
      ],
      "answer": 0,
      "why": "Один сорт выращивается в разных климатах и даёт разные стили.",
      "source": "WSET, How to find a wine you'll like (2025), https://www.wsetglobal.com/knowledge-centre/blog/2025/how-to-find-a-wine-youll-like"
    },
    {
      "id": "e-q010",
      "topic": "grape-region",
      "prompt": "Какая фраза о пятилетнем вине корректна?",
      "options": [
        "Оно обязательно старое",
        "Оно обязательно молодое",
        "Его зрелость определяется стилем, структурой и развитием конкретного вина"
      ],
      "answer": 2,
      "why": "Возраст сам по себе не гарантирует зрелость.",
      "source": "WSET, Why do we age wine? (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/march/21/why-do-we-age-wine"
    },
    {
      "id": "e-q011",
      "topic": "grape-region",
      "prompt": "Что означает указание технологии производства игристого?",
      "options": [
        "Подсказку о способе производства, не абсолютную оценку качества",
        "Гарантию самого сильного аромата",
        "Указание на обязательное красное вино"
      ],
      "answer": 0,
      "why": "Метод влияет на стиль, но не отменяет другие факторы.",
      "source": "WSET, A guide to wine types and styles (2023), https://www.wsetglobal.com/knowledge-centre/blog/2023/october/03/how-many-wine-types-and-styles-are-there"
    },
    {
      "id": "e-q012",
      "topic": "grape-region",
      "prompt": "Гость показывает этикетку, и сорт не указан. Что делать?",
      "options": [
        "Уверенно назвать первый пришедший на ум сорт",
        "Выяснить наименование, проверить данные производителя и затем объяснить стиль",
        "Сказать, что такие вина незаконны"
      ],
      "answer": 1,
      "why": "Проверка важнее догадки.",
      "source": "WSET, How to read wine labels: piecing the clues together (2019), https://www.wsetglobal.com/knowledge-centre/blog/2019/how-to-read-wine-labels-part-two-piecing-the-clues-together/"
    }
  ],
  "practices": [
    {
      "id": "e-p001",
      "topic": "grape-region",
      "title": "Шабли без Шардоне",
      "scenario": "Гость показывает бутылку Chablis AOC и возмущается: «Мне нужен Шардоне, а здесь сорт даже не указан!» Как объяснить ситуацию?",
      "skill": "Объяснять региональные наименования понятным языком",
      "options": [
        {
          "label": "Объяснить, что Chablis — название винодельческого региона и его белые вина этого наименования делают из Шардоне; затем спросить, какой стиль Шардоне любит гость",
          "ok": true,
          "why": "Правильно связывает место и сорт и переводит разговор к предпочтениям."
        },
        {
          "label": "Сказать, что Шабли — отдельный сорт, похожий на Шардоне",
          "ok": false,
          "why": "Шабли — не сорт винограда."
        },
        {
          "label": "Утверждать, что отсутствие слова Chardonnay доказывает низкое качество",
          "ok": false,
          "why": "Региональные системы маркировки часто строятся вокруг происхождения."
        }
      ],
      "conclusion": "«Шабли — это адрес, а Шардоне — имя винограда. В этом случае регион уже подсказывает сорт». Затем уточни, любит ли гость более свежий, строгий стиль или более округлый и выдержанный — без гарантий по одной этикетке."
    },
    {
      "id": "e-p002",
      "topic": "grape-region",
      "title": "Волшебная надпись Reserva",
      "scenario": "Посетитель ставит рядом две бутылки из разных стран: «Здесь написано Reserva. Значит, оно точно лучше того, где такой надписи нет?» Как поступить?",
      "skill": "Различать регулируемый термин и оценку качества",
      "options": [
        {
          "label": "Уточнить страны и регионы, объяснить различия правил и сравнить конкретные стили, производителей и потребности гостя",
          "ok": true,
          "why": "Не переносит значение термина из одного регламента в другой и не обещает качество автоматически."
        },
        {
          "label": "Подтвердить, что Reserva во всём мире обозначает одинаковое качество",
          "ok": false,
          "why": "Единого всемирного значения нет."
        },
        {
          "label": "Отказать в обсуждении, потому что термины выдержки совершенно ничего не значат",
          "ok": false,
          "why": "В ряде систем эти термины как раз регулируются."
        }
      ],
      "conclusion": "«Reserva может говорить о правилах выдержки или другом местном требовании, но его смысл зависит от происхождения. Давайте сравним конкретные вина и то, что вы любите»."
    },
    {
      "id": "e-p003",
      "topic": "grape-region",
      "title": "Паспорт пятилетней бутылки",
      "scenario": "Покупатель нашёл на этикетке год урожая 2021 и спрашивает: «Значит, вино выдерживали пять лет в дубе и теперь оно точно в самом расцвете?» Как ответит кавист?",
      "skill": "Отличать винтаж от выдержки и стадии развития",
      "options": [
        {
          "label": "Разъяснить, что урожай 2021 не сообщает срок выдержки в дубе; проверить данные производителя и пригодность вина к употреблению",
          "ok": true,
          "why": "Разделяет год сбора, технологию и зрелость."
        },
        {
          "label": "Гарантировать пять лет в бочке, поскольку прошло пять календарных лет",
          "ok": false,
          "why": "От урожая до сегодняшнего дня не равнозначно времени в дубовой бочке."
        },
        {
          "label": "Уверенно назвать любое пятилетнее вино старым и непригодным",
          "ok": false,
          "why": "Разные вина развиваются с разной скоростью."
        }
      ],
      "conclusion": "«Год урожая — дата рождения винограда, а не дневник всех событий в погребе». Чтобы оценить выдержку и зрелость, уточни конкретный стиль, производителя, условия хранения и рекомендации по употреблению."
    }
  ]
};
d.lessons[unit.lesson.id]=unit.lesson;
d.cards.push(...unit.cards);d.questions.push(...unit.questions);d.practices.push(...unit.practices);
const t=d.topics.find(x=>x.id===unit.lesson.id);
if(t){t.status="lesson";t.name="Сорта, регионы и технологии";t.subtitle="Этикетка — паспорт, а не автобиография";}
})();
