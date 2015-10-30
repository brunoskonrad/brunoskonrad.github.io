---
layout: post
title:  "Setup: Angular 1.x com ES2015"
date:   2015-10-08 00:00:00
tags: angularjs es2015
author: Bruno Konrad
---
Nessa altura do campeonato a definição da "nova versão" do Javascript já está entre aspas mesmo: não é novo. Já esá padronizada e temos a versão da ES2015 - antiga ES6 - definida. A dúvida que fica é "como usar, hoje, em meu site ou app, os novos recursos que a linguagem me oferece?". Pois é, os navegadores ainda estão implementando o novo padrão e você ainda não pode tirar proveito de tudo 😞. E se eu te dizer que dá pra, sim, usar isso hoje e em sua aplicação Angular 1.x?

### Como fazemos isso?

Como vamos trabalhar com Javascript não pode faltar: **node.js**! Se você ainda não tem instalado na sua máquina fica aqui a minha dica de ferramenta para instalação: [nvm](https://github.com/creationix/nvm); se você for de Windows use o [nvmw](https://github.com/hakobera/nvmw).

Vamos começar!

#### Iniciando o projeto

```
npm init
```

O comando acima irá criar o seu arquivo `package.json` que será usado para versionar as dependências do seu projeto. Nada mais de baixar o `angular.min.js` e colar numa pasta `lib`. Agora você vai fazer algo como:

```
npm i --save angular
```

Isso irá criar um campo `dependencies` no seu *json* de configuração no `package.json` e, nesse campo, estará definido o `angular` com uma versão específica como uma das dependências.

A list de dependências para esse post é esta, porém lembre-se de verificar se estão nas versões mais atuais:

```
"devDependencies": {
  "angular-mocks": "^1.4.7",
  "babel-core": "^5.8.25",
  "babel-loader": "^5.3.2",
  "html-loader": "^0.3.0",
  "jasmine-core": "^2.3.4",
  "karma": "^0.13.10",
  "karma-jasmine": "^0.3.6",
  "karma-phantomjs-launcher": "^0.2.1",
  "karma-webpack": "^1.7.0",
  "phantomjs": "^1.9.18",
  "webpack": "^1.12.2",
  "webpack-dev-server": "^1.12.1"
}
```

Adicione as `devDependencies` depois das suas `dependencies`, no seu `package.json`. Após adicioná-las execute:

```
npm install
```

Espere o NPM fazer o trabalho de instalar as suas dependências. para mais informações sobre a configuração para esse post acesse o [`package.json`](https://github.com/brunoskonrad/angular-es2015/blob/master/package.json) do mesmo.

#### Configurando o build system

Enfim o ES2015 trouxe uma forma de separar módulos em arquivos `.js`. Mas o nosso browser pode não reconhecer isso ainda. Para nos auxiliar nesse trabalho iremos usar o [webpack](https://webpack.github.io/).

Você pode instalá-lo globalmente e usar via terminal ou, como eu prefiro, [usando os `scripts` do seu `package.json`]({% post_url 2015-09-09-scripts-npm %}).

Se quiser instalar globalmente, execute a linha abaixo
```
npm i -g webpack
```

### Como está organizado?

O código está organizado na seguinte estrutura:

```
|-- build
|   |-- templates
|   |-- index.html
|-- specs
|   |-- controllers
|   |-- directives
|   |-- services
|-- src
|   |-- controllers
|   |-- directives
|   |-- services
|   |-- index.js
|-- karma.conf.js
|-- package.json
|-- wepack.config.js
```

* `build`: fica o compilado do `src`, o `index.html` raiz da aplicação e os templates `html` usados internamente. Importante notar que a referência para os templates é como se estivessem no mesmo nível, e.g: `templates/foo.html`;
* `specs`: testes da tua aplicação. É interessante seguir a mesma estrutura do diretório de `src`. Os testes devem ter, após o nome do arquivo a ser testado, o sufixo `.spec.js`. Mais [aqui](https://github.com/brunoskonrad/angular-es2015/tree/master/specs);
* `src`: onde serão escritos o código da aplicação. A estrutura padrão é possuir os `controllers`, as `directives` e os `services`. Porém pode-se adicionar o qeu for preciso, e.g `polyfill`. Na raiz desse diretório fica a `index.js` que é o ponto de entrada para a *compilação* de ES2015 para ES5.
* `karma.conf.js`: arquivo de [configuração](http://karma-runner.github.io/0.8/config/configuration-file.html) do [karma](http://karma-runner.github.io/0.13/index.html);
* `package.json`: arquivo de projeto node. Criado com `npm init`. [Configurações](https://docs.npmjs.com/files/package.json) em geral podem ser feitas aqui.
* `webpack.config.js`: configuração do webpack (mais sobre [aqui](http://webpack.github.io/docs/configuration.html)).

Lembrando que esse é o ponto de partida! Pode e deve ser alterado para a sua necessidade.

Repare que, para cada diretório dentro de `src`, foi criado um `alias` para facilitar a inclusão de arquivos de cada *pacote*, e.g:
```javascript
resolve: {
  alias: {
    controllers: __dirname + '/src/controllers',
    services: __dirname + '/src/services',
    directives: __dirname + '/src/directives'
  }
}
```

Tendo esses `alias` definidos você passa a importar os módulos da seguinte forma:

```javascript
import HelloWorldCtrl from 'controllers/HelloWorldCtrl';

// Ao invés de

import HelloWorldCtrl from './contorllers/HelloWorldCtrl';
// ou
import HelloWorldCtrl from '../../contorllers/HelloWorldCtrl';
```


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

No código acima definimos e exportamos como padrão a classe [`HelloWorldCtrl`](https://github.com/brunoskonrad/angular-es2015/blob/master/src/controllers/HelloWorldCtrl.js)

Os testes em angular possuem algumas configurações para a injeção das dependências. Segue abaixo o teste para o `HelloWorldCtrl` (pode acessá-lo [aqui](https://github.com/brunoskonrad/angular-es2015/blob/master/specs/controllers/HelloWorldCtrl.spec.js))

```javascript
let subject;
let $controller;
let $rootScope;
let scope;
let Foo;

describe('HelloWorldCtrl', () => {
  // Definimos o módulo que será carregado
  beforeEach(angular.mock.module('hello-world.controllers'));

  // Pegamos as referências para as dependências de nosso controller.
  // Note o `_` entre as dependências: isso é um truque para conseguirmos
  // manter o mesmo nome localmente. e.g `let Foo = _Foo_`
  beforeEach(angular.mock.inject((_$controller_, _Foo_, _$rootScope_) => {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    Foo = _Foo_;
  }));

  // Antes de cada teste iremos iniciar um novo `scope`
  // e instanciar o controller que iremos testar usando o $controller,
  // injetando as dependências para o teste
  beforeEach(() => {
    scope = $rootScope.$new();
    subject = $controller('HelloWorldCtrl', {
      $scope: scope,
      Foo
    });
  });

  it('get the `hello` property as `world`', () => {
    expect(scope.hello).toBe('world');
  });

  it('access the `foo` property', () => {
    spyOn(Foo, 'getFoo').and.returnValue('foo');

    scope.$digest();

    expect(scope.foo).toBe('foo');
  });
});

```

## Services

TODO

## Directives

TODO

<hr />

O código base pode ser acessado em: https://github.com/brunoskonrad/angular-es2015

Leitura recomendada sobre boas práticas com angular: [Sane, scalable Angular apps are tricky, but not impossible. Lessons learned from PayPal Checkout.](https://medium.com/@bluepnume/sane-scalable-angular-apps-are-tricky-but-not-impossible-lessons-learned-from-paypal-checkout-c5320558d4ef)

Referência em inglês de angular 1.x com ES6 e webpack: http://angular-tips.com/blog/2015/06/using-angular-1-dot-x-with-es6-and-webpack/

Referências para testes:
* http://www.sitepoint.com/mocking-dependencies-angularjs-tests/;
* http://www.sitepoint.com/unit-testing-angularjs-services-controllers-providers/;
* http://andyshora.com/unit-testing-best-practices-angularjs.html;
