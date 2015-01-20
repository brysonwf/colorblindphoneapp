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
            EyeDroperManager.init();
            $('.btn-eyedropper').toggleClass('active');


            var $canvas = $('#canvas');

            if ($canvas.width() > $canvas.height()){
                $canvas.addClass('rotate90');
            }
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
            EyeDroperManager.init();
            $('.btn-eyedropper').toggleClass('active');

            var $canvas = $('#canvas');

            if ($canvas.width > $canvas.height){
                $canvas.addClass('rotate90');
            }
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

        $('img').on('click', function(e){

            if(!this.canvas) {
                this.canvas = $('<canvas />')[0];
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
            }

            var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

            var red = pixelData[0],
                green = pixelData[1],
                blue = pixelData[2],
                alpha = pixelData[3];

//            alert(red + ', ' + green + ', ' + blue);

            var closestColor = 'No Color Selected',
                testDistance = 0,
                closestDistance = 999999999999999999999999999;

            //loop through color array
            for (var k in colors){
                if (typeof colors[k] !== 'function') {
                    //distance function
//                    testDistance = Math.sqrt((red-colors[k][0])^2 + (green-colors[k][1])^2 + (blue-colors[k][2])^2);
                    testDistance = Math.sqrt(
                        Math.pow(((colors[k][0]-red)*0.3), 2)
                        + Math.pow(((colors[k][1]-green)*0.59), 2)
                        + Math.pow(((colors[k][2]-blue)*0.11), 2)
                    );

//                    alert (testDistance+' < '+closestDistance);

                    if (testDistance < closestDistance){
//                        alert(k + ' is closer');
                        closestDistance = testDistance;
                        closestColor = k;
                    }
                }
            }

            alert(closestColor);


        });

        var colors = {
            "black"     :   [0, 0, 0],
            "white"     :   [255, 255, 255],
            "blue"      :   [0, 0, 255],
            "brown"     :   [180, 103, 77],
            "green"     :   [0,128,0],
            "orange"    :   [255, 117, 56],
            "red"       :   [255, 0, 0],
            "purple"    :   [128,0,128],
            "yellow"    :   [255,255,0],
            "lime"      :   [0, 255, 0],
            "cyan"      :   [0, 255, 255],
            "magenta"   :   [255, 0, 255],
            "Silver"    :   [192, 192, 192],
            "Gray"      :   [128,128,128],
            "Maroon"    :   [128,128,128],
            "Olive"     :   [128,128,0],
            "teal"      :   [0,128,128],
            "navy"      :   [0,0,128]
        }

    }
};var ZoomManager = {
    init: function(){
        $('.btn-zoomtoggle').click(function(){

            $this = $(this);
            $canvas = $('#canvas');

            $this.addClass('active');
            $('.btn-eyedropper').removeClass('active');

            $canvas.panzoom();

        });

        $('.btn-eyedropper').click(function(){

            $this = $(this);
            $canvas = $('#canvas');

            $this.addClass('active');
            $('.btn-zoomtoggle').removeClass('active');

            $canvas.panzoom("disable");

        });
    }
};jQuery(document).ready(function(){

    CameraManager.init();
    ZoomManager.init();

});
