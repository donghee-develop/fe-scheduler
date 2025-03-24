<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {useScheduleStore} from "@/store/schedule/useScheduleStore.js";

const router = useRouter();

const content = ref(""); // 일정 내용
const name = ref(""); // 사용자 이름
const password = ref(""); // 사용자 ID
const email = ref("");
const handleAddSchedule = async () => {
  await useScheduleStore().addSchedule({
    content: content.value,
    name: name.value,
    password: password.value,
    email : email.value,
  });
};

const cancel = () => {
  router.push("/");
};

</script>

<template>
  <div class="add-schedule">
    <h2>일정 추가</h2>

    <div class="top-add-schedule">
      <div class="input-div">
        <label>작성자</label>
        <input v-model="name" placeholder="이름 입력" />
      </div>

      <div class="input-div">
        <label>비밀번호</label>
        <input v-model="password" type="password" placeholder="비밀번호 입력" />
      </div>

      <div class="input-div">
        <label>이메일</label>
        <input v-model="email" type="text" placeholder="비밀번호 입력" />
      </div>

    </div>

    <div class="input">
      <textarea v-model="content" name="content" cols="30" rows="10" placeholder="일정 내용을 입력해주세요"></textarea>
    </div>


    <div class="button-div">
      <button class="submit-btn" @click="handleAddSchedule">일정 추가</button>
      <button class="cancel-btn" @click="cancel">취소</button>
    </div>
  </div>
</template>
