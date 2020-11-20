var webPush = require('web-push');

const vapidKeys = {
    
"publicKey": "BDbOefxpq3vZcK2i40w0ABDC5vXxrEgUA0chMFO_vOnb4miUO_ydGyshtHAwBHZ-bm-D1VtjhDuOnMHCDDqFjzU",
"privateKey": "c08YtsvgWyH-3CETz18v0NKDB7U69adkZKsVbAsd11o"
};

webPush.setVapidDetails(
'mailto:example@yourdomain.org',
vapidKeys.publicKey,
vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cSVY5Wbb2Gw:APA91bFfn_Ux8CK77xZd0hu8MMp73j214WohEJ2-ww6PDXwMcsu49DxR-bRJxYlXSJCt3Xis7RmKa0Sufc_l3SBoRJxqPutpkTWlfNTlnZnhvj520ul5Jn_nWRHRx2cNFdZFpWFz7vAv",
    "keys": {
        "p256dh": "AAAAfAqKVnc:APA91bEM_RhtWo5Cfv7XziNj6nQsOg-_IUfyGVIwDnmN9zdhvxgG5vUlY0UBGE2_ysDJTTi9GvWb7cSBAElLIzSV45fzlMCJ0EmrUENlbwSvP7cbaBwbEg3rUCbbFQzyW_d1pPe0myVl",
        "auth": "AIzaSyAXB38wnjO5S2hH6X9WmRWh7pQT8zzNnEY"
        
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
gcm_API_Key: '205178622356',
TTL: 60
};

webPush.sendNotification(
pushSubscription,
payload,
options
);