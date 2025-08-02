document.addEventListener("DOMContentLoaded", async function () {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get("slug");

    if (!postSlug) {
      document.body.innerHTML = "<h1>Blog yazısı bulunamadı.</h1>";
      return;
    }

    const responseBlogs = await fetch("/blogs/blog.json");
    if (!responseBlogs.ok) throw new Error("Blog verileri yüklenemedi.");
    const allPosts = await responseBlogs.json();

    const blogPostData = allPosts.find((post) => post.slug === postSlug);

    if (!blogPostData) {
      document.body.innerHTML = `<h1>'${postSlug}' başlıklı blog yazısı bulunamadı.</h1>`;
      return;
    }

    const responseMarkdown = await fetch(blogPostData.markdownFile);
    if (!responseMarkdown.ok) throw new Error("Blog içeriği yüklenemedi.");
    const markdownContent = await responseMarkdown.text();

    renderPage(blogPostData, markdownContent);
  } catch (error) {
    console.error("Hata:", error);
    document.body.innerHTML = `<h1>Bir hata oluştu: ${error.message}</h1>`;
  }
});

/**
 * @param {object} postData
 * @param {string} markdownText
 */
function renderPage(postData, markdownText) {
  document.title = postData.title + " | betulbayram";

  const heroElement = document.getElementById("blog-hero");
  if (heroElement) {
    const imageUrl = postData.coverImage;
    document.getElementById("blog-hero").setAttribute("data-setbg", imageUrl);
    document.getElementById(
      "blog-hero"
    ).style.backgroundImage = `url("${imageUrl}")`;
  }

  document.getElementById("blog-title").innerText = postData.title;
  document.getElementById("blog-author").innerText = postData.author;
  document.getElementById("blog-date").innerText = postData.publishDate;

  const blogContentContainer = document.getElementById("blog-content");
  blogContentContainer.innerHTML = marked.parse(markdownText);

  const tagsContainer = document.getElementById("blog-tags");
  tagsContainer.innerHTML = '<span><i class="fa fa-tag"></i> Tag:</span>';

  postData.tags.forEach((tag) => {
    const tagElement = document.createElement("a");

    tagElement.innerText = tag.name;
    tagElement.href = `blogs.html?filter=${tag.filterClass}`;

    tagsContainer.appendChild(tagElement);
  });
}
