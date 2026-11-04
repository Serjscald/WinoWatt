/* ВиноВатт! — урок 04. География и терруар; авторские образовательные тексты. */
(function(){
"use strict";
const d=window.VinoVattData;
const unit={
  "lesson": {
    "id": "terroir",
    "title": "География и терруар: один сорт — тысячи голосов",
    "subtitle": "Учимся слышать место, не забывая о человеке",
    "storyTitle": "Один сорт — тысячи голосов",
    "storyTakeaway": "Место влияет на созревание ягод через климат, воду, освещённость и почву; но вкус формируется вместе с решениями виноградаря и винодела. Терруар — не магический вкус камня и не гарантия качества.",
    "processTitle": "Как место превращается в стиль",
    "goal": "Ученик объясняет терруар без мистики, понимает климат, высоту, экспозицию, почвы, погоду урожая и роль человека; умеет консультировать гостя и проверять географические обещания на этикетке.",
    "guestStory": [
      "Виноградная лоза похожа на путешественника: сорт остаётся тем же, но в каждой новой стране, на каждом склоне и под каждым солнцем его история звучит иначе.",
      "Однако лоза не пишет эту историю одна. Рядом с ней всегда стоят архитекторы вкуса — виноградарь и винодел.",
      "Представим две лозы одного сорта. Первая встречает прохладное утро и короткое лето. Вторая проводит долгие дни в тёплом солнце. Они не обязаны дать одинаковые ягоды: солнце, тепло и время меняют путь созревания.",
      "Но даже на одном холме нет одинаковых мест. Один склон повёрнут к солнцу, другой большую часть дня остаётся в тени. Один участок быстрее отводит лишнюю воду, другой дольше хранит влагу. Лоза не читает географическую карту — она отвечает на реальные условия вокруг корней и листьев.",
      "Теперь представим виноградаря. Он решает, как работать с почвой, защищать лозу и когда собирать урожай. Винодел продолжает историю после сбора. Нельзя вычеркнуть человека и объявить, будто землю достаточно насыпать в бокал, чтобы получить вкус места.",
      "Поэтому слово «терруар» для кависта — не пароль посвящённых, а короткое название длинного разговора: о месте, погоде, природе, опыте и человеческих решениях.",
      "У хорошего вина есть адрес. Но адрес — это начало рассказа, а не готовый ответ о том, каким будет каждый глоток."
    ],
    "narrativeCaution": "Это художественные, условные лозы. Место задаёт возможности и ограничения, но не гарантирует конкретный аромат, качество или вкус отдельной бутылки. Описание опирается на определение терруара OIV и базовую географию WSET.",
    "professional": [
      {
        "title": "1. Терруар — отношения места и человека",
        "body": "По определению OIV, виноградарский терруар объединяет узнаваемую физическую и биологическую среду с практиками виноградарства и сформированным коллективным знанием. В понятие входят почва, рельеф, климат, ландшафт и биоразнообразие. Не стоит сводить терруар к одной породе камня или отождествлять его с юридическим указанием происхождения.",
        "takeaway": "Терруар — взаимодействие природы, практик и опыта, а не только почва.",
        "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C"
      },
      {
        "title": "2. Климат и зрелость винограда",
        "body": "Температура и солнечный свет влияют на скорость созревания ягод, накопление сахаров, сохранение кислот и развитие ароматов. При прочих равных прохладный климат чаще связан с более высокой кислотностью и менее зрелым фруктовым профилем; тёплый — со спелым фруктовым характером и потенциально большим алкоголем. Это тенденции, а не железные правила: важны сорт, погода года и дата сбора.",
        "takeaway": "Климат влияет на зрелость; зрелость влияет на баланс сахара, кислот и ароматов.",
        "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
      },
      {
        "title": "3. Широта, высота и экспозиция склонов",
        "body": "Широта помогает понять общие возможности климата, но высота может сделать участок прохладнее, а близость водоёма и ветер изменить условия. Экспозиция показывает, в какую сторону обращён склон и как он получает свет. Два соседних виноградника могут иметь разный режим освещения и водоотведения; оценка всегда зависит от полушария и особенностей местности.",
        "takeaway": "Даже соседние склоны не всегда живут в одинаковом свете и тепле.",
        "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style); Bourgogne Wines, An ideal climate for producing great wines (https://www.bourgogne-wines.com/wine-and-terroir/our-natural-assets/climatology/an-ideal-climate-for-producing-great-wines,2483,9268.html)"
      },
      {
        "title": "4. Почва: вода, корни и питание",
        "body": "Тип почвы, её структура, глубина и способность пропускать или удерживать воду влияют на жизнь лозы. Но фраза «известняк на почве — значит, вино имеет вкус известняка» выдаёт художественную ассоциацию за доказанный прямой перенос. «Минеральность» — неоднозначный сенсорный термин. Лоза действительно усваивает минеральные элементы питания, однако ощущения кремня или мокрого камня не следует считать доказательством прямого переноса вкуса горной породы в вино; механизмы этих ощущений продолжают исследоваться.",
        "takeaway": "Почва действует через условия роста; не следует обещать вкус камня как физический перенос.",
        "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C; WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
      },
      {
        "title": "5. Погода конкретного года — винтаж",
        "body": "Климат описывает многолетние особенности места, а погода урожая — условия отдельного сезона: прохладную весну, жару, засуху, дождь перед сбором, град или заморозки. Год может изменить сроки сбора, зрелость, урожайность и стиль. На одной и той же земле соседние винтажи способны отличаться, поэтому нельзя сводить вино к стабильному «вкусу региона».",
        "takeaway": "Климат — привычки места, погода — события конкретного сезона.",
        "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
      },
      {
        "title": "6. Человек внутри терруара",
        "body": "Виноградарь выбирает работу с зелёной массой, плотность нагрузки лозы, защиту урожая, дату сбора и другие практики. После сбора решения винодела — мацерация, брожение, использование ёмкостей и выдержка — дополнительно влияют на стиль. OIV включает виноградарские практики в понятие терруара; технология переработки также важна при сравнении вин, даже когда происхождение одинаково.",
        "takeaway": "Место не отменяет мастерство и решения человека.",
        "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C; WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
      },
      {
        "title": "7. Бургундские Climats и профессиональная честность",
        "body": "В Бургундии Climat — исторически выделенный и названный виноградный участок, а не просто «погода». Виноградники различаются высотой, экспозицией, почвой и условиями выращивания. Кависту важно объяснить покупателю, что указание происхождения помогает узнать потенциальный стиль, но не является гарантией определённого вкуса или качества отдельной бутылки.",
        "takeaway": "Climat в Бургундии — конкретный исторический виноградный участок; не путать с погодой.",
        "source": "Bourgogne Wines, An ideal climate for producing great wines (https://www.bourgogne-wines.com/wine-and-terroir/our-natural-assets/climatology/an-ideal-climate-for-producing-great-wines,2483,9268.html)"
      }
    ],
    "threeSteps": [
      {
        "name": "Место",
        "description": "Климат, рельеф, вода, почва и биологическая среда"
      },
      {
        "name": "Сезон",
        "description": "Погода года определяет конкретные условия созревания"
      },
      {
        "name": "Человек",
        "description": "Виноградарство, сбор и дальнейшие решения"
      },
      {
        "name": "Бокал",
        "description": "Стиль оцениваем дегустацией, а не одним адресом"
      }
    ],
    "myths": [
      {
        "myth": "«Терруар — это только почва».",
        "fact": "OIV включает также климат, рельеф, биоразнообразие и виноградарские практики."
      },
      {
        "myth": "«Вино с известняка буквально содержит вкус известняка».",
        "fact": "Почва влияет на рост лозы, но прямой перенос «вкуса камня» не следует считать доказанным объяснением минеральных ассоциаций."
      },
      {
        "myth": "«Из одного региона все вина одинаковы».",
        "fact": "Сорт, участок, урожайный год, виноградарство и виноделие могут заметно менять стиль."
      }
    ],
    "sources": [
      "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C",
      "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)",
      "WSET, Understanding acidity in wine (2026, https://www.wsetglobal.com/knowledge-centre/blog/2026/understanding-acidity-in-wine)",
      "Bourgogne Wines, An ideal climate for producing great wines (https://www.bourgogne-wines.com/wine-and-terroir/our-natural-assets/climatology/an-ideal-climate-for-producing-great-wines,2483,9268.html)"
    ]
  },
  "cards": [
    {
      "id": "t-card-001",
      "topic": "terroir",
      "front": "Что называют терруаром в виноградарстве?",
      "back": "Взаимодействие природной и биологической среды, виноградарских практик и коллективного знания.",
      "why": "Такое понимание закреплено в определении OIV; почва — только одна часть.",
      "story": "«Терруар — биография места и людей, а не горсть земли».",
      "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C"
    },
    {
      "id": "t-card-002",
      "topic": "terroir",
      "front": "Чем климат отличается от погоды урожая?",
      "back": "Климат — многолетние условия региона; погода урожая — конкретный сезон.",
      "why": "Жара и дожди в одном году могут отличаться от обычных условий.",
      "story": "«Климат — характер места, погода — его настроение в этом году».",
      "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
    },
    {
      "id": "t-card-003",
      "topic": "terroir",
      "front": "Как более прохладное созревание обычно влияет на кислотность?",
      "back": "При прочих равных помогает сохранить более высокую кислотность.",
      "why": "Но стиль зависит также от сорта, зрелости, сбора и решений винодела.",
      "story": "«Прохлада дольше сохраняет ощущение свежести в ягодах».",
      "source": "WSET, Understanding acidity in wine (2026, https://www.wsetglobal.com/knowledge-centre/blog/2026/understanding-acidity-in-wine)"
    },
    {
      "id": "t-card-004",
      "topic": "terroir",
      "front": "Почему один сорт в тёплом климате бывает иным?",
      "back": "Температуры и солнце меняют созревание, сахар, кислоты и профиль ароматов.",
      "why": "В тёплом климате чаще появляются более спелые фруктовые признаки, но без гарантий для каждой бутылки.",
      "story": "«Один голос, разные сцены и освещение».",
      "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
    },
    {
      "id": "t-card-005",
      "topic": "terroir",
      "front": "Что такое экспозиция виноградника?",
      "back": "Ориентация склона относительно сторон света и поступления солнечного света.",
      "why": "Экспозиция влияет на режим света и тепла; важно учитывать полушарие.",
      "story": "«Один склон встречает солнце раньше, другой — позже».",
      "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
    },
    {
      "id": "t-card-006",
      "topic": "terroir",
      "front": "Что меняет высота виноградника?",
      "back": "Часто делает условия прохладнее и может изменить ход созревания.",
      "why": "Эффект зависит от местных условий, ветра и экспозиции.",
      "story": "«Стоит подняться на холм — и у лета может оказаться другой голос».",
      "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
    },
    {
      "id": "t-card-007",
      "topic": "terroir",
      "front": "Как почва влияет на виноград?",
      "back": "Через водный режим, корни, питание и условия роста.",
      "why": "Недоказательно обещать прямой «вкус известняка» только по геологии участка.",
      "story": "«Почва не приправляет бокал, а создаёт условия для лозы».",
      "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C"
    },
    {
      "id": "t-card-008",
      "topic": "terroir",
      "front": "Что означает термин Climat в Бургундии?",
      "back": "Исторически выделенный и названный виноградный участок.",
      "why": "Это не синоним метеорологического климата.",
      "story": "«У бургундского склона бывает собственное имя и долгая память».",
      "source": "Bourgogne Wines, An ideal climate for producing great wines (https://www.bourgogne-wines.com/wine-and-terroir/our-natural-assets/climatology/an-ideal-climate-for-producing-great-wines,2483,9268.html)"
    },
    {
      "id": "t-card-009",
      "topic": "terroir",
      "front": "Почему винодельческие решения важны при сравнении одного региона?",
      "back": "Срок сбора, мацерация, ёмкости и выдержка меняют стиль.",
      "why": "Одинаковое происхождение само по себе не гарантирует одинаковое вино.",
      "story": "«С одной сцены два режиссёра поставят разные спектакли».",
      "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C"
    },
    {
      "id": "t-card-010",
      "topic": "terroir",
      "front": "Что такое винтаж?",
      "back": "Год сбора урожая, связанный с погодой конкретного сезона.",
      "why": "Год может влиять на созревание и характер вина, но не определяет его без других сведений.",
      "story": "«Каждый год дописывает новую главу одной и той же земли».",
      "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
    },
    {
      "id": "t-card-011",
      "topic": "terroir",
      "front": "Гарантирует ли прохладный регион высокую кислотность каждой бутылки?",
      "back": "Нет; это общая тенденция, а сорт, сбор и виноделие могут менять результат.",
      "why": "В том числе яблочно-молочное превращение меняет восприятие кислотности.",
      "story": "«География даёт подсказки, но не заменяет дегустацию».",
      "source": "WSET, Understanding acidity in wine (2026, https://www.wsetglobal.com/knowledge-centre/blog/2026/understanding-acidity-in-wine)"
    },
    {
      "id": "t-card-012",
      "topic": "terroir",
      "front": "Как лучше описать «минеральность» гостю?",
      "back": "Как сенсорное описание, не утверждая, будто ощущение камня вызвано прямым переносом вкуса породы из почвы.",
      "why": "Это корректнее и профессиональнее, чем обещать физический «вкус камня».",
      "story": "«Можно услышать в вине образ мокрого камня, не объявляя, будто камень туда положили».",
      "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C"
    }
  ],
  "questions": [
    {
      "id": "t-q001",
      "topic": "terroir",
      "prompt": "Что входит в понятие терруара по OIV?",
      "options": [
        "Только состав почвы",
        "Климат, почвы, рельеф, биоразнообразие и виноградарские практики",
        "Только цена земли"
      ],
      "answer": 1,
      "why": "Определение OIV охватывает природную среду и взаимодействующие с ней практики.",
      "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C"
    },
    {
      "id": "t-q002",
      "topic": "terroir",
      "prompt": "В двух бутылках одного сорта разная свежесть. Какое объяснение корректно?",
      "options": [
        "Климат и зрелость могли различаться, но нужно учесть сбор и виноделие",
        "Различаться они не могут",
        "Всё определил цвет этикетки"
      ],
      "answer": 0,
      "why": "Созревание связано с климатом, но не только с ним.",
      "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
    },
    {
      "id": "t-q003",
      "topic": "terroir",
      "prompt": "Что обычно характерно для более прохладного созревания?",
      "options": [
        "Гарантированно больше алкоголя",
        "Полное отсутствие кислотности",
        "Более высокая сохранность кислот при прочих равных"
      ],
      "answer": 2,
      "why": "Прохлада чаще помогает сохранить кислотность, однако конкретное вино требует проверки.",
      "source": "WSET, Understanding acidity in wine (2026, https://www.wsetglobal.com/knowledge-centre/blog/2026/understanding-acidity-in-wine)"
    },
    {
      "id": "t-q004",
      "topic": "terroir",
      "prompt": "О чём говорит экспозиция склона?",
      "options": [
        "О направлении склона по отношению к солнцу",
        "О количестве лет выдержки",
        "О цене бутылки"
      ],
      "answer": 0,
      "why": "Ориентация определяет особенности освещения.",
      "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
    },
    {
      "id": "t-q005",
      "topic": "terroir",
      "prompt": "Можно ли уверенно утверждать, что виноград из известняковых почв имеет буквальный вкус известняка?",
      "options": [
        "Да, всегда",
        "Нет, прямой перенос вкуса камня из почвы не доказан этим фактом",
        "Да, но только в игристых"
      ],
      "answer": 1,
      "why": "Тип почвы влияет на водный режим и питание лозы. «Минеральность» — сенсорное описание, происхождение которого нельзя однозначно установить только по геологии.",
      "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C"
    },
    {
      "id": "t-q006",
      "topic": "terroir",
      "prompt": "Как правильно понимать термин «Climat» в Бургундии?",
      "options": [
        "Названный исторический виноградный участок",
        "Температуру в день дегустации",
        "Количество осадков за год"
      ],
      "answer": 0,
      "why": "В этом контексте Climat — географически конкретный виноградник.",
      "source": "Bourgogne Wines, An ideal climate for producing great wines (https://www.bourgogne-wines.com/wine-and-terroir/our-natural-assets/climatology/an-ideal-climate-for-producing-great-wines,2483,9268.html)"
    },
    {
      "id": "t-q007",
      "topic": "terroir",
      "prompt": "Почему один винтаж отличается от другого?",
      "options": [
        "Бутылки из одинаковой деревни всегда одинаковы",
        "Погода сезона, зрелость ягод и решения людей могут меняться",
        "Потому что все виноградники ежегодно переезжают"
      ],
      "answer": 1,
      "why": "Климат и ежегодные погодные условия не равнозначны.",
      "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
    },
    {
      "id": "t-q008",
      "topic": "terroir",
      "prompt": "Как высота может повлиять на виноградник?",
      "options": [
        "Обычно полностью устраняет влияние солнца",
        "Может изменить температуру и скорость созревания",
        "Гарантирует отсутствие болезней"
      ],
      "answer": 1,
      "why": "Влияние высоты нужно рассматривать вместе с экспозицией и местными условиями.",
      "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
    },
    {
      "id": "t-q009",
      "topic": "terroir",
      "prompt": "Место происхождения автоматически гарантирует высокий уровень качества?",
      "options": [
        "Да, если это известный регион",
        "Нет, для оценки нужны конкретное вино, винтаж и производитель",
        "Да, если участок склоновый"
      ],
      "answer": 1,
      "why": "Происхождение важно, но не заменяет оценку продукта.",
      "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C"
    },
    {
      "id": "t-q010",
      "topic": "terroir",
      "prompt": "Что корректнее сказать об одном сорте из двух климатических зон?",
      "options": [
        "Он обязательно одинаков",
        "Он обязательно красный",
        "У него могут различаться кислотность, зрелость и ароматический профиль"
      ],
      "answer": 2,
      "why": "Среда может менять созревание, а значит — многие характеристики.",
      "source": "WSET, How does geography affect a wine’s style? (2021, https://www.wsetglobal.com/knowledge-centre/blog/2021/august/24/how-does-geography-affect-a-wine-s-style)"
    },
    {
      "id": "t-q011",
      "topic": "terroir",
      "prompt": "Какая роль человека вернее?",
      "options": [
        "Виноградарь и винодел существенно влияют на стиль",
        "Никакой: всё решает почва",
        "Он влияет только на этикетку"
      ],
      "answer": 0,
      "why": "Практики выращивания и виноделия взаимодействуют с условиями места.",
      "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C"
    },
    {
      "id": "t-q012",
      "topic": "terroir",
      "prompt": "Гость просит «минеральный» стиль. Как отвечать?",
      "options": [
        "Пообещать, что в вине растворён вкус гранита",
        "Уточнить желаемые ассоциации и предложить стиль без ложной геологической причинности",
        "Отказать в консультации"
      ],
      "answer": 1,
      "why": "Такое впечатление можно описывать метафорически, не выдавая конкретную геологическую причину за доказанную.",
      "source": "OIV, Definition of vitivinicultural terroir — OIV/VITI 333/2010 (https://www.oiv.int/index.php/node/3362); A. Maltman, Minerality in wine: a geological perspective (2013), https://doi.org/10.1080/09571264.2013.793176; Tai & Kostaki, The science of minerality (2025), https://doi.org/10.1039/D5RA06531C"
    }
  ],
  "practices": [
    {
      "id": "t-p001",
      "topic": "terroir",
      "title": "Две стороны одного холма",
      "scenario": "Гость удивлён: «Один сорт, одна деревня, два соседних склона — неужели вина могут различаться?» Как объяснить без мистики?",
      "skill": "Пояснять микроклимат и рельеф простым языком",
      "options": [
        {
          "label": "Рассказать о свете, экспозиции, дренаже и решениях виноградаря, не обещая обязательной разницы во вкусе",
          "ok": true,
          "why": "Это объясняет возможные причины отличий, не выдавая тенденцию за закон."
        },
        {
          "label": "Сказать, что вино с более дорогого склона всегда лучше",
          "ok": false,
          "why": "Цена участка не доказывает качество конкретной бутылки."
        },
        {
          "label": "Заявить, что соседние участки обязаны давать идентичный вкус",
          "ok": false,
          "why": "Даже соседние участки могут иметь разные условия выращивания."
        }
      ],
      "conclusion": "Один сорт может звучать по-разному даже на соседних участках: отличаются освещение, водный режим и другие условия, а также решения производителя. Предлагаем сравнить конкретные вина, а не делать вывод по карте."
    },
    {
      "id": "t-p002",
      "topic": "terroir",
      "title": "Миф о вкусе известняка",
      "scenario": "Посетитель спрашивает: «Этот Шардоне с известняковой почвы — значит, я точно почувствую вкус известняка?» Что ответить?",
      "skill": "Разделять метафору и проверяемые механизмы",
      "options": [
        {
          "label": "Объяснить влияние почвы на рост лозы и уточнить, что «каменные» оттенки — метафора впечатления, не буквальный перенос вкуса",
          "ok": true,
          "why": "Профессионально честный ответ не выдаёт поэтический образ за научный закон."
        },
        {
          "label": "Подтвердить, что виноград всасывает вкус камней и передаёт его прямо в вино",
          "ok": false,
          "why": "Такое утверждение не следует из геологического происхождения почвы."
        },
        {
          "label": "Сказать, что почва вообще никак не связана с условиями виноградарства",
          "ok": false,
          "why": "Почва может влиять на воду, питание и состояние лозы."
        }
      ],
      "conclusion": "Можно сказать: «Известняковые почвы — часть условий участка. А ощущение мокрого камня в бокале — язык дегустационных ассоциаций, не доказательство присутствия камня в вине»."
    },
    {
      "id": "t-p003",
      "topic": "terroir",
      "title": "География — не приговор",
      "scenario": "Покупатель выбирает сухое белое и говорит: «Хочу свежее. Значит, мне нужен только северный регион?» Как помочь?",
      "skill": "Предложить стиль по ощущениям, не превращая географию в жёсткое правило",
      "options": [
        {
          "label": "Уточнить кислотность и желаемый профиль, объяснить климатическую тенденцию и предложить сравнивать конкретные вина",
          "ok": true,
          "why": "Мы используем географию как ориентир, но учитываем сорт, урожай и виноделие."
        },
        {
          "label": "Гарантировать, что всякое северное вино свежее, а всякое южное тяжёлое",
          "ok": false,
          "why": "Это абсолютное и часто неверное обобщение."
        },
        {
          "label": "Сказать, что климат никак не связан с созреванием винограда",
          "ok": false,
          "why": "Температура и свет влияют на созревание."
        }
      ],
      "conclusion": "Хороший кавист говорит: «В прохладном климате часто сохраняется больше кислотности, но я подберу вам стиль по ощущениям и конкретной бутылке, а не только по широте»."
    }
  ]
};
d.lessons[unit.lesson.id]=unit.lesson;
d.cards.push(...unit.cards);d.questions.push(...unit.questions);d.practices.push(...unit.practices);
const t=d.topics.find(x=>x.id===unit.lesson.id);
if(t){t.status="lesson";t.name="География и терруар";t.subtitle="Один сорт — тысячи голосов";}
})();
