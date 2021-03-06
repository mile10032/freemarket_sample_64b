$(function() {


  // 出品・編集画面にて、アップロードしたファイルの削除ボタンが押下された場合に使用するフラグ領域
  let image_destroy_flg = [];


  // 削除処理
  $(document).on("click", ".destroy-js", function(){
    // 画像の削除
    $(this).parents(".image-preview-box").remove();
    // 削除ボタンが押下されたことのフラグを設定する。
    image_flg = $(".hidden-image-flg");
    let temp = $(this).data("index");
    image_destroy_flg.push(temp);
    image_flg.val(image_destroy_flg);

    // スペース領域の削除
    let space = $(".image-preview-space");
    space.filter(function(){
      let space_index = $(this).data("space_js");
      if (space_index === temp){
        $(this).remove();
      }
    });

  });

  let image_array = new Array();//配列の宣言送信時に初期化する

  //フォームに入れた画像を表示
  $('.input-image-box').change(function(){
    //フォームの画像表示をリセット
    $('.inputed').remove();
    // 削除フラグの初期化を行う。
    image_destroy_flg = [];
    $(".hidden-image-flg").val("11");
    let length = image.files.length;
    if (length == 1){
      //画像が一枚だけの時
      //フォームに入れた画像を表示するためのurlを作る
    var image_path = URL.createObjectURL(image.files[0]);

    //表示するhtmlの作成
    var html = `<div class="inputed" >
                  <div class="image-preview-box" >
                  <img src="${image_path}" class="image-preview"height="64" width="114" >
                  <div class="image-preview-box__wrapper">
                    <div class="image-preview-box__wrapper--edit">
                      編集</div>
                    <div class="image-preview-box__wrapper--destroy destroy-js" data-index = 0>
                      削除</div>
                  </div>
                </div>
                <div class="image-preview-space" data-space_js = 0></div>`
    //htmlをビューへ追加
    $('.preview').append(html);
    URL.revokeObjectURL(".image_preview.src");
    
    }
    else{
      //画像が複数の時
      let delete_index = 0;
      $.each(image.files,function(index, value){
        //フォームに入れた画像を表示するためのurlを作る
        var image_path = URL.createObjectURL(value);

        //表示するhtmlの作成
        var html = `<div class="inputed" >
                  <div class="image-preview-box" >
                  <img src="${image_path}" class="image-preview"height="64" width="114" >
                  <div class="image-preview-box__wrapper">
                    <div class="image-preview-box__wrapper--edit">
                      編集</div>
                    <div class="image-preview-box__wrapper--destroy destroy-js" data-index = ${delete_index}>
                      削除</div>
                  </div>
                </div>
                <div class="image-preview-space" data-space_js = ${delete_index}></div>`
        //htmlをビューへ追加
        $('.preview').append(html);
        URL.revokeObjectURL(".image_preview.src");

        delete_index++;
      })
    };

  });
  $(document).on('click', '.preview-box__select--delete p', function(){
    $(this).closest('.preview-box').remove();
    });
  //手数料の計算
  $('.price_field').change(function(){
    //フォームに入れた数字
    var price = $(this).val()
    
    //販売利益
    var profit = Math.round(price * 0.9)//(price)-parseInt(charge)
    //手数料

    var charge = (price - profit)
    $('.charge__result').html(charge)
   
    $('.profit__result').html(profit)

  });

  //出品編集画面画像バリデーション
  
    $('#new_item').submit(function() {
      cnt = $(".image-preview-box").length;
      if (cnt == 0) {
        scrollTo(0, 0);
        $('.image-error').html("画像がありません")
        return false;
      }else{return true;}
    })

});
