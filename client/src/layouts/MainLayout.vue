<template>
  <q-layout view="lHh Lpr lFf" style="height: 100%">
    <!-- <q-header elevated>
      <div class="column">
        <div>
          <q-toolbar>
            <q-toolbar-title>
              Freilos App
            </q-toolbar-title>
            <div class="absolute-right q-pa-sm">
              <q-btn
                flat
                dense
                icon="notifications"
                auto-close
                size="md"
              >
                <q-badge
                  color="red"
                  floating
                  transparent
                  v-if="nNotify"
                >{{nNotify}}</q-badge>
                <q-menu
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  fit
                  :offset="[0, 10]"
                  anchor="bottom right"
                  self="top right"
                  v-close-popup
                  auto-close
                >
                  <q-item>
                    <q-item-section>
                      <q-item-label>Notificaciones</q-item-label>
                    </q-item-section>

                    <q-item-section
                      side
                      bottom
                    >
                      <q-item-label caption>
                        <a
                          class="cursor-pointer text-primary"
                          @click="disableAllNotify()"
                          primary
                        >Marcar como Leidas</a>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-list>
                    <q-scroll-area style="height: 200px; max-width: 300px;">
                      <q-item
                        v-for="n in myNotification"
                        :key="n.id"
                        clickable
                        v-close-popup
                        :class="[n.status?'white':colorActive]"
                      >
                        <q-item-section
                          push
                          @click="disableNotify(n.id)"
                        >
                          <q-item-label ovequasrline>{{n.title}}</q-item-label>
                          <q-item-label lines="
                    1">{{n.message}}</q-item-label>
                          <q-item-label caption>{{n.createdAt}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-scroll-area>
                  </q-list>
                </q-menu>
              </q-btn>
              <q-btn
                flat
                dense
                icon="settings"
                auto-close
                size="md"
              >
                <q-menu
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  fit
                  :offset="[0, 10]"
                  anchor="bottom right"
                  self="top right"
                  v-close-popup
                  auto-close
                >
                  <q-item
                    clickable
                    v-ripple
                    style="width:200px"
                    class="text-primary"
                  >
                    <q-item-section avatar>
                      <q-icon
                        color="primary"
                        name="exit_to_app"
                      />
                    </q-item-section>

                    <q-item-section>Cerrar Sesión</q-item-section>
                  </q-item>
                </q-menu>
              </q-btn>
            </div>
          </q-toolbar>
        </div>

        <div class="row">
          <div class="col1">
            <q-avatar
              class="q-ma-md"
              size="80px"
            >
              <img src="../statics/boy-avatar.png">
            </q-avatar>
          </div>
          <div class="col1 q-mt-sm">
            <div class="text-h6 text-bold"> Haidee Martines</div>
            <div class="text-h6"> 10.000,00$</div>
            <div class="text-subtitle2"> 100.000,00$</div>
          </div>
        </div>
      </div>
      <BarraNavegacion />
    </q-header> -->
    <q-drawer
      show-if-above
      :width="220"
      v-model="leftDrawerOpen"
      side="left"
      elevated
    >
    <div class="self-center">
      <div class="row justify-center q-pa-sm">
        <q-avatar size="100px" font-size="52px" >
          <q-img
            v-if="construir"
            style="width:100px"
            :src="img"
          ></q-img>
        </q-avatar>
      </div>
      <q-list
        bordered
        separator
      >
        <!-- <q-item
          clickable
          active-class="my-menu-link"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="account_box" />
          </q-item-section>

          <q-item-section> Mi perfil</q-item-section>
        </q-item> -->
        <q-item
          clickable
          active-class="my-menu-link"
          v-ripple
          @click="rol > 1 ? $router.push('/inicio') : $router.push('/inicio_admin')"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>

          <q-item-section> Inicio</q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="my-menu-link"
          v-ripple
          @click="rol > 1 ? $router.push('/contratos') : ''"
        >
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>

          <q-item-section> Contratos </q-item-section>
        </q-item>
       <!--  <q-item
        v-if="rol > 1"
          clickable
          active-class="my-menu-link"
          v-ripple
          @click="$router.push('/contratos_pendientes')"
        >
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>

          <q-item-section> Contratos  pendientes </q-item-section>
        </q-item>
         <q-item
          clickable
          active-class="my-menu-link"
          v-ripple
          @click="rol > 1 ? $router.push('/contratos_vigentes') : ''"
        >
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>

          <q-item-section> Contratos  vigentes </q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="my-menu-link"
          v-ripple
          @click="rol > 1 ? $router.push('/historial_contratos') : ''"
        >
          <q-item-section avatar>
            <q-icon name="hourglass_empty" />
          </q-item-section>

          <q-item-section> Historial de Contratos </q-item-section>
        </q-item> -->
        <q-item
          v-if="rol > 1"
          clickable
          active-class="my-menu-link"
          v-ripple
          @click="$router.push('/saldos_movidos')"
        >
          <q-item-section avatar>
            <q-icon name="compare_arrows" />
          </q-item-section>

          <q-item-section> Saldos movidos </q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="my-menu-link"
          v-ripple
          @click="salir()"
        >
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>

          <q-item-section> Cerrar Sesión </q-item-section>
        </q-item>
      </q-list>
       <div v-if="rol > 1" class="row justify-center q-pa-md">
          <q-btn
            rounded
            no-caps
            glossy
            label="Nuevo contrato"
            icon-right="add"
            color="primary"
            class="q-mr-md"
            @click="newContrat=true"
          />
        </div>
        <div class="row justify-center q-pa-md">
          <q-btn
            rounded
            glossy
            no-caps
            label="Tutorial"
            color="primary"
            class="q-mr-md"
          />
        </div>
        <div class="row justify-center q-pa-md">
          <q-btn
            rounded
            no-caps
            glossy
            label="Redes Sociales"
            color="primary"
            class="q-mr-md"
            @click="redesSociales = true"
          />
        </div>
    </div>
    </q-drawer>

    <q-dialog v-model="newContrat" persistent>
      <q-card>
        <q-card-section class="row justify-end"><q-btn icon="close" flat round dense v-close-popup /></q-card-section>
        <q-card-section class="row items-center q-pa-sm">
          <NuevoContrato />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="redesSociales" persistent>
      <q-card>
        <q-card-section class="row justify-between">
          <div class="text-subtitle1">Redes Sociales</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center">
          <div class="row justify-center">
            <div class="col-4 row justify-center q-pa-md">
              <q-btn round flat style="width:70px" >
                <img src="facebook.png" style="width:70px">
              </q-btn>
            </div>
            <div class="col-4 row justify-center q-pa-md">
              <q-btn rounded flat style="width:70px" >
                <img src="instagram.png" style="width:70px">
              </q-btn>
            </div>
            <div class="col-4 row justify-center q-pa-md">
              <q-btn round flat style="width:70px" >
                <img src="twitter.png" style="width:70px">
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      elevated
    >
    <div class="q-ml-sm q-mr-sm">
      <q-date
        v-model="date"
        minimal
        class="q-mb-md"
      />
        <q-pull>
          <div class="text-h6 q-pa-sm q-ml-sm">{{rol > 1 ? 'Contratos Vigentes' : 'Contratos para revisión'}}</div>
            <div v-if="data.length">
              <div
                v-for="(mazo, index) in data"
                :key="index"
                class="q-mb-sm q-mx-sm"
              >
                <q-card
                  class="my-card bg-primary shadow-10"
                  @click="ver(mazo._id)"
                >
                  <q-item class="q-pa-xs">
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="imgC(mazo)">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <div class="q-pa-xs justify-start">
                        <q-scroll-area
                          horizontal
                          style="height: 30px; width: 100%"
                          class="rounded-borders "
                        >
                          <div class="text-subtitle1 text-white text-bold">{{ mazo.title }}</div>
                        </q-scroll-area>
                      </div>
                      <q-item-label>
                        <q-scroll-area
                          horizontal
                          style="height: 30px; width: 100%"
                          class="rounded-borders"
                        >
                          <div class="text-subtitle1 text-white">{{ mazo.description }}</div>
                        </q-scroll-area>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section >
                      <q-item-label class="text-caption text-white text-bold q-pr-xs row justify-end  "> {{ mazo.created_at }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
            <div v-else class="text-center q-py-md" >{{rol > 1 ? 'No tienes contratos vigente' : ' No tienes contratos para revisión'}}</div>
          </q-pull>
    </div>
    </q-drawer>
    <q-page-container class="fullheight">
      <router-view :selec="seleccion" />
      <!-- <div class="row justify-center">
        <div class="q-pa-md">
         <q-btn
            round
            color="primary"
            icon="shopping_cart"
            size="20px"
          />
        </div>
        <div class="q-pa-md">
          <q-btn
            round
            color="primary"
            icon="shopping_cart"
            size="20px"
          />
        </div>
      </div> -->
      <!-- <Footer /> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import moment from 'moment'
import NuevoContrato from '../components/NuevoContrato'
import { mapMutations } from 'vuex'
import env from '../env'
export default {
  name: 'MainLayout',
  components: { NuevoContrato },
  data () {
    return {
      rol: null,
      id: '',
      seleccion: '',
      now: moment(),
      newContrat: false,
      redesSociales: false,
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      date: '2020/10/20',
      nNotify: 3,
      myNotification: {},
      construir: false,
      data: []
    }
  },
  mounted () {
    this.$api.get('user_info').then(v => {
      if (v) {
        this.rol = v.roles[0]
        this.id = v._id
        console.log('id', this.id, 'rol ', this.rol)
        this.construir = true
        if (this.rol > 1) {
          this.img = env.apiUrl + '/file3/' + this.id
          this.getVigentes()
        } else {
          this.img = 'app-logo-128x128.png'
          this.getRevision()
        }
      }
    })
  },
  methods: {
    imgC (val) {
      var im = ''
      if (val.datos_userA) {
        im = env.apiUrl + '/file3/' + val.datos_userA._id
        return im
      } else {
        im = 'app-logo-128x128.png'
        return im
      }
    },
    ...mapMutations('generals', ['logout']),
    salir () {
      this.logout()
      this.$router.push('/')
    },
    getVigentes () {
      this.$api.get('contratos_pendientes').then(res => {
        if (res) {
          this.data = res.filter(v => v.status === 2 && moment(v.fechaV) >= this.now).map(v => {
            return {
              ...v,
              created_at: moment(v.created_at).format('DD-MM-YYYY')
            }
          })
          console.log('Ej Vigentes', this.data)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getRevision () {
      this.$api.get('get_contracts/' + 1).then(res => {
        if (res) {
          this.data = res.map(v => {
            return {
              ...v,
              created_at: moment(v.created_at).format('DD-MM-YYYY')
            }
          })
          console.log('Ej Revision', this.data)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    ver (id) {
      console.log(id)
      if (this.rol > 1) {
        this.seleccion = id
        this.$router.push('/ver_contrato/' + id)
      } else {
        this.seleccion = id
        this.$router.push('/ver_contrato_admin/' + id)
      }
    }
  }
}
</script>
