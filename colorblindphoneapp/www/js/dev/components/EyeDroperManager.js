var EyeDroperManager = {
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
                closestDistance = 0;

            //loop through color array
            for (var key in colors){
                if (typeof colors[key] !== 'function') {

                    //distance function
                    testDistance = sqrt((red-colors[key][0])^2 + (green-colors[key][1])^2 + (blue-colors[key][2])^2);

                    if (testDistance < closestDistance){
                        closestColor = key;
                    }
                }
            }

            alert(closestColor);

        });

    }
}