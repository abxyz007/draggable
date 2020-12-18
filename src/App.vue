<template>
    <div id="app">

        <el-dialog title="Add Task" :visible.sync="openModal" width="30%" center>
            <el-form ref="form" label-width="100px">
                <el-form-item label="Title">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                    <el-input v-model="title"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="closeModal">Cancel</el-button>
              <el-button type="primary" @click="saveTask">Confirm</el-button>
            </span>
        </el-dialog>

        <el-row style="margin-left: -5px; margin-right: -5px;">
            <el-col :span="18" :xs="24" style="padding-left: -5px; padding-right: -5px;">

                <el-col :span="8" :xs="24" style="padding-left: 5px; padding-right: 5px;">
                    <el-card class="el-card card-wrapper round is-always-shadow">
                        <div class="status">To Do</div>
                        <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions"    :move="onMove" @start="isDragging=true" @end="isDragging=false">
                            <transition-group name="no" class="list-group" tag="ul">
                                <el-card class="el-card card-wrapper is-always-shadow" v-for="(element,index) in list"    :key="index"
                                      >
                                    <div class="title"> {{element.name}}</div>
                                    <div class="description">{{element.title}}</div>
                                </el-card>
                            </transition-group>
                        </draggable>
                    </el-card>

                    <el-col :span="24" :xs="24" style="padding-left: 5px; padding-right: 5px;">
                    </el-col>
                </el-col>

                <el-col :span="8" :xs="24" style="padding-left: 5px; padding-right: 5px;">

                    <el-card class="el-card card-wrapper round is-always-shadow">
                        <div class="status">In Progress</div>
                        <draggable element="span" v-model="list2" v-bind="dragOptions" :move="onMove">
                            <transition-group name="no" class="list-group" tag="ul">
                                <el-card class="el-card card-wrapper is-always-shadow" v-for="(element,index) in list2"  :key="index"
                                        >
                                    <div class="title"> {{element.name}}</div>
                                    <div class="description">{{element.title}}</div>
                                </el-card>
                            </transition-group>
                        </draggable>
                    </el-card>

                </el-col>
                <el-col :span="8" :xs="24" style="padding-left: 5px; padding-right: 5px;">

                    <el-card class="el-card card-wrapper round is-always-shadow">
                        <div class="status">Done</div>
                        <draggable element="span" v-model="list3" v-bind="dragOptions" :move="onMove">
                            <transition-group name="no" class="list-group" tag="ul">
                                <el-card class="el-card card-wrapper is-always-shadow" v-for="(element,index) in list3"  :key="index"
                                        >
                                    <div style="cursor: pointer" class="title">
                                      <span>{{element.name}}</span>
                                    </div>
                                    <div class="description">{{element.title}}</div>
                                </el-card>
                            </transition-group>
                        </draggable>
                    </el-card>

                </el-col>
            </el-col>
            <el-col :span="6" :xs="24" style="padding-left: 5px; padding-right: 5px;">
                <el-card class="el-card card-wrapper round is-always-shadow">
                    <div class="status" style="display: flex;justify-content: space-between;">List Task
                        <button data-v-b5e7257a="" type="button" style="float: right; padding: 3px 0;" class="el-button btn-add el-button--text">
                          <span @click="addItem">+ Add</span>
                        </button>
                    </div>
                    <el-col :span="24" :xs="24" style="padding-left: 5px; padding-right: 5px;">
                        <draggable element="span" v-model="list4" v-bind="dragOptions" :move="onMove">
                            <transition-group name="no" class="list-group" tag="ul">
                                <el-card class="el-card card-wrapper is-always-shadow" v-for="(element,index) in list4" :key="index">
                                    <div class="title"> {{element.name}}</div>
                                    <div class="description">{{element.title}}</div>
                                </el-card>
                            </transition-group>
                        </draggable>
                    </el-col>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import draggable from 'vuedraggable'

const message = [
  { name: 'Task D', title: 'Update style' }
]
const message1 = [
  { name: 'Task F', title: 'Remove button Y' }

]
const message3 = [
  { name: 'Task F', title: 'Fix Bug #001' }

]
const message4 = [
  { name: 'Task A', title: 'Fix Bug #001' },
  { name: 'Task B', title: 'Refactor using Kotlin' },
  { name: 'Task C', title: 'There is a bug when user click button X' }

]
export default {
  name: 'app',
  components: {
    draggable
  },
  data () {
    return {
      items: [
        { name: 'Task A', title: 'Refactor using Kotlin', order: 1 },
        { name: 'Task B', title: 'Update using Typescript', order: 2 },
        { name: 'Task C', title: 'There is a bug when user click button X', order: 3 }
      ],
      list: message.map((list, index) => {
        return { name: list.name, title: list.title, order: index + 1, fixed: false }
      }),
      list2: message1.map((list, index) => {
        return { name: list.name, title: list.title, order: index + 1, fixed: false }
      }),
      list3: message3.map((list, index) => {
        return { name: list.name, title: list.title, order: index + 1, fixed: false }
      }),
      list4: message4.map((list, index) => {
        return { name: list.name, title: list.title, order: index + 1, fixed: false }
      }),

      editable: true,
      isDragging: false,
      delayedDragging: false,
      openModal: false,

      name: '',
      title: ''

    }
  },
  methods: {
    saveTask () {
      this.list4.push({
        name: this.name,
        title: this.title
      })
      this.openModal = false
    },

    onMove ({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    addItem () {
      this.name = ''
      this.title = ''
      this.openModal = true
    },
    closeModal () {
      this.openModal = false
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }

  }
}
</script>

<style scoped>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-height: 722px;
        padding: 5px;
    }

    .round {
        border-radius: 25px;
        padding-bottom: 10px;
    }

    .card-wrapper {
        border: .5px solid;
        -webkit-box-shadow: 2px 2px #d8d8d8;
        box-shadow: 2px 2px #d8d8d8;
        margin: 10px 0;
    }

    .status {
        border-bottom: 1.5px solid #d8d8d8;
        color: #0e4d3d;
        font-weight: 700;
        padding: 10px;
        display: flex;
    }

    .title {
        border-bottom: .5px solid #d8d8d8;
        color: #0c9;
        font-weight: 700;
        padding: 10px;
        display: flex;
    }

    .description {
        color: grey;
        font-size: .75em;
        padding: 10px;
        display: flex;
    }

    .flip-list-move {
        transition: transform 0.5s;
    }

    .no-move {
        transition: transform 0s;
    }

    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }

    .list-group {
        margin-left: -40px;
    }

    .list-group-item {
        cursor: move;
    }

    .list-group-item i {
        cursor: pointer;
    }
</style>
