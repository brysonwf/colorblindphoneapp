var EyeDroperManager = {
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
}