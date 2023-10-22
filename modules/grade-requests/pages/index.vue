<template>
  <div>
    <app-board-wrapper
      :start-sticked="60"
      :header-height-offset="10"
      :loading="loading"
    >
      <!-- @start="onStart(stage.id)" -->

      <template #board="{ top }">
        <draggable
          v-for="stage in stages"
          :key="stage.id"
          :force-fallback="true"
          class="stack"
          :list="stage.gradeRequests"
          draggable=".card"
          :group="{ name: 'gradeRequests' }"
          @change="changeData($event, stage)"
        >
          <div
            v-for="request in stage.gradeRequests"
            :key="request.id"
            class="card mt-4 d-block cursor-pointer"
          >
            <request-card
              :all-users="allUsers"
              :tests-list="testsList"
              :item="request"
              @succes-edited-status="onSuccesEditedStatus"
            />
          </div>
          <template #header>
            <div
              class="stack__header text-center mb-6"
              :style="{
                top: top,
              }"
            >
              <div class="icis-h7 dark-main--text mb-1 pt-10 title">
                {{ stage.title }}

                <span class="primary-main--text">
                  {{ stage.gradeRequests.length }}
                </span>
              </div>
            </div>
          </template>
        </draggable>
      </template>
    </app-board-wrapper>
  </div>
</template>

<script>
import {
  defineComponent,
  set,
  useContext,
  ref,
  useFetch,
  onMounted,
} from '@nuxtjs/composition-api'
import draggable from 'vuedraggable'
import RequestCard from '../components/RequestCard.vue'

import AppBoardWrapper from '../components/AppBoardWrapper.vue'
import { STATUSES } from '@/utils/index'
export default defineComponent({
  components: {
    draggable,
    AppBoardWrapper,
    RequestCard,

    // LeadsFilters,
  },
  async asyncData({
    $gradeRequestsRepository,
    $testsRepository,
    $usersRepository,
  }) {
    const res = await $gradeRequestsRepository.index()
    const testsList = await $testsRepository.index()
    const allUsers = await $usersRepository.index()
    const allCompletedTests = await $gradeRequestsRepository.results()
    // grade_request_id test_id
    const stages = []
    for (const [key, value] of Object.entries(STATUSES)) {
      stages.push({
        title: value,
        id: key,
        gradeRequests: res.filter((el) => el.status === key),
      })
    }

    return {
      stages,
      testsList,
      allUsers,
    }
    // eslint-disable-next-line no-prototype-builtins
  },

  data() {
    return {
      STATUSES,
      loading: false,
    }
  },
  created() {},

  methods: {
    async onSuccesEditedStatus() {
      const res = await this.$gradeRequestsRepository.index()
      this.stages = this.getStages(res)
    },
    getStages(res) {
      const stages = []
      for (const [key, value] of Object.entries(this.STATUSES)) {
        stages.push({
          title: value,
          id: key,
          gradeRequests: res.filter((el) => el.status === key),
        })
      }
      return stages
    },
    async changeData(item, dragEndStage) {
      if (item.added) {
        const request = item.added.element
        this.loading = true
        await this.$gradeRequestsRepository.update(request.id, {
          status: dragEndStage.id,
        })
        const res = await this.$gradeRequestsRepository.index()
        this.stages = this.getStages(res)
        this.loading = false

        // const isTransferConfirm = await proccessFinaleStage(
        //   dragEndStage,
        //   $confirm
        // )
        // if (!isTransferConfirm) {
        //   revertDrag(dragEndStage.id, project)
        //   return
        // }

        // const { status, error } = await formWrapper.value.makeRequest(
        //   async () =>
        //     await $PRProjectsRepository.update(project.id, {
        //       privateRankPipelineStageId: dragEndStage.id,
        //     }),
        //   true
        // )
        // if (status) {
        //   updateProjectsCount(dragEndStage.id, project)
        // } else {
        //   const errorCode = Number(error.response.data.statusCode)
        //   if (errorCode !== 403) return
        //   revertDrag(dragEndStage.id, project)
        // }
      }
    },
  },
  /* setup() {
    const {
      $PRPipelineStagesRepository,
      $PRProjectsRepository,
      $emitter,
      $confirm,
    } = useContext()

    const formWrapper = ref()
    // FIXME Нужно принимать кастомный репозиторий параметром
    const customProjectsStageRepository = {
      async index(reqParms) {
        const order = reqParms.params.order
        const sort = reqParms.params.sort
        const page = reqParms.params.page
        const take = reqParms.params.take

        if (order) reqParms.params.order = order
        if (sort) reqParms.params.sort = sort
        if (page) reqParms.params.page = page
        if (take) reqParms.params.take = take

        const res = await $PRPipelineStagesRepository.index({
          params: {
            ...reqParms.params,
            privateRankPipelineStageJoinFlag: true,
            privateRankPipelineStageSort: 'weight',
          },
        })

        const { meta, data } = res
        meta.pageCount = meta.projectPageCount
        delete meta.projectPageCount
        return {
          meta,
          data,
        }
      },
    }
    const {
      list: stages,
      filters,
      onFilterInput,
      onResetFilters,
      onApplyFilters,
      initializeFunction,
      onInfiniteLoading,
      infiniteLoadingId,
    } = useTableEntitiesPage(
      initialFilters,
      customProjectsStageRepository,
      formWrapper,
      {
        serachFieldName: 'search',
        assignNewListItems: (data) => {
          if (!stages.value.length) {
            stages.value = data
          } else {
            data.forEach((stage, idx) => {
              const existStage = stages.value[idx]
              const loadedProjects = stage.projects.map((el) =>
                Object.freeze(el)
              )
              set(stages.value, idx, {
                ...existStage,
                projects: [...existStage.projects, ...loadedProjects],
              })
            })
          }
        },
      }
    )

    useFetch(() => {
      initializeFunction()
    })

    onMounted(() => {
      $emitter.on('pe-project-event', ({ eventType, payload }) => {
        onResetFilters(filters.value)

        // Если нужно будет сделать обновление без перезагрузки страницы
        // const proccesEventService = {
        //   created: ({ updatedProject }) => onCreateProject(updatedProject),
        //   edited: ({ updatedProject, oldStageId }) =>
        //     onEditProject(updatedProject, oldStageId),
        //   deleted: ({ projectId, stageId }) =>
        //     onDeleteProject(projectId, stageId),
        // }
        // proccesEventService[eventType](payload)

        //         const onCreateProject = (updatedProject) => {
        //   const leadStageIdx = stages.value.findIndex(
        //     (el) => el.id === updatedProject.privateRankPipelineStageId
        //   )
        //   const leadsArr = stages.value[leadStageIdx].projects
        //   leadsArr.unshift(updatedProject)
        // }
        // const onDeleteProject = (projectId, stageId) => {
        //   const leadStageIdx = stages.value.findIndex((el) => el.id === stageId)
        //   if (leadStageIdx === -1) return
        //   const leadsArr = stages.value[leadStageIdx].projects
        //   const leadIdx = leadsArr.findIndex((el) => el.id === projectId)
        //   if (leadIdx === -1) return

        //   leadsArr.splice(leadIdx, 1)
        // }
      })
    })

    const getElementStartEndStageIdx = (dragEndStageId, item) => {
      const startIdx = stages.value.findIndex(
        (el) => el.id === startDragElementStageId.value
      )
      const endIdx = stages.value.findIndex((el) => el.id === dragEndStageId)

      return { startIdx, endIdx }
    }

    const revertDrag = (dragEndStageId, item) => {
      const { startIdx, endIdx } = getElementStartEndStageIdx(
        dragEndStageId,
        item
      )
      stages.value[startIdx].projects.unshift(item)
      const dragEndstageLeads = stages.value[endIdx].projects
      const undoLeadIdx = dragEndstageLeads.findIndex((el) => el.id === item.id)
      dragEndstageLeads.splice(undoLeadIdx, 1)
    }

    const updateProjectsCount = (dragEndStageId, item) => {
      const { startIdx, endIdx } = getElementStartEndStageIdx(
        dragEndStageId,
        item
      )
      stages.value[startIdx].projectItemCount--
      stages.value[endIdx].projectItemCount++
    }

    const changeData = async (item, dragEndStage) => {
      if (item.added) {
        const project = item.added.element

        const isTransferConfirm = await proccessFinaleStage(
          dragEndStage,
          $confirm
        )
        if (!isTransferConfirm) {
          revertDrag(dragEndStage.id, project)
          return
        }

        const { status, error } = await formWrapper.value.makeRequest(
          async () =>
            await $PRProjectsRepository.update(project.id, {
              privateRankPipelineStageId: dragEndStage.id,
            }),
          true
        )
        if (status) {
          updateProjectsCount(dragEndStage.id, project)
        } else {
          const errorCode = Number(error.response.data.statusCode)
          if (errorCode !== 403) return
          revertDrag(dragEndStage.id, project)
        }
      }
    }

    const startDragElementStageId = ref(null)
    const onStart = (startStageId) => {
      startDragElementStageId.value = startStageId
    }

    return {
      formWrapper,
      stages,
      filters,
      onFilterInput,
      onResetFilters,
      onApplyFilters,
      onInfiniteLoading,
      infiniteLoadingId,
      changeData,

      startDragElementStageId,
      onStart,
    }
  }, */
})
</script>

<style lang="scss" scoped>
.stack {
  flex: none;
  min-height: 80vh;
  width: 305px;
  padding: 0px 11px;
  border-right: 1px solid rgba(27, 29, 33, 0.05);
}

.stack__header {
  position: relative;
}
</style>
