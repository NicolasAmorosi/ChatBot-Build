const qrcode = require('qrcode-terminal');

const { Client, LocalAuth, ChatTypes } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then(chats => {
        const contact = chats.find((chat) => chat.name === "Papá");
        client.sendMessage(contact.id._serialized, "Bata");
    });
});

client.on('message', message => {
	if(message.body === '!info') {
		message.reply('- Tenes 18 turnos de masajes esta semana bb');
	}
});

client.initialize();