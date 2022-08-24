const qrcode = require('qrcode-terminal');
const CronJob = require('cron').CronJob;

const { Client, LocalAuth, ChatTypes } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

//Generar Qr
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

//Aviso de inicio
client.on('ready', () => {
    console.log('Client is ready!');
    //Inicializa job del cron
    initializeCron();
});

//Respuesta programable a un mensaje especifico
client.on('message', message => {
	if(message.body === '!info') {
		message.reply('- Tenes 18 turnos de masajes esta semana bb');
	}
});

//Configuracion cron 
const job = new CronJob('* * * * * *', function() {
    sendHB();
});

//Inicializa WhatsApp??
client.initialize();

//Mandar mensaje
function sendHB(){
    client.getChats().then(chats => {
        const contact = chats.find((chat) => chat.name === "Rafael");
        client.sendMessage(contact.id._serialized, "lindo");
    });
}

//Funcion cron
function initializeCron() {
    job.start();
}