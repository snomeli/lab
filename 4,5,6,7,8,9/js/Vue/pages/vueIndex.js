let app = new Vue({
    el: "#app",
    data: {
        posts: []
    },
    mounted() {
        axios.get('https://isidea.ru/rgups_data.json').then(res => {
            this.posts = res.data;
        })
    }
});

