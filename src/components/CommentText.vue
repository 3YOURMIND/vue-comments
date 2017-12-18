<template>
  <div class="row">
    <div class="col-xs-12" data-test="text-container">
      <span v-for="line in text.split('\n')" :key="line">
        {{line}}<br>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentText',
  props: {
    text: String,
  },
};
</script>
