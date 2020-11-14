var webPush = require('web-push');

const vapidKeys = {
"publicKey": "BBRfQK5Ow3ZXwP9mkg6dSV-oLTlg4Fa6SijZsz7MCUaKvKf-6S4p6-HRBS-OINpZUpdGdXJzH0w_FOUYzk6ba6Q",
"privateKey": "TubwDaKeGPvpC1ff2s_4ofc6tFmyZ2uyWI2Bl8gkrlI"
};


webPush.setVapidDetails(
'mailto:example@yourdomain.org',
vapidKeys.publicKey,
vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cSVY5Wbb2Gw:APA91bFfn_Ux8CK77xZd0hu8MMp73j214WohEJ2-ww6PDXwMcsu49DxR-bRJxYlXSJCt3Xis7RmKa0Sufc_l3SBoRJxqPutpkTWlfNTlnZnhvj520ul5Jn_nWRHRx2cNFdZFpWFz7vAv",
    "keys": "AAAAfAqKVnc:APA91bEM_RhtWo5Cfv7XziNj6nQsOg-_IUfyGVIwDnmN9zdhvxgG5vUlY0UBGE2_ysDJTTi9GvWb7cSBAElLIzSV45fzlMCJ0EmrUENlbwSvP7cbaBwbEg3rUCbbFQzyW_d1pPe0myVl"
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
gcmAPIKey: '532752782967',
TTL: 60
};
webPush.sendNotification(
pushSubscription,
payload,
options
);