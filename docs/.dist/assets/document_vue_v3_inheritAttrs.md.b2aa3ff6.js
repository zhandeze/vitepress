import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.f5532599.js";const d=JSON.parse('{"title":"inheritAttrs","description":"","frontmatter":{"title":"inheritAttrs","isTimeLine":true,"date":"2021-09-13T13:55:07.000Z"},"headers":[],"relativePath":"document/vue/v3/inheritAttrs.md","filePath":"document/vue/v3/inheritAttrs.md"}'),p={name:"document/vue/v3/inheritAttrs.md"},t=l(`<h3 id="inheritattrs-默认为true-继承根节点的attrs" tabindex="-1">inheritAttrs 默认为true 继承根节点的attrs <a class="header-anchor" href="#inheritattrs-默认为true-继承根节点的attrs" aria-label="Permalink to &quot;inheritAttrs 默认为true 继承根节点的attrs&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createApp } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  inheritAttrs: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`&lt;div class=&quot;box&quot;&gt;&lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}, { rootAttr: </span><span style="color:#9ECBFF;">&#39;根节点属性&#39;</span><span style="color:#E1E4E8;">} ).</span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#app&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 输出: &lt;div class=&quot;box&quot; rootattr=&quot;根节点属性&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  inheritAttrs: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//不继承根元素的attribute</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`&lt;div class=&quot;box&quot;&gt;&lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}, { rootAttr: </span><span style="color:#9ECBFF;">&#39;根节点属性&#39;</span><span style="color:#E1E4E8;">} ).</span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#app&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 输出: &lt;div class=&quot;box&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  inheritAttrs: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`&lt;div class=&quot;box&quot;&gt;&lt;input v-bind=&quot;$attrs&quot;/&gt;&lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}, { rootAttr: </span><span style="color:#9ECBFF;">&#39;根节点属性&#39;</span><span style="color:#E1E4E8;">} ).</span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#app&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 输出：&lt;div class=&quot;box&quot;&gt;&lt;input rootattr=&quot;根节点属性&quot;/&gt;&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Hello</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineComponent</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  inheritAttrs: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`&lt;span&gt;&lt;/span&gt;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  inheritAttrs: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: { Hello },</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`&lt;div class=&quot;box&quot;&gt;&lt;Hello v-bind=&quot;$attrs&quot;/&gt;&lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}, { rootAttr: </span><span style="color:#9ECBFF;">&#39;根节点属性&#39;</span><span style="color:#E1E4E8;">} ).</span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#app&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 输出：&lt;div class=&quot;box&quot;&gt;&lt;span rootattr=&quot;根节点属性&quot;&gt;&lt;/span&gt;&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Hello</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineComponent</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  inheritAttrs: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`&lt;span&gt;&lt;/span&gt;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  inheritAttrs: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: { Hello },</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`&lt;div class=&quot;box&quot;&gt;&lt;Hello v-bind=&quot;$attrs&quot;/&gt;&lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}, { rootAttr: </span><span style="color:#9ECBFF;">&#39;根节点属性&#39;</span><span style="color:#E1E4E8;">} ).</span><span style="color:#B392F0;">mount</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#app&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 输出：&lt;div class=&quot;box&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createApp } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">createApp</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  inheritAttrs: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`&lt;div class=&quot;box&quot;&gt;&lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#24292E;">}, { rootAttr: </span><span style="color:#032F62;">&#39;根节点属性&#39;</span><span style="color:#24292E;">} ).</span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#app&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 输出: &lt;div class=&quot;box&quot; rootattr=&quot;根节点属性&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">createApp</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  inheritAttrs: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//不继承根元素的attribute</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`&lt;div class=&quot;box&quot;&gt;&lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#24292E;">}, { rootAttr: </span><span style="color:#032F62;">&#39;根节点属性&#39;</span><span style="color:#24292E;">} ).</span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#app&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 输出: &lt;div class=&quot;box&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">createApp</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  inheritAttrs: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`&lt;div class=&quot;box&quot;&gt;&lt;input v-bind=&quot;$attrs&quot;/&gt;&lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#24292E;">}, { rootAttr: </span><span style="color:#032F62;">&#39;根节点属性&#39;</span><span style="color:#24292E;">} ).</span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#app&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 输出：&lt;div class=&quot;box&quot;&gt;&lt;input rootattr=&quot;根节点属性&quot;/&gt;&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Hello</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineComponent</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  inheritAttrs: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`&lt;span&gt;&lt;/span&gt;\`</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#6F42C1;">createApp</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  inheritAttrs: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  components: { Hello },</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`&lt;div class=&quot;box&quot;&gt;&lt;Hello v-bind=&quot;$attrs&quot;/&gt;&lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#24292E;">}, { rootAttr: </span><span style="color:#032F62;">&#39;根节点属性&#39;</span><span style="color:#24292E;">} ).</span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#app&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 输出：&lt;div class=&quot;box&quot;&gt;&lt;span rootattr=&quot;根节点属性&quot;&gt;&lt;/span&gt;&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Hello</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineComponent</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  inheritAttrs: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`&lt;span&gt;&lt;/span&gt;\`</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#6F42C1;">createApp</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  inheritAttrs: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  components: { Hello },</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`&lt;div class=&quot;box&quot;&gt;&lt;Hello v-bind=&quot;$attrs&quot;/&gt;&lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#24292E;">}, { rootAttr: </span><span style="color:#032F62;">&#39;根节点属性&#39;</span><span style="color:#24292E;">} ).</span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#app&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">// 输出：&lt;div class=&quot;box&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span></code></pre></div>`,3),o=[t];function e(c,r,E,i,y,u){return n(),a("div",null,o)}const g=s(p,[["render",e]]);export{d as __pageData,g as default};
