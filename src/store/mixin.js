import { mapGetters, mapActions } from 'vuex'

export const appMixin = {
  computed: {
    ...mapGetters([
      'userName'

    ])
  },
  methods: {
    ...mapActions([
      'setUserName'
    ])
  }
}
