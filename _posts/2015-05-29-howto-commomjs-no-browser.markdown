---
layout: post
title:  "Como fazer: Browserify"
date:   2015-05-29 01:11:00
tags: setup browserify
author: Bruno Konrad
---
Enquanto o ES6 não vem, ainda *importamos* Javascript assim `<script src="path/to/file.js"></script>`. E isso é bastante deselegante. Mas no Node.js a gente pode fazer um `require` e, voalá, temos a referência ao módulo:

{% highlight javascript %}
// arquivo fat.js
(function() {
  'use strict';

  // exporta uma função para calcular a fatorial. Just that!
  module.exports = function fat(x) {
    return x == 0 ? 1 : x * fat(x-1)
  };
})();
{% endhighlight %}

{% highlight javascript %}
// arquivo index.js
// aqui é feito o require da função de fatorial no arquivo acima
var fat = require('./fat');

fat(5); // 120
{% endhighlight %}

Se tu incluir esses arquivos no teu `html` isso não vai funcionar. Mas é pra isso que existe o [Browserify](http://browserify.org/)! Como ele você pode usar as facilidades do `require('whatever')` no seu browser. Então vamos instalar e usar!

{% highlight bash %}
npm install -g browserify
{% endhighlight %}

Após instalar basta ir até o diretório onde está o seu arquivo principal, que no nosso caso é o `index.js`, e executar o comando do Browserify

{% highlight bash %}
browserify index.js -o bundle.js
{% endhighlight %}

Esse comando irá processar todas as dependências do teu arquivo index.js e colocar todo o código dentro, nesse caso, do `bundle.js`! Aí sim você inclui o `bundle.js` no seu `html` e está pronto para uso.

Importante lembrar que você roda o comando `browserify` apenas no arquivo principal. A ferramenta se encarrega do resto. Digo isso para não perder horas, que nem eu, tentando entender o porque o `bundle.js` não estar funcionando.

E outra, se ainda pode criar uma tarefa no Gulp pra automatizar esse trampo! Pra saber mais, tem um post aqui sobre [Gulp]({% post_url 2015-05-28-relaxa-e-da-um-gulp %})!

Bem simples, é isso! Qualquer coisa deixa um comentário aí embaixo ou me contate para trocar umas ideias. Valeu!
