export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string | string[];
        statusCode: number | string;
        data?: T;
    }
  

    interface IRegister {
        _id: string;
    }

    interface IUserLogin{
        user:{
            email: string,
            _id: string,
            fullname?: string,
            name?: string,
            username: string,
            role: string,
            phone: string,
            address: string,
           avatar: string;
        };
        access_token: string;
    }

    interface ITopService{
        id: string,
        name: string,
        description: string,
        price: string,
        image: string,
        rating: number,
        discount: string,
        isNew: number,
    }
    interface IService{
        id: string,
        name: string,
        description:string,
        price: string,
        image: string,
        rating: number,
        discount: string,
        
        menu: IMenu[]
    }
    interface IMenu{
        menu: string,
        menuId: string,
        id: string,
        name: string,
        description: string,

        menuItems: IMenuItem[]
    }
    interface IMenuItem{
        menuItem: string,
        id: string,
        name: string,
        price: number,
        description: string,
        options:{
            id: string;
         title: string;
        description: string;
        additionalPrice: number
        }[],
        details:Idetails[],
        createdAt: string;
        updatedAt: string;
        
    }

    interface Idetails{
        name:string,
            time:string,
            itemDetails:string
    }
   
    interface ICart{
        [key:string]:{
            sum:number;
            quantity:number
            items:{
                [key:string]:{
                    quantity:number;
                    data:IMenuItem;
                    extra?:{
                        [key:string]:number
                    }
                }
            }
        }
    }
    interface ILocation{
        locationID: string,
        locationName: string,
        Address: string
    }
}

// cart:{
//     "id của dịch vụ":{
//         sum: tổng tiền dịch vụ chọn mua hết bao nhiêu,
//         quantity: số lượng,
//         items:{
//             "sản phẩm 1":{
//                 quantity:số lượng bao nhiêu ,
//                 data: sản phẩm
//             }
//         }
//     }
// }

