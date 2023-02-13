const text = {
  generic: {
    name: 'BetterTCI'
  },
  br: {
    index: {
      title: {
        h1: 'Apresentando: ',
        get span() { return text.generic.name }
      },
    }
  },
  en: {
    index: {
      title: {
        h1: 'Introducing: ',
        get span() { return text.generic.name }
      }
    }
  }
};

export default text;