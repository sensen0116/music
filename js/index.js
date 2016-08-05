  $(function(){
      var arr=[
      {src:'song/1.mp3',name:'倔强',geshou:'五月天',sj:'04:19',img:'images/0.jpg'},
      {src:'song/music/2.mp3',name:'恋爱ing',geshou:'五月天',sj:'03:26',img:'images/0.jpg'},
      {src:'song/music/3.mp3',name:'伤心的人别听慢歌',geshou:'五月天',sj:'03:30',img:'images/0.jpg'},
      {src:'song/music/4.mp3',name:'突然好想你',geshou:'五月天',sj:'04:29',img:'images/0.jpg'},
      {src:'song/music/5.mp3',name:'温柔',geshou:'五月天',sj:'08:10',img:'images/0.jpg'},
      {src:'song/music/6.mp3',name:'我不愿你一个人',geshou:'五月天',sj:'04:21',img:'images/0.jpg'},
      {src:'song/music/7.mp3',name:'知足',geshou:'五月天',sj:'04:04',img:'images/0.jpg'}

      ]
      $(arr).each(function(index,v){
       $('<li data-id='+index+'><span class="gename">'+v.name+'</span><span class="geshou">'+v.geshou+'</span><span class="time3">'+v.sj+'</span><div class="tubiao"><div class="delete"></div><div class="dianzan"></div></div></li>').appendTo('.player-music ul')
      })
       var currentindex;
       $('.player-music ul li').on('click',function(){
            currentindex=$(this).index();
            audio.src=arr[currentindex].src;
            audio.play();
       })

      var $index=$('.list1');
      var $next=$('.list3')
      $next.on('click',function(){
        if(currentindex==undefined){
           currentindex=0;
        }else{
          currentindex+=1;
       
        }
         if(currentindex>=arr.length){
          currentindex=0;
        }
        audio.src=arr[currentindex].src;
        audio.play();
      })
       $index.on('click',function(){
        if(currentindex==undefined){
           currentindex=0;
        }else{
          currentindex-=1;
        
        }
        if(currentindex<0){
          currentindex=arr.length-1;
        }
        audio.src=arr[currentindex].src;
        audio.play();
      })
      


       var audio=$("#audio").get(0);
       var $audio=$('#audio');
        $audio.on('ended',function(){
           $next.trigger('click');

        });


       $('.list2').on('click',function(){
        if(currentindex==undefined){
           currentindex=0;
           audio.src=arr[currentindex].src; 
         }

       	if(audio.paused){
       		audio.play();
       	}else{
       		audio.pause();
       	}
       })
       $audio.on('play',function(){
       	$('.list2').addClass('stop')
          $('.player-music ul li')
          .removeClass('song1')
          .eq(currentindex)
          .addClass('song1')
          var i=arr[currentindex];
          
          $('.tutu1-1').text(i.name);
          $('.tutu2').text(i.geshou);
          $('.list0-1').text(i.sj);
          $('.tutu1-3').text(currentindex+1)
          console.log( $('.tutu').find('img').attr("src"))
          $('.tutu').find('img').attr({src:i.img})
       })

        $audio.on('pause',function(){
       	$('.list2').removeClass('stop')
       })

       $(document).on('keyup',function(e){
            if(e.shiftKey&&e.keyCode===80){
                 $('.list2').trigger('click')
            }
       })
//删除行；
      $('.tubiao .delete').on('click',function(){
        var m=$(this).closest('li').index()
        $(this).closest('li').remove();
        console.log(m)
        arr.splice(m,1)
        audio.src='';
         
      })


  //调整时间；
       $('.yinliang2').on('click',function(e){
            audio.volume=e.offsetX/$(this).width()
       })

       $('.yinliang1').on('click',function(){
            
            if(!$(this).attr('aa')){
                $(this).attr('aa',audio.volume)
                audio.volume=0;
            }else{
                audio.volume=$(this).attr('aa')
                $(this).removeAttr('aa')
            }
           
       })
        $('.yinliang2-2').on('mousedown',function(e){
             e.stopPropagation();
             
             $('.yinliang2').addClass('moving')
          $(document).on('mousemove',function(e){
                
              var left=e.pageX-$('.yinliang2-1').offset().left;
               
             var v=left/$('.yinliang2').width();
              v=(v<0)?0:v;
              v=(v>1)?1:v;
              console.log(v)
              audio.volume=v;
          })

       })
        $(document).on('mouseup',function(){
          $('.yinliang2').removeClass('moving')
            $(document).off('mousemove')
        })





       $audio.on('volumechange',function(){
      
             if(audio.volume===0){
                 $('.yinliang1').addClass('stop1')
             }else{
                 $('.yinliang1').removeClass('stop1')
             }
            var w=audio.volume*$('.yinliang2').width();
            $('.yinliang2-1').width(w)
            $('.yinliang2-2').css({left:w-3})
       })


       $('.yinliang2-2').on('click',function(e){
            e.stopPropagation();
       })
  //清空列表
       $('.biaotou2').on('click',function(){
        $('.player-music ul').empty();
         audio.src='';
         $('.tutu1-1').text('好听的歌');
          $('.tutu2').text('爱你的人');
          $('.list0-1').text('播放时间');
       })




  //音乐时间

       $('.going').on('click',function(e){
           
            audio.currentTime=e.offsetX/$(this).width()*audio.duration;
       })
      
        $('.going2').on('mousedown',function(e){
              e.stopPropagation();
           $(document).on('mousemove',function(e){

            var t=(e.pageX-$('.going').offset().left)/$('.going').width()

             audio.currentTime=audio.duration*t;
              console.log( audio.currentTime)
           })
        })

         $(document).on('mouseup',function(){
            $(document).off('mousemove');
        })

       $audio.on('timeupdate',function(){
           var s=$('.going').width()*(audio.currentTime/audio.duration);

           $('.going1').width(s)
           $('.going2').css({left:s-$('going2').width()})
       })
        
    $('.going2').on('click',function(e){
         e.stopPropagation();
       })
       var  huandiao=function(shijian){
        if(isNaN(shijian)){
          currentindex=0
        }
           shijian=parseInt(shijian);
           var min=parseInt(shijian/60);
           min=(min<10)?("0"+min):min;
           var second=parseInt(shijian%60);
           second=(second<10)?("0"+second):second;
           return min+':'+second;
       }



     $('.going').on('mouseover',function(e){

        var tu=e.pageX-$(this).offset().left;
      
        $('.time').css({display:"block",left:tu+150-$('.time').width()/2})
        var shijian=tu/$(this).width()*audio.duration;
        $('.time').find('span').html(huandiao(shijian))

        $('.going').on('mousemove',function(e){
        var tu1=e.pageX-$(this).offset().left;
         var tu=e.pageX-$(this).offset().left;
        $('.time').css({left:tu1+150-$('.time').width()/2})
        var shijian=tu/$(this).width()*audio.duration;
        $('.time').find('span').html(huandiao(shijian))
    
        })
     })
      $(document).on('mouseout',function(){
        $('.time').css({display:'none'})  
        $('.going').off('mousemove')
      })
  })