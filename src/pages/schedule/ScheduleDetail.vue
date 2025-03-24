<template>
  <div class="schedule-detail">
    <h2>📅 일정 상세</h2>

    <div class="top-detail">
      <div class="input-div">
        <label>작성자</label>
        <input v-model="schedule.name" disabled />
      </div>

      <div class="input-div">
        <label>비밀번호</label>
        <input v-model="password" type="password" placeholder="비밀번호 입력" />
      </div>
    </div>

    <div class="input">
      <textarea
          v-model="schedule.content"
          :disabled="!editMode"
          cols="30"
          rows="10"
      ></textarea>
    </div>

    <div class="button-div">
      <button v-if="!editMode" class="edit-btn" @click="toggleEdit">수정</button>
      <button v-if="editMode" class="save-btn" @click="handleUpdateSchedule">저장</button>
      <button class="delete-btn" @click="handleDeleteSchedule">삭제</button>
      <button class="cancel-btn" @click="goBack">목록으로</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useScheduleStore } from "@/store/schedule/useScheduleStore.js";

const route = useRoute();
const router = useRouter();
const scheduleStore = useScheduleStore();

const schedule = ref({
  id: "",
  name: "",
  content: "",
  createdAt: "",
});
const password = ref("");
const editMode = ref(false);

onMounted(async () => {
  const id = route.params.id;
  const data = await scheduleStore.getScheduleById(id);
  if (data) {
    schedule.value = data;
  } else {
    alert("일정을 찾을 수 없습니다.");
    await router.push("/");
  }
});

const toggleEdit = () => {
  editMode.value = true;
};


const handleUpdateSchedule = async () => {
  if (!password.value.trim()) {
    alert("비밀번호를 입력하세요.");
    return;
  }
  await scheduleStore.updateSchedule({
    id: schedule.value.id,
    content: schedule.value.content,
    password: password.value,
  });
};

const handleDeleteSchedule = async () => {
  if (!password.value.trim()) {
    alert("비밀번호를 입력하세요.");
    return;
  }

  const confirmDelete = confirm("정말 삭제하시겠습니까?");
  if (!confirmDelete) return;

  await scheduleStore.deleteSchedule({
    id: schedule.value.id,
    password: password.value
  });};

const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
.schedule-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f9;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  margin: 50px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.top-detail {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.input-div {
  display: flex;
  flex-direction: column;
  width: 48%;
}

.input-div label {
  font-size: 14px;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.button-div {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

</style>