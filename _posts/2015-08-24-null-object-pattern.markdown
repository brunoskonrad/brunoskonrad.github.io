---
layout: post
title:  "Null Object Pattern"
date:   2015-08-24 13:00:00
tags: design pattern
author: Bruno Konrad
---
Lendo o livro, que recomendo muito, de **[Design Patterns com Java](http://www.casadocodigo.com.br/products/livro-design-patterns)**, do **Eduardo Guerra**, [@emguerra](https://twitter.com/emguerra), me deparei com o padrão de Objeto Nulo. Usado, em linguagens como o Java, para evitar um **NullPointerException** na sua cara.

Na época eu não havia imaginado muitas situações práticas, além de evitar os NullPointers, até hoje, enquanto programava uma aplicação para Android.

A situação que tinha era a necessidade de adicionar um item neutro em um Spinner. Ao selecioná-lo deveria habilitar a inserção manual de um valor. Então, a solução mais elegante que encontrei foi a de fazer o uso do pattern Null Object. Usarei o nome das classes de exemplo para explicar.

Segue abaixo algumas classes para exemplificar:

{% highlight java %}
public class Entidade {

  private long mId;
  private String mNome;

  public long getId() {
      return mId;
  }

  public String getNome() {
      return mNome;
  }

  public void setNome(String nome) {
      this.mNome = nome;
  }

  @Override
  public String toString() {
      return mNome;
  }
}
{% endhighlight %}
