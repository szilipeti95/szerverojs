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


    $ (".grid-item").click(function() {
        if ($(this)[0].hasAttribute("ref") ) {
            document.location.href = $(this).attr("ref");
        }
    })

    $ (".rounded-button").click(function() {
        if ($(this)[0].hasAttribute("ref") ) {
            document.location.href = $(this).attr("ref");
        }
    })
});

var uploadModal = document.getElementById("uploadModal");
var uploadButton = document.getElementById("uploadButton");

uploadButton.onclick = function() {
    uploadModal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == uploadModal) {
    uploadModal.style.display = "none";
  }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image-presenter')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}