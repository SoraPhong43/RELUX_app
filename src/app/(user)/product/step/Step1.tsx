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
    try {
      setIsLoading(true);
      const res = await getServiceByCatalogy(categoryId);

      if (Array.isArray(res.data) && res.data.length > 0) {
        setCategoryService(res.data as IService[]); // Cập nhật danh sách dịch vụ
      } else {
        console.warn("No services found for this category.");
        setCategoryService([]); // Đảm bảo danh sách rỗng nếu không có dịch vụ
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
    fetchLocationService();
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
              fetchLocationService();

              return updatedBooking;
            });
          }
        }
      }
    };

    autoFillCategoryAndService();
  }, [categoryId, serviceId]);

  //location
  const [locationService, setLocationService] = useState<IAllLocation[]>([]);
  const [locationData, setLocationData] = useState<OptionItem>();
  const formattedLocationService = locationService.map((option) => ({
    value: option.id,
    label: option.address,
    ...option,
  }));
  const fetchLocationService = async () => {
    try {
      setIsLoading(true);
      const res = await getLocationSpa();

      if (Array.isArray(res.data) && res.data.length > 0) {
        setLocationService(res.data as IAllLocation[]);
      } else {
        console.warn("No locations found or invalid response.");
        setLocationService([]); // Đảm bảo danh sách rỗng nếu không có dữ liệu
      }
    } catch (error) {
      console.error("Error fetching getAllLocations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationChange = (selected: OptionItem) => {
    setLocationData(selected);
    setBooking((prevState) => {
      return {
        ...prevState,
        locationId: selected.value as number,
        locationName: selected.label as string,
      };
    });
    if (selected != null) {
      fetchEmployeeService();
    }
  };
  useEffect(() => {
    if (booking.serviceIds?.length > 0) {
      fetchLocationService();
    }
  }, [booking.serviceIds]);

  //employee
  const [employeeService, setEmployeeService] = useState<IEmployee[]>([]);
  const [employeeData, setEmployeeData] = useState<OptionItem>();
  const formattedEmployeeService = employeeService.map((option) => ({
    value: option.id,
    label: option.name,
    ...option,
  }));
  const fetchEmployeeService = async () => {
    try {
      setIsLoading(true);
      const res = await getEmployeeSpa();
      if (Array.isArray(res.data)) {
        const formattedData = res.data.map((item) => ({
          id: item.id,
          name: item.name,
          avatar: item.avatar || null,
          phone: item.phone || "N/A",
          email: item.email || "N/A",
          ...item,
        }));
        setEmployeeService(formattedData); // Lưu vào context
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
    setEmployeeData(selected);
    setBooking((prevState) => {
      return {
        ...prevState,
        employeeId: selected.value as number,
        employeeName: selected.label as string,
      };
    });
    if (selected != null) {
      fetchTimeService(selected);
    }
  };

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
  const fetchTimeService = async (employee: OptionItem) => {
    try {
      setIsLoading(true);

      const res = await getEmployeeFreeTimeSpa(employee.value as number);
      if (Array.isArray(res.data)) {
        setDateTimeDService(res.data as IFreeTime[]);
      }
    } catch (error) {
      console.error("Error fetching fetchEmployeeService:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (selected: OptionItem) => {
    setDateService(selected.value as string);
    const timeStart = selected.startTime?.split(":")[0];
    const timeEnd = selected.endTime?.split(":")[0];
    getTime(timeStart, timeEnd, selected);
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

  const getTime = (start: number, end: number, selected: OptionItem) => {
    const timeList: OptionItem[] = [];

    // Loop through hours and generate 15-minute intervals
    for (let hour = start; hour <= end; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const formattedTime = `${String(hour).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}`;
        timeList.push({
          value: formattedTime,
          label: formattedTime,
        });
      }
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
    fetchCustomerService();
    fetchCate();
    fetchEmployeeService();
  }, []);
  useEffect(() => {
    if (booking.serviceIds.length > 0) {
      fetchLocationService();
    } else {
      // Nếu không có serviceId, reset danh sách location
      setLocationService([]);
    }
  }, [booking.serviceIds]);

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
            <View>
              <CmSelect
                label="Select the location"
                data={formattedLocationService}
                value={booking.locationId}
                onChange={(value) => handleLocationChange(value)}
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
                  <Pressable
                    onPress={() =>
                      router.navigate({
                        pathname: "/product/locationid",
                        params: { locationID: locationData?.id },
                      })
                    }
                  >
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
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        )}

        {booking.locationId !== null && (
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
                      <Pressable>
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
                      </Pressable>
                    </View>
                  </View>
                )}
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
                <CmSelect
                  label="Choose time"
                  data={timeRangeService || []}
                  value={timeService}
                  onChange={(value) => handleTimeChange(value)}
                  placeholder="Select an option"
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Step1;
