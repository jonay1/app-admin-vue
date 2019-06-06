<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="query.q" placeholder="ID/名称" style="width: 200px;" class="filter-item"
                      @keyup.enter.native="handleSearch"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
                搜索
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline"
                       @click="handleAdd">
                新增
            </el-button>
        </div>
        <el-table :data="list" border stripe highlight-current-row>
            <el-table-column type="index"></el-table-column>
            <el-table-column align="center" label="角色ID">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="角色名称">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <i class="el-icon-edit btn primary" title="编辑" @click="handleEdit(scope)"></i>
                    <i class="el-icon-delete btn danger" title="删除" @click="handleDelete(scope)"></i>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新增'">
            <el-form ref="form" :rules="rules" :model="data" label-width="100px" label-position="right">
                <el-form-item label="角色ID" prop="id">
                    <el-input v-model="data.id" placeholder="2~10个英文" :disabled="dialogType=='edit'"/>
                </el-form-item>
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="data.name" placeholder="中文名称"/>
                </el-form-item>
                <el-form-item label="功能权限" prop="funcs">
                    <el-tree
                            ref="tree"
                            :data="funcList"
                            show-checkbox
                            node-key="id"
                            :default-expand-all="true"
                            class="permission-tree"
                    />
                </el-form-item>
            </el-form>
            <div class="right">
                <el-button type="danger" @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="handleSave">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/api/role'
    import r1 from '@/router/default'
    import r2 from '@/router/dynamic'
    import {deepClone} from '@/utils/index'

    const defaultRole = {
        id: '',
        name: '',
        funcs: []
    }
    export default {
        name: "RoleMng",
        data() {
            return {
                tableKey: 0,
                data: {},
                funcList: [],
                list: null,
                total: 0,
                listLoading: true,
                query: {
                    q: '',
                    page: 1,
                    limit: 20
                },
                showReviewer: false,
                dialogVisible: false,
                dialogType: 'new',
                rules: {
                    id: [{required: true, message: '请填写角色ID'}],
                    name: [{required: true, message: '请填写角色名称'}]
                }
            }
        },
        methods: {
            handleAdd() {
                this.data = deepClone(defaultRole)
                if (this.$refs.tree) {
                    this.$refs.tree.setCheckedNodes([])
                }
                this.dialogType = 'new'
                this.dialogVisible = true
            },
            handleSearch() {

            },
            handleEdit(scope) {
                this.dialogType = 'edit'
                this.data = deepClone(scope.row)
                this.dialogVisible = true
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys(this.data.funcs || [])
                })

            },
            handleDelete({$index, row}) {
                this.$confirm(`确认删除角色: ${row.name}`, '删除', {
                    type: 'warning'
                }).then(() => {
                    api.delete(row.key).then(() => {
                        this.list.splice($index, 1)
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
                    })
                }).catch(err => {
                })
            },
            handleSave() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.data.funcs = this.$refs.tree.getCheckedKeys()
                        const isEdit = this.dialogType === 'edit'
                        if (isEdit) {
                            api.put(this.data).then((data) => {
                                let tmp = this.list.filter(item => {
                                    return item.id = this.data.id
                                })
                                deepClone(tmp, this.data)
                                this.dialogVisible = false
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            })
                        } else {
                            api.post(this.data).then((data) => {
                                this.list.push(this.data)
                                this.dialogVisible = false
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            generateTreeData(routes) {
                const res = []
                for (let route of routes) {
                    // skip some route
                    if (!route.id) {
                        continue
                    }
                    const data = {
                        id: route.id,
                        label: route.meta && route.meta.title
                    }
                    // recursive child routes
                    if (route.children) {
                        data.children = this.generateTreeData(route.children)
                    }
                    res.push(data)
                }
                return res
            },
        },
        mounted() {
            api.get(this.query).then((data) => {
                this.list = data
            })
        },
        created() {
            const treedata = this.generateTreeData(deepClone([...r1, ...r2]))
            const virutalRoot = [{
                id: 0,
                label: '(菜单树)',
                children: treedata
            }]
            this.funcList = virutalRoot
        }
    }
</script>


<style lang="scss" scoped>
    .app-container {

        .btn {
            cursor: pointer;
            font-size: 14px;

            &.primary {
                color: #1890ff;
            }

            &.danger {
                color: red;
            }
        }


        .right {
            text-align: right;
        }

        .roles-table {
            margin-top: 30px;
        }

        .permission-tree {
            margin-bottom: 30px;
        }
    }
</style>
