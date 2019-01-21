//const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const serverid = '533735526914588673';
const dataserver = '535877742449917952';
//const backup_serverid = "533735526914588673";

let antislivsp1 = new Set();
let antislivsp2 = new Set();
const moderator = new Set();
moderator.add("435106258463227905");
	let lasttestid = 'net';
let levelhigh = 0;

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
            if (args[2] != "527851904936706067" && args[2] != "535877742449917952"){
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
	
	if (message.content == '/reset_ddos'){
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(`нет прав.`)
        levelhigh = 0;
        message.channel.send(`\`[SYSTEM]\` \`Уровень опасности сервера был установлен на 0. Источник: ${message.member.displayName}\``)
    }

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
	if (message.channel.name == "support"){
    if (message.member.bot) return message.delete();
    if (support_cooldown.has(message.author.id)) {
        return message.delete();
    }
    support_cooldown.add(message.author.id);
    setTimeout(() => {
        if (support_cooldown.has(message.author.id)) support_cooldown.delete(message.author.id);
    }, 300000);
    let id_mm;
    let rep_message;
    let db_server = bot.guilds.find(g => g.id == "535877742449917952");
    let db_channel = db_server.channels.find(c => c.name == "config");
    await db_channel.fetchMessages().then(async messages => {
        let db_msg = messages.find(m => m.content.startsWith(`MESSAGEID:`));
        if (db_msg){
            id_mm = db_msg.content.match(re)[0]
            await message.channel.fetchMessages().then(async messagestwo => {
                rep_message = await messagestwo.find(m => m.id == id_mm);
            });
        }
    });
    if (!rep_message){
        await message.channel.send(`` +
        `**Приветствую! Вы попали в канал поддержки сервера Highgarden Discord!**\n` +
        `**Тут Вы сможете задать вопрос модераторам или администраторам нашего дискорда!**\n\n` +
        `**Количество вопросов за все время: 0**\n` +
        `**Необработанных модераторами: 0**\n` +
        `**Вопросы на рассмотрении: 0**\n` +
        `**Закрытых: 0**`).then(async msg => {
            db_channel.send(`MESSAGEID: ${msg.id}`)
            rep_message = await message.channel.fetchMessage(msg.id);
        });
    }
    let info_rep = [];
    info_rep.push(rep_message.content.split('\n')[3].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[4].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[5].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[6].match(re)[0]);
//const imageemb = new Discord.RichEmbed()
//.setAuthor(`© 2018 Risbot Company™`, `https://pp.userapi.com/c849132/v849132806/b35ca/2RD_7K2ysns.jpg?ava=1`, "https://vk.com/risbot")
    //.setImage("https://imgur.com/LKDbJeM.gif")
    rep_message.edit(`` +
        `**Приветствую! Вы попали в канал поддержки сервера Highgarden Discord!**\n` +
        `**Тут Вы сможете задать вопрос модераторам или администраторам нашего дискорда!**\n\n` +
        `**Количество вопросов за все время: ${+info_rep[0] + 1}**\n` +
        `**Необработанных модераторами: ${+info_rep[1] + 1}**\n` +
        `**Вопросы на рассмотрении: ${info_rep[2]}**\n` +
        `**Закрытых: ${info_rep[3]}**`)
    let s_category = message.guild.channels.find(c => c.name == "Активные жалобы");
    if (!s_category) return message.delete(3000);
    await message.guild.createChannel(`ticket-${+info_rep[0] + 1}`).then(async channel => {
        message.delete();    
        await channel.setParent(s_category.id);
        await channel.setTopic('Жалоба в обработке.')
        let moderator_role = await message.guild.roles.find(r => r.name == '🔧 Support Team™');
        await channel.overwritePermissions(moderator_role, {
        // GENERAL PERMISSIONS
        CREATE_INSTANT_INVITE: false,
        MANAGE_CHANNELS: false,
        MANAGE_ROLES: false,
        MANAGE_WEBHOOKS: false,
        // TEXT PERMISSIONS
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        SEND_TTS_MESSAGES: false,
        MANAGE_MESSAGES: false,
        EMBED_LINKS: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
        MENTION_EVERYONE: false,
        USE_EXTERNAL_EMOJIS: false,
        ADD_REACTIONS: false,
        })  
        await channel.overwritePermissions(message.member, {
        // GENERAL PERMISSIONS
        CREATE_INSTANT_INVITE: false,
        MANAGE_CHANNELS: false,
        MANAGE_ROLES: false,
        MANAGE_WEBHOOKS: false,
        // TEXT PERMISSIONS
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        SEND_TTS_MESSAGES: false,
        MANAGE_MESSAGES: false,
        EMBED_LINKS: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
        MENTION_EVERYONE: false,
        USE_EXTERNAL_EMOJIS: false,
        ADD_REACTIONS: false,
        })  
        await channel.overwritePermissions(message.guild.roles.find(r => r.name == "@everyone"), {
        // GENERAL PERMISSIONS
        CREATE_INSTANT_INVITE: false,
        MANAGE_CHANNELS: false,
        MANAGE_ROLES: false,
        MANAGE_WEBHOOKS: false,
        // TEXT PERMISSIONS
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        SEND_TTS_MESSAGES: false,
        MANAGE_MESSAGES: false,
        EMBED_LINKS: false,
        ATTACH_FILES: false,
        READ_MESSAGE_HISTORY: false,
        MENTION_EVERYONE: false,
        USE_EXTERNAL_EMOJIS: false,
        ADD_REACTIONS: false,
        })  
        channel.send(`<@${message.author.id}> \`для команды поддержки\` <@&${moderator_role.id}>`, {embed: {
        color: 3447003,
        title: "Обращение к поддержке Discord",
        fields: [{
            name: "Отправитель",
            value: `**Пользователь:** <@${message.author.id}>`,
        },{
            name: "Суть обращения",
            value: `${message.content}`,
        }]
        }});
        let sp_chat_get = message.guild.channels.find(c => c.name == "reports-log");
        await sp_chat_get.send(`\`[CREATE]\` <@${message.author.id}> \`создал обращение к поддержке:\` <#${channel.id}>`);
        message.channel.send(`<@${message.author.id}>, \`обращение составлено. Нажмите на\` <#${channel.id}>`).then(msg => msg.delete(15000));
    });
	}
	if (message.content.toLowerCase().startsWith(`/bug`)){
    const args = message.content.slice('/bug').split(/ +/);
    if (!args[1]){
        message.reply(`\`привет! Для отправки отчета об ошибках используй: /bug [текст]\``).then(msg => msg.delete(15000));
        return message.delete()
    }
    let bugreport = args.slice(1).join(" ");
    if (bugreport.length < 5 || bugreport.length > 200){
        message.reply(`\`нельзя отправить запрос с длинной меньше 5 или больше 200 символов!\``).then(msg => msg.delete(15000));
        return message.delete()
    }

let nickname = message.member.displayName;
const embed = new Discord.RichEmbed()
.setTitle("`Discord » Репорт`")
.setColor("#483D8B")
.addField("Аккаунт", `\`Пользователь:\` <@${message.author.id}>`, true)
.addField("Никнейм", `\`Ник:\` ${nickname}`, true)
.addField("Отправлено с канала", `<#${message.channel.id}>`)
.addField("Суть обращения", bugreport)
.setFooter("© Support Team | by Kory_McGregor")
.setTimestamp()
let server_cip = bot.guilds.find(g => g.id == "527851904936706067");
let bug_tracker = server_cip.channels.find(c => c.name == "bug-tracker");
/*bug_tracker.send(embed).then(async msgsen => {
    await msgsen.react('✔')
    await msgsen.react('❌')
    await msgsen.pin();
})*/
bug_tracker.send("test.ok");
}
if (message.content == '/hold'){
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.delete();
    if (!message.channel.name.startsWith('ticket-')) return message.delete();
    if (message.channel.topic == 'Жалоба закрыта.' || message.channel.topic == 'Жалоба на рассмотрении.') return message.delete();
    let memberid = 'не найден';
    await message.channel.permissionOverwrites.forEach(async perm => {
        if (perm.type == `member`){
            memberid = await perm.id;
        }
    });
    let rep_message;
    let db_server = bot.guilds.find(g => g.id == dataserver);
    let db_channel = db_server.channels.find(c => c.name == "config");
    await db_channel.fetchMessages().then(async messages => {
        let db_msg = messages.find(m => m.content.startsWith(`MESSAGEID:`));
        if (db_msg){
            id_mm = db_msg.content.match(re)[0]
            let ticket_channel = message.guild.channels.find(c => c.name == 'support');
            await ticket_channel.fetchMessages().then(async messagestwo => {
                rep_message = await messagestwo.find(m => m.id == id_mm);
            });
        }
    });
    if (!rep_message) return message.delete();
    let info_rep = [];
    info_rep.push(rep_message.content.split('\n')[3].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[4].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[5].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[6].match(re)[0]);
//const imageemb = new Discord.RichEmbed()
//.setAuthor(`© 2018 Risbot Company™`, `https://pp.userapi.com/c849132/v849132806/b35ca/2RD_7K2ysns.jpg?ava=1`, "https://vk.com/risbot")
    //.setImage("https://imgur.com/LKDbJeM.gif")
    rep_message.edit(`` +
    `**Приветствую! Вы попали в канал поддержки сервера Highgarden Discord!**\n` +
    `**Тут Вы сможете задать вопрос модераторам или администраторам нашего дискорда!**\n\n` +
    `**Количество вопросов за все время: ${info_rep[0]}**\n` +
    `**Необработанных модераторами: ${+info_rep[1] - 1}**\n` +
    `**Вопросы на рассмотрении: ${+info_rep[2] + 1}**\n` +
    `**Закрытых: ${info_rep[3]}**`)
    let s_category = message.guild.channels.find(c => c.name == "Жалобы на рассмотрении");
    if (!s_category) return message.delete(3000);
    await message.channel.setParent(s_category.id);
    let sp_chat_get = message.guild.channels.find(c => c.name == "reports-log");
    message.channel.setTopic('Жалоба на рассмотрении.')
    if (memberid != 'не найден'){
        message.channel.send(`\`[STATUS]\` <@${memberid}>, \`вашей жалобе был установлен статус: 'На рассмотрении'. Источник: ${message.member.displayName}\``);
        sp_chat_get.send(`\`[HOLD]\` \`Модератор ${message.member.displayName} установил жалобе\` <#${message.channel.id}> \`статус 'На рассмотрении'.\``);
    }else{
        message.channel.send(`\`[STATUS]\` \`Данной жалобе был установлен статус: 'На рассмотрении'. Источник: ${message.member.displayName}\``);
        sp_chat_get.send(`\`[HOLD]\` \`Модератор ${message.member.displayName} установил жалобе\` <#${message.channel.id}> \`статус 'На рассмотрении'.\``);
    }
    message.delete();
}
if (message.content == '/active'){
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.delete();
    if (!message.channel.name.startsWith('ticket-')) return message.delete();
    if (message.channel.topic == 'Жалоба закрыта.' || message.channel.topic != 'Жалоба на рассмотрении.') return message.delete();
    let memberid = 'не найден';
    await message.channel.permissionOverwrites.forEach(async perm => {
        if (perm.type == `member`){
            memberid = await perm.id;
        }
    });
    let rep_message;
    let db_server = bot.guilds.find(g => g.id == dataserver);
    let db_channel = db_server.channels.find(c => c.name == "config");
    await db_channel.fetchMessages().then(async messages => {
        let db_msg = messages.find(m => m.content.startsWith(`MESSAGEID:`));
        if (db_msg){
            id_mm = db_msg.content.match(re)[0]
            let ticket_channel = message.guild.channels.find(c => c.name == 'support');
            await ticket_channel.fetchMessages().then(async messagestwo => {
                rep_message = await messagestwo.find(m => m.id == id_mm);
            });
        }
    });
    if (!rep_message) return message.delete();
    let info_rep = [];
    info_rep.push(rep_message.content.split('\n')[3].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[4].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[5].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[6].match(re)[0]);
//const imageemb = new Discord.RichEmbed()
//.setAuthor(`© 2018 Risbot Company™`, `https://pp.userapi.com/c849132/v849132806/b35ca/2RD_7K2ysns.jpg?ava=1`, "https://vk.com/risbot")
    //.setImage("https://imgur.com/LKDbJeM.gif")
    rep_message.edit(`` +
    `**Приветствую! Вы попали в канал поддержки сервера Highgarden Discord!**\n` +
    `**Тут Вы сможете задать вопрос модераторам или администраторам нашего дискорда!**\n\n` +
        `**Количество вопросов за все время: ${info_rep[0]}**\n` +
        `**Необработанных модераторами: ${+info_rep[1] + 1}**\n` +
        `**Вопросы на рассмотрении: ${+info_rep[2] - 1}**\n` +
        `**Закрытых: ${info_rep[3]}**`)
    let s_category = message.guild.channels.find(c => c.name == "Активные жалобы");
    if (!s_category) return message.delete(3000);
    await message.channel.setParent(s_category.id);
    let sp_chat_get = message.guild.channels.find(c => c.name == "reports-log");
    message.channel.setTopic('Жалоба в обработке.');
    if (memberid != 'не найден'){
        message.channel.send(`\`[STATUS]\` <@${memberid}>, \`вашей жалобе был установлен статус: 'В обработке'. Источник: ${message.member.displayName}\``);
    }else{
        message.channel.send(`\`[STATUS]\` \`Данной жалобе был установлен статус: 'В обработке'. Источник: ${message.member.displayName}\``);
    }
    sp_chat_get.send(`\`[UNWAIT]\` \`Модератор ${message.member.displayName} убрал жалобе\` <#${message.channel.id}> \`статус 'На рассмотрении'.\``);
    message.delete();
}
 if (message.content == '/close'){
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.delete();
    if (!message.channel.name.startsWith('ticket-')) return message.delete();
    if (message.channel.topic == 'Жалоба закрыта.') return message.delete();
    let full_support = false;
    let s_category = message.guild.channels.find(c => c.name == "Корзина");
    if (!s_category) return message.delete(3000);
    await message.channel.setParent(s_category.id).catch(err => {
        full_support = true;
    });
    if (full_support){
        message.reply(`\`корзина заполнена! Повторите попытку чуть позже!\``).then(msg => msg.delete(12000));
        return message.delete();  
    }
    let memberid = 'не найден';
    await message.channel.permissionOverwrites.forEach(async perm => {
        if (perm.type == `member`){
        memberid = await perm.id;
        }
    });
    let rep_message;
    let db_server = bot.guilds.find(g => g.id == dataserver);
    let db_channel = db_server.channels.find(c => c.name == "config");
    await db_channel.fetchMessages().then(async messages => {
        let db_msg = messages.find(m => m.content.startsWith(`MESSAGEID:`));
        if (db_msg){
            id_mm = db_msg.content.match(re)[0]
            let ticket_channel = message.guild.channels.find(c => c.name == 'support');
            await ticket_channel.fetchMessages().then(async messagestwo => {
                rep_message = await messagestwo.find(m => m.id == id_mm);
            });
        }
    });
    if (!rep_message) return message.delete();
    let info_rep = [];
    info_rep.push(rep_message.content.split('\n')[3].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[4].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[5].match(re)[0]);
    info_rep.push(rep_message.content.split('\n')[6].match(re)[0]);
//let imageemb = new Discord.RichEmbed()
//.setAuthor(`© 2018 Risbot Company™`, `https://pp.userapi.com/c849132/v849132806/b35ca/2RD_7K2ysns.jpg?ava=1`, "https://vk.com/risbot")
    //.setImage("https://imgur.com/LKDbJeM.gif");
    if (message.channel.topic == 'Жалоба на рассмотрении.'){
        rep_message.edit(`` +
    `**Приветствую! Вы попали в канал поддержки сервера Highgarden Discord!**\n` +
    `**Тут Вы сможете задать вопрос модераторам или администраторам нашего дискорда!**\n\n` +
        `**Количество вопросов за все время: ${info_rep[0]}**\n` +
        `**Необработанных модераторами: ${info_rep[1]}**\n` +
        `**Вопросы на рассмотрении: ${+info_rep[2] - 1}**\n` +
        `**Закрытых: ${+info_rep[3] + 1}**`)
    }else{
        rep_message.edit(`` +
    `**Приветствую! Вы попали в канал поддержки сервера Highgarden Discord!**\n` +
    `**Тут Вы сможете задать вопрос модераторам или администраторам нашего дискорда!**\n\n` +
        `**Количество вопросов за все время: ${info_rep[0]}**\n` +
        `**Необработанных модераторами: ${+info_rep[1] - 1}**\n` +
        `**Вопросы на рассмотрении: ${info_rep[2]}**\n` +
        `**Закрытых: ${+info_rep[3] + 1}**`)
    }
    if (memberid != 'не найден'){
        await message.channel.overwritePermissions(message.guild.members.find(m => m.id == memberid), {
            // GENERAL PERMISSIONS
            CREATE_INSTANT_INVITE: false,
            MANAGE_CHANNELS: false,
            MANAGE_ROLES: false,
            MANAGE_WEBHOOKS: false,
            // TEXT PERMISSIONS
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false,
            SEND_TTS_MESSAGES: false,
            MANAGE_MESSAGES: false,
            EMBED_LINKS: false,
            ATTACH_FILES: false,
            READ_MESSAGE_HISTORY: true,
            MENTION_EVERYONE: false,
            USE_EXTERNAL_EMOJIS: false,
            ADD_REACTIONS: false,
        }) 
    }
    let sp_chat_get = message.guild.channels.find(c => c.name == "reports-log");
    message.channel.setTopic('Жалоба закрыта.');
    if (memberid != 'не найден'){
        message.channel.send(`\`[STATUS]\` <@${memberid}>, \`вашей жалобе был установлен статус: 'Закрыта'. Источник: ${message.member.displayName}\``);
    }else{
        message.channel.send(`\`[STATUS]\` \`Данной жалобе был установлен статус: 'Закрыта'. Источник: ${message.member.displayName}\``);
    }
    sp_chat_get.send(`\`[CLOSE]\` \`Модератор ${message.member.displayName} установил жалобе\` <#${message.channel.id}> \`статус 'Закрыта'.\``);
    message.delete();
}
if (message.content.startsWith("/setup")){
        let level_mod = 0;
        let db_server = bot.guilds.find(g => g.id == dataserver);
        let acc_creator = db_server.channels.find(c => c.name == message.author.id);
        if (acc_creator){
            await acc_creator.fetchMessages({limit: 1}).then(async messages => {
                if (messages.size == 1){
                    messages.forEach(async sacc => {
			let str = sacc.content;
                        level_mod = +str.split('\n')[0].match(re)[0];
                    });
                }
            });
        }
        if (!message.member.hasPermission("ADMINISTRATOR") && +level_mod < 4) return
        let user = message.guild.member(message.mentions.users.first());
        if (!user){
            message.reply(`\`пользователь не указан! '/setup [user] [уровень]'\``)
            return message.delete();
        }
        const args = message.content.slice(`/setup`).split(/ +/);
        if (!args[2]){
            message.reply(`\`укажи число! '/setup [user] [уровень]'\``)
            return message.delete();
        }
        if (typeof +args[2] != "number") {
            message.reply(`\`укажи число! '/setup [user] [уровень]'\``)
            return message.delete();
        }
        /*
	[0] - No Moderator
	[1] - Moderator Discord
	[2] - Support Team 
	[3] - Technical Moderator
	[4] - Technical Support
	[5] - Creator of server
        */
	let textlvl;
	if(args[2] == 0) textlvl = "No Moderator";
	if(args[2] == 1) textlvl = "Moderator Discord";
	if(args[2] == 2) textlvl = "Support Team";
	if(args[2] == 3) textlvl = "Technical Moderator";
	if(args[2] == 4) textlvl = "Technical Support";
        if (args[2] > 4 || args[2] < 0){
            message.reply(`\`укажи верный уровень доступа! '/setup [user] [уровень (0-2)]'\``)
            return message.delete();
        }
	if (level_mod == 4 && +args[2] == 3)
	{
	    message.reply(`\`Вы не можете назначить модератора тех.поддержки '/setup [user] [уровень (0-4) не равняется 3]'\``)
            return message.delete();
	}
	if (!message.member.hasPermission("ADMINISTRATOR") && +level_mod <= +args[2]){
            message.reply(`\`ты не можешь выдавать уровень равный твоему или выше '/setup [user] [уровень (0-2)]'\``)
            return message.delete();
	}
        let acc = db_server.channels.find(c => c.name == user.id);
        if (!acc){
            await db_server.createChannel(user.id).then(async chan => {
		await chan.setTopic(`<@${user.id}> - ${user.displayName}`);
                acc = chan;
            });
        }

        await acc.fetchMessages({limit: 1}).then(async messages => {
            if (messages.size == 1){
                messages.forEach(async sacc => {
                    let str = sacc.content;
                    let moderation_level = str.split('\n')[0].match(re)[0];
                    let moderation_warns = str.split('\n')[1].match(re)[0];
                    let user_warns = str.split('\n')[+moderation_warns + 2].match(re)[0];
                    let moderation_reason = [];
                    let user_reason = [];
                    let moderation_time = [];
                    let user_time = [];
                    let moderation_give = [];
                    let user_give = [];
                    
                    let circle = 0;
                    while (+moderation_warns > circle){
                        moderation_reason.push(str.split('\n')[+circle + 2].split('==>')[0]);
                        moderation_time.push(str.split('\n')[+circle + 2].split('==>')[1]);
                        moderation_give.push(str.split('\n')[+circle + 2].split('==>')[2]);
                        circle++;
                    }
            
                    circle = 0;
                    while (+user_warns > circle){
                        user_reason.push(str.split('\n')[+circle + +moderation_warns + 3].split('==>')[0]);
                        user_time.push(str.split('\n')[+circle + +moderation_warns + 3].split('==>')[1]);
                        user_give.push(str.split('\n')[+circle + +moderation_warns + 3].split('==>')[2]);
                        circle++;
                    }
                    
                    moderation_level = +args[2];

                    if (+moderation_level == 0 && +moderation_warns == 0 && +user_warns == 0){
                        acc.delete();
                    }else{
                        let text_end = `Уровень модератора: ${+moderation_level}\n` + 
                        `Предупреждения модератора: ${+moderation_warns}`;
                        for (var i = 0; i < moderation_reason.length; i++){
                        text_end = text_end + `\n${moderation_reason[i]}==>${moderation_time[i]}==>${moderation_give[i]}`;
                        }
                        text_end = text_end + `\nПредупреждений: ${+user_warns}`;
                        for (var i = 0; i < user_reason.length; i++){
                        text_end = text_end + `\n${user_reason[i]}==>${user_time[i]}==>${user_give[i]}`;
                        }
                        sacc.edit(text_end);
                    }
                    let ann = message.guild.channels.find(c => c.name == "moderator-chat");
                    ann.send(`\`Модератор\` <@${message.author.id}> \`установил пользователю\` <@${user.id}> \`уровень модерирования: ${textlvl}\``);
                    return message.delete();
                });
            }else{
                if (+args[2] != 0){
                    await acc.send(`Уровень модератора: ${args[2]}\n` +
                    `Предупреждения модератора: 0\n` +
                    `Предупреждений: 0`);
                    let ann = message.guild.channels.find(c => c.name == "moderator-chat");
                    ann.send(`\`Модератор\` <@${message.author.id}> \`установил пользователю\` <@${user.id}> \`уровень модерирования: ${textlvl}\``);
                    return message.delete();
                }
            }
        });
    }
});


/*
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
*/
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


bot.on('guildMemberAdd', async member => {
    if (member.guild.id != serverid) return
    levelhigh++;
    if (levelhigh >= 3){
        if (member.hasPermission("MANAGE_ROLES")){
            member.guild.channels.find(c => c.name == "moderator-chat").send(`\`[SYSTEM]\` ${member} \`мог быть заблокирован за попытку атаки. Уровень опасности: ${levelhigh}\``);
        }else{
            member.ban(`SYSTEM: DDOS ATTACK`);
            console.log(`${member.id} - заблокирован за ДДОС.`)
            member.guild.channels.find(c => c.name == "moderator-chat").send(`\`[SYSTEM]\` ${member} \`был заблокирован за попытку атаки. Уровень опасности: ${levelhigh}\``)
        }
        setTimeout(() => {
            if (levelhigh > 0){
                member.guild.channels.find(c => c.name == "moderator-chat").send(`\`[SYSTEM]\` \`Уровень опасности сервера был установлен с ${levelhigh} на ${+levelhigh - 1}.\``);
                levelhigh--;
            }
        }, 60000*levelhigh);
    }else{
        member.guild.channels.find(c => c.name == "moderator-chat").send(`\`[SYSTEM]\` ${member} \`вошел на сервер. Уровень опасности: ${levelhigh}/3\``)
        setTimeout(() => {
            if (levelhigh > 0){
                member.guild.channels.find(c => c.name == "moderator-chat").send(`\`[SYSTEM]\` \`Уровень опасности сервера был установлен с ${levelhigh} на ${+levelhigh - 1}.\``);
                levelhigh--;
            }
        }, 60000*levelhigh);
    }
})


bot.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return; // Если не будет добавление или удаление смайлика, то выход
    if (event.t == "MESSAGE_REACTION_ADD"){
        let event_guildid = event.d.guild_id // ID discord сервера
        let event_channelid = event.d.channel_id // ID канала
        let event_userid = event.d.user_id // ID того кто поставил смайлик
        let event_messageid = event.d.message_id // ID сообщение куда поставлен смайлик
        let event_emoji_name = event.d.emoji.name // Название смайлика
        let server_high = bot.guilds.find(g => g.id == "533735526914588673");

        if (event_userid == bot.user.id) return // Если поставил смайлик бот то выход
        if (event_guildid != serverid) return // Если сервер будет другой то выход

        let server = bot.guilds.find(g => g.id == event_guildid); // Получить сервер из его ID
        let channel = server.channels.find(c => c.id == event_channelid); // Получить канал на сервере по списку каналов
        let message = await channel.fetchMessage(event_messageid); // Получить сообщение из канала
        let member = server.members.find(m => m.id == event_userid); // Получить пользователя с сервера

        if (channel.name != `bug-tracker`) return // Если название канала не будет 'requests-for-roles', то выйти
         if(event_emoji_name == "❌"){
            if (message.embeds[0].title == '`Discord » Репорт`'){
                if (message.reactions.size != 2){
                    return channel.send(`\`[ERROR]\` \`Не торопись! Сообщение еще загружается!\``)
                }
                let field_user = server_high.members.find(m => "<@" + m.id + ">" == message.embeds[0].fields[0].value.split(/ +/)[1]);
                let field_nickname = message.embeds[0].fields[1].value.split(`\`Ник:\` `)[1];
                //let field_role = server.roles.find(r => "<@&" + r.id + ">" == message.embeds[0].fields[2].value.split(/ +/)[3]);
                let field_channel = server_high.channels.find(c => "<#" + c.id + ">" == message.embeds[0].fields[2].value.split(/ +/)[0]);
                channel.send(`\`[DENY]\` <@${member.id}> \`отклонил репорт от ${field_nickname}, с ID: ${field_user.id}\``);
                let rank;
                if(member.id == "408740341135704065") rank = "Разработчик";
                else rank = "Владелец сервера";
                field_channel.send(`<@${field_user.id}>**,** \`${rank}\` <@${member.id}> \`рассмотрел ваш репорт в службу поддержки разработки бота. Ответ: отклонено\``)
                return message.delete();
        }else if (event_emoji_name == "✔"){
            if (message.embeds[0].title == '`Discord » Репорт`'){
                if (message.reactions.size != 2){
                    return channel.send(`\`[ERROR]\` \`Не торопись! Сообщение еще загружается!\``)
                }
                let field_user = server.members.find(m => "<@" + m.id + ">" == message.embeds[0].fields[0].value.split(/ +/)[1]);
                let field_nickname = message.embeds[0].fields[1].value.split(`\`Ник:\` `)[1];
                let field_channel = server.channels.find(c => "<#" + c.id + ">" == message.embeds[0].fields[2].value.split(/ +/)[0]);
                if (!member.hasPermission("ADMINISTRATOR")){
                    if (!member.roles.some(r => ["☼ Dev Team ☼"].includes(r.name))){
                        return channel.send(`\`[ERROR]\` <@${member.id}> \`ошибка прав доступа. Вам нужно стать разработчиком для подтверждения репорта\``).then(msg => msg.delete(12000));
                    }
                }

                await field_user.addRole(field_role); // Выдать роль по соответствию с тэгом
                channel.send(`\`[ACCEPT]\` <@${member.id}> \`одобрил репорт от ${field_nickname}, с ID: ${field_user.id}\``);
                field_channel.send(`<@${field_user.id}>**,** \`Разработчик\` <@${member.id}> \`рассмотрел ваш репорт в службу поддержки разработки бота. Ответ: принято, будет исправлено/создано\``);
               // if (sened.has(field_nickname)) sened.delete(field_nickname); // Отметить ник, что он не отправлял запрос
                return message.delete();
            }
        }
    }
}
});


