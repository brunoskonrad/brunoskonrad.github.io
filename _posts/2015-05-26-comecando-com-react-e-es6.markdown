---
layout: post
title:  "Começando com React e ES6"
date:   2015-05-26 00:51:00
tags: react
author: Bruno Konrad
---
O [EcmaScript 6](https://github.com/lukehoban/es6features) tá pra ser lançado oficialmente e irá trazer diversas novidades, muito bem vindas, para o Javascript! Só que ele ainda não será suportado por todos os navegadores e a transição não será instantânea. Mas você pode começar a usá-lo hoje, agora! Te apresento [Babel](https://babeljs.io/), um _transpiler_ de ES6 para ES5. Aqui abordaremos como começar configura-lo junto do [React](https://facebook.github.io/react/), a library para views do Facebook!

### O que muda?

Para sentir a diferença entre as _duas versões_ do Javascript, segue um Hello World em React escrito em ES5 e em ES6
{% highlight javascript %}
// ES5
var React = require('react');

var HelloWorld = React.createClass({
  render: function() {
    return <p>Hello World</p>
  }
});

module.export = HelloWorld;
{% endhighlight %}

{% highlight javascript %}
// ES6
import React from 'react';

class HelloWorld extends React.Component {
  render() {
    return <p>Hello World</p>
  }
}

export default HelloWorld;
{% endhighlight %}

### Como fazer?

Como é uma tarefa que será repetida a cada alteração do seu código-fonte é uma boa ser escrita uma _task_ em algum _task runner_ para Javascript. Nesse post será usado o [Gulp](http://gulpjs.org/) e os seguintes módulos NPM: `browserify`, `babelify` e o `vinyl-source-stream`. Para instalá-los execute no seu terminal:

{% highlight bash %}
npm i --save-dev gulp browserify babelify vinyl-source-stream
{% endhighlight %}

A task `react` que uso para transpilar de ES6 para ES5.
{% highlight javascript %}
// no seu 'gulpfile.js'
var gulp = require('gulp')
  , browserify = require('browserify')
  , babelify = require('babelify')
  , source = require('vinyl-source-stream')

gulp.task('react', function() {
  browserify({
    // o arquivo onde irá renderizar os componentes React
    entries: './path/to/app.jsx',
    extensions: ['jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  // O nome do arquivo que será gerado
  .pipe(source('app.js'))
  // diretório aonde será exportado o arquivo 'app.js'
  .pipe(gulp.dest('dist/js'));
});
{% endhighlight %}

### Entendendo o que acontece

- `browserify` permite o `CommomJS` no browser - o `require('something')`; então, a partir do `entries`, ele irá gerar um arquivo com todas as dependencias;
- `transform(babelify)` irá converter o código gerado pelo `browserify` de ES6 para ES5;
- `pipe(source('app.js')` irá minimizar tudo no arquivo `app.js`;
- e por fim `pipe(gulp.dest('dist/js'))` exportará o arquivo `app.js` para outro diretório

Para executar a _task_ vá no seu terminal e, tendo o `gulp` instalado, digite:
{% highlight bash %}
gulp react
{% endhighlight %}
Ou, se não tiver saco de toda vez ir até o terminal e executar a task, você pode criar outra task para ficar _observando_ o diretório com os teus arquivos de componentes React!

{% highlight javascript %}
gulp.task('develop', function() {
  // observa a mudança de qualquer arquivo .jsx na path/to/react
  gulp.watch('path/to/react/**/*.jsx', ['react']);
});
{% endhighlight %}
Só executar `gulp develop` e ir programar! Toda mudança no teu diretório de componentes irá disparar a task `react`
