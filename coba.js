function cetakNama(nama){
    return `Halo nama saya ${nama}`
}

const PI= 3.14;

const mahasiswa = {
    nama : 'Dody',
    umur : 20,
    cetakMahasiswa(){
        return `halo nama saya ${this.nama} berusian ${this.umur} tahun`
    }
}

class Orang{
    constructor(){
        console.log('object orang telah dibuat');
    }
}

// Exports module satu persatu
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// Export sekaligus menggunakan object
// module.exports = {
//     cetakNama : cetakNama,
//     PI : PI,
//     mahasiswa: mahasiswa,
//     Orang : Orang
// }

// Export sekaligus menggunakan notasi ES6
module.exports = {cetakNama, PI, mahasiswa, Orang}