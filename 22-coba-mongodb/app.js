const { MongoClient, ObjectId  } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";
const dbName = 'wpu'

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


client.connect((error, client) => {
    if(error){
        return console.log('Koneksi Gagal')
    }

    console.log('koneksi Berhasil')

    // Pilih database
    const db = client.db(dbName)

    // Menambahkan 1 data ke tabel mahasiswa
    // db.collection('mahasiswa').insertOne({
    //     nama: "Annisa",
    //     email: "Annisa@gmail.com"
    // }, (error, result) => {
    //     if(error){
    //         return console.log("Gagal menambahkan data")
    //     }

    //     console.log(result)
    // } )

    // Menambahkan lebih dari 1 data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: "Vian",
    //             email: "vian@gmail.com"
    //         },
    //         {
    //             nama: "anggun",
    //             email: "anggun@gmail.com"
    //         }
    //     ],
    //     (error, result) => {
    //         if(error){
    //             return console.log("Data Gagal ditambahkan")
    //         }

    //         console.log(result)
    //     }
    // )


    // Menampilkan semua data yang ada di collection/tabel mahasiswa
    // console.log(db.collection('mahasiswa').find().toArray((error, result) => {
    //     console.log(result)
    // }))

    
    // Menampilkan semua data yang ada di collection/tabel mahasiswa berdasarkan kriteria
    // console.log(db.collection('mahasiswa').find({nama:"faizal"}).toArray((error, result) => {
    //     console.log(result)
    // }))


    // Mengubah data berdasarkan id
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectId('66f64a33c82e2566a81fabfd'),
    //     },
    //     {
    //         $set: {
    //             email:"vian@yahoo.com"
    //         }
    //     }
    // )

    // updatePromise.then((result) => {
    //     console.log(result)
    // })
    // .catch((error) => {
    //     console.log(error)
    // })


    // Menghapus 1 data
    // db.collection('mahasiswa').deleteOne({
    //     _id: ObjectId('66f64a33c82e2566a81fabfd')
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


        // Menghapus 1 data
        db.collection('mahasiswa').deleteMany({
            _id: ObjectId('66f64a33c82e2566a81fabfd')
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

});


