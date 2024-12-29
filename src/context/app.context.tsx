import { createContext, useContext, useState } from "react";

interface AppContextType {
  theme: string;
  setTheme: (v: string) => void;

  appState: IUserLogin | null;
  setAppState: (v: any) => void;

  cart: ICart | Record<string, never>;
  setCart: (v: any) => void;

  service: IService | null;
  setService: (v: any) => void;

  selectedDate: moment.Moment | null;
  setSelectedDate: (v: moment.Moment) => void;

  selectedTime: string | null;
  setSelectedTime: (v: string) => void;

  selectedLocation: ILocation | null;
  setSelectedLocation: (v: any) => void;

  selectedEmployee: IEmployee | null;
  setSelectedEmployee: (v: any) => void;

  orderItems: IBookingItem | null;
  setOrderItems: (v: any) => void;

  booking: IBookingST;
  setBooking: (v: React.SetStateAction<IBookingST>) => void;

  location: IAllLocation | null;
  setLocation: (v: any) => void;

  cate: ICategoryBooking | null;
  setCate: (v: any) => void;

  employeeService: IEmployee | null;
  setEmployeeService: (v: any) => void;
  bookingHistory: IBookingHistory[];
  setBookingHistory: (v: any) => void;
}
const AppContext = createContext<AppContextType | null>(null);

interface IProps {
  children: React.ReactNode;
}

export const useCurrentApp = () => {
  const currentTheme = useContext(AppContext);

  if (!currentTheme) {
    throw new Error(
      "useCurrentApp has to be used within <AppContext.Provider>"
    );
  }

  return currentTheme;
};

const AppProvider = (props: IProps) => {
  const [theme, setTheme] = useState<string>("eric-light");
  const [appState, setAppState] = useState<IUserLogin | null>(null);

  const [employeeService, setEmployeeService] = useState<IEmployee | null>(
    null
  );

  const [cart, setCart] = useState<ICart | Record<string, never>>({});
  const [service, setService] = useState<IService | null>(null);

  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
  const [orderItems, setOrderItems] = useState<IBookingItem | null>(null);
  const [booking, setBooking] = useState<IBookingST>({
    bookingTime: "",
    bookingnotes: "",
    categoryId: [],
    serviceIds: [],
    locationId: null,
    employeeId: null,
    customerName: appState?.user.fullName,
    customerId: appState?.user.id || null,
    bookingCount: appState?.user.bookingCount,
  });
  const [bookingHistory, setBookingHistory] = useState<IBookingHistory[]>([]);

  const [location, setLocation] = useState<IAllLocation | null>(null);

  const [cate, setCate] = useState<ICategoryBooking | null>(null);
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        appState,
        setAppState,
        cart,
        setCart,
        service,
        setService,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedLocation,
        setSelectedLocation,
        selectedEmployee,
        setSelectedEmployee,
        orderItems,
        setOrderItems,
        location,
        setLocation,
        cate,
        setCate,
        bookingHistory,
        setBookingHistory,
        booking,
        setBooking,
        employeeService,
        setEmployeeService,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
