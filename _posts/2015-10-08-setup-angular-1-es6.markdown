---
layout: post
title:  "Setup: Angular 1.x com ES2015"
date:   2015-10-08 00:00:00
tags: angularjs es2015
author: Bruno Konrad
---
Nessa altura do campeonato a definição da "nova versão" do Javascript já está entre aspas mesmo: não é novo. Já esá padronizada e temos a versão da ES2015 - antiga ES6 - definida. A dúvida que fica é "como usar, hoje, em meu site ou app, os novos recursos que a linguagem me oferece?". Pois é, os navegadores ainda estão implementando o novo padrão e você ainda não pode tirar proveito de tudo 😞. E se eu te dizer que dá pra, sim, usar isso hoje e em sua aplicação Angular 1.x?

### Como fazemos isso?

O ES2015 trouxe, finalmente, uma forma de separar módulos em arquivos `.js`. Mas o nosso browser pode não reconhecer isso ainda. Para nos auxiliar nesse trabalho iremos usar o [webpack](https://webpack.github.io/).

Para instalá-lo basta executar
```
npm i -g webpack
```

### Como está organizado?

O código está organizado na seguinte estrutura:

```
|-- build
    |-- templates
    |-- index.html
|-- specs
    |-- controllers
    |-- directives
    |-- services
|-- src
    |-- controllers
    |-- directives
    |-- services
    |-- index.js
|-- karma.conf.js
|-- package.json
|-- wepack.config.js
```

* `build`: fica o compilado do `src`, o `index.html` raiz da aplicação e os templates `html` usados internamente. Importante notar que a referência para os templates é como se estivessem no mesmo nível, e.g: `templates/foo.html`;
* `specs`: testes da tua aplicação. É interessante seguir a mesma estrutura do diretório de `src`. Os testes devem ter, após o nome do arquivo a ser testado, o sufixo `.spec.js`. Mais [aqui](https://github.com/brunoskonrad/angular-es2015/tree/master/specs);
* `src`: onde serão escritos o código da aplicação. A estrutura padrão é possuir os `controllers`, as `directives` e os `services`. Porém pode-se adicionar o qeu for preciso, e.g `polyfill`. Na raiz desse diretório fica a `index.js` que é o ponto de entrada para a *compilação* de ES2015 para ES5.
* `karma.conf.js`: arquivo de configuração do [karma](http://karma-runner.github.io/0.13/index.html);
* `package.json`: arquivo de projeto node. Criado com `npm init`. Configurações em geral podem ser feitas aqui.
* `webpack.config.js`: configuração do webpack.

Lembrando que esse é o ponto de partida! Pode e deve ser alterado para a sua necessidade.


## Controllers

Os controllers da sua aplicação Angular são definidos como classes Javascript. Os parâmetros da função construtora (`constructor`) são as dependências. Por exemplo:

```javascript
export default class HelloWorldCtrl {
  constructor($scope, Foo) {
    $scope.hello = 'world';
    $scope.foo = Foo.getFoo();
  }
}
```

Definimos e exportamos como padrão a classe [`HelloWorldCtrl`](https://github.com/brunoskonrad/angular-es2015/blob/master/src/controllers/HelloWorldCtrl.js)

<hr />

O código base pode ser acessado em: https://github.com/brunoskonrad/angular-es2015
