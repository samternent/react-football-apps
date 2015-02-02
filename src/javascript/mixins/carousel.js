/* 3d Carousel image slider */

(function ( window ) {
  'use strict';

  /* Cross browser transforms */

  var transforms = {
    'webkitTransform':  '-webkit-transform',
    'OTransform':       '-o-transform',
    'msTransform':      '-ms-transform',
    'MozTransform':     '-moz-transform',
    'transform':        'transform'
  };


  /* Carousel constructor class */

  var Carousel = function ( el, options ) {
    var that = this;

    this._settings = options || { };

    // options
    this._settings.startingFace = this._settings.startingFace || 1;
    this._settings.autoplay = this._settings.autoplay || false;
    this._settings.slideshowInterval = this._settings.slideshowInterval || 3000;

    // this._element = document.getElementById( el );
    this._element = el;
    this._dragArea = document.body;
    this._navButtons = document.querySelectorAll( '.navigation-control' );
    this._panelCount = this._element.children.length;
    this._theta = 0;
    this._currentFace = 0;
    this._segmentSize = 360 / this._panelCount;
    this._lastDragX = null;
    this._autoplayTimeout = null;


    var i = 0,
    j = 0,
    len = this._element.children.length,
    buttonLen = this._navButtons.length;

    for ( ; i < len; i++ ) {
      this._element.children[ i ].style[ transforms[ 'webkitTransform' ] ] =
      'rotateY( ' + ( i * ( this._segmentSize ) ) + 'deg )' +
      'translateZ( ' + this._getTranslateZ() + 'px )';
    }

    for ( ; j < buttonLen; j++ ) {
      this._navButtons[ j ].addEventListener( 'click', function ( event ) {

        var value = event.target.getAttribute( 'data-increment' );
        that._rotateWheel( value );
      }, false );
    }

    this._element.addEventListener( 'touchmove', function (e) {
      e.preventDefault();
      var currentX = e.touches[0].clientX;
      var dragValue = currentX > that._lastDragX ? 1 : -1;

      that._dragRotate( dragValue );
      that._lastDragX = currentX;
    });


    this._element.addEventListener( 'touchend', function (e) {
      that._theta = Math.round( that._theta / that._segmentSize ) * that._segmentSize;
      that._rotateWheel( 0 );
    });


    this._rotateWheel( this._settings.startingFace );

    if ( this._settings.autoplay ) {
      this.play();
    }
  };




  /* Returns translateZ value based on size and panel count */

  Carousel.prototype._getTranslateZ = function () {
    return Math.round( ( this._element.children[ 0 ].clientWidth / 2 ) / Math.tan( Math.PI / this._panelCount ) );
  };



  /* Returns number of front facing slide in gallery */

  Carousel.prototype._getFaceNumber = function ( angle ) {
    if ( angle > 360 || angle < -359) {
      return this._getFaceNumber( ( Math.abs( angle ) ) - 360 );
    } else {
      if ( this._theta < 1 ) {
        return Math.abs( this._panelCount / ( 360 / angle ) ) + 1;
      } else {
        return Math.abs( this._panelCount / ( 360 / angle ) );
      }
    }
  };



  /* Sets the correct opacity for face positions */

  Carousel.prototype._checkOpacity = function () {
    var face = Math.round( this._getFaceNumber( this._theta ) );

    var position = this._theta > 0 ? ( this._panelCount + 1 ) - face : face;
    var newPos = position === ( this._panelCount + 1 ) ? 1 : position;

    // hide out of sight faces
    var i = 0,
    len = this._element.children.length;

    for (; i < len; i++) {
      this._element.children[ i ].style[ 'opacity' ] = 0.1;
      this._element.children[ i ].className = 'background-panel';
    }

    var main = this._element.children[ newPos - 1 ];
    var leftSide = this._element.children[ newPos > this._panelCount - 1 ? 0 : newPos ];
    var rightSide = this._element.children[ newPos - 2 < 0 ? this._panelCount - 1 : newPos - 2 ];

    // change opacity for active panels
    main.style[ 'opacity' ] = 1;
    leftSide.style[ 'opacity' ] = 0.5;
    rightSide.style[ 'opacity' ] = 0.5;

    // add classes for custome styles
    main.className = 'main-panel';
    rightSide.className = 'right side-panel';
    leftSide.className = 'left side-panel';
  };



  /* Rotate wheel by increment value */

  /* Only use 1 or -1 */

  Carousel.prototype._rotateWheel = function ( value ) {
    var increment = parseInt(value);

    this._theta += ( 360 / this._panelCount ) * increment * -1;

    this._element.style[ transforms[ 'webkitTransform' ] ] =
    'translateZ(-' + this._getTranslateZ() + 'px)' +
    'rotateY(' + this._theta + 'deg)';

    this._checkOpacity();
  };


  /* Drag carousel */

  Carousel.prototype._dragRotate = function ( distance ) {
    this._theta += distance*10;

    this._element.style[ transforms[ 'webkitTransform' ] ] =
    'translateZ(-' + this._getTranslateZ() + 'px)' +
    'rotateY(' + this._theta + 'deg)';

    this._checkOpacity();
  };


  /* Play Slide Show */

  Carousel.prototype.play = function () {
    var that = this;
    clearInterval( this._autoplayTimeout );
    this._autoplayTimeout = setInterval(function () {
      that._rotateWheel( 1 );
    }, this._settings.slideshowInterval);
  };


  /* Stop Slide Show */

  Carousel.prototype.stop = function () {
    clearInterval( this._autoplayTimeout );
  };

  window.mgrCarousel = Carousel;

}( window ));

module.exports = mgrCarousel;
