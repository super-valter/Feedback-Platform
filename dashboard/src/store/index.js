import { readonly } from 'vue'
import UseModule from './user'
import GlobalModule from './global'

export default readonly({
  User: UseModule,
  Global: GlobalModule
})
