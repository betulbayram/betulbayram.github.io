document.addEventListener("DOMContentLoaded", async function () {
  const blogContainer = document.getElementById("blog-list-container");
  const filterContainer = document.getElementById("blog-filter-container");

  if (!blogContainer || !filterContainer) {
    console.error("Gerekli taşıyıcı alanlar (blog veya filtre) bulunamadı.");
    return;
  }

  try {
    const response = await fetch("/blogs/blog.json");
    if (!response.ok) throw new Error("Blog verileri yüklenemedi.");
    const allPosts = await response.json();

    const allTags = new Map();
    allPosts.forEach(post => {
      post.tags.forEach(tag => {
        if (!allTags.has(tag.filterClass)) {
          allTags.set(tag.filterClass, tag.name);
        }
      });
    });

    let filterButtonsHTML = '<li class="active" data-filter="*">All</li>';
    allTags.forEach((name, filterClass) => {
      filterButtonsHTML += `<li data-filter=".${filterClass}">${name}</li>`;
    });
    filterContainer.innerHTML = filterButtonsHTML;
    const filterButtons = filterContainer.querySelectorAll('li');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });
    let blogCardsHTML = "";
    allPosts.forEach((post) => {
      const postFilterClasses = post.tags.map(tag => tag.filterClass).join(' ');
      blogCardsHTML += `
        <div class="col-lg-4 col-md-6 col-sm-6 mix ${postFilterClasses}">
            <div class="blog__item" style="--bg-image: url('${post.coverImage || ''}')">
                <h4>${post.title}</h4>
                <ul>
                    <li>${post.publishDate}</li>
                </ul>
                <p>${post.summary}</p>
                <a href="blogs-detail.html?slug=${post.slug}">Read more <span class="arrow_right"></span></a>
            </div>
        </div>
      `;
    });
    blogContainer.innerHTML = blogCardsHTML;

    var mixer = mixitup(blogContainer);

  } catch (error) {
    console.error("Hata:", error);
    blogContainer.innerHTML = `<p>Blog yazıları yüklenirken bir hata oluştu: ${error.message}</p>`;
  }
});