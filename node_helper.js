const NodeHelper = require("node_helper");
const BringClient = require("./BringClient");

let list;
let client;

module.exports = NodeHelper.create({
    start: function () {
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "GET_LIST") {
            if (!this.client) {
                this.client = new BringClient(payload);
                // Wait for Login
                setTimeout(() => {
                    this.client.getLists().then(lists => {
                        this.getList(payload);
                    });
                }, 1500);
            } else {
                this.getList(payload);
            }
            return true;
        }
    },

    getList: function (payload) {
        this.client.getList(true, payload.listName).then(list => {
            this.list = list;
            this.sendSocketNotification("LIST_DATA", list);
        });
    }
});
