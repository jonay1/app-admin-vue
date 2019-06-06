<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="query.q" placeholder="ID/名称" style="width: 200px;" class="filter-item"
                      @keyup.enter.native="handleSearch"/>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
                搜索
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline"
                       @click="handleAdd">
                新增
            </el-button>
        </div>
        <el-table :data="list" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="角色ID" width="220">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="角色名称" width="220">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import api from '@/api/role'
    import waves from '@/directive/waves' // waves directive
    export default {
        name: "index",
        directives: {waves},
        data() {
            return {
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: true,
                query: {
                    q: undefined,
                    page: 1,
                    limit: 20
                },
                importanceOptions: [1, 2, 3],
                showReviewer: false,
                temp: {
                    id: undefined,
                    importance: 1,
                    remark: '',
                    timestamp: new Date(),
                    title: '',
                    type: '',
                    status: 'published'
                },
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                dialogPvVisible: false,
                pvData: [],
                rules: {
                    type: [{required: true, message: 'type is required', trigger: 'change'}],
                    timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
                    title: [{required: true, message: 'title is required', trigger: 'blur'}]
                },
                downloadLoading: false
            }
        },
        methods: {
            handleAdd() {

            },
            handleSearch() {

            },
            handleEdit() {

            },
            handleDelete() {

            }
        },
        mounted() {
            api.list(this.query).then((data) => {
                console.log(data)
                this.list = data
            })
        }
    }
</script>

<style scoped>

</style>