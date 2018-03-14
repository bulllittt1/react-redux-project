import { normalize, schema } from 'normalizr'

export default (json) => {
    const node = new schema.Entity('nodes')
    const children = new schema.Array(node)
    node.define({ childIds: children })

    let tree = normalize(json, node).entities.nodes
    for (var key in tree) {
      tree[key] = Object.assign({},
        {...tree[key],
          avatarIsFetching: false
         })
    }

    return tree
}
