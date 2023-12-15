const { Client, LocalAuth } = require('whatsapp-web.js');
const crud = require('./crud');
const dotenv = require("dotenv");


dotenv.config();

// Phone number that will be used to send notification
// from the whatsapp bot
const PHONE_NUMBER = "8" + process.env.REDIRECT_PHONE_NUMBER;

// Phone number of the whatsapp bot:
const MY_PHONE_NUMBER = "7" + process.env.BOT_PHONE_NUMBER;



const client = new Client({ authStrategy: new LocalAuth() });

client.on('qr', (qr) => {
    // Здесь вы можете обработать QR-код
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', (session) => {
    // Здесь вы можете сохранить объект сессии
    console.log('AUTHENTICATED', session);
});

client.on('message', async message => {
    let userPhoneNumber = (await message.getContact()).number;
    let userName = (await message.getContact()).pushname;
    if (message.body === '/консультация') {
        await message.reply('Здравствуйте. Ваша заявка на консультацию принята. Как вам удобно переговорить устно или перепиской?\n' +
            '(/позвонитемне или /напишитемне):\n\n' +
            `wa.me/${MY_PHONE_NUMBER}?text=/позвонитемне\n\nwa.me/${MY_PHONE_NUMBER}?text=/напишитемне`);
    } else if (message.body === '/позвонитемне' || message.body === '/напишитемне') {
        await message.reply('Ок. Первый освободившийся менеджер сразу же с вами свяжется. Спасибо за обращение.');

        let action = message.body === '/позвонитемне' ? 'ПОЗВОНИТЬ' : 'НАПИСАТЬ';
        await client.sendMessage((await client.getNumberId(PHONE_NUMBER))._serialized,
            `${userName} ${userPhoneNumber} оставил(а) заявку на получение консультации ` +
            `(${action}).` +
            `\nДата и время заявки: ${new Date().toLocaleString()}.\nНеобходимо с ним связаться.`);

        // Add entry to the database
        if (crud.getByPhone(userPhoneNumber) !== null) {
            crud.update(new Date().toLocaleDateString(), new Date().toLocaleTimeString(), userName, userPhoneNumber, action);
        } else {
            crud.add(new Date().toLocaleDateString(), new Date().toLocaleTimeString(), userName, userPhoneNumber, action);
        }
    } else {
        await message.reply('Напишите "/консультация" чтобы начать:\n' +
            `wa.me/${MY_PHONE_NUMBER}?text=/консультация`);
    }
});


client.initialize();
