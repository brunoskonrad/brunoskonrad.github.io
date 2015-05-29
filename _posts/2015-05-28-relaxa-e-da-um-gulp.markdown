---
layout: post
title:  "Setup: relaxa e da um Gulp"
date:   2015-05-28 23:38:00
tags: setup gulp
author: Bruno Konrad
---
Sabe quando você tem que configurar alguma coisa no seu projeto? Sabe quando isso se torna uma tarefa repetitiva? É um saco, né? Relaxa aí, bróder, que tenho uma boa pra ti: [Gulp](http://gulpjs.com/).

Nas palavras deles: `Automate and enhance your workflow`. E você automatiza e melhora o seu ambiente de trabalho criando `tasks` em Javascript! Como para testar seu código, executar pré-processadores de CSS ou Javascript, fazer build de código e mais!

Para usá-lo é simples! Precisa ter o [Node.js](https://nodejs.org/) instalado em seu computador e, no terminal, executar o seguinte comando:
{% highlight bash %}
npm install -g gulp
{% endhighlight %}

E se quiser instalar no seu projeto, se tiver um `package.json`, execute:
{% highlight bash %}
npm install --save-dev gulp
{% endhighlight %}

Após vá na raiz do seu projeto e crie um arquivo `gulpfile.js`. Nesse arquivo você escreverá todas as suas tasks para o projeto!

Segue abaixo um `Hello World` em Gulp
{% highlight javascript %}
var gulp = require('gulp');

gulp.task('default', function() {
  console.log('Hello Gulp!');
});
{% endhighlight %}

Para executar alguma *task* do Gulp é só, no seu terminal, ir no diretório onde está o seu `gulpfile.js` e executar:
{% highlight bash %}
➜  your_project  gulp
[22:56:39] Using gulpfile ~/dev/your_project/gulpfile.js
[22:56:40] Starting 'default'...
Hello Gulp!
[22:56:40] Finished 'default' after 180 μs
{% endhighlight %}

Nota que ele usou a task `default`? Caso você apenas rode o comando `gulp`, sem nenhum parâmetro, ele irá buscar pela tarefa padrão. Você pode especificar qual `task` você deseja executar! Vamos dar uma incrementada no nosso Hello World.

{% highlight javascript %}
var gulp = require('gulp');

gulp.task('print5', function() {
  console.log('5');
});

gulp.task('default', ['print5'], function() {
  console.log('Hello Gulp!');
});
{% endhighlight %}

Se você ver agora a task `default` tem um parâmetro array com o texto `print5`. Estamos passando uma outra task para ser executada antes da task padrão.

{% highlight bash %}
➜  your_project  gulp print5
[23:37:34] Using gulpfile ~/dev/your_project/gulpfile.js
[23:37:34] Starting 'print5'...
5
[23:37:34] Finished 'print5' after 183 μs

➜  your_project  gulp
[23:37:36] Using gulpfile ~/dev/your_project/gulpfile.js
[23:37:36] Starting 'print5'...
5
[23:37:36] Finished 'print5' after 182 μs
[23:37:36] Starting 'default'...
Hello Gulp!
[23:37:36] Finished 'default' after 59 μs
{% endhighlight %}

Pode crer! E como faço pra fazer algo além de escrever 'lero-lero' no meu terminal? Vá no Google e pesquise `gulp [alguma coisa]` como, por exemplo: "gulp sass". Vá no [NPM](https://www.npmjs.com/) e veja como usar! Voalá!

## TL;DR

Na moral, Gulp não é tão complicado! Tá aqui a [documentação](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) e toda a [API](https://github.com/gulpjs/gulp/blob/master/docs/API.md). Recomendo a leitura mesmo. Dica: o [watch](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb) é **MUITO** útil!
