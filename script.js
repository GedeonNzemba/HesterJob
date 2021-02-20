$(document).ready(function () {
    const imageBaseURL = 'https://arthurfrost.qflo.co.za/';
    const musicBaseURL = 'https://arthurfrost.qflo.co.za/';

            $.ajax({
                type: "POST",
                url: "https://arthurfrost.qflo.co.za/php/getTimeline.php",
                dataType: "json",
                success: function (result, status, xhr) {
                  

                    const background =  result['Body'][0]['Background'];
                    const about = result['Body'][0]['About'];
                   
                    const appTitle = result['Timeline'][0]['Title'];
                    const appDescription = result['Timeline'][0]['Description'];
                    const appImage = imageBaseURL+result['Timeline'][0]['Image'];

                let timeline = result['Timeline'];
                 timeline.shift();

                 // LIMIT TIMELINE TO 100
                 timeline = timeline.slice(1, 101)
                    

                    // SET THE BACKGROUND PROPERTIES ON THE BODY
                    $('body').css({'background-image': 'url('+ imageBaseURL + background + ')', 'background-repeat': 'no-repeat'});
                    // $('body').css('opacity', backgroundOpacity / 100);

                    //SET ABOUT 
                    $(".about").html(about);

                    //SET APP HEADER AND DESCRIPTION
                    $(".app-header").html(appTitle)
                    $(".app-desc").html(appDescription)
                    $('.app-img').attr('src', appImage);

               

                    var vimg;
                    var html = '<div class="column">';
                    html += '<div class="card">';
                    html += '<div class="row">';
                    html += '<div class="userimg"> </div>';
                    html += '<div>';
                    html += '<div class="">';
                    html += '<h4 class="title"></h4>';
                    html += '<div class="listen"></div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                

    timeline.forEach(function (ele, i) {
        $('#printcard').append(html);
                    //FOR IMAGE
        uimg = imageBaseURL+ele.Image;
      
        var $img = $("<img/>");
        $img.width('340px');
        $img.height('220px');
        $img.css("display", 'block');
        $img.attr("src", uimg);
        $(".userimg:eq("+i+")").append($img)

        //  FOR AUDIO       
        var $listen = $("<a class='button'>Listen/Download</a>");
        $listen.attr("href", musicBaseURL+ele.Audio)
        $(".listen:eq("+i+")").append($listen)
        
            //FOR TITLE
            $(".title:eq("+i+")").append(ele.Title)


       });

       
                },
                error: function (xhr, status, error) {
                    alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
});