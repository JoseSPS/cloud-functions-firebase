const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// http request 1
/* exports.randomNumber = functions.https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
}); */

// http request 2
/* exports.toTheDojo = functions.https.onRequest((request, response) => {
    response.redirect('https://www.thenetninja.co.uk');
}); */

// http callable functions
/* exports.sayHello = functions.https.onCall((data, context) => {
    const name = data.name;
    return `Hello, ${name}`;
}); */


// auth trigger (new user signOut)
exports.newUserSignup = functions.auth.user().onCreate(user => {
    /* console.log('user created', user.email, user.uid); */
    // for background triggers you must return a value/promise
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        upvoted: []
    });
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete(user => {
    /* console.log('user deleted', user.email, user.uid); */
    // for background triggers you must return a value/promise
    const doc = admin.firestore().collection('users').doc(user.uid);
    return doc.delete();
});