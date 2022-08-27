<template>
  <label :for='modalID' :id='`${modalID}-btn`'  class="modal-button cursor-pointer">
      <slot name="modal-btn-icon"></slot>
  </label>
  <input type="checkbox" :id="modalID" class="modal-toggle" />

  <label :for='modalID' :id="`${modalID}-layout`"  class="modal">

    <!-- This for-label needs to be empty !! -->
    <label
      class="modal-box p-0 shadow-none relative overflow-hidden"
      for='' :id="`${modalID}-box`"
    >
      <slot name="modal-content"></slot>
    </label>
  </label>
</template>

<script>
export default {
    props: {
        modalID: String
    },
};
</script>

<style>
</style>