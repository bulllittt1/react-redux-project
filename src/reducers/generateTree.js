export default function generateTree() {
  let tree = {
    1: {
      id: 1,
      title: "ROOT",
      childIds: []
    }
  }

  // for (let i = 1; i < 100; i++) {
  //   let parentId = Math.floor(Math.pow(Math.random(), 2) * i)
  //   tree[i] = {
  //     id: i,
  //     title: "NODE",
  //     childIds: []
  //   }
  //   tree[parentId].childIds.push(i)
  // }

  return tree
}
