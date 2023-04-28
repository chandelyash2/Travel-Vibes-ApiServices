import { rule } from 'graphql-shield'

export default rule({ cache: 'contextual' })(async (_, args, ctx) => {
  return !!ctx.user
})
