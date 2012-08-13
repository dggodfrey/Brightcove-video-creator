/** 
 * jQuery bcVideo Plugin 1.0
 *
 * http://davidgodfrey.info/bcVideo
 *
 * Copyright (c) 2012 David Godfrey
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){
  $.fn.bcVideo = function(options) {

    var
      defaults = {
        videoSelector: '', //Used if the brightcove video needs to be loaded into another div. Default is $(this)
        closeSelector: '', //If the video selector is set, what is the selector for the close button?
        carouselSelector: '' //selector for jQuery cycle carousel - only use if you are using jquery Cycle with brightcove video
      },
      settings = $.extend({}, defaults, options);

    //brightcove videos must have a unique id. This will create one if one isn't supplied
    function BCuniqueID(){
        function guid(){
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (guid() + guid() + "-" + guid());
    }

    //this will execute the creation of the Video Player creation from brightcove. Only after a click!
    function checkBC(){
        try {
            var test = brightcove;
            var test = APIModules;

            brightcove.createExperiences();
        } catch(err) {
           //error
        }
    }

    //This will attach to the close button to close the video if in a different div
    if(settings.closeSelector.length > 0){
        $(settings.closeSelector).click(function(e){
            $(settings.videoSelector + " div.bc-video").html("");
            $(settings.videoSelector).fadeOut(500);

            if(settings.carouselSelector.length > 1){
                $(settings.carouselSelector).cycle("resume");
            }

            e.preventDefault();
        });
    }

    //get current protocol - once
    if(window.location.protocol == "https:"){
            var curProtocol = true;
        }else{
            var curProtocol = false;
        };
            
    //for each brightcove video do:
    //1. Get video IDs from data elements tied to the element
    //2. Create the video as an html video block (a little different if protocol is https)
    //3. If there is a div for video, load it into that div. Otherwise load it in-line in current element.
    this.each(function() {
        var $this = $(this);
        var id = $this.attr("data-id") || BCuniqueID();
        var bcpid = $this.attr("data-bcpid");
        var bcpk = $this.attr("data-bcpk");
        var bcid = $this.attr("data-bcid");
        
        var BCHTML = '<div class="brightCoveWrapper"> \
                <object id="myExperienceBanner'+id+'" class="BrightcoveExperience"> \
                  <param name="width" value="545" /> \
                  <param name="height" value="350" /> \
                  <param name="wmode" value="transparent" /> \
                  <param name="isVid" value="true" /> \
                  <param name="isUI" value="true" /> \
                  <param name="autoStart" id="autoStart" value="true" /> \
                  <param name="dynamicStreaming" value="true" /> \
                  <param name="playerID" value="'+bcpid+'" /> \
                  <param name="playerKey" value="'+bcpk+'" /> \
                  <param name="@videoPlayer" value="'+bcid+'" />'
        if(curProtocol){
            BCHTML += '<param name="secureConnections" value="true" /></object></div>';
        }else{
            BCHTML += '</object></div>';
        }

        if(settings.videoSelector.length > 0){
            $this.click(function(e){
                //if there is no div inside of the video selector, create one
                if($(settings.videoSelector + " div.bc-video").length < 1){
                    $(settings.videoSelector).prepend("<div class='bc-video'></div>");
                }
                $(settings.videoSelector + " div.bc-video").html(BCHTML);
                $(settings.videoSelector).fadeIn(500, checkBC); 

                if(settings.carouselSelector.length > 1){
                    $(settings.carouselSelector).cycle("pause");
                }

                e.preventDefault();
            });
        }else{ //assumed it is inline and there is no other div or carousel.
            $this.click(function(e){
                $this.removeClass($this.selector.replace(/[\#.]/g, "")).css({'background':'#000'});
                $this.html(BCHTML);
                checkBC();

                e.preventDefault();
            });
        }
    });

    // returns the jQuery object to allow for chainability.
    return this;
  }  
})(jQuery);