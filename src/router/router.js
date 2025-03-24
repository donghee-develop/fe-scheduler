import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/schedule/Main.vue";
import AddSchedule from "@/pages/schedule/AddSchedule.vue";
import ScheduleDetail from "@/pages/schedule/ScheduleDetail.vue";


const routes = [
    { path: "/", component: Main },
    { path: "/add-schedule", component: AddSchedule },
    { path: "/detail-schedule/:id", name: "ScheduleDetail", component: ScheduleDetail}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
