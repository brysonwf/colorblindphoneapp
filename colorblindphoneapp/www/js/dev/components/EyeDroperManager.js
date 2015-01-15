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

                    if (testDistance < closestDistance){
                        alert(k + ' is closer');
                        closestColor = k;
                    }
                }
            }

            alert(closestColor);

        });

    }
}