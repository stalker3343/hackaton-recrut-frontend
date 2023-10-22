<template>
  <div>
    <div class="d-flex align-center">
      <img style="width: 70px" class="mr-3" :src="item.vehicle.avatar" />

      <div>
        <div class="d-flex justify-space-between">
          <div class="mr-2">Инвентарный номер</div>
          <div>
            {{ item.vehicle.inventory_number }}
          </div>
        </div>

        <div class="d-flex justify-space-between">
          <div class="mr-2">Бренд</div>
          <div>
            {{ item.vehicle.brand }}
          </div>
        </div>

        <div class="d-flex justify-space-between">
          <div class="mr-2">Гос. номер</div>
          <div>
            {{ item.vehicle.gov_number }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(detail, idx) in detailsProps"
      :key="detail.label"
      :class="{ 'mb-4': [0, 3].includes(idx) }"
      class="d-flex justify-space-between"
    >
      <div class="mr-2">{{ detail.label }}</div>
      <div>
        {{ item[`${detail.value}`] }}
      </div>
    </div>

    <div class="d-flex justify-space-between">
      <div class="mr-2">Показания счетчика</div>
      <div>
        {{ item.counter.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      detailsProps: [
        {
          label: 'Обьем',
          value: 'liters',
        },
        {
          label: 'Тип топлива',
          value: 'fuel_type_name',
        },
        {
          label: 'Цена за единицу',
          value: 'price',
        },
        {
          label: 'Сумма',
          value: 'summ',
        },
        {
          label: 'Дата и время заправки',
          value: 'date',
        },
        {
          label: 'Дата и время создания записи',
          value: 'created_at',
        },
      ],
    }
  },
}
</script>
