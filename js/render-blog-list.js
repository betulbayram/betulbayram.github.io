document.addEventListener("DOMContentLoaded", async function () {
  const blogContainer = document.getElementById("blog-list-container");
  const filterContainer = document.getElementById("blog-filter-container");
  const seriesContainer = document.getElementById("blog-series-container");
  const paginationContainer = document.querySelector(".pagination-container");
  const blogSection = document.querySelector(".blog.spad");

  if (
    !blogContainer ||
    !filterContainer ||
    !paginationContainer ||
    !seriesContainer
  ) {
    console.error(
      "Gerekli HTML elementleri (blog, filtre, seriler veya sayfalama taşıyıcısı) bulunamadı."
    );
    return;
  }

  const POSTS_PER_PAGE = 6;
  let allPosts = [];
  let currentFilter = "*";
  let currentSeries = null; 
  let currentPage = 1;

  try {
    const response = await fetch("/blogs/blog.json");
    if (!response.ok) throw new Error("Blog verileri yüklenemedi.");
    allPosts = await response.json();

    const urlParams = new URLSearchParams(window.location.search);
    const pageFromUrl = parseInt(urlParams.get("page"), 10);
    if (pageFromUrl && pageFromUrl > 0) {
      currentPage = pageFromUrl;
    }

    setupSeriesList();
    setupFilters();
    render();
  } catch (error) {
    console.error("Hata:", error);
    blogContainer.innerHTML = `<p>Blog yazıları yüklenirken bir hata oluştu: ${error.message}</p>`;
  }

  function setupSeriesList() {
    const allSeries = new Set(
      allPosts.map((post) => post.series).filter(Boolean)
    ); 

    let seriesHTML = '<li class="active" data-series="null">Tüm Bloglar</li>';
    allSeries.forEach((series) => {
      seriesHTML += `<li data-series="${series}">${series}</li>`;
    });
    seriesContainer.innerHTML = seriesHTML;

    const seriesButtons = seriesContainer.querySelectorAll("li");
    seriesButtons.forEach((button) => {
      button.addEventListener("click", function () {
        seriesButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        const seriesName = this.getAttribute("data-series");
        currentSeries = seriesName === "null" ? null : seriesName;

        currentPage = 1;
        render();
      });
    });
  }

  function setupFilters() {
    const allTags = new Map();
    allPosts.forEach((post) => {
      post.tags.forEach((tag) => {
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

    const filterButtons = filterContainer.querySelectorAll("li");
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
        currentFilter = this.getAttribute("data-filter");
        currentPage = 1;
        render();
      });
    });
  }

  function render() {
    let seriesFilteredPosts = allPosts;
    if (currentSeries) {
      seriesFilteredPosts = allPosts.filter(
        (post) => post.series === currentSeries
      );
    }

    const filteredPosts = seriesFilteredPosts.filter((post) => {
      if (currentFilter === "*") return true;
      const postFilterClasses = post.tags.map((tag) => `.${tag.filterClass}`);
      return postFilterClasses.includes(currentFilter);
    });

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
    }
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    let blogCardsHTML = "";
    if (postsToShow.length === 0) {
      blogCardsHTML =
        "<p style='color: #adadad; text-align: center; width: 100%;'>Bu filtreyle eşleşen blog yazısı bulunamadı.</p>";
    } else {
      postsToShow.forEach((post) => {
        const postFilterClasses = post.tags
          .map((tag) => tag.filterClass)
          .join(" ");
        blogCardsHTML += `
    <div class="col-lg-4 col-md-6 col-sm-6 mix ${postFilterClasses}">
        <div class="blog__item" data-summary="${
          post.summary
        }" style="--bg-image: url('${post.coverImage || ""}')">
            <h4>${post.title}</h4>
            <ul>
                <li>${post.publishDate}</li>
            </ul>
            <a href="blogs-detail.html?slug=${
              post.slug
            }">Read more <span class="arrow_right"></span></a>
        </div>
    </div>
  `;
      });
    }
    blogContainer.innerHTML = blogCardsHTML;

    let paginationHTML = "";
    if (totalPages > 1) {
      if (currentPage > 1) {
        paginationHTML += `<a href="#" class="arrow" data-page="${
          currentPage - 1
        }">&laquo; Prev</a>`;
      }

      for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<a href="#" data-page="${i}" class="${
          i === currentPage ? "active" : ""
        }">${i}</a>`;
      }

      if (currentPage < totalPages) {
        paginationHTML += `<a href="#" class="arrow" data-page="${
          currentPage + 1
        }">Next &raquo;</a>`;
      }
    }
    paginationContainer.innerHTML = paginationHTML;

    const newUrl = `${window.location.pathname}?page=${currentPage}`;
    window.history.pushState({ path: newUrl }, "", newUrl);

    addPaginationListeners();
  }

  function addPaginationListeners() {
    const pageLinks = paginationContainer.querySelectorAll("a");
    pageLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = parseInt(this.getAttribute("data-page"), 10);

        if (page !== currentPage) {
          currentPage = page;
          render();
          if (blogSection) {
            blogSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }
});
