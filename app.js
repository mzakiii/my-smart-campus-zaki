$(document).ready(function() {
    /**
     * 1. Fungsi Utama untuk Memuat Halaman
     * pageName diambil dari atribut data-page pada tombol
     */
    function loadPage(pageName) {
        console.log("Mencoba memuat file: " + pageName + ".html");
        
        $("#content").fadeOut(200, function() {
            // Memuat file html eksternal
            $(this).load(pageName + ".html", function(response, status, xhr) {
                if (status == "error") {
                    console.error("Gagal memuat: " + xhr.status + " " + xhr.statusText);
                    $(this).html(`
                        <div class="text-center py-10">
                            <p class='text-red-500 font-bold'>Gagal memuat "${pageName}.html"</p>
                            <p class='text-sm text-gray-500'>Pastikan file tersedia di folder yang sama.</p>
                        </div>
                    `);
                }
                $(this).fadeIn(200);
            });
        });

        // Update UI: Memberi efek biru pada menu yang aktif
        $('.nav-link').removeClass('text-blue-600 font-bold bg-blue-50 lg:bg-transparent');
        $(`.nav-link[data-page="${pageName}"]`).addClass('text-blue-600 font-bold bg-blue-50 lg:bg-transparent');
    }

    // 2. Tampilkan halaman 'home' secara default saat pertama kali dibuka
    loadPage('home');

    // 3. Listener Klik: Berlaku untuk menu desktop maupun mobile
    $(document).on('click', '.nav-link', function() {
        const targetPage = $(this).attr('data-page');
        if (targetPage) {
            loadPage(targetPage);
        }
        
        // Sembunyikan menu mobile otomatis setelah klik
        $("#mobile-menu").addClass('hidden');
    });

    // 4. Toggle Tombol Mobile Menu
    $('#mobile-menu-button').click(function() {
        $('#mobile-menu').toggleClass('hidden');
    });
});