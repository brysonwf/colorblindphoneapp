var ZoomManager = {
    init: function(){
        $('.btn-zoomtoggle').click(function(){

            $this = $(this);
            $canvas = $('#canvas');

            $this.toggleClass('active');
            $('.btn-eyedropper').toggleClass('active');
            $('.btn-zoomtoggle').toggleClass('active');

            if ($this.hasClass('active')){
                $canvas.panzoom("disable");
            }else{
                $canvas.panzoom();
            }

        });

        $('.btn-eyedropper').click(function(){

            $this = $(this);
            $canvas = $('#canvas');

            $this.toggleClass('active');
            $('.btn-zoomtoggle').toggleClass('active');
            $('.btn-eyedropper').toggleClass('active');

            if ($this.hasClass('active')){
                $canvas.panzoom("disable");
            }else{
                $canvas.panzoom();
            }

        });
    }
}