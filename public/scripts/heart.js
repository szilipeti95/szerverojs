$( document ).ready(function() {
    $( ".heart-button" ).click(function() {
        if ($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    });
    
    $ (".album").click(function() {
        document.location.href = $(this).attr("ref");
    })
});