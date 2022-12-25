let app = new Vue({
    el: "#app",
    data: {
        selectedAuthorLogin: 'Посты всех авторов',
        authorName: 'none',
        authorLogin: 'none',
        subscribers: '0',
        signed: '0',
        postCount: '0',
        posts: posts
    },
    computed: {
        filterPosts: function () {
            let author = this.selectedAuthorLogin;

            return this.posts.filter(post => {
                if (author === '' || author === 'Посты всех авторов') {
                    this.authorName = 'Посты всех авторов';
                    this.authorLogin = 'none';
                    this.subscribers = 0;
                    this.signed = 0;
                    this.postCount = posts.length;

                    return true;
                } else {
                    if (post.author !== author) {
                        return post.author === author;
                    }
                    authors.forEach(author => {
                        if (author === post.author) {
                            this.authorName = author.name;
                            this.authorLogin = author.login;
                            this.subscribers = author.subscribers;
                            this.signed = author.signed;
                            this.postCount = author.postCount;
                        }
                    });
                    return post.author === author;
                }
            })
        }
    }
});