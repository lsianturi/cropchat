const postCat = {
  methods: {
    postCat (catUrl, comment) {
      this.$root.$firebaseRefs.cat.push(
        {
          'url': catUrl,
          'comment': comment,
          'info': 'Posted by Lambok on Tuesday',
          'created_at': -1 * new Date().getTime()
        }
      ).then(
        this.$router.go(-1)
      )
    }
  }
}
export default postCat
