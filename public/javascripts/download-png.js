const png = document.getElementById("png");
png.addEventListener('click', () => {
    const target = document.getElementById("table");
    html2canvas(target).then((canvas) => {
        const img = canvas.toDataURL("img/png");
        var anchor = document.createElement('a');
        anchor.setAttribute('href', img);
        anchor.setAttribute('download', "Directorio.png");
        anchor.click();
        anchor.remove();
    });
});