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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
