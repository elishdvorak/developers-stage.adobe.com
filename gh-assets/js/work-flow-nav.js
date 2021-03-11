$(document).ready(function(){

    $('.work-flow_menu ul li').on("click", function(e) {
      $('.work-flow_menu ul li.active').removeClass('active');
      $(this).addClass("active");

      if (!($(".work-flow_code").is(":visible"))) {
        var $el = $(this).children();
        $($el).toggleClass('open');
      }
      else {
        $('div.work-flow-menu-support.work-flow-support-mode-mobile.open ').removeClass('open');
        //remove recently added info copy and button
        $( "#sdk-support .work-flow-menu-support" ).remove();

        //now cloned and prepend new selected info copy and button
        var clonedEl = $(this).children().clone(true,true);
        var $currentEl = $(clonedEl[1]).removeClass('work-flow-support-mode-mobile');
        var itemID =  $(this).attr('id') + "-code";

        //with old copy and button removed, prepend newly clone copy and button, make sure we're not at the home menu
        if($('#home-menu').length <= 0){
          $($currentEl).prependTo("#sdk-support");
        }

        //remove the open class on all children and mavailable the one selected
        var $el = $('.code-viewer-wrapper').children();
        $($el).removeClass('code-window-opened');
        $(".code-viewer-wrapper #" + itemID + ".sdk-embed-wrapper").addClass('code-window-opened');
      }

  });

 
  if ($(".use-case-menu-item").is(":visible")) {      
    
      $('.use-case-menu-item').on("click", function(e) {

        if(!$(this).hasClass('open')){
          var $el = $(this).siblings();  //use-case-menu-support

          $('.api-use-case_menu li .use-case-menu-item').removeClass('open');
          $('.api-use-case_menu li .use-case-menu-support').removeClass('open');
          $('.api-use-case_menu li .use-case-menu-support .uc-sub-menu').removeClass('open');
          $('.api-use-case_menu li .use-case-menu-support .uc-sub-menu').removeClass('active');
  
          $(this).toggleClass('open');

          var $firsChildActive = $($el).children()[0];

          $($el).toggleClass('open');  

          $($firsChildActive).toggleClass('open');  
          $($firsChildActive).addClass('active');           
        }    
        
      });

      UC_menuOpen();
  }


  $('.work-flow_menu ul li').first().click();


  $('.main-nav-hamburger').on( "click", function(e) {
    $('.main-nav-wrapper').toggleClass('opened');
  });

  $('.sub-nav-menu-wrapper').on( "click", function(e) {
    $( this ).toggleClass( 'opened');
  });

  $('.sub-nav-menu-item').on( "click", function(e) {
    $( this ).toggleClass( 'active');
  });

  




    //window resize to properly deal with the animation on mobile TBD
    // run test on resize of the window
    $(window).resize(resetWorkFlowMenu);

  });

//Function to the css rule
function resetWorkFlowMenu(){
  // console.log("deactivating work flow menu if active")
  $('div.work-flow-support-mode-mobile.open').removeClass('open');
  $('div.work-flow-menu-item.active').removeClass('active');
}

$(document).load(function(){
  //Prism copy to clipboard
  //
  // al pre tags on the page
  const pres = document.getElementsByTagName("pre")

  //
  // reformat html of pre tags
  if (pres !== null ) {
    for (let i = 0; i < pres.length; i++) {
      // check if its a pre tag with a prism class
      if (isPrismClass(pres[i])) {
        // insert code and copy element
        pres[i].innerHTML = `<div class="copy">copy</div><code class="${pres[i].className}">${pres[i].innerHTML}</code>`
        console.log(pres[i].innerHTML)
      }
    }
  }
})


//get RSS Feed
function getRSSFeed(RSS_URL){
  $.ajax(RSS_URL, {
    accepts: {
      xml: "application/rss+xml"
    },
  
    dataType: "xml",
  
    success: function(data) {
      $(data)
        .find("item")
        .each(function() {
          const el = $(this);
  
          const template = `
            <article>
              <img src="${el.find("link").text()}/image/large.png" alt="">
              <h2>
                <a href="${el
                  .find("link")
                  .text()}" target="_blank" rel="noopener">
                  ${el.find("title").text()}
                </a>
              </h2>
            </article>
          `;

          // <div>
          //     <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg01.jpg" alt=""> </a>
          //     <p class="blog-title">
          //         Adding Annotations to a PDF Using Adobe PDF Embed API
          //     </p>  
          //     <p class="blog-text">Have you ever wanted to markup a PDF file interactively with your team the same way you can in Microsoft Office 365 or Google Docs?</p>
          // </div> 
          document.body.insertAdjacentHTML("beforeend", template);
        });
    }
  });
}

$('.has-sub').click(function(e) {
  e.preventDefault();
  var $el = $(this).siblings();
  $($el).addClass('sub-dropdown');
  return false;
  
});
  
function UC_menuOpen(hasEvent){
  //api-use-case_menu
  var el = $('.api-use-case_menu li .use-case-menu-support .uc-sub-menu');

  if($(el).hasClass('active')){
    var activeItem = $('.api-use-case_menu li .use-case-menu-support .uc-sub-menu.active');
    var itemParent = $(activeItem).parent();
    var _root = $(activeItem).parent().siblings();
    $(_root).toggleClass('open');
    $(itemParent).toggleClass('open');
    console.log("we found an active", _root)
  }
}
