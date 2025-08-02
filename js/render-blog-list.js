document.addEventListener("DOMContentLoaded", async function () {
  const blogContainer = document.getElementById("blog-list-container");

  if (!blogContainer) {
    console.error("Blog listesi için taşıyıcı alan bulunamadı.");
    return;
  }

  try {
    // 1. Tüm blog verilerini içeren JSON dosyasını çek
    const response = await fetch("/blogs/blog.json");
    if (!response.ok) throw new Error("Blog verileri yüklenemedi.");

    const allPosts = await response.json();

    // Eğer hiç post yoksa bilgi mesajı göster
    if (allPosts.length === 0) {
      blogContainer.innerHTML = "<p>Gösterilecek blog yazısı bulunamadı.</p>";
      return;
    }

    // Taşıyıcıyı temizle (içinde "loading" vs. varsa diye)
    blogContainer.innerHTML = "";

    // 2. Her bir post için bir HTML kartı oluştur ve sayfaya ekle
    allPosts.forEach((post) => {
      // post.coverImage'ın JSON'da tanımlı olduğundan emin olun
      const coverImageUrl = post.coverImage || ""; // Eğer resim yoksa boş string ata

      const blogCardHTML = `
    <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="blog__item" style="--bg-image: url('${coverImageUrl}')">
            <h4>${post.title}</h4>
            <ul>
                <li>${post.publishDate}</li>
            </ul>
            <p>${post.summary}</p>
            <a href="blogs-detail.html?slug=${post.slug}">Read more <span class="arrow_right"></span></a>
        </div>
    </div>
  `;
      // Oluşturulan kartı ana taşıyıcının içine ekle
      blogContainer.innerHTML += blogCardHTML;
    });
  } catch (error) {
    console.error("Hata:", error);
    blogContainer.innerHTML = `<p>Blog yazıları yüklenirken bir hata oluştu: ${error.message}</p>`;
  }
});
