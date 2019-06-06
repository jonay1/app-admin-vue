<template>
    <div class="app-container">
        <div v-if="user">
            <el-row :gutter="20">

                <el-col :span="6" :xs="24">
                    User Center, Hello {{user.name}}
                </el-col>

                <el-col :span="18" :xs="24">
                    Say Nothing
                </el-col>

            </el-row>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Profile',
        data() {
            return {
                user: {},
                activeTab: 'activity'
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'avatar'
            ])
        },
        created() {
            this.getUser()
        },
        methods: {
            getUser() {
                this.user = {
                    name: this.name,
                    email: 'admin@test.com',
                    avatar: this.avatar
                }
            }
        }
    }
</script>
