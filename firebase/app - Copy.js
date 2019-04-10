var firebase = require("firebase-admin");



var serviceAccount = require("./serviceAccountKey.json");



firebase.initializeApp({

    credential: firebase.credential.cert(serviceAccount),

    databaseURL: "https://sales-d9b03.firebaseio.com"

});




var db = firebase.firestore();

/*

var ref = db.ref("restricted_access/secret_document");

ref.once("value", function(snapshot) {

console.log(snapshot.val());

});

*/



// Get a database reference to our posts

//ar db = admin.database();

// db.collection('users').get()

// .then((snapshot) => {

// snapshot.forEach((doc) => {

// console.log(doc.id, '=>', doc.data());

// });

// })

// .catch((err) => {

// console.log('Error getting documents', err);

// });



var
    doc = db.collection('hardware')

var
    observer = doc.onSnapshot(querySnapshot => {

            console.log(`Received query snapshot of size
${querySnapshot.size}`);



            querySnapshot.docChanges.forEach(change => {

                if (change.type ===
                    'added') {

                    console.log(`Received doc add:
${JSON.stringify(change.doc.data())}`);

                    var child_process = require('child_process');
                    child_process.exec('StartVM.bat', function(error, stdout, stderr) {
                        console.log(stdout);
                    });
                }

                if (change.type ===
                    'modified') {

                    console.log(`Received doc modified:
					${JSON.stringify(change.doc.data())}`);

                }

                if (change.type ===
                    'removed') {
						
                    console.log(`Received doc deleted:
					${JSON.stringify(change.doc.data())}`);
						
						
					 var child_process = require('child_process');
                		child_process.exec('ShutdownVM.bat', function(error, stdout, stderr) {
                    console.log(stdout);
                });

                }

            });



            // docSnapshot.docs



            // console.log(`Received doc snapshot: ${JSON.stringify(docSnapshot.docs.)}`);


            // ...

        },
        err => {

            console.log(`Encountered error:
${err}`);

        });