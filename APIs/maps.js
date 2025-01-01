// Memuat API Google Maps secara dinamis
function loadGoogleMaps() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBawYZmKtixHdGztcihkljbibxPk7CrkmQ&callback=initMap';
    document.body.appendChild(script);
}

// Fungsi untuk menginisialisasi peta
function initMap() {
    // Define the location (latitude and longitude)
    var location = { lat: -6.256444, lng: 106.618765 };
    
    // Create a map centered at the specified location
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: location
    });
    
    // Add a marker at the specified location
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

// Panggil fungsi loadGoogleMaps saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    loadGoogleMaps();
});
