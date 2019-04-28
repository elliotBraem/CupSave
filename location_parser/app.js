const admin = require('firebase-admin');

const LineByLineReader = require('line-by-line');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cupsave-e9b32.firebaseio.com',
});

const db = admin.firestore();

const yelpDataset = 'business.json';

const lr = new LineByLineReader(yelpDataset);

const categoriesWeWant = [
  'Coffee & Tea',
  'Coffee Roasteries',
  'Bubble Tea',
  'Juice Bars & Smoothies',
  'Tea Rooms',
  'Beverage Store',
  'Cafes',
  'Themed Cafes',
  'Breakfast & Brunch',
  'Convenience Stores',
];

lr.on('line', line => {
  // 'line' contains the current line without the trailing newline character.
  const business = JSON.parse(line);

  if (business.categories) {
    const categories = business.categories.split(',');

    if (categories.length > 0 && categories.some(r => categoriesWeWant.includes(r))) {
      if (business.name && business.longitude && business.latitude) {
        // UNCOMMENT TO ADD LOCATIONS
        // db.collection('locations')
        //   .add({
        //     name: business.name,
        //     address: business.address || '',
        //     postalCode: business.postal_code || '',
        //     city: business.city || '',
        //     state: business.state || '',
        //     latitude: business.latitude,
        //     longitude: business.longitude,
        //   })
        //   .then(docRef => {
        //     console.log('Document written with ID: ', docRef.id);
        //   })
        //   .catch(error => {
        //     console.error('Error adding document: ', error);
        //   });
      }
    }
  }
});

lr.on('end', () => {
  // All lines are read, file is closed now.
  console.log('DONE');
});
