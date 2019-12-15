class UsersController < ApplicationController
  # signup 「新規会員登録」画面

  def signup
  end

  def show
  end

  def finish

  end  
  
  def mypage
  end

  def listing
    @items = Item.where user_id: current_user.id
  end

  def profile
  end 
  def card
    @card = Card.where(user_id: current_user.id).first
    unless @card.blank?
      Payjp.api_key = 'sk_test_853b0c9300ad1412a28612e8'
      customer = Payjp::Customer.retrieve(@card.customer_id)
      @default_card_information = customer.cards.retrieve(@card.card_id)
    end
  end
  def listings
  end
  def address
    @shipping = Shipping.new
  end
  
  def address_create
    @shipping = Shipping.new(shipping_params)
    if @shipping.save
      redirect_to new_card_path
    else
      render :address
    end
  end


  def logout
  end


  def prefecture
  end  

  def identification
    #本人情報ページ表示用
    @user = User.find(current_user.id)
    @shipping = Shipping.where(user_id:current_user.id).first

  end

  def update
    #本人情報登録
    @shipping = Shipping.where(user_id:current_user.id).first
    if @shipping.update(update_shipping_params)
      redirect_to mypage_users_path
    else
      #本人情報ページ表示用
      @user = User.find(current_user.id)
      @shipping = Shipping.new
      render :identification
    end  
  end



  private

  def shipping_params
    params.require(:shipping).permit(:user_id,:s_family_name,:s_first_name,:s_kana_family_name,:s_kana_first_name,:address_number,:prefecture_id,:city,:town,:building,:s_tel)
  end
  
  def update_shipping_params
    params.require(:shipping).permit(:address_number,:prefecture_id,:city,:town,:building,:s_tel)
  end


end
