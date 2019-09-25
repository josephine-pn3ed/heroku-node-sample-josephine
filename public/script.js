$(document).ready (function () {
    var socket = io();
    var active_users = 0;

    $('#send-btn').click (function () {
      if($('#form29').val() === ""){
        alert('You Are Not Registered!');
      }
    })

    $('#disconnect-btn').click (function () {
      socket.emit('inactive', $('#form29').val());
      $('#form29').val("");
      $(this).hide();
      $('.join').show();
    })

        $('form').submit(function(e){
          e.preventDefault();
          if ($('#m').val() != "" && $('#form').val() != "") {
          $('.container').append("<div class='Area'><div class='text R textR'>"+$('#form29').val()+" : "+$('#m').val()+"</div></div>");
            socket.emit('chat message', $('#form29').val()+" : "+$('#m').val());
          $('#m').val('');
          return false;
        }
      });

        $('#m').bind("keypress", function() {
          socket.emit('typing', $('#form29').val());
        })

        $("#submit-btn").click (function(e) {
          e.preventDefault();
          active_users++;
          $('#active').val("Active Users ("+active_users+")");
          $('.join').hide();
          $('#disconnect-btn').show();
          $('.container').append("<div class='Area'><div class='text R textR'>"+ $('#form29').val()+" has joined.</div></div>");
          $('.card-body').append('<p id='+$('#form29').val()+' class="text"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoghIkegWjq2JwAI57ES7XoQycJxWE8pgeTeddi8fbYZqo5hdpLQ" style="width: 20px">   '+$('#form29').val()+'<button id="active-btn" class="button5 btn btn-info btn-rounded R"></button></p>');
          socket.emit('username', $('#form29').val());
          socket.emit('connected', $('#form29').val());
          return false;
        })

          socket.on('username', function(msg) {
            if (msg != "") {
              $('.container').append("<div class='Area'><div class='text L textL'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoghIkegWjq2JwAI57ES7XoQycJxWE8pgeTeddi8fbYZqo5hdpLQ' style='width: 20px;border-radius: 10px;'>   "+msg+" has joined.</div></div>");
              console.log(msg+" is active.");
              
              window.scrollTo(0, document.body.scrollHeight);
              console.log(msg);
            }
          })

          socket.on('chat message', function(msg){
            $('#typing-area').hide();
            if ($('#form29').val() != "") {
              $('.container').append("<div class='Area'><div class='text L textL'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoghIkegWjq2JwAI57ES7XoQycJxWE8pgeTeddi8fbYZqo5hdpLQ' style='width: 20px;border-radius: 10px;'>   "+msg+"</div></div>");
              window.scrollTo(0, document.body.scrollHeight);
              console.log(msg);
            }
          });
          socket.on('typing', function (msg) {
            if (msg != "") {
                $('#typing').text(msg+" is typing...");
                $('#typing-area').show();
            }
          })
          socket.on('connected', function (msg) {
              active_users++;
              $('#active').val("Active Users ("+active_users+")");
              $('.card-body').append('<p id='+msg+' class="text"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoghIkegWjq2JwAI57ES7XoQycJxWE8pgeTeddi8fbYZqo5hdpLQ" style="width: 20px">   '+ msg +'<button id="active-btn" class="button5 btn btn-info btn-rounded R"></button></p>');
          })
          socket.on('inactive', function (msg) {
            $('.container').append("<div class='Area'><div class='text L textL'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoghIkegWjq2JwAI57ES7XoQycJxWE8pgeTeddi8fbYZqo5hdpLQ' style='width: 20px;border-radius: 10px;'>   "+msg+" has disconnected.</div></div>");
          })
      });