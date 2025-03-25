import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from '@/axios.js';
import router from "@/router/router.js";

export const useScheduleStore = defineStore('schedule', (url, config) => {
    const schedules = ref([]);
    const isLoading = ref(false);
    const totalItems = ref(0);
    const message = ref("");

    const getSchedule = async (keyword = '', startDate, endDate, nowPage = 1, cntPerPage = 5) => {
        isLoading.value = true;
        try {
            const response = await axios.get('/schedules', {
                params: {
                    keyword,
                    startDate,
                    endDate,
                    nowPage,
                    cntPerPage,
                },
            });
            schedules.value = response.data.schedules;
            totalItems.value = response.data.total;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    const addSchedule = async (scheduleData) => {
      if(!scheduleData.content || ! scheduleData.name || ! scheduleData.password || ! scheduleData.email){
          message.value = "누락된 값이 있습니다.";
          return;
      }
      isLoading.value = true;
      message.value = "";

      try{
          const response = await axios.post('/schedules',scheduleData,{
              headers: {
                  "Content-Type": "application/json", // JSON 데이터 전송 명시
              }
          });
            if (response.status === 201) {
                alert("일정이 등록되었습니다.");
                await router.push("/");
            }
            else {
                console.log("실패");
            }
      }
      catch(error){
          if(error.response && error.response.status === 400) {
              alert(error.response.data);
          }
      }
      finally {

      }
    };

    const getScheduleById = async (id) => {
        try{
            const response = await axios.get(`/schedules/${id}`);

            console.log(response.data);

            return response.data;
        }
        catch(error){

        }
    }
    const updateSchedule = async ({id, content, password}) => {
        try{
            const requestData = {
                id: Number(id),
                content,
                password
            };
            const response = await axios.put("/schedules", requestData, {
                headers: {
                    "Content-Type": "application/json",
                }});
            if (response.status === 200) {
                alert("일정이 수정되었습니다.");
                await router.push("/");
            } else {
                alert(response.data.message);
            }
        }
        catch(error){
            if (error.response && error.status === 401) {
                alert("비밀번호가 일치하지 않습니다.");
            } else if (error.response && error.status === 400) {
                alert(error.response.data);
            }
            return false;
        }

    }
    const deleteSchedule = async ({id, password}) => {
        try {
            const requestData = {
                id: Number(id),
                password
            };
            const response = await axios.delete(`/schedules`, {
                headers: {
                    "Content-Type": "application/json",
                },
                data: requestData,
            });
            if (response.status === 200) {
                alert("일정이 삭제되었습니다.");
                await router.push("/");
            } else {
                alert(response.data.message);
            }
        }
        catch(error){
            if (error.response && error.status === 401) {
                alert("비밀번호가 일치하지 않습니다.");
            } else if (error.response && error.status === 400) {
                alert(error.response.data);
            }
            return false;
        }
    }
    return {
        schedules,
        getSchedule,
        isLoading,
        totalItems,
        addSchedule,
        getScheduleById,
        updateSchedule,
        deleteSchedule,
    };
});
