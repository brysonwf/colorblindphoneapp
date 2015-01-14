var CameraManager = {
    init: function () {

        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value

        // Wait for device API libraries to load
        //
        document.addEventListener("deviceready",onDeviceReady,false);

        // device APIs are available
        //
        function onDeviceReady() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
        }

        // Called when a photo is successfully retrieved
        //
        function onPhotoDataSuccess(imageData) {
            // Uncomment to view the base64-encoded image data
            // console.log(imageData);

            // Get image handle
            //
            var smallImage = document.getElementById('canvas');

            // Unhide image elements
            //
            smallImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;
        }


        // Called when a photo is successfully retrieved
        //
        function onPhotoURISuccess(imageURI) {
            // Uncomment to view the image file URI
            // console.log(imageURI);

            // Get image handle
            //
            var largeImage = document.getElementById('canvas');

            // Unhide image elements
            //
            largeImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            largeImage.src = imageURI;
        }

        // A button will call this function
        //
        function capturePhoto() {
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                destinationType: destinationType.DATA_URL });
        }

        // A button will call this function
        //
        function capturePhotoEdit() {
            // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
                destinationType: destinationType.DATA_URL });
        }

        // A button will call this function
        //
        function getPhoto(source) {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                destinationType: destinationType.FILE_URI,
                sourceType: source });
        }

        // Called if something bad happens.
        //
        function onFail(message) {
            alert('Failed because: ' + message);
        }


        $('.capture-photo').on('click',function(){
            capturePhoto();
        });
        $('.capture-editable').on('click',function(){
            capturePhotoEdit();
        });
        $('.capture-library').on('click',function(){
            getPhoto(pictureSource.PHOTOLIBRARY);
        });
        $('.capture-album').on('click',function(){
            getPhoto(pictureSource.SAVEDPHOTOALBUM);
        });

    }
}
;var EyeDroperManager = {
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

        $('.file-upload').change(function(){
            fileevent(this.files);
        });

    }
};jQuery(document).ready(function(){

    //app.initialize();
    //MapManager.init();
    CameraManager.init();
    EyeDroperManager.init();
    //DataManager.init();

});
