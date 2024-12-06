const { MongoClient, ObjectId } = require('mongodb'); 
const url = 'mongodb://127.0.0.1:27017'; 
const client = new MongoClient(url); 
const namaDatabase = 'task-manager'; 

async function main() { 
    try { 
        await client.connect(); 
        console.log('Berhasil terhubung ke MongoDB database server'); 
        const db = client.db(namaDatabase); 
        
        // Mencari satu dokumen dalam koleksi 'pengguna' berdasarkan nama 'Kimi Maulana'. 
        const byNama = await db.collection('pengguna').findOne({ nama: 'Michael Kaiser' }); 
        
        // Mencari satu dokumen dalam koleksi 'pengguna' berdasarkan ID objek tertentu. 
        const id = "674931b7c99e0335df5354cc"; // Sesuaikan dengan data di database Anda.
        const byObjectID = await db.collection('pengguna').findOne({ _id: new ObjectId(id) }); 
        
        // Mencari beberapa dokumen dalam koleksi 'pengguna' dengan kriteria usia 19 dan mengubahnya menjadi array. 
        const toArray = await db.collection('pengguna').find({ usia: 22 }).toArray(); 

        // Menampilkan hasil pencarian.
        if (byNama || byObjectID || toArray.length > 0) { 
            if (byNama) console.log('Data Pengguna ditemukan (berdasarkan nama):', byNama); 
            if (byObjectID) console.log('Data Pengguna ditemukan (berdasarkan ID Objek):', byObjectID); 
            if (toArray.length > 0) console.log('Data Pengguna ditemukan (dalam format Array):', toArray); 
        } else { 
            console.log('Data Pengguna tidak ditemukan'); 
        } 
    } catch (err) { 
        console.error(err); 
    } finally { 
        await client.close(); 
    } 
} 

main().catch(console.error);