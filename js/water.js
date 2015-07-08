window.onload = function() {
      

      //模拟数据
      var data = [{
        'src': 'img/pic/01.jpg',
        'title': '一段忧伤的旅程',
        'footer':'一段忧伤'
      }, {
        'src': 'img/pic/02.jpg',
        'title': '一段忧伤的旅程',
        'footer':'一段忧伤'
      }, {
        'src': 'img/pic/03.jpg',
        'title': '一段忧伤的旅程一段忧伤的旅程',
        'footer':'一段忧伤'
      }, {
        'src': 'img/pic/04.jpg',
        'title': '一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程',
        'footer':'一段忧伤'
      }, {
        'src': 'img/pic/05.jpg',
        'title': '一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程',
        'footer':'一段忧伤'
      }, {
        'src': 'img/pic/06.jpg',
        'title': '一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程',
        'footer':'一段忧伤'
      }, {
        'src': 'img/pic/07.jpg',
        'title': '一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程',
        'footer':'一段忧伤'
      }, {
        'src': 'img/pic/08.jpg',
        'title': '一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程',
        'footer':'一段忧伤'
      }, {
        'src': 'img/pic/09.jpg',
        'title': '一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程',
        'footer':'一段忧伤'
      }, {
        'src': 'img/pic/10.jpg',
        'title': '一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程一段忧伤的旅程',
        'footer':'一段忧伤'
      }];


      //设置滚动加载
      window.onscroll = function() {
        //校验数据请求
        if (getCheck()) {
          var picWrap = document.getElementById('picWrap');
          for (i in data) {
            //创建box
            var box = document.createElement('div');
            box.className = 'box';
            picWrap.appendChild(box);
            //创建info
            var info = document.createElement('div');
            info.className = 'info';
            box.appendChild(info);
            //创建pic
            var pic = document.createElement('div');
            pic.className = 'pic';
            info.appendChild(pic);
            //创建img
            var img = document.createElement('img');
            img.src = data[i].src;
            img.style.height = 'auto';
            pic.appendChild(img);
            //创建title
            var title = document.createElement('div');
            title.className = 'title';
            title.innerHTML = data[i].title;
            info.appendChild(title);
            // 创建footer
            var footer = document.createElement('p');
            footer.className = 'footer';
            var footerSpan = document.createElement('span');
            footerSpan.innerHTML = data[i].footer;
            footer.appendChild(footerSpan);
            info.appendChild(footer);
          }
          waterFall('picWrap', 'box');
        }
      }
    }
    /**
     * 瀑布流主函数
     * @param  picWrap  [Str] 外层元素的ID
     * @param  box   [Str] 每一个box的类名
     */
  function waterFall(picWrap, box) {
      //  1.获得外层以及每一个box
      var picWrap = document.getElementById(picWrap);
      var boxs = getClass(picWrap, box);
      //  2.获得屏幕可显示的列数
      var boxW = boxs[0].offsetWidth;
      // var colsNum = Math.floor(document.documentElement.clientWidth / boxW);
      var colsNum = 4;
      picWrap.style.width = boxW * colsNum + 'px'; //为外层赋值宽度
      //  3.循环出所有的box并按照瀑布流排列
      var everyH = []; //定义一个数组存储每一列的高度
      for (var i = 0; i < boxs.length; i++) {
        if (i < colsNum) {
          everyH[i] = boxs[i].offsetHeight;
        } else {
          var minH = Math.min.apply(null, everyH); //获得最小的列的高度
          var minIndex = getIndex(minH, everyH); //获得最小列的索引
          getStyle(boxs[i], minH, boxs[minIndex].offsetLeft, i);
          everyH[minIndex] += boxs[i].offsetHeight; //更新最小列的高度
        }
      }
    }
    /**
     * 获取类元素
     * @param  warp    [Obj] 外层
     * @param  className [Str] 类名
     */
  function getClass(picWrap, className) {
      var obj = picWrap.getElementsByTagName('*');
      var arr = [];
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].className == className) {
          arr.push(obj[i]);
        }
      }
      return arr;
    }
    /**
     * 获取最小列的索引
     * @param  minH   [Num] 最小高度
     * @param  everyH [Arr] 所有列高度的数组
     */
  function getIndex(minH, everyH) {
      for (index in everyH) {
        if (everyH[index] == minH) return index;
      }
    }
    /**
     * 数据请求检验
     */
  function getCheck() {
      var documentH = document.documentElement.clientHeight;
      var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
      return documentH + scrollH >= getLastH() ? true : false;
    }
    /**
     * 获得最后一个box所在列的高度
     */
  function getLastH() {
      var picWrap = document.getElementById('picWrap');
      var boxs = getClass(picWrap, 'box');
      return boxs[boxs.length - 1].offsetTop + boxs[boxs.length - 1].offsetHeight;
    }
    /**
     * 设置加载样式
     * @param  box   [obj] 设置的Box
     * @param  top   [Num] box的top值
     * @param  left  [Num] box的left值
     * @param  index [Num] box的第几个
     */
  var getStartNum = 0; //设置请求加载的条数的位置
  function getStyle(box, top, left, index) {
    if (getStartNum >= index) return;
    $(box).css({
      'position': 'absolute',
      'top': top,
      "left": left,
      "opacity": "0"
    });
    $(box).stop().animate({
      "opacity": "1"
    }, 999);
    getStartNum = index; //更新请求数据的条数位置
  }
$(function(){
  $(".fixFace").click(function(){
    $(".article").hide();
    $("#picWrap").fadeIn(800,function(){
      $("#footer").hide();
      $("#container .mid-col").addClass('whiteBg');
      //运行瀑布流主函数
      waterFall('picWrap', 'box');
    });

  });
});