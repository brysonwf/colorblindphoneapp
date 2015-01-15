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

        //orig 1903 Crayola set

        var colors = {
            "black"     :   [0, 0, 0],
            "blue"      :   [31, 117, 254],
            "brown"     :   [180, 103, 77],
            "green"     :   [28, 172, 120],
            "orange"    :   [255, 117, 56],
            "red"       :   [238, 32, 77],
            "purple"    :   [146, 110, 174],
            "yellow"    :   [252, 232, 131]
        }

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

//            alert('R: ' + red + 'G: ' + green + 'B: ' + blue + 'A: ' + alpha);

            var closestColor = 'No Color Selected',
                testDistance = 0,
                closestDistance = 256;

            //loop through color array
            for (var k in colors){
                if (typeof colors[k] !== 'function') {
//                    alert('testing');

                    //distance function
//                    testDistance = Math.sqrt((red-colors[k][0])^2 + (green-colors[k][1])^2 + (blue-colors[k][2])^2);
                    testDistance = Math.sqrt(((red-colors[k][0])*0.3)^2 + ((green-colors[k][1])*0.59)^2 + ((blue-colors[k][2])*0.11)^2);


                    if (testDistance < closestDistance){
                        closestColor = k;
                    }
                }
            }

            alert(closestColor);

        });

    }
};jQuery(document).ready(function(){

    CameraManager.init();

});
