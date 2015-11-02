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

{% highlight bash %}
npm init
{% endhighlight %}

O comando acima irá criar o seu arquivo `package.json` que será usado para versionar as dependências do seu projeto. Nada mais de baixar o `angular.min.js` e colar numa pasta `lib`. Agora você vai fazer algo como:

{% highlight bash %}
npm i --save angular
{% endhighlight %}

Isso irá criar um campo `dependencies` no seu *json* de configuração no `package.json` e, nesse campo, estará definido o `angular` com uma versão específica como uma das dependências.

A list de dependências para esse post é esta, porém lembre-se de verificar se estão nas versões mais atuais:

{% highlight javascript %}
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
{% endhighlight %}

Adicione as `devDependencies` depois das suas `dependencies`, no seu `package.json`. Após adicioná-las execute:

{% highlight bash %}
npm install
{% endhighlight %}

Espere o NPM fazer o trabalho de instalar as suas dependências. para mais informações sobre a configuração para esse post acesse o [`package.json`](https://github.com/brunoskonrad/angular-es2015/blob/master/package.json) do mesmo.

#### Configurando o build system

Enfim o ES2015 trouxe uma forma de separar módulos em arquivos `.js`. Mas o nosso browser pode não reconhecer isso ainda. Para nos auxiliar nesse trabalho iremos usar o [webpack](https://webpack.github.io/).

Você pode instalá-lo globalmente e usar via terminal ou, como eu prefiro, [usando os `scripts` do seu `package.json`]({% post_url 2015-09-09-scripts-npm %}).

Se quiser instalar globalmente, execute a linha abaixo
{% highlight bash %}
npm i -g webpack
{% endhighlight %}

Crie, na raíz do seu diretório, um arquivo `webpack.config.js` que deverá exportar um `object` de configuração para o Webpack.

A configuração do projeto de exemplo pode ser vista [aqui](https://github.com/brunoskonrad/angular-es2015/blob/master/webpack.config.js). Note que eu verifico se o ambiente está para teste ou não. Caso não seja de produção é configurada a forma que são exportados os arquivos, por exemplo:

{% highlight javascript %}
{
  // o contexto do código, no caso é a pasta `src`
  context: __dirname + '/src',
  // o arquivo de entrada, no caso o `index.js`
  entry: './index',
  // aonde será enviado o arquivo de output
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  }
}
{% endhighlight %}

Se o ambiente for de teste, então, é importante definir a dependência `angular` como global, assim:

{% highlight javascript %}
{
  // Note que aqui deixo essas configurações como objetos vazios
  entry: {},
  output: {},
  devtool: 'inline-source-map',
  // Aqui eu defino as dependências externas pois elas são definidas pelo karma.
  // Explico mais sobre abaixo.
  externals: {
    'angular': 'angular'
  };
}
{% endhighlight %}

Por que definimos o `angular` como uma dependência externa? Porque o Karma define essas dependências de maneira global. Pode verificar [aqui](https://github.com/brunoskonrad/angular-es2015/blob/master/karma.conf.js) mas é da seguinte forma:

{% highlight javascript %}
files: [
  // Aqui, nessa configuração, importa o angular e o angular-mocks globalmente
  'node_modules/angular/angular.js',
  'node_modules/angular-mocks/angular-mocks.js',
  'src/index.js',
  'specs/**/*.spec.js'
]
{% endhighlight %}

### Como está organizado?

O código está organizado na seguinte estrutura:

{% highlight bash %}
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
{% endhighlight %}

* `build`: fica o compilado do `src`, o `index.html` raiz da aplicação e os templates `html` usados internamente. Importante notar que a referência para os templates é como se estivessem no mesmo nível, e.g: `templates/foo.html`;
* `specs`: testes da tua aplicação. É interessante seguir a mesma estrutura do diretório de `src`. Os testes devem ter, após o nome do arquivo a ser testado, o sufixo `.spec.js`. Mais [aqui](https://github.com/brunoskonrad/angular-es2015/tree/master/specs);
* `src`: onde serão escritos o código da aplicação. A estrutura padrão é possuir os *controllers*, as *directives* e os *services*. Porém pode-se adicionar o qeu for preciso, e.g `polyfill`. Na raiz desse diretório fica a `index.js` que é o ponto de entrada para a *compilação* de ES2015 para ES5.
* `karma.conf.js`: arquivo de [configuração](http://karma-runner.github.io/0.8/config/configuration-file.html) do [karma](http://karma-runner.github.io/0.13/index.html);
* `package.json`: arquivo de projeto node. Criado com `npm init`. [Configurações](https://docs.npmjs.com/files/package.json) em geral podem ser feitas aqui.
* `webpack.config.js`: configuração do webpack (mais sobre [aqui](http://webpack.github.io/docs/configuration.html)).

Lembrando que esse é o ponto de partida! Pode e deve ser alterado para a sua necessidade.

Repare que, para cada diretório dentro de `src`, foi criado um `alias` para facilitar a inclusão de arquivos de cada *pacote*, e.g:
{% highlight javascript %}
resolve: {
  alias: {
    controllers: __dirname + '/src/controllers',
    services: __dirname + '/src/services',
    directives: __dirname + '/src/directives'
  }
}
{% endhighlight %}

Tendo esses `alias` definidos você passa a importar os módulos da seguinte forma:

{% highlight javascript %}
import HelloWorldCtrl from 'controllers/HelloWorldCtrl';

// Ao invés de

import HelloWorldCtrl from './contorllers/HelloWorldCtrl';
// ou
import HelloWorldCtrl from '../../contorllers/HelloWorldCtrl';
{% endhighlight %}

## Show me the code

Ok, depois de tudo isso (que é bastante coisa) vamos ver como é que é o nosso código! Algumas coisas que você precisa ter em mente:
1. *controllers*, *services* e afins são representados como classes Javascript;
1. As dependências são passadas como argumentos na função `constructor` de suas classes;
1. Passe as dependências para `this`, e.g `this.service = MyService`;

## Controllers

Um code snippet de como definir um *controller*:

{% highlight javascript %}
export default class HelloWorldCtrl {
  constructor($scope, Foo) {
    $scope.hello = 'world';
    $scope.foo = Foo.getFoo();
  }
}
{% endhighlight %}

No código acima definimos e exportamos como padrão a classe [`HelloWorldCtrl`](https://github.com/brunoskonrad/angular-es2015/blob/master/src/controllers/HelloWorldCtrl.js)

O uso de `$scope` pode ser uma dificuldade na sua codificação. Pode-se optar usar o `this` para referênciar os dados para o `two-way data-binding`.

Testes em angular possuem algumas configurações para a injeção das dependências. Segue abaixo o teste para o `HelloWorldCtrl` (pode acessá-lo [aqui](https://github.com/brunoskonrad/angular-es2015/blob/master/specs/controllers/HelloWorldCtrl.spec.js))

{% highlight javascript %}
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
{% endhighlight %}

## Services

Services são `singletone`, então os métodos da classe são as funções disponíveis no seu service. Segue abaixo um snippet:

{% highlight javascript %}
export default class Foo {
  constructor() { }

  getFoo() {
    return 'foo';
  }
}
{% endhighlight %}

Esse *service* `Foo` é uma dependência do *controller* `HelloWorldCtrl` declarado acima.

Um exemplo de como testar o seu *service*:

{% highlight javascript %}
let subject;

describe('Foo', () => {
  beforeEach(angular.mock.module('hello-world.services'));

  beforeEach(angular.mock.inject((Foo) => {
    subject = Foo;
  }));

  it('gets the foo', () => {
    expect(subject.getFoo()).toBe('foo');
  });
});
{% endhighlight %}

## Directives

Declarar uma *directive* continua sendo uma função. Seguindo as [lições aprendidas no Paypal](https://medium.com/@bluepnume/sane-scalable-angular-apps-are-tricky-but-not-impossible-lessons-learned-from-paypal-checkout-c5320558d4ef), é interessante que as *directives* tenham seus *controllers* e que se construam aplicações Angular orientadas pelas *directives*. Segue-se um snippet de *directive* e seu *controller*:

{% highlight javascript %}
export function helloWorld() {
  return {
    restrict: 'E',
    scope: {
      who: '@'
    },
    controller: 'HelloWorldDirectiveCtrl',
    templateUrl: 'templates/hello-world.html'
  }
}

export class HelloWorldDirectiveCtrl {
  constructor($scope) {
    this.scope = $scope;
    $scope.who = $scope.who || 'world';
    $scope.helloWorldClick = this.helloWorldClick.bind(this);
  }

  helloWorldClick() {
    alert(`Hello ${this.scope.who}`);
  }
}
{% endhighlight %}

Definimos e exportamos ambos em um mesmo [arquivo](https://github.com/brunoskonrad/angular-es2015/blob/master/src/directives/HelloWorld.js), afinal um pertence ao outro!

Para testar fazemo-os separadamente. O motivo é que, para *controller*, *services* e as *directives* bem como os *controllers* das directives possuímos `angular.module` diferentes. Veja no [`index.js`](https://github.com/brunoskonrad/angular-es2015/blob/master/src/index.js) para visualizar essa separação.

* Testes para a *directive*: https://github.com/brunoskonrad/angular-es2015/blob/master/specs/directives/HelloWorld/HelloWorld.spec.js;
* Testes para o *controller* da *directive*: https://github.com/brunoskonrad/angular-es2015/blob/master/specs/directives/HelloWorld/HelloWorldCtrl.spec.js

<hr />

## Bibliografia

1. O código base pode ser acessado em: [https://github.com/brunoskonrad/angular-es2015](https://github.com/brunoskonrad/angular-es2015)
1. Leitura recomendada sobre boas práticas com angular: [Sane, scalable Angular apps are tricky, but not impossible. Lessons learned from PayPal Checkout.](https://medium.com/@bluepnume/sane-scalable-angular-apps-are-tricky-but-not-impossible-lessons-learned-from-paypal-checkout-c5320558d4ef)
1. Referência em inglês de angular 1.x com ES6 e webpack: [http://angular-tips.com/blog/2015/06/using-angular-1-dot-x-with-es6-and-webpack/](http://angular-tips.com/blog/2015/06/using-angular-1-dot-x-with-es6-and-webpack/)
1. Referências para testes:
* [http://angular-tips.com/blog/2015/06/using-angular-1-dot-x-with-es6-and-webpack/](http://www.sitepoint.com/mocking-dependencies-angularjs-tests/);
* [http://www.sitepoint.com/unit-testing-angularjs-services-controllers-providers/](http://www.sitepoint.com/unit-testing-angularjs-services-controllers-providers/);
* [http://andyshora.com/unit-testing-best-practices-angularjs.html](http://andyshora.com/unit-testing-best-practices-angularjs.html);
