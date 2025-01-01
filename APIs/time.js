function tampilkanWaktu() {
    const apiKey = 'AIzaSyAENpkENoVMSwhvIXCm-DxyRnticOzSd70'; // Ganti dengan API key Google Anda
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=-6.2088,106.8456&timestamp=${Math.floor(Date.now() / 1000)}&key=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const timeZoneOffset = (data.rawOffset + data.dstOffset) * 1000; // Konversi dari detik ke milidetik
            
            setInterval(() => {
                const currentTime = new Date();
                let timeInJakarta = new Date(currentTime.getTime() + timeZoneOffset);


                timeInJakarta.setHours(timeInJakarta.getHours() );


                timeInJakarta.setDate(timeInJakarta.getDate() + 1);

                // Format tanggal
                const optionsTanggal = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedDate = timeInJakarta.toLocaleDateString('id-ID', optionsTanggal);

                // Format waktu (AM/PM)
                const formattedTime = timeInJakarta.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true, // AM/PM
                });

                // Tambahkan elemen bold pada jam
                document.getElementById("tanggal-jam").textContent = "Tanggal: " + formattedDate;
                document.getElementById("waktu-jam").innerHTML = "Waktu: <strong>" + formattedTime + "</strong>";
            }, 1000); // Perbarui setiap 1 detik
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('tanggal-jam').textContent = 'Gagal memuat data tanggal.';
            document.getElementById('waktu-jam').textContent = 'Gagal memuat data waktu.';
        });
}

document.addEventListener("DOMContentLoaded", tampilkanWaktu);



