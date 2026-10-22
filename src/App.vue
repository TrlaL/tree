<template>
  <main class="app">
    <div class="app__wrapper">
      <div
        v-if="error"
        class="app__error"
      >
        <span>
          Не удалось загрузить данные.
        </span>
        <button
          class="app__retry"
          type="button"
          @click="getItems">
          Повторить
        </button>
      </div>
      <ag-grid-vue
        :auto-group-column-def="autoGroupColumnDef"
        :default-col-def="defaultColDef"
        :row-data="rowData"
        :column-defs="colDefs"
        :tree-data="true"
        :get-data-path="getDataPath"
        :get-row-id="getRowId"
        :group-default-expanded="groupDefaultExpanded"
        :loading="loading"
        :suppress-group-rows-sticky="suppressGroupRowsSticky"
        class="app__grid"
      />
    </div>
  </main>
</template>

<script lang="ts">
  import TreeApi from './api/TreeApi';
  import TreeStore from './classes/TreeStore';
  import { defineComponent, markRaw } from 'vue';
  import { AgGridVue } from 'ag-grid-vue3';
  import { AUTO_GROUP_COLUMN_DEF, COL_DEFS, DEFAULT_COL_DEF } from './constants/grid';
  import type { TreeItem, TreeRow } from './types/tree';
  import type { GetRowIdParams } from 'ag-grid-community';

  export default defineComponent({
    components: {
      AgGridVue
    },

    data () {
      return {
        groupDefaultExpanded: -1,
        error: false,
        treeApi: markRaw(new TreeApi(location.origin, 2000)),
        treeStore: null as TreeStore | null,
        loading: false,
        rowData: [] as TreeRow[],
        autoGroupColumnDef: AUTO_GROUP_COLUMN_DEF,
        defaultColDef: DEFAULT_COL_DEF,
        colDefs: COL_DEFS,
        suppressGroupRowsSticky: true
      };
    },

    mounted () {
      this.getItems();
    },

    methods: {
      async getItems () {
        try {
          this.error = false;
          this.loading = true;
          const response = await this.treeApi.getItems();
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const items: TreeItem[] = await response.json();
          const treeStore = markRaw(new TreeStore(items));
          this.treeStore = treeStore;
          this.rowData = this.buildRows(treeStore);
        } catch {
          this.error = true;
        } finally {
          this.loading = false;
        }
      },
      getDataPath (data: TreeRow): string[] {
        return data.path;
      },
      getRowId ({ data }: GetRowIdParams<TreeRow>): string {
        return String(data.id);
      },
      buildRows (store: TreeStore): TreeRow[] {
        return store.getAll().map(item => ({
          ...item,
          category: store.getChildren(item.id).length > 0 ? 'Группа' : 'Элемент',
          path: [
            ...store.getAllParents(item.id).reverse().map(parent => String(parent.id)),
            String(item.id)
          ]
        }));
      }
    }
  });
</script>

<style lang="scss">
  .app {
    background-color: #EEE;
    font-family: Arial;
    height: 100%;
    padding: 20px;
    width: 100%;

    &__wrapper {
      position: relative;
    }

    &__error {
      align-items: center;
      background: rgba(255, 255, 255, 0.5);
      bottom: 0;
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: center;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 10;
    }

    &__retry {
      border: 1px solid #333;
      border-radius: 10px;
      cursor: pointer;
      font-family: inherit;
      padding: 10px 20px;

      &:hover {
        background: #CCC;
      }
    }

    &__grid {
      height: 500px;
      width: 100%;
    }
  }
</style>