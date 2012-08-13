Brightcove-video-creator
========================

jQuery plugin to dynamically create brightcove video blocks with javascript

Requirements
------------

1. jQuery 1.5 or later
2. The element must have 3 data attribues: Brightcove ID, Brightcove Video ID and Brightcove Player Key (ex. <div data-bcid="823947" data-bcpid="89023890342890" data-bcpk="AFJE%20342098"></div>)


Options
-------

Default: If nothing is passed the video is created within the current element.

1. videoSelector - Dynamically loads brightcove video in to a specific element 
2. closeSelector - A close button that will hide the videoSelector element
3. carouselSelector - Only use if using brightcove video with jQuery cycle plugin. This will pause and start the carousel when interacting and showing videos.
