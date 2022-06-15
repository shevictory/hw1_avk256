export const CHART_TYPE_OPT_LIST = ['bar', 'lines', 'scatter', 'pie'];

export const INITIAL_CHART_PARAMS = {
  xName: '',
  yName: '',
  color: '',
  plotType: CHART_TYPE_OPT_LIST[0],
};

export const typeMap = new Map();
typeMap.set('lines', { type: 'scatter', mode: 'lines markers' });
typeMap.set('scatter', { type: 'scatter', mode: 'markers' });
typeMap.set('bar', { type: 'bar' });
typeMap.set('pie', { type: 'pie' });
