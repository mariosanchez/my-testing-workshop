export default arrayify

// () => []
//('hi') => ['hi']
//(1, 2, 3) => [1, 2 ,3]
function arrayify(params = []) {
  return Array.isArray(params) ? params : [params]
}
