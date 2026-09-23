// Browser-side print layout: measure after fonts/images load, keep content groups intact,
// and balance the final two pages so a short trailing note cannot occupy a page alone.
window.printReady = (async () => {
  await document.fonts.ready
  await Promise.all([...document.images].map(image => image.decode().catch(() => {})))
  const sheet = document.querySelector('.sheet')
  const sourceProjects = [...sheet.querySelectorAll('.proj')]
  const cover = sheet.querySelector('.cover')
  const english = document.documentElement.lang === 'en'
  const pages = []
  const ruler = document.createElement('div')
  ruler.style.height = '257mm'
  sheet.append(ruler)
  const limit = ruler.getBoundingClientRect().height
  ruler.remove()

  function makePage(title, continued = false) {
    const page = document.createElement('div')
    page.className = 'print-page'
    const body = document.createElement('div')
    body.className = 'page-content'
    page.append(body)
    if (continued) {
      const heading = document.createElement('div')
      heading.className = 'continuation'
      heading.textContent = title + ' '
      const label = document.createElement('span')
      label.textContent = english ? 'continued' : '계속'
      heading.append(label)
      body.append(heading)
    }
    sheet.append(page)
    const item = { page, body, title, chunks: [] }
    pages.push(item)
    return item
  }
  const height = item => item.body.getBoundingClientRect().height
  const coverPage = makePage(english ? 'Contents' : '목차')
  coverPage.body.append(cover)

  for (const project of sourceProjects) {
    const normalize = value => value.replace(/\s+/g, '')
    const expectedText = normalize(project.textContent)
    const expectedImages = project.querySelectorAll('img').length
    const title = project.dataset.number + ' · ' + project.dataset.title
    const chunks = [project.querySelector('.proj__head')]
    for (const block of project.querySelectorAll(':scope > .block')) {
      // Notes and diagrams may move individually; their section heading stays with the first.
      const parts = [...block.children].filter(el => el.matches('.note, .arch'))
      if (!parts.length) {
        chunks.push(block)
        continue
      }
      for (const [index, part] of parts.entries()) {
        const chunk = document.createElement('div')
        chunk.className = 'block'
        if (index === 0) {
          for (const node of [...block.children]) {
            if (node === part) break
            chunk.append(node)
          }
        }
        chunk.append(part)
        if (index === parts.length - 1) {
          for (const node of [...block.children]) {
            if (!node.matches('.note, .arch')) chunk.append(node)
          }
        }
        chunks.push(chunk)
      }
    }
    const projectPages = [makePage(title)]
    let current = projectPages[0]
    current.page.id = project.id
    for (const chunk of chunks) {
      current.body.append(chunk)
      if (height(current) > limit && current.chunks.length) {
        chunk.remove()
        current = makePage(title, true)
        projectPages.push(current)
        current.body.append(chunk)
      }
      current.chunks.push(chunk)
      if (height(current) > limit) throw new Error('Print block exceeds page: ' + title)
    }
    // Move complete blocks, in original order, to balance a sparse final page.
    if (projectPages.length > 1) {
      const previous = projectPages.at(-2)
      const last = projectPages.at(-1)
      while (previous.chunks.length > 2) {
        const before = Math.max(height(previous), height(last))
        const chunk = previous.chunks.at(-1)
        last.body.insertBefore(chunk, last.chunks[0])
        if (height(last) > limit || Math.max(height(previous), height(last)) >= before) {
          previous.body.append(chunk)
          break
        }
        previous.chunks.pop()
        last.chunks.unshift(chunk)
      }
    }
    const renderedChunks = projectPages.flatMap(page => page.chunks)
    if (normalize(renderedChunks.map(chunk => chunk.textContent).join('')) !== expectedText) {
      throw new Error('Print content missing or reordered: ' + title)
    }
    if (renderedChunks.reduce((sum, chunk) => sum + chunk.querySelectorAll('img').length, 0) !== expectedImages) {
      throw new Error('Print image missing: ' + title)
    }
    project.remove()
  }
  for (const [i, item] of pages.entries()) {
    const footer = document.createElement('footer')
    footer.className = 'page-footer'
    const name = document.createElement('span')
    name.textContent = 'Hyonah Lim · ' + item.title
    const number = document.createElement('span')
    number.textContent = `${i + 1} / ${pages.length}`
    footer.append(name, number)
    item.page.append(footer)
  }
  for (const reference of document.querySelectorAll('.toc__page')) {
    const index = pages.findIndex(item => item.page.id === reference.dataset.project)
    if (index < 0) throw new Error('Missing project: ' + reference.dataset.project)
    reference.textContent = String(index + 1).padStart(2, '0')
  }
  const audit = pages.map((item, i) => ({
    page: i + 1,
    title: item.title,
    height: Math.round(height(item)),
    capacity: Math.round(limit),
    overflow: height(item) > limit + 1,
  }))
  if (audit.some(page => page.overflow)) throw new Error('Print page overflow')
  window.printAudit = audit
  return audit
})()
