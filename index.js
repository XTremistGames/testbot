//const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const serverid = '533735526914588673';
const dataserver = '';
//const backup_serverid = "533735526914588673";

let antislivsp1 = new Set();
let antislivsp2 = new Set();
const moderator = new Set();
moderator.add("435106258463227905");
	let lasttestid = 'net';

let requests = JSON.parse(fs.readFileSync("./database/requests.json", "utf8"));
let blacklist = JSON.parse(fs.readFileSync("./database/blacklist names.json", "utf8"));
let reqrem = JSON.parse(fs.readFileSync("./database/requests remove.json", "utf8"));
const nrpnames = new Set(); // Невалидные ники будут записаны в nrpnames
const sened = new Set(); // Уже отправленные запросы будут записаны в sened
const support_cooldown = new Set(); // Запросы от игроков.
const snyatie = new Set(); // Уже отправленные запросы на снятие роли быдут записаны в snyatie

const cooldowncommand = new Set();
/*
tags = ({
    "H": "🎄 Highgarden Family ☆",
	"A": "🎄 Administrator 🎄",
	"K": "🎄 Kolodkin Family ☆",
});

let manytags = [
"A",
"H",
"K",
];
let rolesgg = ["🎄 Highgarden Family ☆", "🎄 Administrator 🎄", "🎄 Kolodkin Family ☆"];
let canremoverole = ["🎄 Заместитель семьи ♕", "🎄 Модератор Discord™", "☆ Управляющий состав семьи ☆"];

const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
*/
const dspanel = new Set();


bot.on("ready", async () => {
  console.log(`${bot.user.username} запущен на  ${bot.guilds.size} серверах!`);
  console.log(`Автор бота: Луняша`);
  console.log(`Автор некоторых систем: Kory_McGregor (Артём Мясников)`);
  //bot.guilds.find(g => g.id == "474975625011003393").channels.find(c => c.name == "general-startbot").send(`\`Бот МакДак запущен!\``);
 bot.user.setActivity('supporting 24 na 7 by Yuki', { type: 'WATCHING' })

  //bot.user.setGame("on SourceCade!");
});

bot.login(process.env.token);


// Система удаленного управления ботом для отключения,фиксов багов и т.д.
bot.on('message', async message => {
    if (message.guild.id == '527851904936706067'){
        if (message.content.startsWith('/r_send')){
            if (message.channel.name != "key-commands") return
            const args = message.content.slice(`/r_send`).split(/ +/);
            if (!args[1]) return message.delete().catch(() => {});
            if (args[1] != bot.user.id) return
            let serverRole = message.guild.roles.find(r => r.name == "[$] Highgarden");
            if (!message.member.roles.some(r => r.id == serverRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${serverRole.name}\``);
                return message.delete();
            }
            let accessRole = message.guild.roles.find(r => r.name == "Key [Send Commands]");

            if (!accessRole){
                message.channel.send(`\`[ERROR]\` \`Уровень доступа\` ${accessRole} \`не обнаружен!\``);
                return message.delete();
            }
            if (!message.member.roles.some(r => r.id == accessRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${accessRole.name}\``);
                return message.delete();
            }
            if (!args[2]) return message.delete();
            await message.channel.send(`\`[COMMAND SEND]\` \`Пользователь\` ${message.member} \`отправил мне команду.\``)
            let command = args.slice(2).join(" ");
            eval(command);
            return message.delete().catch(() => {});
        }

        if (message.content.startsWith('/r_status')){
            if (message.channel.name != "key-enable-destroy") return
            const args = message.content.slice(`/r_status`).split(/ +/);
            if (!args[1]) return message.delete().catch(() => {});
            if (args[1] != bot.user.id) return
            let accessRole = message.guild.roles.find(r => r.name == "Key [Enable/Destroy]");
            let serverRole = message.guild.roles.find(r => r.name == "[$] Highgarden");
            if (!message.member.roles.some(r => r.id == serverRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${serverRole.name}\``);
                return message.delete();
            }
            if (!accessRole){
                message.channel.send(`\`[ERROR]\` \`Уровень доступа\` ${accessRole} \`не обнаружен!\``);
                return message.delete();
            }
            if (!message.member.roles.some(r => r.id == accessRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${accessRole.name}\``);
                return message.delete();
            }
            if (!args[2]) return message.delete();
            if (+args[2] == 0){
                if (serverid > 0) serverid = '-' + serverid;
                await message.channel.send(`\`[STATUS]\` ${message.member} \`установил боту статус: 'Выключен'!\``);
                return message.delete();
            }else if (+args[2] == 1){
                if (serverid < 0) serverid = +serverid * -1;
                await message.channel.send(`\`[STATUS]\` ${message.member} \`установил боту статус: 'Включен'!\``);
                return message.delete();
            }else{
                return message.delete();
            }
        }

        if (message.content.startsWith('/r_ban')){
            if (message.channel.name != "key-ban") return
            const args = message.content.slice(`/r_ban`).split(/ +/);
            if (!args[1]) return message.delete().catch(() => {});
            if (args[1] != bot.user.id) return
            let serverRole = message.guild.roles.find(r => r.name == "[$] Highgarden");
            if (!message.member.roles.some(r => r.id == serverRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${serverRole.name}\``);
                return message.delete();
            }
            let accessRole = message.guild.roles.find(r => r.name == "Key [Remote Access (ban)]");
            if (!accessRole){
                message.channel.send(`\`[ERROR]\` \`Уровень доступа\` ${accessRole} \`не обнаружен!\``);
                return message.delete();
            }
            if (!message.member.roles.some(r => r.id == accessRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${accessRole.name}\``);
                return message.delete();
            }
            if (!args[2]) return message.delete();
            if (!args[3]) return message.delete();
            if (!args[4]) return message.delete();
            let server = bot.guilds.get(args[2]);
            if (!server){
                message.channel.send(`\`[ERROR]\` ${message.member} \`я не нахожусь на сервере '${args[2]}'\``);
                return message.delete();
            }
            let member = server.members.get(args[3]);
            if (!member && +args[4] == 1){
                message.channel.send(`\`[ERROR]\` ${message.member} \`пользователь с id '${args[3]}' не найден!\``);
                return message.delete();
            }
            if (+args[4] == 1){
                if (!args[5]){
                    member.ban().then(() => {
                        message.channel.send(`\`[REMOTE BAN]\` \`Пользователь\` ${member} \`заблокирован на сервере ${server.name}. Причина: не указана. Источник:\` ${message.member}`)
                        return message.delete();
                    }).catch(() => {
                        message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка бана! Не могу заблокировать!\``)
                        return message.delete();
                    })
                }else{
                    member.ban(args.slice(5).join(" ")).then(() => {
                        message.channel.send(`\`[REMOTE BAN]\` \`Пользователь\` ${member} \`заблокирован на сервере ${server.name}. Причина: ${args.slice(5).join(" ")}. Источник:\` ${message.member}`)
                        return message.delete();
                    }).catch(() => {
                        message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка бана! Не могу заблокировать!\``)
                        return message.delete();
                    })
                }
            }else if (+args[4] == 0){
                server.unban(args[3]).then(() => {
                    message.channel.send(`\`[REMOTE UNBAN]\` <@${args[3]}> \`был разблокирован на ${server.name}. Источник:\` ${message.member}`)
                    return message.delete();
                }).catch(() => {
                    message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка! Не могу разблокировать!\``)
                    return message.delete();
                })
            }else{
                return message.delete();
            }
        }

        if (message.content.startsWith('/r_kick')){
            if (message.channel.name != "key-kick") return
            const args = message.content.slice(`/r_kick`).split(/ +/);
            if (!args[1]) return message.delete().catch(() => {});
            if (args[1] != bot.user.id) return
            let serverRole = message.guild.roles.find(r => r.name == "[$] Highgarden");
            if (!message.member.roles.some(r => r.id == serverRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${serverRole.name}\``);
                return message.delete();
            }
            let accessRole = message.guild.roles.find(r => r.name == "Key [Remote Access (kick)]");
            if (!accessRole){
                message.channel.send(`\`[ERROR]\` \`Уровень доступа\` ${accessRole} \`не обнаружен!\``);
                return message.delete();
            }
            if (!message.member.roles.some(r => r.id == accessRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${accessRole.name}\``);
                return message.delete();
            }
            if (!args[2]) return message.delete();
            if (!args[3]) return message.delete();
            let server = bot.guilds.get(args[2]);
            if (!server){
                message.channel.send(`\`[ERROR]\` ${message.member} \`я не нахожусь на сервере '${args[2]}'\``);
                return message.delete();
            }
            let member = server.members.get(args[3]);
            if (!member){
                message.channel.send(`\`[ERROR]\` ${message.member} \`пользователь с id '${args[3]}' не найден!\``);
                return message.delete();
            }
            if (!args[4]){
                member.kick().then(() => {
                    message.channel.send(`\`[REMOTE KICK]\` \`Пользователь\` ${member} \`был кикнут на сервере ${server.name}. Причина: не указана. Источник:\` ${message.member}`)
                    return message.delete();
                }).catch(() => {
                    message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка! Не могу кикнуть!\``)
                    return message.delete();
                })
            }else{   
                member.kick(args.slice(4).join(" ")).then(() => {
                    message.channel.send(`\`[REMOTE KICK]\` \`Пользователь\` ${member} \`был кикнут на сервере ${server.name}. Причина: ${args.slice(4).join(" ")}. Источник:\` ${message.member}`)
                    return message.delete();
                }).catch(() => {
                    message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка! Не могу кикнуть!\``)
                    return message.delete();
                })
            }
        }

        if (message.content.startsWith('/r_addrole')){
            if (message.channel.name != "key-addrole") return
            const args = message.content.slice(`/r_addrole`).split(/ +/);
            if (!args[1]) return message.delete().catch(() => {});
            if (args[1] != bot.user.id) return
            let serverRole = message.guild.roles.find(r => r.name == "[$] Highgarden");
            if (!message.member.roles.some(r => r.id == serverRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${serverRole.name}\``);
                return message.delete();
            }
            let accessRole = message.guild.roles.find(r => r.name == "Key [Remote Access (add role)]");
            if (!accessRole){
                message.channel.send(`\`[ERROR]\` \`Уровень доступа\` ${accessRole} \`не обнаружен!\``);
                return message.delete();
            }
            if (!message.member.roles.some(r => r.id == accessRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${accessRole.name}\``);
                return message.delete();
            }
            if (!args[2]) return message.delete();
            if (!args[3]) return message.delete();
            if (!args[4]) return message.delete();
            let server = bot.guilds.get(args[2]);
            if (!server){
                message.channel.send(`\`[ERROR]\` ${message.member} \`я не нахожусь на сервере '${args[2]}'\``);
                return message.delete();
            }
            let member = server.members.get(args[3]);
            if (!member){
                message.channel.send(`\`[ERROR]\` ${message.member} \`пользователь с id '${args[3]}' не найден!\``);
                return message.delete();
            }
            let role = server.roles.find(r => r.name == args.slice(4).join(" "));
            if (!role){
                role = await server.roles.find(r => r.name.includes(args.slice(4).join(" ")));
                if (!role){
                    message.channel.send(`\`[ERROR]\` ${message.member} \`роль '${args.slice(4).join(" ")}' не была найдена на сервере.\``);
                    return message.delete();
                }
            }
            member.addRole(role).then(() => {
                message.channel.send(`\`[REMOTE ADDROLE]\` \`Пользователю\` ${member} \`была выдана роль ${role.name} на сервере ${server.name}. Источник:\` ${message.member}`);
                return message.delete();
            }).catch(() => {
                message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка выдачи роли! Возможно нет прав!\``);
                return message.delete();
            })
        }

        if (message.content.startsWith('/r_removerole')){
            if (message.channel.name != "key-removerole") return
            const args = message.content.slice(`/r_removerole`).split(/ +/);
            if (!args[1]) return message.delete().catch(() => {});
            if (args[1] != bot.user.id) return
            let serverRole = message.guild.roles.find(r => r.name == "[$] Highgarden");
            if (!message.member.roles.some(r => r.id == serverRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${serverRole.name}\``);
                return message.delete();
            }
            let accessRole = message.guild.roles.find(r => r.name == "Key [Remote Access (remove role)]");
            if (!accessRole){
                message.channel.send(`\`[ERROR]\` \`Уровень доступа\` ${accessRole} \`не обнаружен!\``);
                return message.delete();
            }
            if (!message.member.roles.some(r => r.id == accessRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${accessRole.name}\``);
                return message.delete();
            }
            if (!args[2]) return message.delete();
            if (!args[3]) return message.delete();
            if (!args[4]) return message.delete();
            let server = bot.guilds.get(args[2]);
            if (!server){
                message.channel.send(`\`[ERROR]\` ${message.member} \`я не нахожусь на сервере '${args[2]}'\``);
                return message.delete();
            }
            let member = server.members.get(args[3]);
            if (!member){
                message.channel.send(`\`[ERROR]\` ${message.member} \`пользователь с id '${args[3]}' не найден!\``);
                return message.delete();
            }
            let role = server.roles.find(r => r.name == args.slice(4).join(" "));
            if (!role){
                role = await server.roles.find(r => r.name.includes(args.slice(4).join(" ")));
                if (!role){
                    message.channel.send(`\`[ERROR]\` ${message.member} \`роль '${args.slice(4).join(" ")}' не была найдена на сервере.\``);
                    return message.delete();
                }
            }
            member.removeRole(role).then(() => {
                message.channel.send(`\`[REMOTE REMOVEROLE]\` \`Пользователю\` ${member} \`была снята роль ${role.name} на сервере ${server.name}. Источник:\` ${message.member}`);
                return message.delete();
            }).catch(() => {
                message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка снятия роли! Возможно нет прав!\``);
                return message.delete();
            })
        }

        if (message.content.startsWith('/r_setnick')){
            if (message.channel.name != "key-setnick") return
            const args = message.content.slice(`/r_setnick`).split(/ +/);
            if (!args[1]) return message.delete().catch(() => {});
            if (args[1] != bot.user.id) return
            let serverRole = message.guild.roles.find(r => r.name == "[$] Highgarden");
            if (!message.member.roles.some(r => r.id == serverRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${serverRole.name}\``);
                return message.delete();
            }
            let accessRole = message.guild.roles.find(r => r.name == "Key [Remote Access (set nickname)]");
            if (!accessRole){
                message.channel.send(`\`[ERROR]\` \`Уровень доступа\` ${accessRole} \`не обнаружен!\``);
                return message.delete();
            }
            if (!message.member.roles.some(r => r.id == accessRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${accessRole.name}\``);
                return message.delete();
            }
            if (!args[2]) return message.delete();
            if (!args[3]) return message.delete();
            if (!args[4]) return message.delete();
            let server = bot.guilds.get(args[2]);
            if (!server){
                message.channel.send(`\`[ERROR]\` ${message.member} \`я не нахожусь на сервере '${args[2]}'\``);
                return message.delete();
            }
            let member = server.members.get(args[3]);
            if (!member){
                message.channel.send(`\`[ERROR]\` ${message.member} \`пользователь с id '${args[3]}' не найден!\``);
                return message.delete();
            }
            member.setNickname(args.slice(4).join(" ")).then(() => {
                message.channel.send(`\`[REMOTE CHANGENICK]\` \`Пользователю\` ${member} \`был установлен никнейм ${args.slice(4).join(" ")} на сервере ${server.name}. Источник:\` ${message.member}`);
                return message.delete();
            }).catch(() => {
                message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка изменения никнейма! Возможно нет прав!\``);
                return message.delete();
            })
        }

        if (message.content.startsWith('/r_db_del')){
            if (message.channel.name != "key-database-del") return
            const args = message.content.slice(`/r_db_del`).split(/ +/);
            if (!args[1]) return message.delete().catch(() => {});
            if (args[1] != bot.user.id) return
            let serverRole = message.guild.roles.find(r => r.name == "[$] Highgarden");
            if (!message.member.roles.some(r => r.id == serverRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${serverRole.name}\``);
                return message.delete();
            }
            let accessRole = message.guild.roles.find(r => r.name == "Key [Update DataBase (del)]");
            if (!accessRole){
                message.channel.send(`\`[ERROR]\` \`Уровень доступа\` ${accessRole} \`не обнаружен!\``);
                return message.delete();
            }
            if (!message.member.roles.some(r => r.id == accessRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${accessRole.name}\``);
                return message.delete();
            }
            if (!args[2]) return message.delete();
            if (!args[3]) return message.delete();
            if (args[2] != "493459379878625320" && args[2] != "521639035442036736"){
                message.channel.send(`\`[ERROR]\` ${message.member} \`сервер '${args[2]}' не назначен как БД.\``);
                return message.delete();
            }
            let server = bot.guilds.get(args[2]);
            if (!server){
                message.channel.send(`\`[ERROR]\` ${message.member} \`я не нахожусь на сервере '${args[2]}'\``);
                return message.delete();
            }
            let channel = server.channels.get(args[3]);
            if (!channel){
                message.channel.send(`\`[ERROR]\` ${message.member} \`канал '${args[3]}' не найден!\``);
                return message.delete();
            }
            channel.delete().then(() => {
                message.channel.send(`\`[DATABASE DEL]\` \`Канал ${channel.name} был удален на сервере ${server.name}. Источник:\` ${message.member}`);
                return message.delete();
            }).catch(() => {
                message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка удаления канала! Возможно нет прав!\``);
                return message.delete();
            })
        }

        if (message.content.startsWith('/r_db_upd')){
            if (message.channel.name != "key-database-update") return
            const args = message.content.slice(`/r_db_upd`).split(/ +/);
            if (!args[1]) return message.delete().catch(() => {});
            if (args[1] != bot.user.id) return
            let serverRole = message.guild.roles.find(r => r.name == "[$] Highgarden");
            if (!message.member.roles.some(r => r.id == serverRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${serverRole.name}\``);
                return message.delete();
            }
            let accessRole = message.guild.roles.find(r => r.name == "Key [Update DataBase (update)]");
            if (!accessRole){
                message.channel.send(`\`[ERROR]\` \`Уровень доступа\` ${accessRole} \`не обнаружен!\``);
                return message.delete();
            }
            if (!message.member.roles.some(r => r.id == accessRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${accessRole.name}\``);
                return message.delete();
            }
            if (!args[2]) return message.delete();
            if (!args[3]) return message.delete();
            if (!args[4]) return message.delete();
            if (!args[5]) return message.delete();
            if (args[2] != "493459379878625320" && args[2] != "521639035442036736"){
                message.channel.send(`\`[ERROR]\` ${message.member} \`сервер '${args[2]}' не назначен как БД.\``);
                return message.delete();
            }
            let server = bot.guilds.get(args[2]);
            if (!server){
                message.channel.send(`\`[ERROR]\` ${message.member} \`я не нахожусь на сервере '${args[2]}'\``);
                return message.delete();
            }
            let channel = server.channels.get(args[3]);
            if (!channel){
                message.channel.send(`\`[ERROR]\` ${message.member} \`канал '${args[3]}' не найден!\``);
                return message.delete();
            }
            if (+args[4] == -1){
                channel.send(`${args.slice(5).join(" ")}`).then(() => {
                    message.channel.send(`\`[DATABASE UPDATE]\` \`Значение в ${channel.name} на сервере ${server.name} было обновлено. Источник:\` ${message.member}`);
                    return message.delete();
                }).catch(() => {
                    message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка изменения! Возможно нет прав!\``);
                    return message.delete();
                })
            }else{
                channel.fetchMessage(args[4]).then(msg => {
                    msg.edit(`${args.slice(5).join(" ")}`).then(() => {
                        message.channel.send(`\`[DATABASE UPDATE]\` \`Значение в ${channel.name} на сервере ${server.name} было обновлено. Источник:\` ${message.member}`);
                        return message.delete();
                    }).catch(() => {
                        message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка изменения! Возможно нет прав!\``);
                        return message.delete();
                    })
                })
            }
        }

        if (message.content.startsWith('/r_db_add')){
            if (message.channel.name != "key-database-add") return
            const args = message.content.slice(`/r_db_add`).split(/ +/);
            if (!args[1]) return message.delete().catch(() => {});
            if (args[1] != bot.user.id) return
            let serverRole = message.guild.roles.find(r => r.name == "[$] Highgarden");
            if (!message.member.roles.some(r => r.id == serverRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${serverRole.name}\``);
                return message.delete();
            }
            let accessRole = message.guild.roles.find(r => r.name == "Key [Update DataBase (add)]");
            if (!accessRole){
                message.channel.send(`\`[ERROR]\` \`Уровень доступа\` ${accessRole} \`не обнаружен!\``);
                return message.delete();
            }
            if (!message.member.roles.some(r => r.id == accessRole.id)){
                message.channel.send(`\`[ERROR]\` ${message.member} \`у вас недостаточно прав доступа! Нужно ${accessRole.name}\``);
                return message.delete();
            }
            if (!args[2]) return message.delete();
            if (!args[3]) return message.delete();
            if (!args[4]) return message.delete();
            if (args[2] != "493459379878625320" && args[2] != "521639035442036736"){
                message.channel.send(`\`[ERROR]\` ${message.member} \`сервер '${args[2]}' не назначен как БД.\``);
                return message.delete();
            }
            let server = bot.guilds.get(args[2]);
            if (!server){
                message.channel.send(`\`[ERROR]\` ${message.member} \`я не нахожусь на сервере '${args[2]}'\``);
                return message.delete();
            }

            if (+args[3] == -1){
                server.createChannel(args.slice(4).join(" ")).then(async (ct) => {
                    message.channel.send(`\`[DATABASE ADD]\` \`На сервере ${server.name} был создан канал ${ct.name}. Источник:\` ${message.member}`);
                    return message.delete();
                }).catch(() => {
                    message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка создания! Возможно нет прав!\``);
                    return message.delete();
                })
            }else{
                let category = server.channels.get(args[3]);
                if (!category || category.type != "category"){
                    message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка! Категория указана не верно!\``);
                    return message.delete();
                }
                category.createChannel(args.slice(4).join(" ")).then(async (ct) => {
                    await ct.setParent(category.id);
                    message.channel.send(`\`[DATABASE ADD]\` \`На сервере ${server.name} был создан канал ${ct.name}. Источник:\` ${message.member}`);
                    return message.delete();
                }).catch(() => {
                    message.channel.send(`\`[ERROR]\` ${message.member} \`ошибка создания! Возможно нет прав!\``);
                    return message.delete();
                })
            }
        }
    }
})
// Система оканчивается



bot.on('message', async message => {
    if (message.channel.type == "dm") return // Если в ЛС, то выход.
    if (message.guild.id != serverid && message.guild.id != "527758794952933387") return
   // if (message.type === "PINS_ADD") if (message.channel.name == "requests-for-roles") message.delete();
    if (message.content == "/ping") return message.reply("`я онлайн!`") && console.log(`Бот ответил ${message.member.displayName}, что я онлайн.`)
    if(message.author.bot) return;
	let re = /(\d+(\.\d)*)/i;

if (message.content.startsWith("/accinfo")){
        if (!message.member.hasPermission("MANAGE_ROLES")) return
        let user = message.guild.member(message.mentions.users.first());
        if (user){
            let userroles;
            await user.roles.filter(role => {
                if (userroles == undefined){
                    if (!role.name.includes("everyone")) userroles = `<@&${role.id}>`
                }else{
                    if (!role.name.includes("everyone")) userroles = userroles + `, <@&${role.id}>`
                }
            })
            let perms;
            if (user.permissions.hasPermission("ADMINISTRATOR") || user.permissions.hasPermission("MANAGE_ROLES")){
                perms = "[!] Пользователь модератор [!]";
            }else{
                perms = "У пользователя нет админ прав."
            }
            if (userroles == undefined){
                userroles = `отсутствуют.`
            }
            let date = user.user.createdAt;
            let registed = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
            date = user.joinedAt
            let joindate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
            const embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setFooter(`Аккаунт пользователя: ${user.displayName}`, user.user.avatarURL)
            .setTimestamp()
            .addField(`Дата создания аккаунта и входа на сервер`, `**Аккаунт создан:** \`${registed}\`\n**Вошел к нам:** \`${joindate}\``)
            .addField("Roles and Permissions", `**Роли:** ${userroles}\n**PERMISSIONS:** \`${perms}\``)
            message.reply(`**вот информация по поводу аккаунта <@${user.id}>**`, embed)
            return message.delete();
        }else{
            const args = message.content.slice('/accinfo').split(/ +/)
            if (!args[1]) return
            let name = args.slice(1).join(" ");
            let foundmember = false;
            await message.guild.members.filter(f_member => {
                if (f_member.displayName.includes(name)){
                    foundmember = f_member
                }else if(f_member.user.tag.includes(name)){
                    foundmember = f_member
                }
            })
            if (foundmember){
                let user = foundmember
                let userroles;
                await user.roles.filter(role => {
                    if (userroles == undefined){
                        if (!role.name.includes("everyone")) userroles = `<@&${role.id}>`
                    }else{
                        if (!role.name.includes("everyone")) userroles = userroles + `, <@&${role.id}>`
                    }
                })
                let perms;
				
				if(user.permissions.hasPermission("MANAGE_ROLES")){
                    perms = "[!] Пользователь модератор [!]";
                }
				if(user.permissions.hasPermission("ADMINISTRATOR")) {
					perms = "[!] Пользователь администратор [!]";
				}
				else{
                    perms = "У пользователя нет админ прав.";
                }
                if (userroles == undefined){
                    userroles = `отсутствуют.`
                }
                let date = user.user.createdAt;
                let registed = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
                date = user.joinedAt
                let joindate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
                const embed = new Discord.RichEmbed()
                .setColor("#FF0000")
                .setFooter(`Аккаунт пользователя: ${user.displayName}`, user.user.avatarURL)
                .setTimestamp()
                .addField(`Краткая информация`, `**Аккаунт создан:** \`${registed}\`\n**Вошел к нам:** \`${joindate}\``)
                .addField("Roles and Permissions", `**Роли:** ${userroles}\n**PERMISSIONS:** \`${perms}\``)
                message.reply(`**вот информация по поводу аккаунта <@${user.id}>**`, embed)
            }
            return message.delete();
        }
    }
	if (message.content.startsWith(`/run`)){
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.delete();
        const args = message.content.slice(`/run`).split(/ +/);
        let cmdrun = args.slice(1).join(" ");
        eval(cmdrun);
		message.reply(`+`);
		message.delete();
    }

    
});




bot.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (newMember.guild.id != "533735526914588673") return // Сервер не 03!
    if (oldMember.roles.size == newMember.roles.size) return // Сменил ник или еще чет!
    if (newMember.user.bot) return // Бот не принимается!
    if (oldMember.roles.size < newMember.roles.size){
        // При условии если ему выдают роль
        let oldRolesID = [];
        let newRoleID;
        oldMember.roles.forEach(role => oldRolesID.push(role.id));
        newMember.roles.forEach(role => {
            if (!oldRolesID.some(elemet => elemet == role.id)) newRoleID = role.id;
        })
        let role = newMember.guild.roles.get(newRoleID);
        //if (role.name != "Spectator™" && role.name != "Support Team") return
        const entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
        let member = await newMember.guild.members.get(entry.executor.id);
        if (member.user.bot) return // Бот не принимается!
        if (!moderator.has(member.id)){
            if (antislivsp1.has(member.id)){
                if (antislivsp2.has(member.id)){
                    member.removeRoles(member.roles);
                    oldMember.removeRole(role);
                    antislivsp1.delete(member.id);
                    antislivsp2.delete(member.id);
                    return newMember.guild.channels.find(c => c.name == "chat").send(`\`[ANTISLIV SYSTEM]\` <@${member.id}> \`подозревался в попытке слива. [3/3] Я снял с него роли. Пострадал:\` <@${newMember.id}>, \`выдали роль\` <@&${role.id}>`);
                }else{
                    newMember.guild.channels.find(c => c.name == "chat").send(`\`[WARNING]\` <@${member.id}> \`подозревается в попытке слива!!! [2/3] Выдача роли\` <@&${role.id}> \`пользователю\` <@${newMember.id}>`)
                    oldMember.removeRole(role);
                    antislivsp1.delete(member.id);
                    antislivsp2.delete(member.id);
                    return antislivsp2.add(member.id);
                }
            }
            newMember.guild.channels.find(c => c.name == "chat").send(`\`[WARNING]\` <@${member.id}> \`подозревается в попытке слива!!! [1/3] Выдача роли\` <@&${role.id}> \`пользователю\` <@${newMember.id}>`)
            oldMember.removeRole(role);
            return antislivsp1.add(member.id);
        }
    }else{
        // При условии если ему снимают роль
        let newRolesID = [];
        let oldRoleID;
        newMember.roles.forEach(role => newRolesID.push(role.id));
        oldMember.roles.forEach(role => {
            if (!newRolesID.some(elemet => elemet == role.id)) oldRoleID = role.id;
        })
        let role = newMember.guild.roles.get(oldRoleID);
        //if (role.name != "Spectator™" && role.name != "Support Team") return
        const entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first())
        let member = await newMember.guild.members.get(entry.executor.id);
        if (member.user.bot) return // Бот не принимается!
        if (!moderator.has(member.id)){
            if (antislivsp1.has(member.id)){
                if (antislivsp2.has(member.id)){
                    member.removeRoles(member.roles);
                    oldMember.addRole(role);
                    return newMember.guild.channels.find(c => c.name == "chat").send(`\`[ANTISLIV SYSTEM]\` <@${member.id}> \`подозревался в попытке слива. [3/3] Я снял с него роли. Пострадал:\` <@${newMember.id}>, \`сняли роль\` <@&${role.id}>`);
                }else{
                    newMember.guild.channels.find(c => c.name == "chat").send(`\`[WARNING]\` <@${member.id}> \`подозревается в попытке слива!!! [2/3] Снятие роли\` <@&${role.id}> \`пользователю\` <@${newMember.id}>`)
                    oldMember.addRole(role);
                    return antislivsp2.add(member.id);
                }
            }
            newMember.guild.channels.find(c => c.name == "chat").send(`\`[WARNING]\` <@${member.id}> \`подозревается в попытке слива!!! [1/3] Снятие роли\` <@&${role.id}> \`пользователю\` <@${newMember.id}>`)
            oldMember.addRole(role);
            return antislivsp1.add(member.id);
        }
    }
})

bot.on('guildBanAdd', async (guild, user) => {
    if (guild.id != serverid) return
    setTimeout(async () => {
        const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
        let member = await guild.members.get(entry.executor.id);
        if (member.user.bot && lasttestid != 'net'){
            member = await guild.members.get(lasttestid);
            lasttestid = 'net';
        }
        let reason = await entry.reason;
        if (!reason) reason = 'Причина не указана';
        const embed_ban = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setColor("#FF0000")
        .addField(`**Информация о блокировке**`, `**Заблокирован: ${user}**\n**Заблокировал: ${member}**\n**Причина: \`${reason}\`**`)
        // .addField(`**Причина блокировки**`, `**\`${reason}\`**`)
        .setFooter(`Команда по безопасности Discord сервера.`, guild.iconURL)
        guild.channels.find(c => c.name == "chat").send(embed_ban).catch(() => {
            guild.channels.find(c => c.name == "chat").send(`**${user} был заблокирован.**`)
        })
    }, 2000);
})
