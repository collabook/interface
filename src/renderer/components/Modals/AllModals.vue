<template>
  <div id="wrapper">
    <b-modal :active.sync="isNewBookModalActive" :width="500" has-modal-card>
      <new-book-modal></new-book-modal>
    </b-modal>
    <b-modal :active.sync="isNewAuthorModalActive" :width="500" has-modal-card>
      <new-author-modal></new-author-modal>
    </b-modal>
    <b-modal :active.sync="isNewCommitModalActive" :width="500" has-modal-card>
      <new-commit-modal></new-commit-modal>
    </b-modal>
    <b-modal :active.sync="isNewRemoteModalActive" :width="500" has-modal-card>
      <new-remote-modal></new-remote-modal>
    </b-modal>
    <b-modal :active.sync="isPushModalActive" :width="500" has-modal-card>
      <push-modal></push-modal>
    </b-modal>
    <b-modal :active.sync="isPullModalActive" :width="500" has-modal-card>
      <pull-modal></pull-modal>
    </b-modal>
    <b-modal :active.sync="isCreateBranchModalActive" :width="500" has-modal-card>
      <create-branch></create-branch>
    </b-modal>
    <b-modal :active.sync="isSwitchBranchModalActive" :width="500" has-modal-card>
      <switch-branch></switch-branch>
    </b-modal>
    <b-modal :active.sync="isRebaseModalActive" :width="500" has-modal-card>
      <rebase-modal></rebase-modal>
    </b-modal>
    <b-modal :active.sync="isCloneModalActive" :width="500" has-modal-card>
      <clone></clone>
    </b-modal>
    <b-modal :active.sync="isHubCreateModalActive" :width="500" has-modal-card>
      <hub-create />
    </b-modal>
    <b-modal :active.sync="isHubDeleteModalActive" :width="500" has-modal-card>
      <hub-delete />
    </b-modal>
    <b-modal :active.sync="isHubForkModalActive" :width="500" has-modal-card>
      <hub-fork />
    </b-modal>
    <b-modal :active.sync="isSyncForkModalActive" :width="500" has-modal-card>
      <sync-fork />
    </b-modal>
    <b-modal :active.sync="isMergeBranchModalActive" :width="500" has-modal-card>
      <merge-branch />
    </b-modal>
  </div>
</template>

<script>
import NewBookModal from '@/components/Modals/NewBookModal'
import NewAuthorModal from '@/components/Modals/NewAuthorModal'
import NewCommitModal from '@/components/Modals/NewCommitModal'
import NewRemoteModal from '@/components/Modals/NewRemoteModal'
import PushModal from '@/components/Modals/PushModal'
import PullModal from '@/components/Modals/PullModal'
import CreateBranch from '@/components/Modals/CreateBranch'
import SwitchBranch from '@/components/Modals/SwitchBranch'
import RebaseModal from '@/components/Modals/RebaseModal'
import Clone from '@/components/Modals/Clone'
import HubCreate from '@/components/Modals/HubCreate'
import HubDelete from '@/components/Modals/HubDelete'
import HubFork from '@/components/Modals/HubFork'
import SyncFork from '@/components/Modals/SyncFork'
import MergeBranch from '@/components/Modals/MergeBranch'
import axios from 'axios'

export default {
  name: 'AllModals',
  components: {
    NewBookModal,
    NewAuthorModal,
    NewCommitModal,
    NewRemoteModal,
    PushModal,
    PullModal,
    CreateBranch,
    SwitchBranch,
    RebaseModal,
    Clone,
    HubCreate,
    HubDelete,
    HubFork,
    SyncFork,
    MergeBranch
  },

  data () {
    return {
      isNewBookModalActive: false,
      isNewAuthorModalActive: false,
      isNewCommitModalActive: false,
      isNewRemoteModalActive: false,
      isPushModalActive: false,
      isPullModalActive: false,
      isCreateBranchModalActive: false,
      isSwitchBranchModalActive: false,
      isRebaseModalActive: false,
      isCloneModalActive: false,
      isHubCreateModalActive: false,
      isHubDeleteModalActive: false,
      isHubForkModalActive: false,
      isSyncForkModalActive: false,
      isMergeBranchModalActive: false
    }
  },

  mounted () {
    axios.get(`http://localhost:8088/author`)
      .then((res) => {
        this.$store.commit('SET_AUTHOR', {name: res.data.name, email: res.data.email})
      })
      .catch((e) => {
        this.isNewAuthorModalActive = true
      })
  },

  created: function () {
    this.$messageBus.$on('newBook', () => {
      this.isNewBookModalActive = true
    })
    this.$messageBus.$on('gitCommit', () => {
      this.isNewCommitModalActive = true
    })
    this.$messageBus.$on('gitPush', () => {
      this.isPushModalActive = true
    })
    this.$messageBus.$on('gitPull', () => {
      this.isPullModalActive = true
    })
    this.$messageBus.$on('userSettings', () => {
      this.isNewAuthorModalActive = true
    })
    this.$messageBus.$on('gitAddRemote', () => {
      this.isNewRemoteModalActive = true
    })
    this.$messageBus.$on('gitCreateBranch', () => {
      this.isCreateBranchModalActive = true
    })
    this.$messageBus.$on('gitSwitchBranch', () => {
      this.isSwitchBranchModalActive = true
    })
    this.$messageBus.$on('gitRebase', () => {
      this.isRebaseModalActive = true
    })
    this.$messageBus.$on('gitClone', () => {
      this.isCloneModalActive = true
    })
    this.$messageBus.$on('hubCreate', () => {
      this.isHubCreateModalActive = true
    })
    this.$messageBus.$on('hubDelete', () => {
      this.isHubDeleteModalActive = true
    })
    this.$messageBus.$on('hubFork', () => {
      this.isHubForkModalActive = true
    })
    this.$messageBus.$on('syncFork', () => {
      this.isSyncForkModalActive = true
    })
    this.$messageBus.$on('gitMerge', () => {
      this.isMergeBranchModalActive = true
    })
  }
}
</script>
