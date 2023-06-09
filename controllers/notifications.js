const OneSignal = require('onesignal-node');

exports.sendNotifications = async (job_name,emp_id) => {
    const client = new OneSignal.Client('11b9687f-2cd0-4ba3-8c8d-862a48ffcf01','ZmE0NDAzNWYtMzZlMy00YjFiLThkOTItM2M4OWJhYWRmOTlk');
    await client.createNotification({
      contents:{
        "en":job_name
      },
      included_segments:['Active Users'],
      filters:[{field:'tag', key:'emp_id',value:emp_id}]
    })
}