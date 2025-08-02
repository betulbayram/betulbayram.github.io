document.addEventListener("DOMContentLoaded", async function () {
  try {
    // 1. URL'den hangi blog yazısının istendiğini anla ('slug' parametresini al)
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get("slug");

    if (!postSlug) {
      document.body.innerHTML = "<h1>Blog yazısı bulunamadı.</h1>";
      return;
    }

    // 2. Tüm blog verilerini içeren ana JSON dosyasını çek
    const responseBlogs = await fetch("/blogs/blog.json");
    if (!responseBlogs.ok) throw new Error("Blog verileri yüklenemedi.");
    const allPosts = await responseBlogs.json();

    // 3. URL'deki slug'a uygun olan blog yazısını bul
    const blogPostData = allPosts.find((post) => post.slug === postSlug);

    if (!blogPostData) {
      document.body.innerHTML = `<h1>'${postSlug}' başlıklı blog yazısı bulunamadı.</h1>`;
      return;
    }

    // 4. İlgili Markdown dosyasının içeriğini çek
    const responseMarkdown = await fetch(blogPostData.markdownFile);
    if (!responseMarkdown.ok) throw new Error("Blog içeriği yüklenemedi.");
    const markdownContent = await responseMarkdown.text();

    // 5. Tüm veriler başarıyla çekildikten sonra sayfayı doldur
    renderPage(blogPostData, markdownContent);
  } catch (error) {
    console.error("Hata:", error);
    document.body.innerHTML = `<h1>Bir hata oluştu: ${error.message}</h1>`;
  }
});

/**
 * Gelen verilere göre HTML sayfasını güncelleyen fonksiyon
 * @param {object} postData - Blog yazısının JSON'dan gelen meta verileri
 * @param {string} markdownText - Blog yazısının .md dosyasından gelen metin içeriği
 */
function renderPage(postData, markdownText) {
  document.title = postData.title + " | betulbayram";

  // Kapak fotoğrafını ayarla
  const heroElement = document.getElementById("blog-hero");
  if (heroElement) {
    const imageUrl = postData.coverImage;
    document.getElementById("blog-hero").setAttribute("data-setbg", imageUrl);
    document.getElementById(
      "blog-hero"
    ).style.backgroundImage = `url("${imageUrl}")`;
  }

  // Metin alanlarını doldur
  document.getElementById("blog-title").innerText = postData.title;
  document.getElementById("blog-author").innerText = postData.author;
  document.getElementById("blog-date").innerText = postData.publishDate;

  // Markdown içeriğini HTML'e çevir ve yerleştir
  const blogContentContainer = document.getElementById("blog-content");
  blogContentContainer.innerHTML = marked.parse(markdownText);

  // Etiketleri oluştur
  const tagsContainer = document.getElementById("blog-tags");
  tagsContainer.innerHTML = '<span><i class="fa fa-tag"></i> Tag:</span>';
  postData.tags.forEach((tag) => {
    const tagElement = document.createElement("a");
    tagElement.href = `/tags/${tag.toLowerCase()}`;
    tagElement.innerText = tag;
    tagsContainer.appendChild(tagElement);
  });
}
