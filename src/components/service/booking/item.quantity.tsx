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

  const handlePressItem = (item: IMenuItem, action: "MINS" | "PLUS") => {
    if (item.details.length && isModel === false) {
      //console.log(menuItem.name);
      console.log(item);
      router.navigate({
        pathname:
          action === "PLUS" ? "/product/create.modal" : "/product/update.modal",
        params: { menuItemId: menuItem.id },
      });
    } else {
      if (service?.id) {
        const total = action === "MINS" ? -1 : 1;
        if (!cart[service?.id]) {
          //chua ton tai dich vu => khoi tao cua hang
          cart[service.id] = {
            sum: 0,
            quantity: 0,
            items: {},
          };
        }
        // xu ly
        cart[service.id].sum = cart[service.id].sum + total * item.price;
        cart[service.id].quantity = cart[service.id].quantity + total;

        //check san pham da tung them vao chua
        if (!cart[service.id].items[item.id]) {
          cart[service.id].items[item.id] = {
            data: menuItem,
            quantity: 0,
          };
        }
        const currentQuality = cart[service.id].items[item.id].quantity + total;
        cart[service.id].items[item.id] = {
          data: menuItem,
          quantity: currentQuality,
        };
        if (currentQuality <= 0) {
          delete cart[service.id].items[item.id];
        }
        setCart((prevState: any) => ({ ...prevState, ...cart })); //merge state
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
