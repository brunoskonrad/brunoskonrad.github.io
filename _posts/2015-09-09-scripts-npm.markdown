---
layout: post
title:  "Usando os scripts do package.json"
date:   2015-09-09 13:00:00
tags: npm
author: Bruno Konrad
---
Você sabia que não precisa instalar os pacotes NPM no global para executar, como eu sugeri fazer no post sobre [browserify]({% post_url 2015-05-29-howto-commomjs-no-browser %})? Então. Tem uma forma de você não fazer isso. Segue aqui que vou te mostrar.

O `npm` possui o seu lindo [package.json](https://docs.npmjs.com/files/package.json) e nele você pode configurar o seu módulo NPM ou projeto que está trabalhando. E é aí que a gente vai trabalhar o uso de módulos "globais". Vamos tomar como exemplo o browserify, mas pode se aplicar a qualquer outro módulo que seja executado na `cli` (command line interface).

{%  highlight json %}
{
  "scripts": {
    "browserify": "browserify index.js -o bundle.js"
  },
  "devDependencies": {
    "browserify": "^11.0.1"
  }
}
{% endhighlight %}

Antes você fazia o seguinte:

{% highlight bash %}
npm install -g browserify
browserify index.js -o bundle.js
{% endhighlight %}

Agora você faria assim:

{% highlight bash %}
npm install
npm run browserify
{% endhighlight %}

Isso te elimina instalações globais do módulo de browserify pois ao executar os comandos via `scripts` ele usa os módulos em `node_modules`. Além de facilitar o setup de outros desenvolvedores!

Mais informações a respeito dos [scripts](https://docs.npmjs.com/misc/scripts). Note que os comandos que executamos no `npm run [comando]` estão declarados em nosso `scripts` dentro do `package.json`. O NPM ainda dispões *hocks*, que podem ser vistos no link deste paragrafo.

Mais um exemplo pra fechar, um ambiente de setup usando o `package.json`:

{%  highlight json %}
{
  "scripts": {
    "setup": "npm i && gulp install",
    "browserify": "browserify index.js -o bundle.js",
    "sass": "sass mysass.scss dist.css",
    "build": "npm run browserify && npm run sass"
  },
  "devDependencies": {
    "browserify": "^11.0.1",
    "gulp": "^3.9.0"
  }
}
{% endhighlight %}
{% highlight bash %}
npm run setup
npm run build
{% endhighlight %}

Você pode executar qualquer comando de `cli` dentro desses comandos de `scripts`. Assim que sair a palestra do [Laurie](https://twitter.com/seldo), CTO da NPM, na BrazilJS, colo o link aqui. Lá ele passa várias barbadas sobre e muito mais!

Enfim, deixa teu comentário, dicas, sugestões e críticas fofinhas!
