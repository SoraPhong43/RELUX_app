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
        price: string,
        description: string
    }
}

