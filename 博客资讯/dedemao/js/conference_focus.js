$(function () {
    var timer = null;
    var offset = 5000;
    var index = -1;
    function range(upto) {
        var result = [];
        for (var i = 0; i < upto; i++)
            result[i] = i + 1;
        return result;
    }
    var upto = $('#thumbs li').length;
    var target = range(upto);
	//alert(target)
    function slideImage(i) {
        var id = 'image_' + target[i];
        $('#' + id)
        .animate({ opacity: 1 }, 800, function () {
        }).addClass('block')
        .siblings().removeClass('block');
    }
	
    function hookThumb() {
        $('#thumbs li a')
        .bind('mouseover', function () {
            if (timer) {
                clearTimeout(timer);
            }
            var id = this.id;
            index = getIndex(id.substr(6));
            rechange(index);
            slideImage(index);
            this.blur();
            return false;
        }).bind('mouseout',function(){
            timer = window.setTimeout(auto, offset);
		});
		$('.act_width1 li').bind('mouseover',function(){
			if (timer) {
                clearTimeout(timer);
            };
		}).bind('mouseout', function(){
			timer = window.setTimeout(auto, offset);
		});
		
		var clickBtn = function(){
			if (timer) {
                clearTimeout(timer);
            };
			var n = $('.act_width1 li').length;
			var direction = this.id == 'hotleft' ? '-' : '+';
			var i = $('.act_width1 li.block').index();
			//if(direction == "-" && i == 0){return;};
			//if(direction == "+" && i == 4){return;};
			if(direction == "-" && i > 0){
				var j = i-1;
				slideImage(j);
				rechange(j);
			};
			if(direction == "-" && i == 0){
				i = n;
				var j = i-1;
				slideImage(j);
				rechange(j);
			}
			if(direction == "+" && i < n-1 ){
				var j = i+1;
				slideImage(j);
				rechange(j);
			}
			if(direction == "+" && i == n-1){
				i = -1;
				var j = i+1;
				slideImage(j);
				rechange(j);
			}
		};
		$('#hotleft').click(clickBtn);
		$('#hotright').click(clickBtn);
    }
    function getIndex(v) {
        for (var i = 0; i < target.length; i++) {
            if (target[i] == v) return i;
        }
    }
    function rechange(loop) {
        var id = 'thumb_' + target[loop];
        $('#thumbs li a.current').removeClass('current');
        $('#' + id).addClass('current');
    }
    function auto() {
        index++;
        if (index > (upto-1)) {
            index = 0;
        }
        rechange(index);
        slideImage(index);
        timer = window.setTimeout(auto, offset);
    }
    $(function () {
        $('div.word').css({ opacity: 0.75 });
        auto();
        hookThumb();

    });
});