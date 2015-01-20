var ZoomManager = {
    init: function(){
        $('.btn-zoomtoggle').click(function(){

            $this = $(this);
            $canvas = $('#canvas');

            $this.addClass('active');
            $('.btn-eyedropper').removeClass('active');

            if ($canvas.panzoom("isDisabled")){
                $canvas.panzoom("enable");
            }else{
                $canvas.panzoom();
            }

        });

        $('.btn-eyedropper').click(function(){

            $this = $(this);
            $canvas = $('#canvas');

            $this.addClass('active');
            $('.btn-zoomtoggle').removeClass('active');

            if (!$canvas.panzoom("isDisabled")){
                $canvas.panzoom("disable");
            }

        });
    }
}