<template>
  <teleport to="body">
    <div
      v-if="state.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      @click="handleModalToogle({ state: false, component: {} })"
    >
      <div
        class="fixed mx-10"
        :class="state.width"
        @click.stop
      >
        <div class="flex flex-col overflow-hidden bg-white rounded-lg animate__animated animate__fadeInDown animate__faster">
          <div class="flex flex-col px-12 py-10 bg-white">
            <component :is="state.component" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { onMounted, onBeforeUnmount, defineAsyncComponent, reactive } from 'vue';
import useModal from '../../hooks/useModal';

const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))
const ModalAccountCreate = defineAsyncComponent(() => import('../ModalCreateAccount'))


const listModal = {
  'ModalLogin': Object.freeze(ModalLogin),
  'ModalAccountCreate': Object.freeze(ModalAccountCreate)
}
const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3';

const modal = useModal();
const state = reactive({
  isActive: false,
  component: {},
  props: {},
  width: DEFAULT_WIDTH
});

onMounted(() => {
  modal.listen(handleModalToogle);
});

onBeforeUnmount(() => {
  modal.off(handleModalToogle);
});

function handleModalToogle(payload) {
  if (payload.status) {
    state.component = listModal[payload.component];
    state.props = payload.props;
    state.width = payload.width ?? DEFAULT_WIDTH;
  } else {
    state.component = {};
    state.props = {};
    state.width = DEFAULT_WIDTH;
  }

  state.isActive = payload.status;
}
</script>
