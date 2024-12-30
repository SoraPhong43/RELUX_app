import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { router, useNavigation } from "expo-router";
import moment, { duration } from "moment";
import { APP_COLOR } from "@/app/utils/constant";
import {
  getCategoryAPI,
  getEmployeeFreeTimeSpa,
  getEmployeeSpa,
  getProfileAPI,
  getServiceAPI,
  getServiceByCatalogy,
  getServiceByIdAPI,
} from "@/app/utils/API";
import { getCateServiceBookingAPI, getLocationSpa } from "@/app/utils/API";
import CmSelect from "@/components/CmSelect/CmSelect";
import { useCurrentApp } from "@/context/app.context";
import { useLocalSearchParams } from "expo-router";

const Step1 = () => {
  const { booking, setBooking, appState } = useCurrentApp();
  const [isLoading, setIsLoading] = useState(false);
  const [customerService, setCustomerService] = useState<IUser>();
  const { serviceId, categoryId } = useLocalSearchParams();
  const fetchCustomerService = async () => {
    try {
      setIsLoading(true);
      const res = await getProfileAPI();
      setCustomerService(res.data as IUser);
      setBooking((prevState) => {
        return {
          ...prevState,
          customerId: res.data?.id as number,
          customerName: res.data?.fullName,
          bookingCount: res.data?.bookingCount as number,
        };
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  //category
  const [cate, setCate] = useState<ICategoryBooking[]>([]);
  const [catenum, setCatenum] = useState<number>();
  const formattedCate = cate?.map((option) => ({
    value: option.id,
    label: option.name,
    ...option,
  }));
  const fetchCate = async () => {
    try {
      setIsLoading(true);
      const res = await getCateServiceBookingAPI();
      if (Array.isArray(res.data)) {
        setCate(res.data as ICategoryBooking[]);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCateById = async (id: number) => {
    try {
      setIsLoading(true);
      console.log("check CateID:", id);
      const res = await getCategoryAPI(id);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching categoryService:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCateChange = (selected: OptionItem) => {
    const selectedCategoryId = selected.value as number;
    setCatenum(selectedCategoryId);

    // Reset service khi thay đổi danh mục
    setCategoryService([]); // Xóa danh sách dịch vụ hiện tại
    setCategory(undefined); // Reset lựa chọn dịch vụ
    setBooking((prevState) => ({
      ...prevState,
      categoryId: [selectedCategoryId],
      serviceIds: [], // Xóa dịch vụ đã chọn
      locationId: null, // Xóa địa điểm đã chọn
      employeeId: null, // Xóa nhân viên đã chọn
    }));

    // Tải lại dữ liệu dịch vụ liên quan đến danh mục mới
    fetchCategoryService(selectedCategoryId);
    fetchCateById(selectedCategoryId);
  };

  //service
  const [categoryService, setCategoryService] = useState<IService[]>([]);
  const [category, setCategory] = useState<number>();
  const formattedCategoryService = categoryService.map((option) => ({
    value: option.id,
    label: option.name,
    ...option,
  }));

  const fetchCategoryService = async (categoryId: number) => {
    console.log("checkkk", categoryId);
    try {
      setIsLoading(true);
      const res = await getServiceByCatalogy(categoryId);

      if (Array.isArray(res.data) && res.data.length > 0) {
        setCategoryService(res.data as IService[]);
      } else {
        setCategoryService([]); // Reset the list if no services exist
        console.warn("No services found for this category.");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategoryServiceById = async (id: number) => {
    try {
      setIsLoading(true);
      const res = await getServiceByIdAPI(id);
      setBooking((prevState) => {
        console.log(">>", booking.bookingCount);
        return {
          ...prevState,
          price: res.data?.price,
          discountPercentage:
            booking?.bookingCount >= 3
              ? res.data?.promotion?.discountPercentage
              : 0,
        };
      });
    } catch (error) {
      console.error("Error fetching categoryService:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCateServiceChange = (selected: OptionItem) => {
    const selectedServiceId = selected.value as number;
    setCategory(selectedServiceId); // Lưu dịch vụ đã chọn
    setBooking((prevState) => ({
      ...prevState,
      serviceIds: [selectedServiceId], // Cập nhật dịch vụ
      locationId: null, // Reset địa điểm
      employeeId: null, // Reset nhân viên
    }));

    // Fetch thông tin chi tiết về dịch vụ
    fetchCategoryServiceById(selectedServiceId);
    fetchEmployeeService();
  };

  useEffect(() => {
    const autoFillCategoryAndService = async () => {
      if (categoryId) {
        const numericCategoryId = Number(categoryId);
        setCatenum(numericCategoryId);
        setBooking((prevState) => ({
          ...prevState,
          categoryId: [numericCategoryId],
        }));

        // Fetch services nếu categoryId tồn tại
        await fetchCategoryService(numericCategoryId);

        if (serviceId) {
          const numericServiceId = Number(serviceId);
          setCategory(numericServiceId);

          // Fetch service chi tiết
          const res = await getServiceByIdAPI(numericServiceId);
          if (res?.data) {
            const { id, price, promotion } = res.data;
            setBooking((prevState) => {
              const updatedBooking = {
                ...prevState,
                serviceIds: [id],
                price: price || 0,
                discountPercentage:
                  prevState.bookingCount && prevState.bookingCount >= 3
                    ? promotion?.discountPercentage || 0
                    : 0,
              };

              // Gọi fetchLocationService sau khi cập nhật state
              fetchEmployeeService();

              return updatedBooking;
            });
          }
        }
      }
    };

    autoFillCategoryAndService();
  }, [categoryId, serviceId]);

  //employee
  const [employeeService, setEmployeeService] = useState<IEmployee[]>([]);
  const [employeeData, setEmployeeData] = useState<OptionItem>();
  const formattedEmployeeService = employeeService.map(
    (employee: IEmployee) => ({
      value: employee.id,
      label: employee.name,
      ...employee,
    })
  );

  const fetchEmployeeService = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await getEmployeeSpa();
      if (Array.isArray(res.data)) {
        const formattedData: IEmployee[] = res.data.map(
          (employee: IEmployee) => ({
            ...employee,
          })
        );
        setEmployeeService(formattedData);
      } else {
        console.warn("Unexpected response structure:", res.data);
        setEmployeeService([]);
      }
    } catch (error) {
      console.error("Error fetching employee service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployeeChange = (selected: OptionItem) => {
    const selectedEmployee = employeeService.find(
      (employee) => employee.id === Number(selected.value)
    );

    if (selectedEmployee) {
      setEmployeeData({
        value: selectedEmployee.id,
        label: selectedEmployee.name,
        avatar: selectedEmployee.avatar,
        phone: selectedEmployee.phone,
        email: selectedEmployee.email,
      });

      setBooking((prevState) => ({
        ...prevState,
        employeeId: selectedEmployee.id,
        employeeName: selectedEmployee.name,
      }));

      // Gọi fetchTimeService để lấy thời gian khả dụng
      fetchTimeService(selectedEmployee.id);
    } else {
      console.warn("Selected employee not found.");
    }
  };

  //location
  const [locationService, setLocationService] = useState<IAllLocation[]>([]);
  const [locationData, setLocationData] = useState<OptionItem>();
  const formattedLocationService = locationService.map((option) => ({
    value: option.id,
    label: option.address,
    ...option,
  }));
  const fetchLocationService = async (locationId: number) => {
    if (!locationId || isNaN(locationId)) {
      console.error("Invalid locationId:", locationId);
      setLocationService([]);
      return;
    }

    try {
      setIsLoading(true);
      console.log("Fetching location for locationId:", locationId);
      const res = await getLocationSpa(locationId); // Gọi API với locationId
      if (res?.data) {
        const formattedLocation = [
          {
            id: res.data.id,
            locationName: res.data.locationName,
            address: res.data.address,
          },
        ];
        setLocationService(formattedLocation); // Chỉ lưu một location
      } else {
        // console.warn("No location found for this employee.");
        setLocationService([]);
      }
    } catch (error) {
      console.error("Error fetching location by employee:", error);
      setLocationService([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationChange = (selected: OptionItem) => {
    setLocationData(selected); // Lưu thông tin location đã chọn
    setBooking((prevState) => ({
      ...prevState,
      locationId: selected.value as number,
      locationName: selected.label as string,
    }));

    console.log("Selected Location ID:", selected.value); // Log để kiểm tra locationId
  };

  useEffect(() => {
    if (booking.serviceIds?.length > 0 && booking.employeeId) {
      fetchLocationService(booking.employeeId); // Truyền employeeId
    }
  }, [booking.serviceIds, booking.employeeId]);

  //time
  const [dateService, setDateService] = useState<string>("");
  const [timeService, setTimeService] = useState<string>();
  const [timeRangeService, setTimeRangeService] = useState<OptionItem[]>();
  const [dateTimeService, setDateTimeDService] = useState<IFreeTime[]>([]);
  const formattedTimeService = dateTimeService.map((option) => ({
    value: option.date,
    label: option.date,
    ...option,
  }));
  const fetchTimeService = async (employeeId: number) => {
    try {
      setIsLoading(true);
      console.log("Fetching time slots for employeeId:", employeeId);

      const res = await getEmployeeFreeTimeSpa(employeeId);

      if (Array.isArray(res.data)) {
        const currentDateTime = new Date();

        // Lọc và loại bỏ các thời gian đã qua
        const filteredData = res.data.filter((item: IFreeTime) => {
          const itemDate = new Date(item.date);
          return itemDate >= currentDateTime;
        });

        // Loại bỏ các bản ghi trùng lặp theo `date`
        const uniqueDates = Array.from(
          new Map(filteredData.map((item) => [item.date, item])).values()
        );

        setDateTimeDService(uniqueDates);
      } else {
        console.warn("Unexpected response structure:", res.data);
        setDateTimeDService([]);
      }
    } catch (error) {
      console.error("Error fetching time slots:", error);
      setDateTimeDService([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (selected: OptionItem) => {
    setDateService(selected.value as string);

    const selectedDate = selected.value as string;
    const timeStart = selected.startTime; // Lấy thời gian bắt đầu
    const timeEnd = selected.endTime; // Lấy thời gian kết thúc

    if (timeStart && timeEnd) {
      getTime(timeStart, timeEnd, selectedDate);
    } else {
      console.error("Invalid startTime or endTime in selected date.");
    }
  };

  const handleTimeChange = (selected: OptionItem) => {
    setTimeService(selected.value as string);
    setBooking((prevState) => {
      return {
        ...prevState,
        bookingTime: setDateTime(dateService, selected.value as string),
      };
    });
  };
  const getTime = (
    startTime: string,
    endTime: string,
    selectedDate: string
  ) => {
    const timeList: OptionItem[] = [];
    const currentDate = new Date();
    const isToday = selectedDate === moment(currentDate).format("YYYY-MM-DD");

    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");

    // Bao gồm slot cuối cùng
    end.add(15, "minutes");

    while (start.isBefore(end)) {
      const formattedTime = start.format("HH:mm");

      if (isToday) {
        const currentTime = moment();
        if (start.isBefore(currentTime)) {
          start.add(15, "minutes");
          continue;
        }
      }

      timeList.push({
        value: formattedTime,
        label: formattedTime,
      });

      start.add(15, "minutes");
    }

    setTimeRangeService(timeList);
  };

  const setDateTime = (date: string, time: string) => {
    const dateTimeString = `${date}T${time}:00`;
    const dateTime = new Date(dateTimeString + "Z");
    const isoString = dateTime.toISOString();
    return isoString;
  };
  useEffect(() => {
    if (booking.employeeId) {
      const matchedEmployee = employeeService.find(
        (employee) => employee.id === booking.employeeId
      );

      if (matchedEmployee) {
        setEmployeeData({
          value: matchedEmployee.id,
          label: matchedEmployee.name,
          avatar: matchedEmployee.avatar,
          phone: matchedEmployee.phone,
          email: matchedEmployee.email,
        });
      } else {
        console.log(
          "No matching employee found for employeeId:",
          booking.employeeId
        );
      }
    }
  }, [booking.employeeId, employeeService]);

  useEffect(() => {
    fetchCustomerService();
    fetchCate();
    fetchEmployeeService();
  }, []);
  useEffect(() => {
    if (booking.serviceIds.length > 0 && booking.employeeId) {
      fetchLocationService(booking.employeeId); // Truyền employeeId
    } else {
      setLocationService([]); // Reset nếu không có serviceId
    }
  }, [booking.serviceIds, booking.employeeId]);

  useEffect(() => {
    if (catenum) {
      // Reset dịch vụ khi danh mục thay đổi
      setCategoryService([]);
      setCategory(undefined);
      fetchCategoryService(catenum);
    }
  }, [catenum]);

  useEffect(() => {
    // Đồng bộ giá trị danh mục từ booking
    if (booking.categoryId.length > 0) {
      const categoryValue = Number(booking.categoryId[0]); // Chuyển đổi sang số
      setCatenum(isNaN(categoryValue) ? undefined : categoryValue); // Xử lý nếu không thể chuyển thành số
    } else {
      setCatenum(undefined);
    }

    // Đồng bộ giá trị dịch vụ từ booking
    if (booking.serviceIds.length > 0) {
      const serviceValue = Number(booking.serviceIds[0]); // Chuyển đổi sang số
      setCategory(isNaN(serviceValue) ? undefined : serviceValue); // Xử lý nếu không thể chuyển thành số
    } else {
      setCategory(undefined);
    }

    // Đồng bộ giá trị địa điểm từ booking
    if (booking.locationId !== null) {
      const locationValue = Number(booking.locationId); // Chuyển đổi sang số
      const matchedLocation = locationService.find(
        (option) => Number(option.id) === locationValue
      );
      if (matchedLocation) {
        setLocationData({
          value: matchedLocation.id,
          label: matchedLocation.locationName,
          address: matchedLocation.address,
        });
      } else {
        setLocationData(undefined);
      }
    } else {
      setLocationData(undefined); // Reset nếu không có locationId
    }

    // Đồng bộ giá trị nhân viên từ booking
    if (booking.employeeId !== null) {
      const employeeValue = Number(booking.employeeId); // Chuyển đổi sang số
      const matchedEmployee = employeeService.find(
        (option) => option.id === employeeValue // Sử dụng `id` thay vì `value`
      );
      if (matchedEmployee) {
        setEmployeeData({
          value: matchedEmployee.id, // Đặt giá trị là `id`
          label: matchedEmployee.name, // Đặt nhãn là `name`
          avatar: matchedEmployee.avatar, // Lấy ảnh nếu có
          email: matchedEmployee.email, // Lấy email nếu có
          phone: matchedEmployee.phone, // Lấy số điện thoại nếu có
        }); // Đặt dữ liệu nhân viên
      } else {
        setEmployeeData(undefined);
      }
    } else {
      setEmployeeData(undefined); // Reset nếu không có employeeId
    }
  }, [booking, locationService, employeeService]);
  useEffect(() => {
    if (booking.employeeId !== null) {
      const selectedEmployee = employeeService.find(
        (employee) => employee.id === booking.employeeId
      );

      if (selectedEmployee?.locationId) {
        fetchLocationService(selectedEmployee.locationId);
      } else {
        console.log("No locationId found for this employee in useEffect.");
        setLocationService([]);
      }
    }
  }, [booking.employeeId]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* select category */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 8,
            marginBottom: 5,
          }}
        >
          <CmSelect
            label="Select the category"
            data={formattedCate}
            value={catenum}
            onChange={(value) => handleCateChange(value)}
            placeholder="Select an option"
            // Không ràng buộc disabled với categoryId
            disabled={false}
          />
        </View>
        {/* select service  */}
        {booking.categoryId?.length !== null && (
          <View
            style={{
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
              padding: 10,
            }}
          >
            <View>
              {booking.categoryId?.length > 0 ? (
                <CmSelect
                  label="Select the service"
                  data={formattedCategoryService}
                  value={category}
                  onChange={(value) => {
                    handleCateServiceChange(value);
                  }}
                  placeholder="Select an option"
                />
              ) : (
                <CmSelect
                  label="Select the service"
                  data={formattedCategoryService}
                  value={category}
                  onChange={(value) => {
                    console.log("Selected service:", value);
                    handleCateServiceChange(value);
                  }}
                  placeholder="Select an option"
                  disabled={false}
                />
              )}
            </View>
          </View>
        )}

        {booking.serviceIds.length > 0 && (
          <View
            style={{
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
              padding: 10,
            }}
          >
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <View>
                <View>
                  <CmSelect
                    label="Choose staff"
                    data={formattedEmployeeService}
                    value={booking.employeeId}
                    onChange={(value) => handleEmployeeChange(value)}
                    placeholder="Select an option"
                  />
                </View>

                {booking.employeeId !== null && employeeData && (
                  <View
                    style={{
                      paddingHorizontal: 20,
                      marginTop: 10, // Để tạo khoảng cách giữa CmSelect và thông tin nhân viên
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#ffffff",
                        borderWidth: 1,
                        borderColor: APP_COLOR.darkGray,
                        borderRadius: 8,
                        marginBottom: 5,
                      }}
                    >
                      {/* <Pressable> */}
                      <Image
                        style={{
                          height: 150,
                          width: "100%",
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          resizeMode: "cover",
                        }}
                        source={
                          employeeData?.avatar
                            ? { uri: employeeData.avatar } // URL hợp lệ
                            : require("@/assets/icons/face.png") // Ảnh mặc định
                        }
                      />
                      <View style={{ padding: 5 }}>
                        <Text style={{ fontWeight: 500, maxWidth: 200 }}>
                          {employeeData?.name}
                        </Text>
                        <Text
                          style={{
                            fontWeight: 400,
                            maxWidth: 200,
                            color: APP_COLOR.GRAY,
                          }}
                        >
                          {employeeData?.phone}
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            maxWidth: 220,
                            fontWeight: 400,
                            color: APP_COLOR.darkGray,
                            paddingTop: 5,
                            paddingLeft: 2,
                          }}
                        >
                          {employeeData?.email}
                        </Text>
                      </View>
                      {/* </Pressable> */}
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        )}

        {booking.employeeId !== null && (
          <View
            style={{
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
              padding: 10,
            }}
          >
            <View>
              <CmSelect
                label="Select the location"
                data={formattedLocationService} // Danh sách location đã được lọc
                value={booking.locationId}
                onChange={(value) => handleLocationChange(value)} // Xử lý khi chọn location
                placeholder="Select an option"
              />
            </View>
            {booking.locationId !== null && (
              <View
                style={{
                  paddingHorizontal: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    borderWidth: 1,
                    borderColor: APP_COLOR.darkGray,
                    borderRadius: 8,
                    marginBottom: 5,
                  }}
                >
                  {/* <Pressable
                  onPress={() =>
                    router.navigate({
                      pathname: "/product/locationid",
                      params: { locationID: locationData?.id },
                    })
                  }
                > */}
                  <View style={{ padding: 5 }}>
                    <Text style={{ fontWeight: 500, maxWidth: 200 }}>
                      {locationData?.locationName}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        maxWidth: 220,
                        fontWeight: 400,
                        color: APP_COLOR.darkGray,
                        paddingTop: 5,
                        paddingLeft: 2,
                      }}
                    >
                      {locationData?.address}
                    </Text>
                  </View>
                  {/* </Pressable> */}
                </View>
              </View>
            )}
          </View>
        )}
        {booking.employeeId !== null && (
          <View style={{ padding: 10 }}>
            <CmSelect
              label="Choose date"
              data={formattedTimeService}
              value={dateService}
              onChange={(value) => handleDateChange(value)}
              placeholder="Select an option"
            />
            {dateService && (
              <View>
                {/* <CmSelect
                  label="Choose time"
                  data={timeRangeService || []}
                  value={timeService}
                  onChange={(value) => handleTimeChange(value)}
                  placeholder="Select an option"
                /> */}
                {isLoading ? (
                  <Text>Loading...</Text>
                ) : (
                  <CmSelect
                    label="Choose time"
                    data={timeRangeService || []}
                    value={timeService}
                    onChange={(value) => handleTimeChange(value)}
                    placeholder="Select an option"
                  />
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Step1;
