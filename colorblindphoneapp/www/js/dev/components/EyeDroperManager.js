EyeDroperManager = {
    init: function(){

        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");

        var sc = document.createElement("canvas");
        var sctx = sc.getContext("2d");
        var colors = [];
        var ui_colors = document.getElementById("colors");

        var out = document.getElementById("output");
        var data;

        c.addEventListener("click", function (event) {
            var pt = [window.scrollX + event.clientX - this.offsetLeft, window.scrollY + event.clientY - this.offsetTop];
            var index = 4 * (pt[1] * c.width + pt[0]);
            var color = 'rgba(' + data[index].toString() + ', ' + data[index + 1].toString() + ', ' + data[index + 2].toString() + ', ' + (data[index + 3] / 255).toString() + ')';
            colors.push(color);
            var item = document.createElement("li");
            item.style.backgroundColor = color;
            ui_colors.appendChild(item);

            out.value = "['" + colors.join("', '") + "']";
            });

        var onload = function () {
            var width = ctx.canvas.width = sctx.canvas.width = this.width;
            var height = ctx.canvas.height = sctx.canvas.height = this.height;
            sctx.drawImage(this, 0, 0);
            data = sctx.getImageData(0, 0, width, height).data;

            ctx.drawImage(this, 0, 0);
            }

        var fileevent = function (files) {
            var filter = /image.*/;
            for (var i = 0, numFiles = files.length; i < numFiles; i++) {
            var file = files[i];
            if (!file.type.match(filter)) continue;

            var img = document.createElement("img");

            var reader = new FileReader();
            reader.onload = (function (aImg, aCtx, sCtx) {
            return function (e) {
                aImg.onload = onload;
                aImg.src = e.target.result;
            };
            })(img, ctx, sctx);
            reader.readAsDataURL(file);
        }
        }
    }
}