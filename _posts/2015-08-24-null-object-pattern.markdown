---
layout: post
title:  "Null Object Pattern"
date:   2015-08-24 13:00:00
tags: design pattern
author: Bruno Konrad
---
Lendo o livro, que recomendo muito, de **[Design Patterns com Java](http://www.casadocodigo.com.br/products/livro-design-patterns)**, do **Eduardo Guerra**, [@emguerra](https://twitter.com/emguerra), me deparei com o padrão de Objeto Nulo. Usado, em linguagens como o Java, para evitar um **NullPointerException** na sua cara.

Na época eu não havia imaginado muitas situações práticas, além de evitar os NullPointers, até hoje, enquanto programava uma aplicação para Android.

## Situação em que apliquei o Pattern

A situação que tinha era a necessidade de adicionar um item neutro em um Spinner. Ao selecioná-lo deveria habilitar a inserção manual de um valor. Então, a solução mais elegante que encontrei foi a de fazer o uso do pattern Null Object. Usarei o nome das classes de exemplo para explicar.

{% highlight java %}
/**
 * Classe que representa alguma entidade com dados. Esta será usada como fonte de dados
 * no nosso componente de Spinner do Android.
 */
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

  // É importante sobrescrever o método `toString()`, o spinner o usa internamente

  @Override
  public String toString() {
      return mNome;
  }
}
{% endhighlight %}

Considere a classe acima como sendo um exemplo de Entidade da nossa base de dados. Então ela que será extendida para definir-mos o nosso NullObject.

{% highlight java %}
public class EntidadeNullable extends Entidade {

  // o Id de nossa entidade é zerado

  @Override
  public long getId() {
      return 0l;
  }

  // Note que sobrescrevemos, aqui, o `toString()` para o texto que queremos para o valor não selecionado

  @Override
  public String toString() {
      return "Nenhum...";
  }
}
{% endhighlight %}

Então implementamos a nossa versão de `Adapter` para popular a nossa `view`.

{%  highlight java %}
public class EntidadeAdapter extends BaseAdapter {

  private Context mContext;
  private List<Entidade> mEntidades;

  public EntidadeAdapter(Context context, List<Entidade> entidades) {
    this.mContext = context;

    this.mEntidades = entidades;
    // Aqui é adicionado, então, a nossa entidade nulável
    this.mEntidades.add(new EntidadeNullable());
  }

  @Override
  public int getCount() {
    return this.mEntidades.size();
  }

  @Override
  public Object getItem(int i) {
    return this.mEntidades.get(i);
  }

  @Override
  public long getItemId(int i) {
    return this.mEntidades.get(i).getId();
  }

  @Override
  public View getView(int i, View view, ViewGroup viewGroup) {
    TextView textView = new TextView(this.mContext);

    Entidade entidade = (Entidade) getItem(i);
    textView.setText(entidade.toString());

    return textView;
  }
}
{% endhighlight %}

Usamos isso, então, da seguinte maneira

{%  highlight java %}
public class MyActivity extends Activity {
  protected void onCreate(Bundle savedInstanceState) {
    // Suponha que esse myEntidades é um List<Entidade>
    EntidadeAdapter adapter = new EntidadeAdapter(this.getContext(), myEntidades);
    Spinner mySpinner = new Spinner(this.getContext());
    mySpinner.setAdapter(adapter);

    this.setContentView(mySpinner);
  }
}
{% endhighlight %}

E aí, gostou? Já usou esse pattern em outra situação? Deixa teu comentário aí e vamos trocar uma ideia!
