<script setup>
import { ref, computed, onMounted } from "vue";
import { useScheduleStore } from "@/store/schedule/useScheduleStore.js";
import router from "@/router/router.js";

const scheduleStore = useScheduleStore();
const keyword = ref(""); // 검색어
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;

const startDate = ref(`${year}-${String(month).padStart(2, "0")}-01`);
const lastDay = new Date(year,month,0).getDate()
const endDate = ref(`${year}-${String(month).padStart(2, "0")}-${lastDay}`);
const nowPage = ref(1);
const cntPerPage = ref(5);
const totalPages = computed(() => Math.ceil(scheduleStore.totalItems / cntPerPage.value));
const hasSchedules = computed(() => scheduleStore.schedules.length > 0);
const fetchSchedules = async () => {
  await scheduleStore.getSchedule(
      keyword.value,
      startDate.value,
      endDate.value,
      nowPage.value,
      cntPerPage.value
  );
};
const formatDate = (date) => {
  const utcDate = new Date(date);
  utcDate.setHours(utcDate.getHours());
  return utcDate.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
};

const searchSchedules = () => {
  nowPage.value = 1;
  fetchSchedules();
};

const writeSchedules = () => {
  router.push('/add-schedule');
}
const goToDetail = (id) =>{
  console.log("snfm")
  router.push({ name: "ScheduleDetail", params: { id } });
}
onMounted(fetchSchedules);
</script>


<template>
  <div>
    <h2>일정 목록</h2>

    <div class="filters">
      <input v-model="keyword" placeholder="검색어 입력" />
      <input type="date" v-model="startDate" />
      <input type="date" v-model="endDate" />
      <button @click="searchSchedules">검색</button>
    </div>

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>게시일</th>
        <th>작성자</th>
        <th>내용</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="!hasSchedules">
        <td colspan="4">일정이 없습니다.</td>
      </tr>

      <tr v-for="schedule in scheduleStore.schedules" :key="schedule.id"
           class="schedule-item"
      >
        <td>{{ schedule.id }}</td>
        <td>{{ formatDate(schedule.updatedAt) }}</td>
        <td class="schedule-item-detail" @click="goToDetail(schedule.id)">{{ schedule.name }}</td>
        <td class="schedule-item-detail" @click="goToDetail(schedule.id)">{{ schedule.content }}</td>
      </tr>
      </tbody>
    </table>

    <div class="pagination" v-if="hasSchedules && totalPages > 1">
      <button :disabled="nowPage <= 1" @click="nowPage--; fetchSchedules()">◀ 이전</button>
      <span>{{ nowPage }} / {{ totalPages }}</span>
      <button :disabled="nowPage >= totalPages" @click="nowPage++; fetchSchedules()">다음 ▶</button>
    </div>

    <div>
      <button @click="writeSchedules">글 작성</button>
    </div>

  </div>


</template>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 10px;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  table-layout: fixed;
}
th:nth-child(1), td:nth-child(1) { width: 10%; }
th:nth-child(2), td:nth-child(2) { width: 20%; }
th:nth-child(3), td:nth-child(3) { width: 20%; }
th:nth-child(4), td:nth-child(4) { width: 50%; }

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #f4f4f4;
  text-align: center;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
}

button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.schedule-item-detail {
  cursor: pointer;
  text-decoration: underline;
}
.schedule-item-detail:hover {
  background-color: #f4f4f4;
}
</style>