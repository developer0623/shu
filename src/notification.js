/**
 * One signal instance
 *
 * @type {{}}
 */
var oneSignal = {};

/**
 * @type {{}}
 */
var notificationConfig = {};

/**
 * @type {boolean}
 */
var isReady = false;

/**
 * @type {Array}
 */
var readyListeners = [];

function ready() {
    isReady = true;

    _.each(readyListeners, function (item) {
        item();
    })
}

var notification = {

    /**
     * Constructor
     *
     * @param signal
     */
    initialize: function (signal) {
        oneSignal = signal;

        notificationConfig = require('./config/notification').default;

        this.bindEvents();
    },

    /**
     * Check
     *
     * @returns {boolean}
     */
    isReady: function () {
        return isReady;
    },

    /**
     * Bin all events
     */
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    /**
     * Fire when device is ready.
     */
    onDeviceReady: function () {
        notification.receivedEvent('deviceready');
    },

    /**
     * Received event data from notification server
     *
     * @param id
     */
    receivedEvent: function (id) {

        if (notificationConfig.debug) {
            oneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
        }

        var iosSettings = {};
        iosSettings["kOSSettingsKeyAutoPrompt"] = true;
        iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

        oneSignal.startInit(notificationConfig.one_signal_api_key, notificationConfig.fcm_sender)
            .handleNotificationReceived(didReceiveRemoteNotificationCallBack)
            .handleNotificationOpened(didOpenRemoteNotificationCallBack)
            .inFocusDisplaying(oneSignal.OSInFocusDisplayOption.Notification)
            .iOSSettings(iosSettings)
            .endInit();

        // set notification device key to storage
        window.plugins.OneSignal.getIds(function (ids) {
            localStorage.setItem('notification_key', ids.userId);

            ready();
        });
    }
};

function didReceiveRemoteNotificationCallBack(jsonData) {
    // alert("Notification received:\n" + JSON.stringify(jsonData));
    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
}
function didOpenRemoteNotificationCallBack(jsonData) {
    // alert("Notification opened:\n" + JSON.stringify(jsonData));
    console.log('didOpenRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
}

// /**
//  * Tagging user on account
//  */
// function sendTag() {
//     oneSignal.sendTag("PhoneGapKey", "PhoneGapValue");
// }

/**
 * userId, pushToken
 */
function getIds(callback) {
    oneSignal.getIds(function (ids) {
        callback(ids);
    });
}

export default notification;