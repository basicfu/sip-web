const context = require.context('./', true, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');
// -和/转驼峰命名
function getName(str) {
  return str.replace('./', '').replace('.js', '').replace(/\/(\w)/g, ($0, $1) => {
    return $1.toUpperCase();
  }).replace(/-(\w)/g, ($0, $1) => {
    return $1.toUpperCase();
  });
}
const models = [];
for (let i = 0; i < keys.length; i += 1) {
  const value = context(keys[i]).default;
  value.namespace = getName(keys[i]);
  value.state = {
    ...value.state,
    namespace: value.namespace,
    data: { list: [], page: {} },
    all: [],
    table: {},
  };
  value.effects = { ...value.effects };
  value.reducers = {
    ...value.reducers,
    updateState(s, { payload }) {
      return { ...s, ...payload };
    },
    queryState(s, { payload }) {
      const tableName = payload.tableName || 'table';
      delete payload.tableName;
      const table = s[tableName] || {};
      return { ...s, [tableName]: { ...table, search: { ...table.search, ...payload } } };
    },
    resetQuery(s, { payload }) {
      const tableName = (payload || {}).tableName || 'table';
      return { ...s, [tableName]: { ...s[tableName], search: { } } };
    },
    resetState() {
      return { ...value.state };
    },
  };
  models.push(value);
}
export default models;
