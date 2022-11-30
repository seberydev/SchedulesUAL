const png = document.getElementById("png");
png.addEventListener('click', () => {
    const btn = document.querySelectorAll("#btn");
    const target = document.getElementById("table");

    [...btn].forEach(a => {
        a.style.display = 'none'
    });

    html2canvas(target).then((canvas) => {
        const img = canvas.toDataURL("img/png");
        var anchor = document.createElement('a');
        anchor.setAttribute('href', img);
        anchor.setAttribute('download', "Directorio.png");
        anchor.click();
        anchor.remove();
    });

    [...btn].forEach(a => {
        a.style.display = 'inline-block'
    });
});