<template>
  <v-app id="inspire">
    <v-app-bar flat app color="white">
      <!-- <div class="flagman-h2-bold">Сохраненные стратегии</div> -->

      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn class="mr-3" icon>
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>

      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <div v-bind="attrs" class="d-flex align-center" v-on="on">
            <v-avatar class="mr-3" color="grey darken-1" size="32" />
            <div>{{ $auth.user.username }}</div>
            <v-icon>mdi-menu-down</v-icon>
          </div>
        </template>
        <v-list>
          <v-list-item @click="onLogout">
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer class="app-nav-drawer" permanent fixed app>
      <img src="@/assets/images/logo.png" class="logo__img" />

      <v-spacer />
      <v-list>
        <!-- <v-list-item exact :to="{ name: 'index' }">
          <v-list-item-content>
            <v-list-item-title> Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <template v-if="$auth.user.role === 'Candidate'">
          <v-list-item exact :to="{ name: 'user-start' }">
            <v-list-item-content>
              <v-list-item-title>Вакансии</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item exact :to="{ name: 'user-tests' }">
            <v-list-item-content>
              <v-list-item-title> Мои тесты</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item exact :to="{ name: 'user-requests' }">
            <v-list-item-content>
              <v-list-item-title> Мои заявки</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <!-- $auth.user.role !== 'Candidate' -->
        <template v-if="true">
          <v-list-item exact :to="{ name: 'specializations' }">
            <v-list-item-content>
              <v-list-item-title> Специализации</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item exact :to="{ name: 'grade-requests' }">
            <v-list-item-content>
              <v-list-item-title> Заявки</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group :value="true">
            <template #activator>
              <v-list-item-title>Банк тестов</v-list-item-title>
            </template>

            <v-list-item exact :to="{ name: 'questions' }">
              <v-list-item-content>
                <v-list-item-title class="pl-6"> Вопросы </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item exact :to="{ name: 'tests' }">
              <v-list-item-content>
                <v-list-item-title class="pl-6"> Тесты</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main class="app-main-wrapper">
      <v-container class="py-3 px-5" fluid>
        <!-- <v-row>
          <v-col cols="12"> -->
        <nuxt />
        <!-- <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item :key="n">
                    <v-list-item-avatar color="grey darken-1" />

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider v-if="n !== 6" :key="`divider-${n}`" inset />
                </template>
              </v-list>
            </v-card> -->
        <!-- </v-col>
        </v-row> -->
      </v-container>
    </v-main>

    <app-confirm-modal />
    <app-notification />
  </v-app>
</template>

<script>
import AppNotification from '@/plugins/notification/AppNotification.vue'
import AppConfirmModal from '@/plugins/confirmation/AppConfirmModal.vue'
export default {
  name: 'DefaultLayout',
  components: {
    AppConfirmModal,
    AppNotification,
  },
  middleware: 'auth',
  data: () => ({
    links: [
      {
        name: 'settings',
        icon: 'mdi-account-multiple-outline',
        text: 'Настройки',
      },

      {
        name: 'vehicles',
        icon: 'mdi-account-multiple-outline',
        text: 'Автопарк',
      },

      // {
      //   name: 'users',
      //   icon: 'mdi-account-multiple-outline',
      //   text: 'Пользователи',
      // },
      // {
      //   name: 'products',
      //   icon: 'mdi-account-multiple-outline',
      //   text: 'Товары',
      // },
      // {
      //   name: 'categories',
      //   icon: 'mdi-account-multiple-outline',
      //   text: 'Категории',
      // },
      // {
      //   name: 'trade',
      //   icon: 'mdi-newspaper-variant-outline',
      //   text: 'Тестирование стратегий',
      // },
      // {
      //   name: 'warehouse',
      //   icon: 'mdi-cloud-check',
      //   text: 'Протестированные стратегии',
      // },
      // {
      //   name: 'tests3',
      //   icon: 'mdi-account-multiple-outline',
      //   text: 'Заказы',
      // },
      // {
      //   name: 'tests4',
      //   icon: 'mdi-account-multiple-outline',
      //   text: 'Склады',
      // },
      // {
      //   name: 'tests4',
      //   icon: 'mdi-account-multiple-outline',
      //   text: 'Настройки',
      // },
    ],
  }),
  methods: {
    async onLogout() {
      await this.$auth.logout()
    },
  },
}
</script>
<style lang="scss" scoped>
.logo__img {
  width: 206px;
  margin: 21px auto;
  display: block;
}

.app-nav-drawer {
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.014),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.app-main-wrapper {
  background-color: #f5f6f8;
}
::v-deep {
  .v-toolbar__content {
    padding: 4px 43px;
  }
}

.v-list-item__icon {
  margin-right: 10px !important;
}
::v-deep {
  .v-list-item__icon {
    margin-right: 10px !important;
  }
}
</style>
