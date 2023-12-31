## How to run?
To view the block scheme<br>
From the root directory run:
```bash 
cd frontend && npm run dev
```

To run the whatsapp bot run:
From the root directory run:
```bash
npm run bot
```

All bot settings are located in the **.env** file in the root directory:


# Тестовое задание

Необходимо с помощью библиотеки React Flow (https://reactflow.dev/) создать веб-приложение (максимально простое по дизайну), содержащее канву с блок-схемой чат-бота согласно ТЗ.

Данные бота необходимо по кнопке “Сохранить” экспортировать с канвы в JSON формат и записать в любую базу данных (на ваш выбор).
Разработать бэкенд на JS с помощью библиотеки wwebjs (https://wwebjs.dev/), который будет получать данные чат-бота из БД, выстраивать алгоритм и записывать полученные данные от пользователя в БД при обращении к чат-боту.

## Техническое задание к чат-боту
### Описание: 
__бот предназначен для получения и обработки заявки на консультацию с сайта или опросника типа марквиз.__

### Структура:
__Пользователь (сообщение):__ /консультация

__Бот (сообщение):__ Здравствуйте. Ваша заявка на консультацию принята. Как вам удобно переговорить устно или перепиской?

wa.me/7ХХХХХХХХХХ?text=/позвонитемне<br>
wa.me/7ХХХХХХХХХХ?text=/напишитемне

Пользователь (сообщение): /позвонитемне или /напишитемне

__Бот (сообщение):__ Ок. Первый освободившийся менеджер сразу же с вами свяжется. Спасибо за обращение.

__Лид:__

Бот отправляет имя и контакт на рабочий номер (допустим 7YYYYYYYYYY), с текстом: 
Такой-то человек (здесь взять данные с ватсап Имя, Номер) оставил заявку на получение консультации (написать или позвонить - поставить в зависимости от выбора ссылки). 
<br>Дата и время заявки. Необходимо с ним связаться.


Все контакты передаются в базу данных для сбора информации.

### Предусмотреть поля в БД:
id (primary key),<br>
дата (ДД.ММ.ГГГГ),<br>
время (ЧЧ:ММ),<br>
имя пользователя ватсап,<br>
номер телефона,<br>
действие (позвонить или написать).

### Настройки бота на платформе:
Входное поле (предусмотреть переменную в коде),<br>
Уведомлять на номер: 7YYYYYYYYYY (пример).<br>
Т.е. идея такая, что пользователь данного кейса может указать любой свой номер в ватсап для получения уведомлений.


### Дополнительно:
Если повторно обращается тот же номер к боту, то перезаписать данные в БД.