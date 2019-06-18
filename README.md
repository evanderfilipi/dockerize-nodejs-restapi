# Dockerize Nodejs REST API dengan MariaDB (Ubuntu)

- Silahkan anda clone/download project ini
- Buka terminal, masuk ke direktori/folder project yang sudah anda clone
- Jalankan perintah berikut (agar setiap perintah docker yang dijalankan nanti tidak perlu mengetik 'sudo', serta memberikan kewenangan agar user biasa dapat bertindak seperti super user).
```
sudo su
```
- Jika anda belum me-install image mariadb di docker, jalankan perintah: 
```
docker pull mariadb
```
- Untuk melihat dokumentasi dari image mariadb, silahkan akses: https://hub.docker.com/_/mariadb
 
### Build project nodejs di Docker
- Untuk build project tersebut, jalankan perintah berikut:
```
docker build -t crudapi_nodejs 
```
- Lalu cek apakah images crudapi_nodejs sudah ada/belum, dengan perintah:
```
docker images
```
 
### Membuat network baru di Docker
- Network yang dibuat akan dijadikan sebagai host untuk koneksi database mariadb di docker (tidak menggunakan localhost lagi)
- Mulai membuat network baru dengan perintah:

```
docker network create --subnet=172.20.0.0/16 nodejs-net
```
(Ket: ip subnet = '172.20.0.0/16', nama network = 'nodejs-net')
- Untuk melihat apakah network tersebut sudah ada/belum, jalankan perintah:
```
docker network ls
```
- Untuk melihat detail networknya, jalankan perintah:
```
docker inspect nodejs-net
```

### Membuat sekaligus menjalankan container di Docker
- Jalankan perintah berikut ini:
```
docker run --net nodejs-net --ip 172.20.0.22 --name crudapi_nodejs -e MYSQL_ROOT_PASSWORD="root" -d mariadb:latest
```
(Ket: 'nodejs-net' = nama network yang dibuat, '172.18.0.22' = ip address berdasarkan subnet di nodejs-net, 'crudapi_nodejs' = nama container, 'root' = password root mysql saya, 'mariadb:latest' = nama image dan tagnya)
- Untuk melihat apakah container sudah ada/belum, jalankan perintah:
```
docker ps -a
```
- Atau untuk melihat apakah container sedang running/tidak, jalankan perintah:
```
docker ps
```

### Import database ke Docker
- Jalankan perintah berikut ini:
```
docker exec -i crudapi_nodejs mysql -h172.20.0.22 -uroot -proot mysql < db_crud_nodejs.sql
```
(Ket: 'crudapi_nodejs' = nama container yang tadi dibuat, '-h172.20.0.22' = hostnya, '-uroot' = user database, '-proot' = password dari user database, 'db_crud_nodejs.sql' = file sql yang akan diimport ke docker)
- Untuk mengecek apakah database sudah diimport ke docker/belum, jalankan perintah:
```
mysql -h 172.20.0.22 -u root -p
```
- Setelah masuk ke mysql/mariadb di terminal, cek apakah database serta isi tabel dari db tersebut ada/tidak (menggunakan perintah sql).

### Jalankan program
- Untuk mengecek apakah anda berhasil connect ke database di docker, jalankan perintah:
```
node connect.js
```
- Jika sudah, jalankan project nodejs tersebut dengan perintah:
```
npm start
```
atau
```
node server.js
```
- Jika tidak ada error saat menjalankan program, lakukan CRUD menggunakan aplikasi Postman.

#### Note: Pastikan anda sudah menginstall MariaDB & Docker di PC/Laptop anda. User database yang saya gunakan disini adalah 'root', dengan password 'root'. Sekian.
