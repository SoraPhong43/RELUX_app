export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string | string[];
        statusCode: number | string;
        bookingId?:number;
        data?: T;
    }
  

    interface IRegister {
        _id: string;
    }

    interface IUserLogin{
        user:{
            email: string,
            userId: string,
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
        image:string,

        menuItems: IMenuItem[]
    }
    interface IMenuItem{
        menuItem: string,
        id: string,
        name: string,
        price: number,
        description: string,
        duration: number,
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
        id: number,
        name: string,
        address: string,
        description: string,
        image:string,
        employees:IEmployee[]
    }
    interface IEmployee{
        id: number,
        name: string,
        description: string,
        phone: number,
        email: string | null,
        specialtyType: string | null,
        status: string | null,
        hiredate: string | null,
        avatar: string | null
    }
    interface IBookingItem {
        title: string;
        option: string;
        price: number;
        quantity: number;
        duration?: number;
      }
    interface IBooking{
        bookingId: number,
        name: string,
        email: string,
        phone: string,
        bookingTime: string,
        bookingnotes: string,
        serviceId: number,
        locationID: number,
        userId: number,
        status: string,
        totalAmount: number,
        createdAt: string,
        updatedAt: string,
        employeeId: number
        serviceName:string,
      }
    interface IAllLocation{
        locationID: string,
        locationName: string,
        Address: string,
        description: string,
        image: string
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

