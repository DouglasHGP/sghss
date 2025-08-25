<template>
  <div class="row no-wrap">
    <div class="row items-center">
      <div
        class="text-h4 text-weight-thin text-grey-8 q-mb-sm"
        :class="{ 'text-h5': $q.platform.is.mobile, 'mobile-hide': searchable }"
      >
        {{ props.title }}
      </div>
      <q-icon
        name="info_outline"
        size="xs"
        color="grey-6"
        class="q-mt-sm q-mx-sm cursor-pointer mobile-hide"
      >
        <q-tooltip>
          <span class="text-subtitle2">{{ props.description }}</span>
        </q-tooltip>
      </q-icon>
    </div>
    <q-input
      v-if="searchable"
      :class="{ 'q-mb-sm col-grow': $q.platform.is.mobile }"
      dense
      standout="bg-teal-4 text-white"
      rounded
      :label="$q.platform.is.mobile ? props.title : 'Buscar'"
    >
      <template v-slot:before v-if="$q.platform.is.mobile">
        <q-icon name="arrow_back_ios" color="secondary" />
      </template>
      <template v-slot:append>
        <q-btn round dense flat icon="search" />
      </template>
    </q-input>
    <q-space />
    <q-card-actions class="q-px-none q-pt-none">
      <slot name="actions" />
    </q-card-actions>
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
})
</script>
