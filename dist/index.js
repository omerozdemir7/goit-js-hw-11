import{S as f,i as c}from"./assets/vendor-B2mb6eXk.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const d=document.querySelector("#search-form"),l=document.querySelector(".gallery"),n=document.querySelector(".loader"),p="32475203-0397f154fda8b2c2a6bae1f0a",h="https://pixabay.com/api/",g=new f(".gallery a",{captionsData:"alt",captionDelay:250});d.addEventListener("submit",y);async function y(t){t.preventDefault(),t.stopPropagation();const o=t.currentTarget,i=o.elements.searchQuery.value.trim();if(i===""){c.error({title:"Hata",message:"Arama kutusu boş olamaz!",position:"topRight"});return}l.innerHTML="",S();try{const s=await b(i);s.hits.length===0?c.info({title:"Bilgi",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(L(s.hits),g.refresh())}catch(s){c.error({title:"Hata",message:`Bir hata oluştu: ${s.message}`,position:"topRight"}),console.error("Fetch Error:",s)}finally{$(),o.reset()}}async function b(t){const o=new URLSearchParams({key:p,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true"}),i=await fetch(`${h}?${o}`);if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);return i.json()}function L(t){const o=t.map(({webformatURL:i,largeImageURL:s,tags:e,likes:r,views:a,comments:u,downloads:m})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img
              class="gallery-image"
              src="${i}"
              alt="${e}"
              loading="lazy"
            />
          </a>
          <div class="info">
            <p class="info-item"><b>Beğeni</b> ${r}</p>
            <p class="info-item"><b>Görüntüleme</b> ${a}</p>
            <p class="info-item"><b>Yorum</b> ${u}</p>
            <p class="info-item"><b>İndirme</b> ${m}</p>
          </div>
        </li>
      `).join("");l.innerHTML=o}function S(){var t;n.classList.remove("hidden"),(t=n.nextElementSibling)==null||t.classList.remove("hidden")}function $(){var t;n.classList.add("hidden"),(t=n.nextElementSibling)==null||t.classList.add("hidden")}
//# sourceMappingURL=index.js.map
