// Mengimport modul MongoClient dan ObjectId dari 'mongodb'.
const { MongoClient, ObjectId } = require('mongodb');

// Mendefinisikan URL MongoDB server yang akan digunakan untuk koneksi.
const url = 'mongodb://127.0.0.1:27017';

// Membuat instance MongoClient dengan URL koneksi yang telah didefinisikan sebelumnya.
const client = new MongoClient(url);

// Mendefinisikan nama database yang akan digunakan.
const namaDatabase = 'task-manager';

// Membuat instance ObjectId baru.
const id = new ObjectId();

// Mencetak informasi tentang ObjectId.
console.log('ObjectId:', id);
console.log('Buffer id:', id.id);
console.log('Panjang buffer:', id.id.length);
console.log('Timestamp:', id.getTimestamp());
console.log('Panjang hexadecimal:', id.toHexString().length);

// Fungsi utama untuk berinteraksi dengan MongoDB secara asynchronous.
async function main() {
  try {
    // Menghubungkan ke server MongoDB.
    await client.connect();
    console.log('Berhasil terhubung ke MongoDB database server');

    // Memilih database dengan nama 'task-manager'.
    const db = client.db(namaDatabase);

    // Memilih koleksi 'pengguna' dan 'tugas' di dalam database.
    const clPengguna = db.collection('pengguna');
    const clTugas = db.collection('tugas');

    // Memasukkan banyak data ke koleksi 'pengguna'.
    const insertPengguna = await clPengguna.insertMany([
      { _id: new ObjectId(), nama: 'Galant', usia: 22 },
      { _id: new ObjectId(), nama: 'Muhammad Irzan Ali', usia: 21 },
      { _id: new ObjectId(), nama: 'Salman Rizky', usia: 22 },
      { _id: new ObjectId(), nama: 'Muhammad Fatieh Akram Faritshi', usia: 21 },
      { _id: new ObjectId(), nama: 'Mauliza Aprilia', usia: 20 },
      { _id: new ObjectId(), nama: 'Jovanka Sabila Pertiwi', usia: 22 },
      { _id: new ObjectId(), nama: 'Inka Taruni Sastra', usia: 22 },
      { _id: new ObjectId(), nama: 'Sherly Sukmadira Putri', usia: 21 },
    ]);
    console.log('Data Pengguna berhasil dimasukkan:', insertPengguna.insertedCount);

    // Memasukkan banyak data ke koleksi 'tugas'.
    const insertTugas = await clTugas.insertMany([
      { Deskripsi: 'Membersihkan rumah', StatusPenyelesaian: true },
      { Deskripsi: 'Mengerjakan tugas kuliah', StatusPenyelesaian: false },
      { Deskripsi: 'Memberikan bimbingan', StatusPenyelesaian: false }
    ]);
    console.log('Data Tugas berhasil dimasukkan:', insertTugas.insertedCount);

    // Mengembalikan pesan sukses.
    return 'Data berhasil dimasukkan ke database.';
  } catch (err) {
    // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol.
    console.error('Terjadi kesalahan:', err);
  } finally {
    // Selalu menutup koneksi ke server MongoDB setelah operasi selesai.
    await client.close();
    console.log('Koneksi ke MongoDB telah ditutup.');
  }
}

// Memanggil fungsi 'main' dan menangani hasilnya.
main()
  .then(console.log)
  .catch((err) => console.error('Error saat menjalankan fungsi main:', err));
