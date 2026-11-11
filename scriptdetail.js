const detailParams = new URLSearchParams(window.location.search);
const detailFields = {
    name: document.querySelector("#detail-name"),
    region: document.querySelector("#detail-region"),
    story: document.querySelector("#detail-story"),
    description: document.querySelector("#detail-description"),
    meaning: document.querySelector("#detail-meaning"),
    image: document.querySelector("#detail-image"),
    imageCredit: document.querySelector("#detail-image-credit")
};
const detailValues = {
    name: detailParams.get("name"),
    region: detailParams.get("region"),
    story: detailParams.get("story"),
    description: detailParams.get("detail"),
    meaning: detailParams.get("meaning"),
    image: detailParams.get("image"),
    imageAlt: detailParams.get("imageAlt"),
    imageCredit: detailParams.get("imageCredit"),
    imageSource: detailParams.get("imageSource"),
    imageLicense: detailParams.get("imageLicense"),
    imageNote: detailParams.get("imageNote")
};

if (["name", "region", "story", "description", "meaning", "image"].some((key) => !detailValues[key])) {
    document.querySelector("#detail-page").innerHTML = `
      <section class="detail-not-found">
        <p class="eyebrow"><span class="eyebrow-line"></span> MOTIF TIDAK DITEMUKAN</p>
        <h1>Yuk, kembali ke koleksi.</h1>
        <p>Pilih ikon panah pada salah satu motif untuk membaca cerita lengkapnya.</p>
        <a class="primary-button" href="index.html#koleksi">Lihat koleksi <span aria-hidden="true">↗</span></a>
      </section>`;
} else {
    detailFields.name.textContent = detailValues.name;
    detailFields.region.textContent = detailValues.region;
    detailFields.story.textContent = detailValues.story;
    detailFields.description.textContent = detailValues.description;
    detailFields.meaning.textContent = detailValues.meaning;

    if (detailValues.image.startsWith("data:image/svg+xml;charset=UTF-8,") ||
        detailValues.image.startsWith("images/") ||
        detailValues.image.startsWith("https://upload.wikimedia.org/") ||
        detailValues.image.startsWith("https://encrypted-tbn0.gstatic.com/images?")) {
        detailFields.image.src = detailValues.image;
        detailFields.image.alt = detailValues.imageAlt || `Ilustrasi motif batik ${detailValues.name}`;
    } else {
        detailFields.image.hidden = true;
    }

    if (detailValues.imageCredit && detailValues.imageSource && detailValues.imageLicense) {
        const source = new URL(detailValues.imageSource);
        const license = new URL(detailValues.imageLicense);
        if (source.hostname === "commons.wikimedia.org" && source.pathname.startsWith("/wiki/File:") &&
            license.hostname === "creativecommons.org") {
            detailFields.imageCredit.hidden = false;
            detailFields.imageCredit.textContent = `${detailValues.imageCredit} • `;
            const sourceLink = document.createElement("a");
            sourceLink.href = source.href;
            sourceLink.target = "_blank";
            sourceLink.rel = "noreferrer";
            sourceLink.textContent = "sumber";
            const licenseLink = document.createElement("a");
            licenseLink.href = license.href;
            licenseLink.target = "_blank";
            licenseLink.rel = "noreferrer";
            licenseLink.textContent = "lisensi";
            detailFields.imageCredit.append(sourceLink, " • ", licenseLink);
            if (detailValues.imageNote) {
                detailFields.imageCredit.append(document.createElement("br"), detailValues.imageNote);
            }
        }
    }

    if (detailValues.imageNote && detailFields.imageCredit.hidden) {
        detailFields.imageCredit.hidden = false;
        detailFields.imageCredit.textContent = detailValues.imageNote;
    }

    document.title = `${detailValues.name} — AZ Batik`;
}
