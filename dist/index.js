import{S as m,i as n}from"./assets/vendor-B2mb6eXk.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const d=document.querySelector("#search-form"),c=document.querySelector(".gallery"),l=document.querySelector(".loader"),p="32475203-0397f154fda8b2c2a6bae1f0a",h="https://pixabay.com/api/",y=new m(".gallery a",{captionsData:"alt",captionDelay:250});d.addEventListener("submit",g);async function g(a){a.preventDefault();const r=a.currentTarget,o=r.elements.searchQuery.value.trim();if(o===""){n.error({title:"Hata",message:"Arama kutusu boş olamaz!",position:"topRight"});return}c.innerHTML="",S();try{const s=await b(o);s.hits.length===0?n.info({title:"Bilgi",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(L(s.hits),y.refresh())}catch(s){n.error({title:"Hata",message:`Bir hata oluştu: ${s.message}`,position:"topRight"}),console.error("Fetch Error:",s)}finally{$(),r.reset()}}async function b(a){const r=new URLSearchParams({key:p,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true"}),o=await fetch(`${h}?${r}`);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);return o.json()}function L(a){const r=a.map(({webformatURL:o,largeImageURL:s,tags:e,likes:t,views:i,comments:u,downloads:f})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img
              class="gallery-image"
              src="${o}"
              alt="${e}"
              loading="lazy"
            />
          </a>
          <div class="info">
            <p class="info-item"><b>Beğeni</b> ${t}</p>
            <p class="info-item"><b>Görüntüleme</b> ${i}</p>
            <p class="info-item"><b>Yorum</b> ${u}</p>
            <p class="info-item"><b>İndirme</b> ${f}</p>
          </div>
        </li>
      `).join("");c.innerHTML=r}function S(){l.classList.remove("hidden")}function $(){l.classList.add("hidden")}
//# sourceMappingURL=index.js.map
