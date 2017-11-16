/*
*************************************************************
*计算绘制图与原始图拟合率方法
*调用calMatching(c),参数 c ↓↓↓↓↓↓
                        var c=document.getElementById("yourCanvas");
*0.设置用户绘制线条颜色信息canvasData.draw.rgba[r,g,b,a]
*1.在原始图渲染完成出调用calMatching(c)，自动采集原始图信息
*2.在用户绘制完成出调用calMatching(c)，自动采集绘制图信息
*3.本次游戏的拟合程度保存在canvasData.matching
*
*
*
**/
export default {
  calMatching: function(c) {
    this.getcanvasData(c);
    var canvasData = this.canvasData;
    if (canvasData.state) {
      canvasData.state = 0; //原始信息采集完成，修改状态
      return;
    }
    var sumMatching = 0, //重合像素个数
      sumOriginal = 0, //原始图线条像素个数，暂时没有用上，先留着吧
      sumDraw = 0 //玩家绘制的线条像素个数
    ;
    for (var i = 0; i < canvasData.original.data.length; i++) {
      if (canvasData.original.data[i] == 1 && canvasData.draw.data[i] == 1) {
        sumMatching++;
      }
      if (canvasData.original.data[i] == 1) {
        sumOriginal++;
      }
      if (canvasData.draw.data[i] == 1) {
        sumDraw++;
      }

    }
    canvasData.matching = sumMatching / sumDraw;
    canvasData.state = 1; //本次游戏结束，修改状态
  },

  canvasData: {
    original: {
      data: [] //原始的画布信息[0,1,0,1...]
    },
    state: 1, //玩家绘制前为1，绘制结束为0
    draw: {
      rgba: [], //玩家手绘线条颜色数据
      data: [] //手绘后的画布信息[0,1,0,1...]
    },
    matching: '' //计算出的拟合程度{0~1}
  },
  getcanvasData: function(c) {
    var ctx = c.getContext("2d");
    var canvasData = this.canvasData;
    var imgData = ctx.getImageData(10, 10, c.width, c.height).data;
    if (canvasData.state) { //玩家绘制之前采集原始像素信息
      canvasData.original.data = [];
      for (var i = 0; i < imgData.length; i += 4) {
        if (imgData[i + 3]) {
          canvasData.original.data[(i - i % 4) / 4] = 1;
        } else {
          canvasData.original.data[(i - i % 4) / 4] = 0;
        }

      }
    } else {
      canvasData.draw.data = [];
      for (var i = 0; i < imgData.length; i += 4) {
        if (canvasData.draw.rgba[0] == imgData[i + 0] //像素信息与原始线条颜色相同，
          &&
          canvasData.draw.rgba[1] == imgData[i + 1] &&
          canvasData.draw.rgba[2] == imgData[i + 2]) {
          canvasData.draw.data[(i - i % 4) / 4] = 1;
        } else {
          canvasData.draw.data[(i - i % 4) / 4] = 0;
        }
      }
    }

  }
}