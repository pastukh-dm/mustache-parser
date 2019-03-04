const template = '{{ first_name | mask }} from {{ city | mask1 | mask2(2) }}'
const params = {first_name: 'Michael', city: 'Praha'}

const filters = {
  'mask': (str) => {
    return str.replace(/./g, '*')
  }
}

function parse(template, params, parseFilters) {
  return template.replace(/{{[^}]*}}/g, (bar) => {
    let [variableName, ...filters] = bar
      .replace('{{', '')
      .replace('}}', '')
      .split('|')
    variableName = variableName.trim()
    console.log('variableName:', variableName)
    result = params[variableName] || ''
    console.log('result:', result)
    if (filters.length) {
      filters.forEach(filter => {
      console.log('FILTER:', filter)
        let [filterName, ...filterVariables] = filter.trim().split(/[\(\),]/).filter(str => str.length)

        console.log('filterName:', filterName)
        const filterHandler = parseFilters[filterName]
        if (filterHandler) {
          result = filterHandler(result,filterVariables)
        }
      })
    }
    return result
    
  })
}

console.clear()
    console.log(
parse(template, params,filters)
      )
