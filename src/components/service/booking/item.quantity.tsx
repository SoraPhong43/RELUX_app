import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import ItemSingle from "./item.single";
interface IProps {
  menuItem: IMenuItem;
  service: IService | null;
  isModel: boolean;
}

const ItemQuantity = (props: IProps) => {
  const { menuItem, service, isModel } = props;
  const { cart, setCart } = useCurrentApp();

  const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
    if (item.details.length && isModel === false) {
      //console.log(menuItem.duration);
      console.log(item);
      router.navigate({
        pathname:
          action === "PLUS" ? "/product/create.modal" : "/product/update.modal",
        params: { menuItemId: menuItem.id },
      });
    } else {
      if (service?.id) {
        const total = action === "MINUS" ? -1 : 1; // Sửa đúng hành động

        if (!cart[service?.id]) {
          // Nếu dịch vụ chưa tồn tại trong giỏ hàng, khởi tạo dịch vụ trong giỏ hàng
          cart[service.id] = {
            sum: 0,
            quantity: 0,
            items: {},
          };
        }

        // Xử lý cập nhật tổng giá và số lượng trong giỏ hàng
        cart[service.id].sum = cart[service.id].sum + total * item.price;
        cart[service.id].quantity = cart[service.id].quantity + total;

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của dịch vụ chưa
        if (!cart[service.id].items[item.id]) {
          cart[service.id].items[item.id] = {
            data: menuItem,
            quantity: 0,
          };
        }

        // Cập nhật số lượng sản phẩm hiện tại
        const currentQuantity =
          cart[service.id].items[item.id].quantity + total;
        cart[service.id].items[item.id] = {
          data: menuItem,
          quantity: currentQuantity,
        };

        // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
        if (currentQuantity <= 0) {
          delete cart[service.id].items[item.id];
        }

        // Cập nhật giỏ hàng
        setCart((prevState: any) => ({ ...prevState, ...cart }));
      }
    }
  };

  let quantity = 0;
  let showMinus = false;
  if (service?.id) {
    const store = cart[service?.id];
    if (store?.items && store?.items[menuItem?.id]) {
      showMinus = true;
      quantity = store?.items[menuItem?.id].quantity;
    }
  }
  return (
    <ItemSingle
      menuItem={menuItem}
      handlePressItem={handlePressItem}
      showMinus={showMinus}
      quantity={quantity}
    />
  );
};
export default ItemQuantity;
