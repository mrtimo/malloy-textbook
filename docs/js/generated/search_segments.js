window.SEARCH_SEGMENTS = [
  {
    "titles": [
      "Chapter 1: The Basics"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "In this chapter you'll write your first Malloy queries. By the end you will know how to:"
      },
      {
        "type": "p",
        "text": "point Malloy at a data file with a <strong>source</strong>"
      },
      {
        "type": "p",
        "text": "run a query with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">:</span></span></code>"
      },
      {
        "type": "p",
        "text": "save reusable logic in a source as <strong>dimensions</strong> and <strong>measures</strong> with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span></span></code>"
      },
      {
        "type": "p",
        "text": "summarize data with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span></code>"
      },
      {
        "type": "p",
        "text": "narrow results with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>, sort with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">:</span></span></code>, and cut them off with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">:</span></span></code>"
      },
      {
        "type": "p",
        "text": "We'll use the U.S. baby names dataset for the whole chapter. Each row says something like <em>\"In 1987, 312 girls born in Ohio were named Jessica.\"</em>"
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 1: The Basics",
      "Your first source"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Malloy queries always start from a <strong>source</strong>. A source is a table of data plus any extra fields you choose to define on it. The simplest source is a file on disk. This cell tells Malloy: \"there is a source called <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_raw</span></span></code>, and it is the Parquet file <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">data</span><span style=\"color: #000000\">/</span><span style=\"color: #001080\">usa_names</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">parquet</span></span></code>, read with DuckDB.\""
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/usa_names.parquet&#39;</span><span style=\"color: #000000\">)</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Nothing ran yet. We only <em>defined</em> something. The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span></span></code> part names the <strong>connection</strong> (the database engine that will do the work). DuckDB runs right on your laptop, and it's built into the Malloy VS Code extension."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/source\">Sources</a> · <a href=\"https://docs.malloydata.dev/documentation/language/connections\">Connections</a>"
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 1: The Basics",
      "Your first query"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A query has three parts: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">:</span></span></code>, a source, an arrow <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-&gt;</span></span></code>, and then a set of curly braces <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">{ }</span></span></code> that say what you want. Let's count the rows."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">row_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "About 6.3 million rows. Read the query out loud: <em>\"Run against <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_raw</span></span></code>, and aggregate a field called <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">row_count</span></span></code>, which is <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span></code>.\"</em>"
      },
      {
        "type": "p",
        "text": "The pattern <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">new_name</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">expression</span></span></code> shows up all over Malloy. The name always comes first."
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 1: The Basics",
      "Looking at the raw data"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Before you analyze anything, look at a few rows. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">: *</span></span></code> returns every column, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">:</span></span></code> keeps the result small."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">: *</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "There are five columns: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">gender</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">year</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">number</span></span></code> (how many babies got that name). Notice that <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">year</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">number</span></span></code> are also words with special meaning in Malloy. To use them as column names, wrap them in backticks: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">`year`</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">`number`</span></span></code>. We'll rename them soon."
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 1: The Basics",
      "group_by and aggregate"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Most analysis is \"split the data into groups, then summarize each group.\" In Malloy, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> makes the groups and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span></code> summarizes them. How many babies were born in each state?"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`number`</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "A few things to notice:"
      },
      {
        "type": "p",
        "text": "The results come back <strong>sorted by the aggregate, largest first</strong>. When you don't say how to sort, Malloy picks a sensible order for you."
      },
      {
        "type": "p",
        "text": "There was no <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">GROUP</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">BY</span><span style=\"color: #000000\"> </span><span style=\"color: #098658\">1</span></span></code> and no list of columns to repeat. Malloy writes that SQL for you. Click the <strong>SQL</strong> button above the result to see it."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">`number`</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span></code> adds up the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">number</span></span></code> column. Malloy writes aggregates with a dot (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">column</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">column</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">column</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">max</span><span style=\"color: #000000\">()</span></span></code>). You can also write them the SQL way: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">column</span><span style=\"color: #000000\">)</span></span></code>."
      },
      {
        "type": "p",
        "text": "You can group by more than one thing and aggregate more than one thing:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`number`</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">distinct_names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">rows</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">)</span></span></code> counts <em>distinct</em> values of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name</span></span></code>. Plain <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span></code> counts rows."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/query\">Queries</a> · <a href=\"https://docs.malloydata.dev/documentation/language/aggregates\">Aggregates</a>"
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 1: The Basics",
      "where: filtering rows"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> keeps only the rows you want <strong>before</strong> the data is grouped. What were the most popular names in Texas in 2021?"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;TX&#39;</span><span style=\"color: #000000\"> and </span><span style=\"color: #001080\">`year`</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`number`</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Strings go in single quotes. You can combine conditions with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">and</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">or</span></span></code>. Malloy also has a shortcut for \"is one of these values,\" using <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">|</span></span></code>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;ID&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;NV&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`number`</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/filters\">Filters</a>. We spend a whole chapter on filtering in <a href=\"08_filtering\">Chapter 8</a>."
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 1: The Basics",
      "order_by and limit"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "To sort your own way, use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">:</span></span></code>. Add <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">desc</span></span></code> for largest first or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">asc</span></span></code> for smallest first. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">:</span></span></code> caps the number of rows."
      },
      {
        "type": "p",
        "text": "Which names were given to the fewest babies in 2021? (Remember the dataset leaves out names given to fewer than 5 babies in a state.)"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">`year`</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`number`</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">asc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "You can sort by a dimension, too. Here we list years in order:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;Elvis&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">`year`</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`number`</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">`year`</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">asc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/order_by\">Ordering and limiting</a>"
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 1: The Basics",
      "Calculations inside a query"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You can group by an <em>expression</em>, not just a column. Give it a name with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">is</span></span></code>. Here we turn each year into its decade:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">floor</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">`year`</span><span style=\"color: #000000\"> / </span><span style=\"color: #098658\">10</span><span style=\"color: #000000\">) * </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`number`</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "This works, but we have now typed <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">`number`</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span></code> in almost every query. If we decide to define \"births\" differently, we'd have to fix every query by hand. Malloy has a better way."
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 1: The Basics",
      "Extending a source with dimensions and measures"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The real power of Malloy is that you can <strong>save logic in the source</strong> so every query can reuse it. You do that with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> { }</span></span></code>. Inside, you can add:"
      },
      {
        "type": "p",
        "text": "<strong>renames</strong>: friendlier names for raw columns"
      },
      {
        "type": "p",
        "text": "<strong>dimensions</strong>: values calculated <em>for each row</em> (things you group by or filter on)"
      },
      {
        "type": "p",
        "text": "<strong>measures</strong>: values calculated <em>across many rows</em> (things you aggregate)"
      },
      {
        "type": "p",
        "text": "Let's build a better <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> source on top of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_raw</span></span></code>."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names_raw</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">rename</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`year`</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">rename</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`number`</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">floor</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> / </span><span style=\"color: #098658\">10</span><span style=\"color: #000000\">) * </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">name_length</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">length</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">name_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Now queries get short and readable, because the meaning lives in one place:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Notice we just wrote <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code>. We didn't need <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> ...</span></span></code> this time. The measure already has a name and a definition."
      },
      {
        "type": "p",
        "text": "Measures and dimensions work anywhere a column works, including <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name_length</span><span style=\"color: #000000\"> &gt;= </span><span style=\"color: #098658\">12</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "💡 <strong>Dimension or measure?</strong> Ask: \"does this make sense for a single row?\" A name's length does, so <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_length</span></span></code> is a <strong>dimension</strong>. \"Total births\" only makes sense across many rows, so it's a <strong>measure</strong>. Dimensions go in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>. Measures go in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span></code>."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/fields\">Fields: dimensions and measures</a> · <a href=\"https://docs.malloydata.dev/documentation/language/source#source-extensions\">Source extensions</a>"
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 1: The Basics",
      "Putting it together"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "One last query uses everything from this chapter. What were the most popular boys' names of the 1950s in California, and how long were they?"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">1950</span><span style=\"color: #000000\"> and </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;CA&#39;</span><span style=\"color: #000000\"> and </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;M&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name_length</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 1: The Basics",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\"> -&gt; { ... }</span></span></code> runs a query."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">:</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">:</span></span></code> control sorting and size. Malloy picks a sensible sort when you don't."
      },
      {
        "type": "p",
        "text": "A <strong>source</strong> is data plus fields you define on it. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;file.parquet&#39;</span><span style=\"color: #000000\">)</span></span></code> makes a source from a file."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> makes groups, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span></code> summarizes them, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> filters rows first."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> { }</span></span></code> adds <strong>dimensions</strong> (per row) and <strong>measures</strong> (across rows), so logic lives in one place."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 1.1: Your name.</strong> Add a new cell to this notebook. Using the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> source, find how many babies were given <em>your</em> name (or any name you like) in each decade. Sort the result by decade."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 1.2: A new measure.</strong> Add a measure called <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">avg_births_per_row</span></span></code> to the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> source. It should be the average of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">births</span></span></code>. (Hint: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">()</span></span></code>.) Then write a query that shows <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">avg_births_per_row</span></span></code> for each <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">gender</span></span></code>. To change the source, edit the cell that defines <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> and run it again."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 1.3: Short names.</strong> Which <strong>three-letter</strong> names were most popular in 2010? Show the top 10, along with how many babies got each name."
      }
    ],
    "path": "/textbook/01_basics.malloynb"
  },
  {
    "titles": [
      "Chapter 2: Time Truncation"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Almost every business question has time in it. <em>How are sales trending? Was last quarter better than the one before? Which month is busiest?</em> In this chapter you'll learn how to:"
      },
      {
        "type": "p",
        "text": "build simple <strong>trend</strong> queries"
      },
      {
        "type": "p",
        "text": "<strong>extract</strong> parts of a date (like \"which month of the year\") with functions such as <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">month</span><span style=\"color: #000000\">()</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">day_of_week</span><span style=\"color: #000000\">()</span></span></code>"
      },
      {
        "type": "p",
        "text": "<strong>truncate</strong> timestamps to a year, quarter, month, week, or day with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">quarter</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">week</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">day</span></span></code>"
      },
      {
        "type": "p",
        "text": "The baby names data only records a birth <em>year</em> as a plain number, so for this chapter we'll switch to the <strong>e-commerce</strong> dataset. Its timestamps go down to the second."
      }
    ],
    "path": "/textbook/02_time_truncation.malloynb"
  },
  {
    "titles": [
      "Chapter 2: Time Truncation",
      "Importing a model"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "In Chapter 1 we defined our source right in the notebook. Usually a source lives in a separate <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> file (a <strong>model</strong>) that many notebooks share. You'll learn much more about this in <a href=\"05_files_and_notebooks\">Chapter 5</a>. For now, this one line brings in every source defined in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">ecommerce</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;ecommerce.malloy&quot;</span></span></pre>"
      },
      {
        "type": "p",
        "text": "The main source is <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_items</span></span></code>: one row for every item sold. Let's look at a few rows. We pick the columns we care about with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">:</span></span></code>."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">id</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">order_id</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">shipped_at</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">sale_price</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">status</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">created_at</span></span></code> is a <strong>timestamp</strong> (a date <em>and</em> a time). <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">shipped_at</span></span></code> is a <strong>date</strong> (no time). Both kinds of value work with everything in this chapter."
      }
    ],
    "path": "/textbook/02_time_truncation.malloynb"
  },
  {
    "titles": [
      "Chapter 2: Time Truncation",
      "Truncation: rounding time down"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "To <strong>truncate</strong> a timestamp is to round it <em>down</em> to the start of a period. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span></code> turns <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">-</span><span style=\"color: #098658\">0</span><span style=\"color: #000000\">3-</span><span style=\"color: #098658\">17</span><span style=\"color: #000000\"> </span><span style=\"color: #098658\">14</span><span style=\"color: #000000\">:</span><span style=\"color: #098658\">0</span><span style=\"color: #000000\">5:</span><span style=\"color: #098658\">22</span></span></code> into <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">-</span><span style=\"color: #098658\">0</span><span style=\"color: #000000\">3</span></span></code>, the first moment of that month. Every order from March 2021 lands in the same group."
      },
      {
        "type": "p",
        "text": "Here are all the truncations side by side for a few orders:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">3</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">created_at</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">by_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">by_quarter</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">quarter</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">by_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">by_week</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">week</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">by_day</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">day</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">by_hour</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">hour</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "A truncation <strong>is still a time</strong>. It isn't a number or a string. That matters, because Malloy knows how to sort it, display it, and draw it on a chart's time axis."
      },
      {
        "type": "p",
        "text": "💡 <strong>Weeks start on Sunday.</strong> <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">week</span></span></code> truncates to the Sunday at the start of the week."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/timestamp-operations#truncation\">Timestamp operations: truncation</a>"
      }
    ],
    "path": "/textbook/02_time_truncation.malloynb"
  },
  {
    "titles": [
      "Chapter 2: Time Truncation",
      "Your first trend query"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Group by a truncated time to get a trend. How much did the store sell each year?"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">order_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Look at the order of the rows: <strong>newest first</strong>. When a query groups by a time, Malloy sorts by that time, newest first. That's usually what you want on a report. For a trend you read left to right (or top to bottom), sort it yourself:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_quarter</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">quarter</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">order_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_quarter</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">asc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "The business grows every quarter. (The last quarter is low because the data stops in mid-November 2022. Watch out for partial periods at the edges of your data!)"
      },
      {
        "type": "p",
        "text": "Monthly trends work the same way. The model already has a view called <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_month</span></span></code> that does exactly this. You'll learn about views in <a href=\"03_views_and_nesting\">Chapter 3</a>."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">12</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Here's a sneak peek at <a href=\"04_render_tags\">Chapter 4</a>. Add one line, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span></code>, above the query, and the same result becomes a chart:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/02_time_truncation.malloynb"
  },
  {
    "titles": [
      "Chapter 2: Time Truncation",
      "Extraction: \"which month?\" instead of \"which March?\""
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Truncation keeps the year: March 2021 and March 2022 are <em>different</em> groups. Sometimes you want to ask \"are Marches always busy?\" That's <strong>seasonality</strong>, and it needs the month <em>number</em> (1–12), with the year thrown away. For that, use <strong>extraction functions</strong>. They return plain numbers:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">@2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">month_number</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">month</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">month_number</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">12</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Did you notice <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">@2021</span></span></code>? The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">@</span></span></code> starts a <strong>time literal</strong>, a fixed point in time written into your code. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">@2021</span></span></code> means \"the year 2021.\" You'll see a lot more of this in <a href=\"08_filtering\">Chapter 8</a>."
      },
      {
        "type": "p",
        "text": "Which day of the week do people shop most?"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">weekday</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">day_of_week</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">weekday</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Truncation vs. extraction.</strong> <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span></code> is a <em>time</em> (March 2021). <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">month</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">)</span></span></code> is a <em>number</em> (3). Use truncation for trends over time. Use extraction to compare the same part of different periods (all Marches, all Mondays)."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/timestamp-operations#extraction\">Timestamp operations: extraction</a> · <a href=\"https://docs.malloydata.dev/documentation/language/expressions#time-expressions\">Time expressions</a>"
      }
    ],
    "path": "/textbook/02_time_truncation.malloynb"
  },
  {
    "titles": [
      "Chapter 2: Time Truncation",
      "Dates work too"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">shipped_at</span></span></code> is a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">date</span></span></code>, and truncation works the same way on it. (Hours and minutes don't apply to dates, of course.)"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">shipped_at</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> not </span><span style=\"color: #0000FF\">null</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">ship_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">shipped_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_item_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">ship_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">6</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/02_time_truncation.malloynb"
  },
  {
    "titles": [
      "Chapter 2: Time Truncation",
      "Measuring time between two dates"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "How long does an order take to ship? Malloy measures the gap between two times with a <strong>range</strong>, written <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">start</span><span style=\"color: #000000\"> to </span><span style=\"color: #AF00DB\">end</span></span></code>, inside a function like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">days</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">hours</span><span style=\"color: #000000\">()</span></span></code>, or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">months</span><span style=\"color: #000000\">()</span></span></code>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">shipped_at</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> not </span><span style=\"color: #0000FF\">null</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">avg_days_to_ship</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">days</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">::</span><span style=\"color: #0000FF\">date</span><span style=\"color: #000000\"> to </span><span style=\"color: #001080\">shipped_at</span><span style=\"color: #000000\">))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">::</span><span style=\"color: #0000FF\">date</span></span></code> <strong>casts</strong> the timestamp to a date so both ends of the range have the same type."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/time-ranges#interval-measurement\">Time ranges and interval measurement</a>"
      }
    ],
    "path": "/textbook/02_time_truncation.malloynb"
  },
  {
    "titles": [
      "Chapter 2: Time Truncation",
      "What about the names data?"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "In the names dataset, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">year_born</span></span></code> is a plain number like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">1987</span></span></code>, not a timestamp. So <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">quarter</span></span></code> make no sense for it. The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">decade</span></span></code> dimension from Chapter 1, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">floor</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> / </span><span style=\"color: #098658\">10</span><span style=\"color: #000000\">) * </span><span style=\"color: #098658\">10</span></span></code>, is the integer version of \"truncation\": it rounds a year down to the start of its decade."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;Jennifer&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<em>Jennifer</em> doesn't appear at all until the 1930s. It became a smash hit in the 1970s, then faded."
      }
    ],
    "path": "/textbook/02_time_truncation.malloynb"
  },
  {
    "titles": [
      "Chapter 2: Time Truncation",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">days</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">a</span><span style=\"color: #000000\"> to </span><span style=\"color: #001080\">b</span><span style=\"color: #000000\">)</span></span></code> measures the time between two dates."
      },
      {
        "type": "p",
        "text": "Group by a truncated time to build a <strong>trend</strong>. Malloy sorts time groups newest-first unless you <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">:</span></span></code> them."
      },
      {
        "type": "p",
        "text": "Extraction functions (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">month</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">day_of_week</span><span style=\"color: #000000\">()</span></span></code>, ...) return <strong>numbers</strong> and are good for seasonality."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">quarter</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">week</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">day</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">hour</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">minute</span></span></code> <strong>truncate</strong> a time to the start of a period. The result is still a time."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 2.1: Busiest hour.</strong> Add a cell that finds which <strong>hour of the day</strong> (0–23) has the most order items. Sort from most to fewest. (Hint: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">hour</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">)</span></span></code>.)"
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 2.2: Weekly trend.</strong> Show <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_count</span></span></code> by <strong>week</strong> for the first 8 weeks of 2022. Sort oldest to newest. (Hint: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">@2022</span></span></code>, then <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">8</span></span></code>.)"
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 2.3: Returns over time.</strong> The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">returned_at</span></span></code> column is the timestamp an item was returned (it's null if the item was never returned). Show the number of returned items per <strong>quarter</strong>, based on <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">returned_at</span></span></code>, oldest first. (Hint: filter with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">returned_at</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> not </span><span style=\"color: #0000FF\">null</span></span></code>.)"
      }
    ],
    "path": "/textbook/02_time_truncation.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Two features make Malloy feel different from SQL:"
      },
      {
        "type": "p",
        "text": "<strong>Views</strong> are named, reusable queries saved inside a source."
      },
      {
        "type": "p",
        "text": "<strong>Nesting</strong> puts a whole query <em>inside each row</em> of another query. This lets you answer questions like \"what are the top 5 names <strong>in each state</strong>?\" in a single query, with no window functions and no self-joins."
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting",
      "Starting point"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "We'll use the finished <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> model from now on. It's in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>, next to this notebook. It has the same <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">year_born</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">births</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">decade</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code> fields you built in Chapter 1, plus a few more."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span></pre>"
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting",
      "Running a view"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A <strong>view</strong> is a query that has a name and lives in a source. The model already defines a few. Here's the definition of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_name</span></span></code> from <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">view</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "To run a view, put its name after the arrow, where the curly braces would normally go:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">by_name</span></span></pre>"
      },
      {
        "type": "p",
        "text": "A view saves typing, but more importantly it saves <em>decisions</em>. Everyone who runs <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_name</span></span></code> gets the same definition."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/views\">Views</a>"
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting",
      "Refining a view"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You can take a view and add to it with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">+</span></span></code>. This is called <strong>refinement</strong>. Most popular names in California:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;CA&#39;</span><span style=\"color: #000000\"> }</span></span></pre>"
      },
      {
        "type": "p",
        "text": "You can add more than a filter. Here we add another measure (how many states each name appeared in) and a different limit:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> + {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/views#refining-views\">Refining views</a>"
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting",
      "Defining your own views"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You can add views to a source with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span></span></code>, the same way you added dimensions and measures in Chapter 1. Here we create <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_plus</span></span></code> with two new views:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_plus</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">view</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_girls</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">view</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_boys</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;M&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_plus</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">top_girls</span></span></pre>"
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting",
      "Nesting: a query inside each row"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Here's the big idea of this chapter. Suppose you want the <strong>top 5 names in each state</strong>. In SQL, this needs a window function (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">ROW_NUMBER</span><span style=\"color: #000000\">() </span><span style=\"color: #795E26\">OVER</span><span style=\"color: #000000\"> (</span><span style=\"color: #001080\">PARTITION</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">BY</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> ...)</span></span></code>) and a subquery. In Malloy, you write the inner query <em>inside</em> the outer one with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">:</span></span></code>."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Each row of the result is a state. Each state row holds its own small table of top names. The nested query only sees the rows for <em>its</em> state. Read it as: <em>\"for each state, show total births, and also show the top 5 names <strong>within that state</strong>.\"</em>"
      },
      {
        "type": "p",
        "text": "Notice that <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code> means something different at each level. At the outer level, it counts every birth in the state. Inside the nest, it counts the births for one name in that state."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/nesting\">Nested views</a>"
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting",
      "Nesting named views"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Any view can be nested by name. Since <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_plus</span></span></code> has <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">top_girls</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">top_boys</span></span></code>, we can show both, side by side, for each decade:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_plus</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_girls</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">top_boys</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Notice the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span></code>. It sorts the <strong>outer</strong> rows. Each nest has its own <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">:</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">:</span></span></code>."
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting",
      "Nesting more than one level"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A nested query can have its own nests. For each gender, show the top 3 decades by births. Then, inside each decade, show the top 3 names:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">best_decades</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">3</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">3</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting",
      "Filtering inside a nest"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A nest can have its own <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>. The filter only affects that nest. Here, the outer query covers all years, while each nest looks at one era:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;NY&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">in_1950</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">1950</span><span style=\"color: #000000\">, </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">in_2020</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2020</span><span style=\"color: #000000\">, </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting",
      "Top 5 products within each region"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Nesting is the natural way to write any \"top N within each group\" question. Let's try one on the e-commerce data: <strong>the top 5 products within each region</strong> (here, each U.S. state). Products and customers come from tables <em>joined</em> to <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_items</span></span></code>. You reach a joined table's fields with a dot (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">state</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_name</span></span></code>). We'll explain joins fully in <a href=\"10_joins\">Chapter 10</a>."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;ecommerce.malloy&quot;</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">country</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;USA&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_products</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">order_item_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">6</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 3: Views and Nesting",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">:</span></span></code> puts a query inside each row of the outer query. It is the easy way to answer \"top N per group.\""
      },
      {
        "type": "p",
        "text": "<strong>Refine</strong> a view with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">+ { ... }</span></span></code> to add filters, fields, or limits."
      },
      {
        "type": "p",
        "text": "Every level of nesting has its own <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">:</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">:</span></span></code>."
      },
      {
        "type": "p",
        "text": "A <strong>view</strong> is a named query in a source: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">view</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> { ... }</span></span></code>. Run it with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">view_name</span></span></code>."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 3.1: Your own view.</strong> Add a cell that extends <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> into a new source with a view called <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_first_letter</span></span></code>. The view should group by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">first_letter</span></span></code> and show <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_count</span></span></code>. Run it."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 3.2: Top names per generation.</strong> The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> source has a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">generation</span></span></code> dimension (Boomer, Gen X, Millennial, ...). Write <strong>one query</strong> that lists each generation and nests the <strong>top 3 girls' names</strong> and the <strong>top 3 boys' names</strong> for that generation."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 3.3: E-commerce.</strong> For each product <strong>category</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_category</span></span></code>), show <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span></span></code> and nest the <strong>top 3 brands</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_brand</span></span></code>) by sales. Limit the outer query to the 5 biggest categories."
      }
    ],
    "path": "/textbook/03_views_and_nesting.malloynb"
  },
  {
    "titles": [
      "Chapter 4: Render Tags"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "So far every result has been a table. Malloy's renderer can also draw <strong>bar charts, line charts, dashboards, and big-number KPI cards</strong>. It can also format numbers as currency, percentages, or \"12.3k.\" You ask for all of this with <strong>render tags</strong>: short lines that start with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">#</span></span></code> and sit right above a query or a field."
      },
      {
        "type": "p",
        "text": "From this chapter on, any result in the book can be a chart."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;ecommerce.malloy&quot;</span></span></pre>"
      }
    ],
    "path": "/textbook/04_render_tags.malloynb"
  },
  {
    "titles": [
      "Chapter 4: Render Tags",
      "How tags work"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A tag is a line beginning with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span></span></code> (a hash and a space). It attaches to whatever comes <strong>directly after it</strong>:"
      },
      {
        "type": "p",
        "text": "above <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">:</span></span></code>, it applies to the whole result"
      },
      {
        "type": "p",
        "text": "above <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">:</span></span></code>, it applies to that nested result"
      },
      {
        "type": "p",
        "text": "above a field (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code>, or a single field name), it applies to that column"
      },
      {
        "type": "p",
        "text": "Tags don't change <em>what</em> data comes back. They only change <em>how it's drawn</em>."
      },
      {
        "type": "p",
        "text": "⚠️ <strong><code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">#</span></span></code> is not a comment.</strong> In Malloy, comments start with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">//</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">--</span></span></code>. A line that starts with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">#</span></span></code> is a tag. A misspelled tag is quietly ignored."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/visualizations/overview\">Visualizations overview</a> · <a href=\"https://docs.malloydata.dev/documentation/language/tags\">Annotations and tags</a>"
      }
    ],
    "path": "/textbook/04_render_tags.malloynb"
  },
  {
    "titles": [
      "Chapter 4: Render Tags",
      "Bar charts"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span></span></code> draws the first <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> field along the x-axis and the first measure as the bar height."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">15</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Add a <strong>second</strong> <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> and the bars split into colored series. Here each decade gets a bar for girls and one for boys:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> &gt;= </span><span style=\"color: #098658\">1950</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">stack</span></span></code> to stack the series instead of putting them side by side:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">stack</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> &gt;= </span><span style=\"color: #098658\">1950</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/visualizations/bar_charts\">Bar charts</a>"
      }
    ],
    "path": "/textbook/04_render_tags.malloynb"
  },
  {
    "titles": [
      "Chapter 4: Render Tags",
      "Line charts"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span></code> is the natural choice for trends. Put a time (or a year) first in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code>. How popular were three classic names over time?"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;Mary&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;Linda&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;Emma&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Again, the second <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name</span></span></code>) became the series, so each name gets its own line. <em>Linda</em> had one enormous spike after World War II. <em>Emma</em> came back in the 2000s."
      },
      {
        "type": "p",
        "text": "Line charts work great with the truncated timestamps from Chapter 2:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">status</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/visualizations/charts_line_chart\">Line charts</a>"
      }
    ],
    "path": "/textbook/04_render_tags.malloynb"
  },
  {
    "titles": [
      "Chapter 4: Render Tags",
      "Charts inside nests"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Tags work on <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">:</span></span></code> too. This puts a small chart <em>inside every row</em>, which is one of Malloy's best tricks. For each of the 5 most popular girls' names of all time, show its trend line:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  # </span><span style=\"color: #001080\">line_chart</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">trend</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/04_render_tags.malloynb"
  },
  {
    "titles": [
      "Chapter 4: Render Tags",
      "Number formatting"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Raw numbers like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">0.0734</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">4744743.4469</span></span></code> are hard to read. Tags on a field fix that:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">label</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;Revenue&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">revenue</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">sale_price</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #098658\">1</span><span style=\"color: #000000\">k</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">items_sold_k</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">share_of_revenue</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">sale_price</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">() / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">sale_price</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">())</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "(<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> gives the grand total across all rows. You'll learn it properly in <a href=\"11_percent_of_total\">Chapter 11</a>.)"
      },
      {
        "type": "p",
        "text": "Put format tags <strong>in the model</strong>, and every query that uses the field gets the formatting for free. In <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">ecommerce</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span></span></code> is defined like this:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">sale_price</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span></pre>"
      },
      {
        "type": "p",
        "text": "That's why <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span></span></code> has shown up as dollars in every chapter."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/visualizations/numbers\">Number formatting</a>"
      }
    ],
    "path": "/textbook/04_render_tags.malloynb"
  },
  {
    "titles": [
      "Chapter 4: Render Tags",
      "Big values (KPI cards)"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">big_value</span></span></code> shows each measure as a large number. It's great for the top of a report."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">big_value</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">@2022</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">label</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;2022 Revenue&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">label</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;Orders&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">order_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">label</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;Avg Item Price&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">avg_sale_price</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/visualizations/big_values\">Big values</a>"
      }
    ],
    "path": "/textbook/04_render_tags.malloynb"
  },
  {
    "titles": [
      "Chapter 4: Render Tags",
      "Dashboards"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">dashboard</span></span></code> lays a nested query out as tiles instead of a table. Each top-level measure becomes a KPI card, and each nest becomes a panel that can carry its own chart tag. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">break</span></span></code> starts a new row of tiles."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">dashboard</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;CA&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">name_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  # </span><span style=\"color: #001080\">line_chart</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">births_by_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  # </span><span style=\"color: #001080\">bar_chart</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">by_gender</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  # </span><span style=\"color: #001080\">break</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_girls</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_boys</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;M&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "A dashboard with a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> at the top level makes one dashboard per group. Here's one for each of three states:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">dashboard</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;VT&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;HI&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  # </span><span style=\"color: #001080\">bar_chart</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">by_decade</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/visualizations/dashboards\">Dashboards</a>"
      }
    ],
    "path": "/textbook/04_render_tags.malloynb"
  },
  {
    "titles": [
      "Chapter 4: Render Tags",
      "A few more tags worth knowing"
    ],
    "paragraphs": [
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">shape_map</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;Brittany&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/04_render_tags.malloynb"
  },
  {
    "titles": [
      "Chapter 4: Render Tags",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">dashboard</span></span></code> turns nests into tiles. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">big_value</span></span></code> shows KPI cards."
      },
      {
        "type": "p",
        "text": "A <strong>render tag</strong> is a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># ...</span></span></code> line above a query, field, or nest. It changes how results are drawn, not what they are."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span></code> use the first <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> as the x-axis. A second <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> becomes the series."
      },
      {
        "type": "p",
        "text": "Format numbers with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">currency</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">percent</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=...</span></span></code>, and rename columns with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">label</span><span style=\"color: #000000\">=...</span></span></code>. Put formats in the model so they're always applied."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 4.1: Chart your name.</strong> Make a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span></code> of births per year for your name (or any name), with one line per <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">gender</span></span></code>."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 4.2: Bar chart of name lengths.</strong> Make a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span></span></code> that shows <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code> by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_length</span></span></code> for babies born in 2021. Sort by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_length</span></span></code> so the bars go from short to long names."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 4.3: Build a dashboard.</strong> Make a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">dashboard</span></span></code> for the e-commerce store for <strong>2021</strong>. It should include: a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">big_value</span></span></code>-style row of measures at the top (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_count</span></span></code>), a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span></code> nest of sales by month, and a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span></span></code> nest of the top 10 product categories (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_category</span></span></code>) by sales."
      }
    ],
    "path": "/textbook/04_render_tags.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You've already used both kinds of Malloy file without thinking about it. Every chapter is a <strong>notebook</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloynb</span></span></code>), and since Chapter 2 each one has started with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;ecommerce.malloy&quot;</span></span></code>, which are <strong>model files</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>). This chapter explains the difference, shows how they work together, and walks you through setting up VS Code and DuckDB on your own computer."
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "The big idea"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Here's the rule of thumb: <strong>definitions go in the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> file, and questions go in the notebook.</strong> If you write the same expression in two notebooks, it probably belongs in the model."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/user_guides/notebooks\">Analyzing with notebooks</a> · <a href=\"https://docs.malloydata.dev/documentation/language/statement\">Models and statements</a>"
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Inside a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> file"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A model file is just Malloy statements: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">:</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">query</span><span style=\"color: #000000\">:</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">:</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span></span></code>. Here's the start of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>, which sits next to this notebook:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">#&quot; U.S. baby names by state, gender, and birth year (1910–2021).</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/usa_names.parquet&#39;</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">rename</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`year`</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">rename</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`number`</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #008000\">#&quot; The decade a baby was born in, e.g. 1990.</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">floor</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> / </span><span style=\"color: #098658\">10</span><span style=\"color: #000000\">) * </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  ...</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #008000\">#&quot; Total babies born (sum of the births column).</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  ...</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "When you open a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> file in VS Code, small <strong>Run</strong>, <strong>Explore</strong>, and <strong>Schema</strong> links appear above each <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">:</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">:</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">query</span><span style=\"color: #000000\">:</span></span></code>. Click <strong>Run</strong> to see results in a panel on the right."
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Inside a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloynb</span></span></code> notebook"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A notebook is a list of <strong>cells</strong>. Each cell is either Markdown (text, tables, images, links) or Malloy (code). When you open the file in VS Code, you see the cells drawn nicely, with each Malloy cell's results right underneath it."
      },
      {
        "type": "p",
        "text": "The file itself is plain text. Open one in any text editor and you'll see that cells are separated by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">&gt;&gt;&gt;</span><span style=\"color: #001080\">markdown</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">&gt;&gt;&gt;</span><span style=\"color: #001080\">malloy</span></span></code> lines. (In the real file these lines start at the very left edge. We indented them here so this notebook doesn't treat them as real cell breaks.)"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-txt\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">  &gt;&gt;&gt;markdown</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  # My analysis</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  Which names were popular in Ohio?</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  &gt;&gt;&gt;malloy</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  import &quot;names.malloy&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  &gt;&gt;&gt;malloy</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  run: names -&gt; by_name + { where: state = &#39;OH&#39; }</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Because notebooks are plain text, they work well with Git. You can see exactly what changed between two versions. (Results are <em>not</em> saved in the file. They're recomputed each time you run the cell.)"
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Inside a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloynb</span></span></code> notebook",
      "Cells build on each other"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Each Malloy cell can use anything defined in the cells <strong>above</strong> it. That's why the first cell of a chapter is usually the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span></span></code>. Let's prove it. This cell imports the model:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span></pre>"
      },
      {
        "type": "p",
        "text": "This cell defines a new source, with a new dimension, on top of the imported one:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_ch5</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">is_vowel_start</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">first_letter</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;A&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;E&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;I&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;O&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;U&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "And this cell uses both:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_ch5</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">is_vowel_start</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Order matters.</strong> If you run a cell before the cells above it have run, you'll get errors like <em>\"Reference to undefined object.\"</em> When in doubt, use <strong>Run All</strong> at the top of the notebook."
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Named queries"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Besides views (which belong to a source), a model can hold top-level <strong>named queries</strong> with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">query</span><span style=\"color: #000000\">:</span></span></code>. You can run them by name later, from the model or from any notebook that imports it:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">query</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">popular_in_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\"> }</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">popular_in_2021</span></span></pre>"
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Imports"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span></code> reads another file and makes everything it defines available. The path is <strong>relative to the file doing the importing</strong>. So <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span></code> looks in the same folder, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;../models/names.malloy&quot;</span></span></code> would look one folder up and then in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">models</span><span style=\"color: #000000\">/</span></span></code>."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/imports\">Imports</a>"
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Setting up your environment"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You need three things: <strong>VS Code</strong>, the <strong>Malloy extension</strong>, and <strong>DuckDB</strong>. DuckDB comes <em>inside</em> the extension, so it's really only two installs."
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Setting up your environment",
      "Option A: VS Code on your computer (recommended)"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<strong>Install VS Code</strong> from <a href=\"https://code.visualstudio.com/\">code.visualstudio.com</a>."
      },
      {
        "type": "p",
        "text": "<strong>Get the notebooks.</strong> Go to <a href=\"https://github.com/mrtimo/malloy-textbook-notebooks\">github.com/mrtimo/malloy-textbook-notebooks</a> and click <strong>Code → Download ZIP</strong> (then unzip it), or clone it with <code>git clone <a href=\"https://github.com/mrtimo/malloy-textbook-notebooks.git\">https://github.com/mrtimo/malloy-textbook-notebooks.git</a></code>."
      },
      {
        "type": "p",
        "text": "<strong>Open the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">textbook</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">notebooks</span></span></code> folder</strong> with <strong>File → Open Folder…</strong>. Open <em>that</em> folder, not its parent. Then open <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">0</span><span style=\"color: #000000\">1_basics.</span><span style=\"color: #001080\">malloynb</span></span></code> and click <strong>Run All</strong>."
      },
      {
        "type": "p",
        "text": "<strong>Install the Malloy extension.</strong> Open the Extensions panel (<code>Cmd+Shift+X</code> on Mac, <code>Ctrl+Shift+X</code> on Windows), search for <strong>Malloy</strong>, and click <strong>Install</strong>. Or install it from the <a href=\"https://marketplace.visualstudio.com/items?itemName=malloydata.malloy-vscode\">VS Code Marketplace</a>."
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Setting up your environment",
      "Option B: github.dev (nothing to install)"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<a href=\"https://github.dev\">github.dev</a> is VS Code running in your web browser."
      },
      {
        "type": "p",
        "text": "Open any notebook and run it."
      },
      {
        "type": "p",
        "text": "When VS Code opens in the browser, install the <strong>Malloy</strong> extension from the Extensions panel."
      },
      {
        "type": "p",
        "text": "On the <a href=\"https://github.com/mrtimo/malloy-textbook-notebooks\">notebooks repository page</a>, press the <code>.</code> (period) key, or use the <strong>Open in VS Code</strong> button at the top of any chapter on this website."
      },
      {
        "type": "p",
        "text": "github.dev can only use DuckDB with files that are in the repository (Parquet, CSV, JSON). That's all we need. It's a little slower than desktop VS Code with big files, and you'll need to commit your changes to keep them."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/setup/extension\">VS Code extension setup</a> · <a href=\"https://docs.malloydata.dev/documentation/setup/extension#vs-code-web-github-dev-\">github.dev</a>"
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Setting up your environment",
      "Why the folder matters: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">config</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">json</span></span></code>"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The models refer to data with <em>relative</em> paths like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/usa_names.parquet&#39;</span><span style=\"color: #000000\">)</span></span></code>. In VS Code, DuckDB resolves relative paths from the <strong>project root</strong>: the folder that holds <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">config</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">json</span></span></code>, or else the workspace folder. The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">textbook</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">notebooks</span></span></code> folder includes this small <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">config</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">json</span></span></code>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-json\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">{</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #0451A5\">&quot;connections&quot;</span><span style=\"color: #000000\">: {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #0451A5\">&quot;duckdb&quot;</span><span style=\"color: #000000\">: { </span><span style=\"color: #0451A5\">&quot;is&quot;</span><span style=\"color: #000000\">: </span><span style=\"color: #A31515\">&quot;duckdb&quot;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "It does two things. It declares a connection named <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span></span></code> (the name we use in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(...)</span></span></code>), and it marks <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">textbook</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">notebooks</span><span style=\"color: #000000\">/</span></span></code> as the root, so <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">data</span><span style=\"color: #000000\">/...</span></span></code> paths work no matter how you opened the repository."
      },
      {
        "type": "p",
        "text": "⚠️ <strong>\"File not found: data/usa_names.parquet\"?</strong> VS Code is resolving the path from the wrong folder. Open the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">textbook</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">notebooks</span></span></code> folder itself, or make sure <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">config</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">json</span></span></code> is still in it."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/setup/config\">Configuration: malloy-config.json</a>"
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Setting up your environment",
      "Creating your own notebook"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<strong>Run a cell:</strong> click the ▶ button or press <code>Shift+Enter</code>."
      },
      {
        "type": "p",
        "text": "<strong>Edit Markdown:</strong> double-click a Markdown cell. Press <code>Esc</code> or click away to see it formatted."
      },
      {
        "type": "p",
        "text": "<strong>New notebook:</strong> create a file whose name ends in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloynb</span></span></code> (for example <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">my_analysis</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloynb</span></span></code>). VS Code opens it as a notebook."
      },
      {
        "type": "p",
        "text": "<strong>Add cells:</strong> hover between cells and click <strong>+ Code</strong> or <strong>+ Markdown</strong>. Make sure a code cell's language (bottom-right corner of the cell) says <strong>Malloy</strong>."
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Setting up your environment",
      "Creating your own model"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Define sources in it, then <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;my_model.malloy&quot;</span></span></code> from a notebook."
      },
      {
        "type": "p",
        "text": "After you edit the model, re-run the notebook's import cell (or <strong>Run All</strong>) so the notebook sees the change."
      },
      {
        "type": "p",
        "text": "Create a file ending in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>, for example <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">my_model</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>."
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 5: Malloy Files vs. Malloy Notebooks",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Install VS Code and the Malloy extension (DuckDB is built in), and open <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">textbook</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">notebooks</span><span style=\"color: #000000\">/</span></span></code> as the workspace root."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">query</span><span style=\"color: #000000\">:</span></span></code> names a query so it can be run later. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span></span></code> paths are relative to the importing file."
      },
      {
        "type": "p",
        "text": "Notebooks are plain text with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">&gt;&gt;&gt;</span><span style=\"color: #001080\">markdown</span></span></code> / <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">&gt;&gt;&gt;</span><span style=\"color: #001080\">malloy</span></span></code> separators. Cells build on the cells above them."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> files hold the <strong>model</strong> (definitions). <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloynb</span></span></code> notebooks hold <strong>narrative, queries, and results</strong>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span></span></code> the model."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 5.1: Your first notebook.</strong> Create a new notebook called <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">my_first_notebook</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloynb</span></span></code> in the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">textbook</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">notebooks</span></span></code> folder. Give it a Markdown cell with a title and one sentence that explains what you're investigating. Then add a Malloy cell that imports <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>, and two query cells that answer your question."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 5.2: Change the model.</strong> Open <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> and add a new view called <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_generation</span></span></code> that groups by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">generation</span></span></code> and shows <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code>, sorted by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code> descending. Save the file. Then, in your notebook, re-run the import and run <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">by_generation</span></span></code>. You've just changed a definition once and used it everywhere."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 5.3: Read the raw file.</strong> Open <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">0</span><span style=\"color: #000000\">5_files_and_notebooks.</span><span style=\"color: #001080\">malloynb</span></span></code> with a plain text editor (in VS Code, right-click the file → <strong>Open With… → Text Editor</strong>). Find the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">&gt;&gt;&gt;</span><span style=\"color: #001080\">malloy</span></span></code> lines. How many Malloy cells does this chapter have?"
      }
    ],
    "path": "/textbook/05_files_and_notebooks.malloynb"
  },
  {
    "titles": [
      "Chapter 6: The Malloy Explorer"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You've been writing Malloy by hand. The <strong>Malloy Explorer</strong> lets you build the same queries by <strong>pointing and clicking</strong> on a source's dimensions, measures, and views. Then it shows you the Malloy code it wrote. This is a great way to:"
      },
      {
        "type": "p",
        "text": "get answers fast before you're fluent in the syntax"
      },
      {
        "type": "p",
        "text": "discover what fields a model offers"
      },
      {
        "type": "p",
        "text": "<strong>learn the language</strong> by reading the code the Explorer generates"
      },
      {
        "type": "p",
        "text": "In this chapter you'll open the Explorer on the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> source, build a few queries, and then read (and run) the Malloy behind them."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/user_guides/publishing/explorer\">Explorer: visual query builder</a>"
      }
    ],
    "path": "/textbook/06_explorer.malloynb"
  },
  {
    "titles": [
      "Chapter 6: The Malloy Explorer",
      "Opening the Explorer"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "In VS Code, open <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> from the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">textbook</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">notebooks</span></span></code> folder."
      },
      {
        "type": "p",
        "text": "Above the line <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> ...</span></span></code> you'll see small links. Click <strong>Explore</strong>."
      },
      {
        "type": "p",
        "text": "You can also open the Command Palette (<code>Cmd+Shift+P</code> / <code>Ctrl+Shift+P</code>), type <strong>Malloy: Explore</strong>, and pick a source."
      }
    ],
    "path": "/textbook/06_explorer.malloynb"
  },
  {
    "titles": [
      "Chapter 6: The Malloy Explorer",
      "A tour of the screen"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The Explorer has three panels:"
      },
      {
        "type": "p",
        "text": "<strong>Query panel</strong> (middle): the query you're building, shown as labeled sections (Group By, Aggregate, Filter, Order By, Limit)."
      },
      {
        "type": "p",
        "text": "<strong>Results panel</strong> (right): the result, drawn as a table or chart, with tabs that show the generated <strong>Malloy</strong> and <strong>SQL</strong>."
      },
      {
        "type": "p",
        "text": "<strong>Source panel</strong> (left): every dimension, measure, and view in the source. For <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> you'll see <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">gender</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">year_born</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">decade</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">generation</span></span></code> ... under <em>Dimensions</em>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_count</span></span></code> ... under <em>Measures</em>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_name</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_state</span></span></code> ... under <em>Views</em>."
      },
      {
        "type": "p",
        "text": "💡 <strong>Descriptions show up here.</strong> Hover over a field in the source panel. Text written with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">#&quot;</span></span></code> above a field in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> (for example <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">#&quot; The decade a baby was born in</span></span></code>) appears as its description. This is one reason to document your model. See <a href=\"14_model_review\">Chapter 14</a>."
      }
    ],
    "path": "/textbook/06_explorer.malloynb"
  },
  {
    "titles": [
      "Chapter 6: The Malloy Explorer",
      "Exercise 1: births by state"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Let's build our first query without typing any code."
      },
      {
        "type": "p",
        "text": "Click <strong>Run</strong>."
      },
      {
        "type": "p",
        "text": "In the source panel, hover over the dimension <strong>state</strong> and click <strong>Add as group by</strong>."
      },
      {
        "type": "p",
        "text": "Hover over the measure <strong>total_births</strong> and click <strong>Add as aggregate</strong>."
      },
      {
        "type": "p",
        "text": "Now click the <strong>Malloy</strong> tab in the results panel. You'll see something like this:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "That's exactly the kind of query you wrote in Chapter 1! The Explorer is not a separate tool with its own rules. It's a friendly way to <em>write Malloy</em>."
      }
    ],
    "path": "/textbook/06_explorer.malloynb"
  },
  {
    "titles": [
      "Chapter 6: The Malloy Explorer",
      "Exercise 2: add a filter and a chart"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Open the chart-type menu at the top of the query panel and choose <strong>Bar Chart</strong>."
      },
      {
        "type": "p",
        "text": "Use the <strong>+</strong> menu in the query panel to add a <strong>Limit</strong> of 10."
      },
      {
        "type": "p",
        "text": "Hover over <strong>gender</strong>, click <strong>Add as filter</strong>, and pick <code>F</code>."
      },
      {
        "type": "p",
        "text": "Hover over <strong>year_born</strong> and click <strong>Add as filter</strong>. Choose <em>equal to</em> and type <code>2000</code>."
      },
      {
        "type": "p",
        "text": "The Malloy tab now shows the filters, the limit, and a render tag from <a href=\"04_render_tags\">Chapter 4</a>. (The Explorer may write filters a little differently, for example as the <a href=\"08_filtering\">filter expressions</a> you'll learn in Chapter 8, but the meaning is the same.)"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2000</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/06_explorer.malloynb"
  },
  {
    "titles": [
      "Chapter 6: The Malloy Explorer",
      "Exercise 3: a nested query"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The Explorer can build nests, too."
      },
      {
        "type": "p",
        "text": "Run it."
      },
      {
        "type": "p",
        "text": "Start a new query: group by <strong>decade</strong>, aggregate <strong>total_births</strong>."
      },
      {
        "type": "p",
        "text": "In the source panel, hover over the view <strong>by_name</strong> and choose <strong>Add as new nested query</strong>."
      },
      {
        "type": "p",
        "text": "The Malloy tab shows a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">:</span></span></code>, just like <a href=\"03_views_and_nesting\">Chapter 3</a>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">by_name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/06_explorer.malloynb"
  },
  {
    "titles": [
      "Chapter 6: The Malloy Explorer",
      "From the Explorer to your notebook"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "When you're happy with a query in the Explorer:"
      },
      {
        "type": "p",
        "text": "In your notebook, add a new Malloy cell and paste it in."
      },
      {
        "type": "p",
        "text": "Run the cell, and keep editing by hand if you like."
      },
      {
        "type": "p",
        "text": "Make sure the notebook has an <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span></code> cell above it."
      },
      {
        "type": "p",
        "text": "Click the <strong>Malloy</strong> tab in the results panel and copy the code."
      },
      {
        "type": "p",
        "text": "This back-and-forth is a great way to learn. Build something by clicking, read the code, then change the code by hand and see what happens."
      },
      {
        "type": "p",
        "text": "Also check out the <strong>SQL</strong> tab. It shows the SQL that Malloy generated, which is often much longer than the Malloy that produced it."
      }
    ],
    "path": "/textbook/06_explorer.malloynb"
  },
  {
    "titles": [
      "Chapter 6: The Malloy Explorer",
      "Explorer vs. writing code"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The Explorer only shows what's in the <strong>model</strong>. If a question needs a new measure, you add it to the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> file, and then the Explorer can use it. Good models make the Explorer powerful."
      }
    ],
    "path": "/textbook/06_explorer.malloynb"
  },
  {
    "titles": [
      "Chapter 6: The Malloy Explorer",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The Explorer can only use the dimensions, measures, and views in the model. Better models make better Explorer sessions."
      },
      {
        "type": "p",
        "text": "The Explorer writes ordinary Malloy. Read the <strong>Malloy</strong> tab to learn the syntax, and copy it into notebooks."
      },
      {
        "type": "p",
        "text": "Click <strong>Explore</strong> above any <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">:</span></span></code> to build queries by pointing and clicking."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 6.1: Click, then type.</strong> Use the Explorer on <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> to build this query: <em>the 10 most popular boys' names in Texas in the 1990s.</em> Copy the generated Malloy into a new cell in this notebook and run it. Then, <strong>by hand</strong>, change it to show girls' names instead."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 6.2: Explore the e-commerce model.</strong> Open <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">ecommerce</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> and click <strong>Explore</strong> above <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span></span></code>. Find the fields that come from the joined <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span></span></code> sources. Build a query that shows <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span></span></code> by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">traffic_source</span></span></code>, and nest <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_category</span></span></code> inside it. Paste the Malloy into this notebook (don't forget <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;ecommerce.malloy&quot;</span></span></code>)."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 6.3: Spot the difference.</strong> Build any query in the Explorer, then compare the <strong>Malloy</strong> tab and the <strong>SQL</strong> tab. In a Markdown cell, write two or three sentences about which one is easier to read, and why."
      }
    ],
    "path": "/textbook/06_explorer.malloynb"
  },
  {
    "titles": [
      "Chapter 7: CSV and Parquet"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Data has to live in <em>some</em> file format. The two you'll meet most often are <strong>CSV</strong> and <strong>Parquet</strong>. In this chapter you'll learn:"
      },
      {
        "type": "p",
        "text": "how CSV and Parquet differ, and when to use each"
      },
      {
        "type": "p",
        "text": "what \"Parquet 2.0\" means (it's confusing!) and how Parquet compares to other formats"
      },
      {
        "type": "p",
        "text": "what Parquet <strong>compression codecs</strong> (Snappy, Gzip, Zstd, ...) do, and how to choose one"
      },
      {
        "type": "p",
        "text": "how DuckDB reads Parquet <strong>over the network</strong>, from web servers, Amazon S3, and Hugging Face, without downloading whole files"
      },
      {
        "type": "p",
        "text": "a short <strong>Python + DuckDB</strong> script that converts CSV files to Parquet"
      }
    ],
    "path": "/textbook/07_csv_and_parquet.malloynb"
  },
  {
    "titles": [
      "Chapter 7: CSV and Parquet",
      "Two ways to store the same table"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<strong>CSV</strong> (comma-separated values) is plain text. Each line is a row, and commas separate the columns:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-txt\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">state,gender,year,name,number</span></span>\n<span class=\"line\"><span style=\"color: #000000\">UT,F,1910,Mary,65</span></span>\n<span class=\"line\"><span style=\"color: #000000\">UT,F,1910,Helen,40</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<strong>Parquet</strong> is a binary, <strong>columnar</strong> format. Instead of storing row after row, it stores all the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state</span></span></code> values together, then all the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">gender</span></span></code> values, and so on. It also records each column's <strong>type</strong> (string, integer, date, ...), compresses each column, and keeps summary statistics, such as the min and max of each chunk."
      },
      {
        "type": "p",
        "text": "The short version: <strong>CSV is for exchanging small data with humans and old tools. Parquet is for analysis.</strong>"
      }
    ],
    "path": "/textbook/07_csv_and_parquet.malloynb"
  },
  {
    "titles": [
      "Chapter 7: CSV and Parquet",
      "How big is the difference?"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "We converted the full baby names table (6.3 million rows) to several formats and measured each file:"
      },
      {
        "type": "p",
        "text": "Even <em>uncompressed</em> Parquet is much smaller than CSV, because a columnar format can store repeated values (like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">UT</span></span></code> six million times) very efficiently with <strong>dictionary encoding</strong>. Sorting the data first puts similar values next to each other, so it compresses even better."
      },
      {
        "type": "p",
        "text": "Speed differs just as much. On a laptop, \"total births by state\" took <strong>0.23 seconds</strong> from the CSV and <strong>0.03 seconds</strong> from Parquet. That's 7× faster, and the gap grows with the size of the data."
      }
    ],
    "path": "/textbook/07_csv_and_parquet.malloynb"
  },
  {
    "titles": [
      "Chapter 7: CSV and Parquet",
      "Querying a CSV in Malloy"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Malloy (through DuckDB) can query a CSV directly. DuckDB samples the file and <em>guesses</em> each column's type. Here's a 94,000-row CSV of just the Utah names:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">utah_csv</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/names_utah.csv&#39;</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`number`</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">utah_csv</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">`year`</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "That works fine for a small file. For a big file, or one you'll query over and over, convert it to Parquet first."
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Type guessing can go wrong.</strong> If a CSV column holds zip codes like <code>02134</code>, DuckDB may guess \"integer\" and drop the leading zero. If one row in a million has <code>N/A</code> in a numeric column, the whole column may become text. Parquet stores the types, so this problem goes away. <a href=\"09_data_cleaning\">Chapter 9</a> shows how to handle messy CSVs."
      }
    ],
    "path": "/textbook/07_csv_and_parquet.malloynb"
  },
  {
    "titles": [
      "Chapter 7: CSV and Parquet",
      "Looking inside a Parquet file"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "DuckDB has functions that read a Parquet file's <strong>metadata</strong> without reading the data. Malloy can query any SQL with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;</span><span style=\"color: #000000FF\">...</span><span style=\"color: #000000FF\">&quot;</span><span style=\"color: #000000FF\">)</span></span></code>, so we can look inside our names file:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;&quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">SELECT</span><span style=\"color: #000000FF\"> </span><span style=\"color: #000000\">*</span><span style=\"color: #000000FF\"> </span><span style=\"color: #0000FF\">FROM</span><span style=\"color: #000000FF\"> parquet_metadata(</span><span style=\"color: #A31515\">&#39;data/usa_names.parquet&#39;</span><span style=\"color: #000000FF\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">&quot;&quot;&quot;</span><span style=\"color: #000000FF\">)</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">column_name</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">path_in_schema</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">compression</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">row_groups</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;#,##0&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">compressed_bytes</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_compressed_size</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;#,##0&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">uncompressed_bytes</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_uncompressed_size</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Look at the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state</span></span></code> column: 6.3 million values take up about <strong>1 KB</strong>! Because all the rows for each state are stored together, each state code appears in long runs, and Parquet stores a run as \"UT, repeated 93,764 times.\" The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name</span></span></code> column, by contrast, holds tens of thousands of different values, so it takes most of the space."
      },
      {
        "type": "p",
        "text": "This file was written with <strong>Gzip</strong> compression. It's split into <strong>row groups</strong>: chunks of rows that are stored (and can be skipped) together. Each row group stores the min and max value of each column. So if you ask for <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">year</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span></code>, DuckDB can skip every row group whose <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">year</span></span></code> range doesn't include 2021, without decompressing it."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">parquet_schema</span><span style=\"color: #000000\">()</span></span></code> shows the column types stored in the file:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;&quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">SELECT</span><span style=\"color: #000000FF\"> </span><span style=\"color: #0000FF\">name</span><span style=\"color: #000000FF\">, </span><span style=\"color: #0000FF\">type</span><span style=\"color: #000000FF\">, converted_type</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">FROM</span><span style=\"color: #000000FF\"> parquet_schema(</span><span style=\"color: #A31515\">&#39;data/usa_names.parquet&#39;</span><span style=\"color: #000000FF\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">&quot;&quot;&quot;</span><span style=\"color: #000000FF\">)</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">: *</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/07_csv_and_parquet.malloynb"
  },
  {
    "titles": [
      "Chapter 7: CSV and Parquet",
      "Compression codecs"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Parquet compresses each column chunk with a <strong>codec</strong>. The common ones:"
      },
      {
        "type": "p",
        "text": "<strong>Rule of thumb: use Zstd.</strong> It compresses about as well as Gzip and decompresses much faster. Choose Snappy if an older tool that reads the file doesn't support Zstd."
      },
      {
        "type": "p",
        "text": "💡 <strong>Compression is per column, and encoding comes first.</strong> Before a codec runs, Parquet <em>encodes</em> each column, using a dictionary, run-length, or delta encoding. The encoding often matters more than the codec. That's why uncompressed Parquet was already 85% smaller than CSV in our test."
      }
    ],
    "path": "/textbook/07_csv_and_parquet.malloynb"
  },
  {
    "titles": [
      "Chapter 7: CSV and Parquet",
      "\"Parquet 2.0\" and other formats"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You'll see \"Parquet v1\" and \"Parquet v2\" (or \"2.0\") in tool options, and the name is confusing. There are really three different things:"
      },
      {
        "type": "p",
        "text": "<strong>Data page V2.</strong> A newer layout for the data inside each page, where the headers store levels separately so readers can skip work."
      },
      {
        "type": "p",
        "text": "<strong>The format spec version.</strong> Modern Parquet files all follow the 2.x <em>specification</em>, which defines things like logical types for dates, decimals, and timestamps."
      },
      {
        "type": "p",
        "text": "<strong>Newer encodings</strong> such as <code>DELTA_BINARY_PACKED</code> (great for sorted integers and timestamps), <code>DELTA_LENGTH_BYTE_ARRAY</code>, and <code>BYTE_STREAM_SPLIT</code> (good for floating-point numbers)."
      },
      {
        "type": "p",
        "text": "When a writer offers \"version 2\" (for example DuckDB's <code>PARQUET_VERSION V2</code> or pyarrow's <code>data_page_version='2.0'</code>), it turns on items 2 and 3. Files <em>can</em> get smaller and faster, but <strong>some older readers can't open them</strong>. That's why most tools still write v1 pages by default. On our names table, v2 changed the column encodings but the file size was nearly identical. The benefit depends on your data. Columns of sorted numbers and timestamps gain the most."
      },
      {
        "type": "p",
        "text": "<strong>Other formats you'll hear about:</strong>"
      }
    ],
    "path": "/textbook/07_csv_and_parquet.malloynb"
  },
  {
    "titles": [
      "Chapter 7: CSV and Parquet",
      "Reading Parquet over the network"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "DuckDB can read files straight from a URL. Because Parquet is columnar and has row-group statistics, DuckDB uses <strong>HTTP range requests</strong> to download <em>only the parts it needs</em>. A query that touches 1 column of a 127 MB file might download only a few megabytes."
      },
      {
        "type": "p",
        "text": "These examples aren't run on this website (the site is built offline), but you can paste any of them into a notebook cell."
      },
      {
        "type": "p",
        "text": "<strong>A plain web URL (HTTPS):</strong>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">taxi</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;https://blobs.duckdb.org/data/taxi_2019_04.parquet&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">taxi</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">passenger_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">trips</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "That file is 127 MB and has 7.4 million taxi trips, but the query only needs one column. On a home internet connection it finishes in a few seconds."
      },
      {
        "type": "p",
        "text": "<strong>This textbook's own data, straight from GitHub:</strong>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_remote</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #A31515\">&#39;https://raw.githubusercontent.com/malloydata/malloy-samples/main/names/usa_names.parquet&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">)</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<strong>Hugging Face datasets</strong> use the <code>hf://</code> prefix:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">imdb_reviews</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #A31515\">&#39;hf://datasets/stanfordnlp/imdb/plain_text/train-00000-of-00001.parquet&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">imdb_reviews</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">label</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">reviews</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<strong>Amazon S3</strong> (and Google Cloud Storage with <code>gs://</code>, Azure with <code>az://</code>) use the <code>s3://</code> prefix. Public buckets work as-is. Private buckets need credentials, which DuckDB gets from a \"secret.\" With the DuckDB CLI or Python you would run something like:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-sql\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">CREATE</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">SECRET</span><span style=\"color: #000000\"> (</span><span style=\"color: #0000FF\">TYPE</span><span style=\"color: #000000\"> s3, </span><span style=\"color: #0000FF\">PROVIDER</span><span style=\"color: #000000\"> credential_chain);</span></span>\n<span class=\"line\"><span style=\"color: #0000FF\">SELECT</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">(*) </span><span style=\"color: #0000FF\">FROM</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;s3://my-bucket/sales/*.parquet&#39;</span><span style=\"color: #000000\">;</span></span></pre>"
      },
      {
        "type": "p",
        "text": "The <code><em></code> is a <strong>glob</strong>: DuckDB reads every matching file as one table. Globs work with local files too, for example <code>duckdb.table('data/sales_</em>.parquet')</code>."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/dialect/duckdb\">DuckDB in Malloy</a> · <a href=\"https://docs.malloydata.dev/documentation/setup/config\">Configuring DuckDB connections</a>. See also the DuckDB guides on <a href=\"https://duckdb.org/docs/stable/data/parquet/overview\">Parquet</a>, <a href=\"https://duckdb.org/docs/stable/core_extensions/httpfs/overview\">HTTP(S) and S3</a>, and <a href=\"https://duckdb.org/docs/stable/core_extensions/httpfs/hugging_face\">Hugging Face</a>."
      }
    ],
    "path": "/textbook/07_csv_and_parquet.malloynb"
  },
  {
    "titles": [
      "Chapter 7: CSV and Parquet",
      "Converting CSV to Parquet with Python and DuckDB"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "DuckDB has a Python package (<code>pip install duckdb</code>). One SQL statement, <code>COPY ... TO ...</code>, converts a file. Here's a reusable script. It's saved as <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">csv_to_parquet</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">py</span></span></code> in the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">textbook</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">notebooks</span></span></code> folder:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-txt\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">&quot;&quot;&quot;csv_to_parquet.py: convert CSV files to Parquet with DuckDB.</span></span>\n<span class=\"line\"><span style=\"color: #000000\"></span></span>\n<span class=\"line\"><span style=\"color: #000000\">Usage:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    pip install duckdb</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    python csv_to_parquet.py data/names_utah.csv</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    python csv_to_parquet.py &quot;data/*.csv&quot; --codec snappy</span></span>\n<span class=\"line\"><span style=\"color: #000000\">&quot;&quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">import argparse</span></span>\n<span class=\"line\"><span style=\"color: #000000\">import glob</span></span>\n<span class=\"line\"><span style=\"color: #000000\">import os</span></span>\n<span class=\"line\"><span style=\"color: #000000\"></span></span>\n<span class=\"line\"><span style=\"color: #000000\">import duckdb</span></span>\n<span class=\"line\"><span style=\"color: #000000\"></span></span>\n<span class=\"line\"><span style=\"color: #000000\"></span></span>\n<span class=\"line\"><span style=\"color: #000000\">def csv_to_parquet(csv_path: str, codec: str = &quot;zstd&quot;, sort_by: str | None = None) -&gt; str:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    parquet_path = os.path.splitext(csv_path)[0] + &quot;.parquet&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    order = f&quot;ORDER BY {sort_by}&quot; if sort_by else &quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    duckdb.sql(f&quot;&quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">        COPY (</span></span>\n<span class=\"line\"><span style=\"color: #000000\">            SELECT * FROM read_csv(&#39;{csv_path}&#39;, header = true)  -- DuckDB infers types</span></span>\n<span class=\"line\"><span style=\"color: #000000\">            {order}</span></span>\n<span class=\"line\"><span style=\"color: #000000\">        )</span></span>\n<span class=\"line\"><span style=\"color: #000000\">        TO &#39;{parquet_path}&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">        (FORMAT parquet, COMPRESSION {codec}, ROW_GROUP_SIZE 122880)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    &quot;&quot;&quot;)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    before = os.path.getsize(csv_path)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    after = os.path.getsize(parquet_path)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    print(f&quot;{csv_path} ({before:,} bytes) -&gt; {parquet_path} ({after:,} bytes), &quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">          f&quot;{after / before:.0%} of original&quot;)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    return parquet_path</span></span>\n<span class=\"line\"><span style=\"color: #000000\"></span></span>\n<span class=\"line\"><span style=\"color: #000000\"></span></span>\n<span class=\"line\"><span style=\"color: #000000\">if __name__ == &quot;__main__&quot;:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    parser = argparse.ArgumentParser(description=__doc__,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                                     formatter_class=argparse.RawDescriptionHelpFormatter)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    parser.add_argument(&quot;pattern&quot;, help=&quot;a CSV file or a glob like &#39;data/*.csv&#39;&quot;)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    parser.add_argument(&quot;--codec&quot;, default=&quot;zstd&quot;,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                        choices=[&quot;zstd&quot;, &quot;snappy&quot;, &quot;gzip&quot;, &quot;lz4&quot;, &quot;brotli&quot;, &quot;uncompressed&quot;])</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    parser.add_argument(&quot;--sort-by&quot;, default=None,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                        help=&quot;optional ORDER BY columns, e.g. &#39;state, year&#39;&quot;)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    args = parser.parse_args()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    for path in sorted(glob.glob(args.pattern)):</span></span>\n<span class=\"line\"><span style=\"color: #000000\">        csv_to_parquet(path, args.codec, args.sort_by)</span></span></pre>"
      },
      {
        "type": "p",
        "text": "The important line is the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">COPY</span></span></code> statement. Everything else is convenience. A few options are worth knowing:"
      },
      {
        "type": "p",
        "text": "<code>read_csv(..., types = {'zip': 'VARCHAR'})</code> forces the type of a single column."
      },
      {
        "type": "p",
        "text": "<code>COMPRESSION zstd, COMPRESSION_LEVEL 9</code> trades slower writing for a smaller file."
      },
      {
        "type": "p",
        "text": "<code>PARQUET_VERSION V2</code> turns on the newer encodings (check that your other tools can read them!)."
      },
      {
        "type": "p",
        "text": "<code>read_csv(..., all_varchar = true)</code> reads every column as text. Use it when type guessing goes wrong, then clean the data up (see <a href=\"09_data_cleaning\">Chapter 9</a>)."
      },
      {
        "type": "p",
        "text": "<code>PARTITION_BY (state)</code> writes one folder per state (<code>state=CA/...</code>), which tools can skip entirely when you filter on state."
      },
      {
        "type": "p",
        "text": "If you already use <strong>pandas</strong>, the equivalent is <code>pd.read_csv(\"x.csv\").to_parquet(\"x.parquet\", compression=\"zstd\")</code>. DuckDB is usually much faster and uses far less memory on big files, because it never loads the whole table into memory."
      }
    ],
    "path": "/textbook/07_csv_and_parquet.malloynb"
  },
  {
    "titles": [
      "Chapter 7: CSV and Parquet",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Parquet reads only the columns you need and skips row groups using min/max statistics."
      },
      {
        "type": "p",
        "text": "\"Parquet v2\" turns on newer page layouts and encodings. It can help, but older readers may not support it."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">COPY</span><span style=\"color: #000000\"> (</span><span style=\"color: #001080\">SELECT</span><span style=\"color: #000000\"> * </span><span style=\"color: #AF00DB\">FROM</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">read_csv</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;in.csv&#39;</span><span style=\"color: #000000\">)) TO </span><span style=\"color: #A31515\">&#39;out.parquet&#39;</span><span style=\"color: #000000\"> (</span><span style=\"color: #001080\">FORMAT</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">parquet</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">COMPRESSION</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">zstd</span><span style=\"color: #000000\">)</span></span></code> converts a file."
      },
      {
        "type": "p",
        "text": "Use <strong>Zstd</strong> compression unless an older tool needs Snappy. Sorting data before writing makes files smaller."
      },
      {
        "type": "p",
        "text": "<strong>CSV</strong> is plain text, has no types, is big, and is slow to query. It's good for sharing. <strong>Parquet</strong> is columnar, typed, compressed, and fast. It's good for analysis."
      },
      {
        "type": "p",
        "text": "DuckDB (and therefore Malloy) reads Parquet straight from <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">https</span><span style=\"color: #000000\">:</span><span style=\"color: #008000\">//</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">s3</span><span style=\"color: #000000\">:</span><span style=\"color: #008000\">//</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">hf</span><span style=\"color: #000000\">:</span><span style=\"color: #008000\">//</span></span></code> URLs, downloading only what each query needs."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 7.1: Convert and compare.</strong> Run <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">python</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">csv_to_parquet</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">py</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">data</span><span style=\"color: #000000\">/</span><span style=\"color: #001080\">names_utah</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">csv</span></span></code> in a terminal from the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">textbook</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">notebooks</span></span></code> folder. How much smaller is the Parquet file? Then add a notebook cell that defines <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">utah_parquet</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/names_utah.parquet&#39;</span><span style=\"color: #000000\">)</span></span></code> and re-run the \"top names in 2021\" query against it."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 7.2: Inspect your file.</strong> Using <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;</span><span style=\"color: #0000FF\">SELECT</span><span style=\"color: #000000FF\"> </span><span style=\"color: #000000\">*</span><span style=\"color: #000000FF\"> </span><span style=\"color: #0000FF\">FROM</span><span style=\"color: #000000FF\"> parquet_metadata(</span><span style=\"color: #A31515\">&#39;data/names_utah.parquet&#39;</span><span style=\"color: #000000FF\">)</span><span style=\"color: #000000FF\">&quot;</span><span style=\"color: #000000FF\">)</span></span></code> like the example above, find out which compression codec your new file uses and how many row groups it has. Run the script again with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">--codec snappy</span></span></code> and compare."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 7.3: Query the internet.</strong> In a new cell, define a source on the remote taxi file (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">https</span><span style=\"color: #000000\">:</span><span style=\"color: #008000\">//blobs.duckdb.org/data/taxi_2019_04.parquet</span></span></code>). Find the <strong>average <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">fare_amount</span></span></code> by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">passenger_count</span></span></code></strong>. Then use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">: *</span></span></code> with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span></code> to see what other columns are available."
      }
    ],
    "path": "/textbook/07_csv_and_parquet.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Filtering decides <em>which data</em> answers your question, so it matters as much as the question itself. This chapter covers:"
      },
      {
        "type": "p",
        "text": "every place a filter can go: on a source, on a query, on a nest, on a single measure, and after aggregation"
      },
      {
        "type": "p",
        "text": "<strong>filter expressions</strong>: Malloy's compact mini-languages for filtering strings, numbers, dates, and booleans (the biggest section)"
      },
      {
        "type": "p",
        "text": "<strong>time comparisons</strong>: this year vs. last year, quarter over quarter, and how to handle partial periods"
      },
      {
        "type": "p",
        "text": "ordinary boolean filters: comparisons, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">and</span></span></code>/<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">or</span></span></code>, alternation with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">|</span></span></code>, the apply operator <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">?</span></span></code>, and pattern matching"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;ecommerce.malloy&quot;</span></span></pre>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 1: Where filters go"
    ],
    "paragraphs": [],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 1: Where filters go",
      "Filtering a query"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You know this one already. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> in a query keeps only matching rows <em>before</em> grouping:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;WA&#39;</span><span style=\"color: #000000\"> and </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "A comma between conditions means <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">and</span></span></code>. These two lines mean the same thing:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;WA&#39;</span><span style=\"color: #000000\"> and </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;WA&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span></pre>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 1: Where filters go",
      "Filtering a source"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> inside <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> { }</span></span></code> builds the filter into the source itself, so <strong>every</strong> query against it is filtered. This is great for creating focused subsets:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">modern_names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> &gt;= </span><span style=\"color: #098658\">2000</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">modern_names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 1: Where filters go",
      "Filtering a single measure"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You can attach a filter to <strong>one measure</strong> with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">{ </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: ... }</span></span></code>. The rest of the query isn't affected. This is called a <strong>filtered aggregate</strong>, and it's the key to comparisons:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">girls</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">boys</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;M&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "One query, three different filters, three columns. In SQL you'd write <code>SUM(CASE WHEN gender = 'F' THEN number END)</code>."
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 1: Where filters go",
      "Filtering after aggregation: having"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> filters <strong>rows before grouping</strong>. To filter <strong>groups after aggregating</strong> (\"only show names with more than 1 million births\"), use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> &gt; </span><span style=\"color: #098658\">1000000</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "⚠️ <strong><code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> vs. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code>.</strong> Using a measure in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> is an error, because measures don't exist until after grouping. If your filter mentions an aggregate, it belongs in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code>."
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 1: Where filters go",
      "Filtering a nest"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "As you saw in <a href=\"03_views_and_nesting\">Chapter 3</a>, each <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">:</span></span></code> can have its own <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>, which only affects that nest."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/filters#filter-placement\">Filters: filter placement</a>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 2: Boolean filters"
    ],
    "paragraphs": [],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 2: Boolean filters",
      "Comparison and logic"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The usual operators work: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">=</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">!=</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">&lt;</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">&lt;=</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">&gt;</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">&gt;=</span></span></code>, plus <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">and</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">or</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">not</span></span></code>. Use parentheses to group:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: (</span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;AK&#39;</span><span style=\"color: #000000\"> or </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;HI&#39;</span><span style=\"color: #000000\">) and not (</span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;M&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 2: Boolean filters",
      "Alternation with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">|</span></span></code>"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Writing <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;AK&#39;</span><span style=\"color: #000000\"> or </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;HI&#39;</span><span style=\"color: #000000\"> or </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;PR&#39;</span></span></code> is tedious. Malloy lets you write <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;AK&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;HI&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;PR&#39;</span></span></code>. Use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">!=</span></span></code> to exclude a list:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> != </span><span style=\"color: #A31515\">&#39;CA&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;TX&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;NY&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 2: Boolean filters",
      "The apply operator <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">?</span></span></code>"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">?</span></span></code> <em>applies</em> a partial comparison to a value. It reads nicely for ranges and sets of conditions:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> ? </span><span style=\"color: #098658\">1946</span><span style=\"color: #000000\"> to </span><span style=\"color: #098658\">1965</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> ? </span><span style=\"color: #A31515\">&#39;Linda&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;Mary&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;Patricia&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/apply\">Apply operator</a> · <a href=\"https://docs.malloydata.dev/documentation/language/expressions\">Expressions</a>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 2: Boolean filters",
      "Pattern matching with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">~</span></span></code>"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">~</span></span></code> matches a string against a <strong>pattern</strong>. With a normal string, it works like SQL <code>LIKE</code>: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">%</span></span></code> matches any run of characters and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">_</span></span></code> matches exactly one. With an <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #811F3F\">r&#39;...&#39;</span></span></code> string, it's a <strong>regular expression</strong>. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">!~</span></span></code> means \"does not match.\""
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #811F3F\">r&#39;^(Ja|Jo)[a-z]*n$&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">8</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "That regular expression means \"starts with <em>Ja</em> or <em>Jo</em>, then any lowercase letters, then ends with <em>n</em>.\""
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 2: Boolean filters",
      "Nulls"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">null</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> not </span><span style=\"color: #0000FF\">null</span></span></code>. (A plain <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">= </span><span style=\"color: #0000FF\">null</span></span></code> never matches anything, just like in SQL.)"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">items</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">returned</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">returned_at</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> not </span><span style=\"color: #0000FF\">null</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">never_shipped</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">shipped_at</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">null</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 3: Filter expressions"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Here is the most powerful filtering tool in Malloy. A <strong>filter expression</strong> is a small string written in a special mini-language, then applied with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">~</span></span></code>. It starts with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">f</span></span></code> and is wrapped in quotes: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #A31515\">f&#39;...&#39;</span></span></code>."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;Ja%, -Jason&#39;</span><span style=\"color: #000000\">        </span><span style=\"color: #008000\">// starts with &quot;Ja&quot;, but isn&#39;t &quot;Jason&quot;</span></span>\n<span class=\"line\"><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;[1990 to 2000)&#39;</span><span style=\"color: #000000\">  </span><span style=\"color: #008000\">// 1990 through 1999</span></span>\n<span class=\"line\"><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021-Q4&#39;</span><span style=\"color: #000000\">      </span><span style=\"color: #008000\">// any time in the 4th quarter of 2021</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Why have a separate language? Because filters are <strong>data</strong>. A dashboard's filter box, a URL parameter, a <a href=\"13_givens\">given</a>, or an LLM can produce a short string like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">CA</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">NY</span><span style=\"color: #000000\">, -</span><span style=\"color: #001080\">TX</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">last</span><span style=\"color: #000000\"> </span><span style=\"color: #098658\">3</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">months</span></span></code>, and Malloy turns it into correct SQL for whatever database you use. There's a mini-language for each type: <strong>strings</strong>, <strong>numbers</strong>, <strong>temporal</strong> (dates and timestamps), and <strong>booleans</strong>."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/filter-expressions\">Filter expressions</a>. Keep this page handy. It has the full grammar."
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 3: Filter expressions",
      "String filter expressions"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Let's try them. Names ending in <em>lyn</em> in 2021:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;%lyn&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "A comma-separated list <strong>ors</strong> together the positive matches and <strong>ands</strong> together the negatives (the ones starting with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-</span></span></code>). So this means <em>\"starts with Mad or starts with Mac, but isn't Madison and doesn't end in y\"</em>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;Mad%, Mac%, -Madison, -%y&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">8</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "You can also be explicit with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">|</span></span></code> for \"or\", <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">;</span></span></code> for \"and\", and parentheses for grouping:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;(A% | E%) ; %a&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "That's <em>\"(starts with A or starts with E) and ends with a\"</em>."
      },
      {
        "type": "p",
        "text": "To exclude several patterns, put a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-</span></span></code> in front of each one. Or wrap the whole match in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">not ( )</span></span></code>. These two filters mean the same thing: <em>\"states that don't start with C, N, or T\"</em>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;-C%, -N%, -T%&#39;</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: not (</span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;C%, N%, T%&#39;</span><span style=\"color: #000000\">)</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;-C%, -N%, -T%&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Avoid <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">!~</span></span></code> with filter expressions.</strong> You might expect <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> !~ </span><span style=\"color: #A31515\">f&#39;C%, N%, T%&#39;</span></span></code> to work too. In the Malloy version used to build this book, it silently ignores the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">!</span></span></code> and returns the <em>matching</em> rows. Always check results when you negate a filter. Use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-</span></span></code> inside the expression or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">not (...)</span></span></code> around it instead."
      },
      {
        "type": "p",
        "text": "💡 <strong>Escaping.</strong> To match a real <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">%</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">_</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">,</span></span></code>, or a leading <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-</span></span></code>, put a backslash before it: <code>f'100%'</code>."
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 3: Filter expressions",
      "Numeric filter expressions"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "This is the same interval notation used in math class: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">[</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">]</span></span></code> mean \"including,\" and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">(</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">)</span></span></code> mean \"not including.\""
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Check the brackets.</strong> At the time of writing, the filter expression page in the Malloy documentation describes <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">( )</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">[ ]</span></span></code> the other way around. The behavior shown here was checked against the SQL that Malloy actually generates (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">[</span><span style=\"color: #098658\">1946</span><span style=\"color: #000000\"> to </span><span style=\"color: #098658\">1964</span><span style=\"color: #000000\">]</span></span></code> becomes <code>year >= 1946 AND year <= 1964</code>). When in doubt, click the <strong>SQL</strong> button and read the <code>WHERE</code> clause."
      },
      {
        "type": "p",
        "text": "Names that were popular, but not <em>too</em> popular, in 2021. Here the filter expression goes in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code>, because <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code> is a measure:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;[2000 to 2100]&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "The Baby Boom, written as a range:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;[1946 to 1964]&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">generation</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Name lengths of 3, 5, or 7 letters, or more than 12:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name_length</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;3, 5, 7 or &gt; 12&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name_length</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name_length</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 3: Filter expressions",
      "Temporal filter expressions"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Temporal (date and timestamp) filter expressions are where this language really shines. They know about calendars. Let's switch to the e-commerce data, which has real timestamps."
      },
      {
        "type": "p",
        "text": "<strong>Literals: a moment that implies a duration</strong>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">all_time</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">in_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">in_2021_q4</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021-Q4&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">in_dec_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021-12&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">on_xmas_eve</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021-12-24&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<strong>Ranges</strong>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">first_third_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021-01 to 2021-05&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">holiday_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021-11 for 2 months&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">pre_2020</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;before 2020&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">h2_2022</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;starting 2022-07&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<strong>Relative times</strong>"
      },
      {
        "type": "p",
        "text": "Filter expressions also understand <em>relative</em> time:"
      },
      {
        "type": "p",
        "text": "These are measured from <strong>right now</strong>, the moment the query runs. Our e-commerce data ends in November 2022, so watch what happens:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">last_30_days</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;last 30 days&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">this_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;this year&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">last_5_years</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;last 5 years&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Zeros are the <em>correct</em> answer for the first two, because there were no orders in the last 30 days! Relative filters are perfect for live production data (\"sales this month\"), and confusing for historical datasets. With historical data, use literal dates."
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Relative filters depend on when you run them.</strong> The numbers in this cell will be different next year. That's good for a live dashboard, but bad for a homework answer you want to reproduce!"
      },
      {
        "type": "p",
        "text": "<strong>Combining</strong> temporal filters uses <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">and</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">or</span></span></code>, and parentheses. Here's \"Q4 of 2020 or Q4 of 2021\":"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2020-Q4 or 2021-Q4&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 3: Filter expressions",
      "Boolean filter expressions"
    ],
    "paragraphs": [
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">: { </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">was_returned</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">returned_at</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> not </span><span style=\"color: #0000FF\">null</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">returned</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">was_returned</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;true&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">kept</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_item_count</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">was_returned</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;false&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "(The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">:</span></span></code> inside a query adds a field just for that query. More on that in <a href=\"12_pipelines_and_windows\">Chapter 12</a>.)"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 3: Filter expressions",
      "Filter expressions vs. ordinary expressions"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Both work, and you can mix them. Here are the same filters written both ways:"
      },
      {
        "type": "p",
        "text": "Use whichever reads more clearly. Filter expressions win when the filter is long, involves calendars, or comes from outside your code (a user, a parameter, or an app)."
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 4: Time comparisons"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Now let's put filtered measures to work on the classic business question: <strong>how are we doing compared to before?</strong>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 4: Time comparisons",
      "Year over year"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Make one filtered measure per period, then compare them:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_category</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">sales_2020</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2020&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">sales_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">growth</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      / </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2020&#39;</span><span style=\"color: #000000\"> } - </span><span style=\"color: #098658\">1</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Writing the filters twice is clumsy. Define the period measures <strong>once</strong> with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">:</span></span></code>, then use them by name:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">: {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">sales_2020</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2020&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">sales_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_category</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">sales_2020</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">sales_2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">change</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">sales_2021</span><span style=\"color: #000000\"> - </span><span style=\"color: #001080\">sales_2020</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">growth</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">sales_2021</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">nullif</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">sales_2020</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">0</span><span style=\"color: #000000\">) - </span><span style=\"color: #098658\">1</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">growth</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">nullif</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">x</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">0</span><span style=\"color: #000000\">)</span></span></code> turns a zero into null, so a category with no 2020 sales shows null instead of a divide-by-zero error."
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 4: Time comparisons",
      "Watch out for partial periods"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "What about 2022 vs. 2021? Our data stops on <strong>November 14, 2022</strong>. Comparing \"all of 2022\" with \"all of 2021\" compares 10½ months with 12 months, which isn't fair. The fix is to compare the <strong>same slice of the calendar</strong>, year-to-date:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">full_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">partial_2022</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2022&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">ytd_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021-01-01 to 2021-11-15&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">ytd_2022</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2022-01-01 to 2022-11-15&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">ytd_growth</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2022-01-01 to 2022-11-15&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      / </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021-01-01 to 2021-11-15&#39;</span><span style=\"color: #000000\"> } - </span><span style=\"color: #098658\">1</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 4: Time comparisons",
      "Quarter over quarter"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The same idea works at any grain. Here are this quarter and last quarter for each traffic source, using the last full quarter in the data (2022 Q3):"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">: {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">q2</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2022-Q2&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">q3</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2022-Q3&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">traffic_source</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">q2</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">q3</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">qoq_growth</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">q3</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">nullif</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">q2</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">0</span><span style=\"color: #000000\">) - </span><span style=\"color: #098658\">1</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 4: Time comparisons",
      "Comparing seasons with a chart"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Another way to compare years is to put the <strong>month of the year</strong> on the x-axis and draw <strong>one line per year</strong>. Extraction (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">month</span><span style=\"color: #000000\">()</span></span></code>) and truncation (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span></span></code>) from <a href=\"02_time_truncation\">Chapter 2</a> work together here:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2020 to 2023&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">month_of_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">month</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">order_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">year</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">month_of_year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Each year's line sits above the previous one, so the business is growing in every month. The 2022 line stops in November."
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Part 4: Time comparisons",
      "Baby names: then vs. now"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Filtered measures make period comparisons easy on the names data, too. Which names grew the most from the 1990s to the 2010s?"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">births_1990s</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">1990</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">births_2010s</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2010</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;0.00&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">growth_factor</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2010</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      / </span><span style=\"color: #795E26\">nullif</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">1990</span><span style=\"color: #000000\"> }, </span><span style=\"color: #098658\">0</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2010</span><span style=\"color: #000000\"> } &gt; </span><span style=\"color: #098658\">50000</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">growth_factor</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/patterns/yoy\">Pattern: comparing timeframes (year over year)</a> · <a href=\"https://docs.malloydata.dev/documentation/language/time-ranges\">Time ranges</a>. In <a href=\"12_pipelines_and_windows\">Chapter 12</a> you'll see a third method, using <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">lag</span><span style=\"color: #000000\">()</span></span></code>."
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 8: Filtering and Time Comparisons",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Period-over-period analysis is a set of <strong>filtered measures</strong> compared side by side. Compare like with like when a period is partial."
      },
      {
        "type": "p",
        "text": "<strong>Filter expressions</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #A31515\">f&#39;...&#39;</span></span></code>) are compact mini-languages for strings, numbers, times, and booleans:"
      },
      {
        "type": "p",
        "text": "Relative time filters (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">last</span><span style=\"color: #000000\"> </span><span style=\"color: #098658\">30</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">days</span></span></code>) depend on <em>when you run the query</em>."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">|</span></span></code> lists alternatives, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">?</span></span></code> applies partial comparisons and ranges, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">~</span></span></code> matches patterns."
      },
      {
        "type": "p",
        "text": "strings: lists, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">%</span></span></code> wildcards, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-</span></span></code> to exclude"
      },
      {
        "type": "p",
        "text": "numbers: comparisons and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">(</span><span style=\"color: #001080\">a</span><span style=\"color: #000000\"> to </span><span style=\"color: #001080\">b</span><span style=\"color: #000000\">)</span></span></code> / <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">[</span><span style=\"color: #001080\">a</span><span style=\"color: #000000\"> to </span><span style=\"color: #001080\">b</span><span style=\"color: #000000\">]</span></span></code> ranges"
      },
      {
        "type": "p",
        "text": "times: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">Q4</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">-</span><span style=\"color: #098658\">0</span><span style=\"color: #000000\">1 to </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">-</span><span style=\"color: #098658\">0</span><span style=\"color: #000000\">4</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">before</span><span style=\"color: #000000\"> </span><span style=\"color: #098658\">2020</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">last</span><span style=\"color: #000000\"> </span><span style=\"color: #098658\">3</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">months</span></span></code>, ..."
      },
      {
        "type": "p",
        "text": "Filters can go on a <strong>source</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: }</span></span></code>), a <strong>query</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>), a <strong>nest</strong>, a single <strong>measure</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">measure</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: }</span></span></code>), or <strong>after aggregation</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code>)."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 8.1: Filter expression practice.</strong> Using a single filter expression for each, write three queries against <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> for the year 2000: (a) names that <strong>contain</strong> <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">bell</span></span></code>; (b) names that start with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">K</span></span></code> <strong>or</strong> <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">C</span></span></code> but <strong>don't</strong> end in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">n</span></span></code>; (c) names with 1,000 to 2,000 births, both ends included. (For (c), think about whether it belongs in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code>.)"
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 8.2: Holiday season.</strong> Compare <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_count</span></span></code> for the <strong>holiday season</strong> (November 15 through December 31) of 2020 and of 2021, as columns side by side. Then add a growth percentage. Format the columns with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">currency</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">percent</span></span></code>."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 8.3: Generation shift.</strong> For <strong>boys'</strong> names, compare births in the 1980s with births in the 2010s, like the last example. Which names had the biggest <strong>decline</strong>? (Hint: sort by the growth factor ascending, and use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code> so you only see names that were common in the 1980s.)"
      }
    ],
    "path": "/textbook/08_filtering.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Real data is messy. Names arrive in random capitalization, states are spelled five different ways, money has dollar signs in it, and dates come in every format people have ever invented. In this chapter you'll clean a deliberately messy file of fake customer records. You'll learn to:"
      },
      {
        "type": "p",
        "text": "<strong>profile</strong> a dataset to find problems"
      },
      {
        "type": "p",
        "text": "find and remove <strong>duplicates</strong>"
      },
      {
        "type": "p",
        "text": "put it all together in a clean, reusable <strong>source</strong>"
      },
      {
        "type": "p",
        "text": "clean <strong>text</strong>: trimming, case, and collapsing spaces"
      },
      {
        "type": "p",
        "text": "<strong>standardize categories</strong> with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">pick</span></span></code>"
      },
      {
        "type": "p",
        "text": "turn text into <strong>numbers</strong> safely with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">:::</span></span></code>"
      },
      {
        "type": "p",
        "text": "parse <strong>dates</strong> in many formats with DuckDB's <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">strptime</span></span></code> family of functions"
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "The messy file"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">data</span><span style=\"color: #000000\">/</span><span style=\"color: #001080\">messy_customers</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">csv</span></span></code> has 126 rows of fake customer data. Here are a few raw rows:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-txt\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">customer_id,full_name,email,phone,state,signup_date,plan,first_purchase</span></span>\n<span class=\"line\"><span style=\"color: #000000\">67,amelia smith,  Amelia.Smith43@example.com ,605-517-6562,ny,2024-01-06,basic,$177</span></span>\n<span class=\"line\"><span style=\"color: #000000\">8,AVA MARTINEZ,  Ava.Martinez94@example.com ,(446) 780-2290, CA,,BASIC,352.10 USD</span></span>\n<span class=\"line\"><span style=\"color: #000000\">59,  Evelyn   Lee ,EVELYN.LEE17@EXAMPLE.COM,(282) 529-3430,CA,&quot;May 05, 2024&quot;,Premium,$286</span></span>\n<span class=\"line\"><span style=\"color: #000000\">2,james lopez,James.Lopez34@example.com,+1 299 567 6635,ca,08-Mar-2024,basic,$306.58</span></span></pre>"
      },
      {
        "type": "p",
        "text": "You can already spot a lot of trouble: inconsistent capitalization, extra spaces, five phone formats, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">ny</span></span></code> vs <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">CA</span></span></code> vs <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">California</span></span></code>, dates in several formats (and sometimes missing), and prices with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">$</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">USD</span></span></code> attached."
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 1: Load everything as text"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "If we let DuckDB guess the column types, it will guess wrong for some columns, or fail on a weird value. When cleaning, a safer start is to read <strong>every column as text</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">all_varchar</span><span style=\"color: #000000\"> = </span><span style=\"color: #0000FF\">true</span></span></code>) and convert columns ourselves. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;</span><span style=\"color: #000000FF\">...</span><span style=\"color: #000000FF\">&quot;</span><span style=\"color: #000000FF\">)</span></span></code> lets us use DuckDB's own <code>read_csv</code> function with any options we like:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;&quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">SELECT</span><span style=\"color: #000000FF\"> </span><span style=\"color: #000000\">*</span><span style=\"color: #000000FF\"> </span><span style=\"color: #0000FF\">FROM</span><span style=\"color: #000000FF\"> read_csv(</span><span style=\"color: #A31515\">&#39;data/messy_customers.csv&#39;</span><span style=\"color: #000000FF\">, all_varchar </span><span style=\"color: #000000\">=</span><span style=\"color: #000000FF\"> true)</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">&quot;&quot;&quot;</span><span style=\"color: #000000FF\">)</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">: *</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">8</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/source#sources-from-sql-queries\">Sources from SQL queries</a> · <a href=\"https://docs.malloydata.dev/documentation/language/dialect/duckdb\">DuckDB dialect notes</a>"
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 2: Profile the data"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Before fixing anything, <strong>measure the mess</strong>. Group by each column you care about and look at what's there. How many ways is \"state\" written?"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">row_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Eight real states, written about thirty different ways. What about <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">plan</span></span></code>?"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">plan</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">row_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "And how complete is each column? Filtered measures from <a href=\"08_filtering\">Chapter 8</a> make a nice one-row <strong>data-quality report</strong>. Here, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span></code> counts rows and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">customer_id</span><span style=\"color: #000000\">)</span></span></code> counts <em>distinct</em> customer IDs:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">transpose</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_rows</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">distinct_customers</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">customer_id</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">missing_signup</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">() { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">null</span><span style=\"color: #000000\"> or </span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">) = </span><span style=\"color: #A31515\">&#39;&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">na_signup</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">() { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;N/A&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">missing_purchase</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">() { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">first_purchase</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">null</span><span style=\"color: #000000\"> or (</span><span style=\"color: #001080\">first_purchase</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;n/a&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;-&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;&#39;</span><span style=\"color: #000000\">) }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "126 rows but only 120 customers: there are <strong>duplicates</strong>. We'll handle those at the end."
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 3: Clean text"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Malloy has the common string functions built in: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">lower</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">upper</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">length</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">concat</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">replace</span><span style=\"color: #000000\">()</span></span></code>, and more. For anything else, you can call <strong>any DuckDB function</strong> by adding <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">!</span></span></code> and the return type after its name: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(...)</span></span></code>."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/functions\">Functions</a> explains the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">function</span><span style=\"color: #000000\">!</span><span style=\"color: #795E26\">type</span><span style=\"color: #000000\">(...)</span></span></code> syntax for database functions that aren't built in. See also DuckDB's <a href=\"https://duckdb.org/docs/stable/sql/functions/text\">text functions</a> and <a href=\"https://duckdb.org/docs/stable/sql/functions/regular_expressions\">regular expressions</a>."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">full_name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">name_trimmed</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">full_name</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">name_one_space</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">full_name</span><span style=\"color: #000000\">), </span><span style=\"color: #811F3F\">r&#39;</span><span style=\"color: #EE0000\">\\s</span><span style=\"color: #811F3F\">+&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39; &#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">name_lower</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">lower</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">full_name</span><span style=\"color: #000000\">), </span><span style=\"color: #811F3F\">r&#39;</span><span style=\"color: #EE0000\">\\s</span><span style=\"color: #811F3F\">+&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39; &#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">email</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">email_clean</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">lower</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">email</span><span style=\"color: #000000\">))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">8</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">text</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">pattern</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">replacement</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">)</span></span></code> replaces <strong>every</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #A31515\">&#39;g&#39;</span></span></code> = global) match of a regular expression. Here <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">\\</span><span style=\"color: #001080\">s</span><span style=\"color: #000000\">+</span></span></code> means \"one or more whitespace characters,\" so runs of spaces become one space."
      },
      {
        "type": "p",
        "text": "<strong>Phone numbers</strong>: strip everything that isn't a digit, drop a leading country code <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">1</span></span></code>, and reformat:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">: {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">digits</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">phone</span><span style=\"color: #000000\">, </span><span style=\"color: #811F3F\">r&#39;[^0-9]&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">ten_digits</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">digits</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">2</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">length</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">digits</span><span style=\"color: #000000\">) = </span><span style=\"color: #098658\">11</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">else</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">digits</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">phone</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">digits</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">ten_digits</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">phone_clean</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">concat</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;(&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">ten_digits</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">1</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">3</span><span style=\"color: #000000\">), </span><span style=\"color: #A31515\">&#39;) &#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">ten_digits</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">4</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">3</span><span style=\"color: #000000\">), </span><span style=\"color: #A31515\">&#39;-&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">ten_digits</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">7</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">4</span><span style=\"color: #000000\">))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">8</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 4: Standardize categories with pick"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">pick</span></span></code> is Malloy's version of SQL <code>CASE</code>. To standardize state names, first make the value uppercase, remove the spaces and periods, and then map each known variant to its 2-letter code:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">: {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state_key</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">upper</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">, </span><span style=\"color: #811F3F\">r&#39;[</span><span style=\"color: #EE0000\">\\s</span><span style=\"color: #811F3F\">.]&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state_clean</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">state_key</span><span style=\"color: #000000\"> ?</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;CA&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;CA&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;CALIF&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;CALIFORNIA&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;TX&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;TX&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;TEXAS&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;NY&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;NY&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;NEWYORK&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;FL&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;FL&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;FLA&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;FLORIDA&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;WA&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;WA&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;WASH&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;WASHINGTON&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;OR&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;OR&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;ORE&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;OREGON&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;UTAH&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;CO&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;CO&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;COLO&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;COLORADO&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">else</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">null</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state_clean</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">row_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_spellings</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Every row now maps to one of eight states, and the nest shows which raw spellings fed into each. <strong>Always check for leftovers.</strong> Ending a pick with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">else</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">null</span></span></code> means any variant you missed shows up as a null group instead of hiding."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">plan</span></span></code> only needs trimming and consistent case:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">plan_clean</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">concat</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">upper</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">plan</span><span style=\"color: #000000\">), </span><span style=\"color: #098658\">1</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">1</span><span style=\"color: #000000\">)), </span><span style=\"color: #795E26\">lower</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">plan</span><span style=\"color: #000000\">), </span><span style=\"color: #098658\">2</span><span style=\"color: #000000\">)))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">row_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 5: Text to numbers, safely"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">first_purchase</span></span></code> has values like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">$</span><span style=\"color: #098658\">177</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">352.10</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">USD</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">$</span><span style=\"color: #098658\">1</span><span style=\"color: #000000\">,</span><span style=\"color: #098658\">234.50</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">n</span><span style=\"color: #000000\">/</span><span style=\"color: #001080\">a</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-</span></span></code>. The plan:"
      },
      {
        "type": "p",
        "text": "Remove every character that isn't a digit or a period."
      },
      {
        "type": "p",
        "text": "Convert the result to a number with a <strong>safe cast</strong>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">:::</span><span style=\"color: #0000FF\">number</span></span></code>."
      },
      {
        "type": "p",
        "text": "A normal cast (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">::</span><span style=\"color: #0000FF\">number</span></span></code>) <strong>fails the whole query</strong> if even one value can't be converted. A safe cast (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">:::</span><span style=\"color: #0000FF\">number</span></span></code>) returns <strong>null</strong> for bad values instead."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">first_purchase</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">stripped</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">first_purchase</span><span style=\"color: #000000\">, </span><span style=\"color: #811F3F\">r&#39;[^0-9.]&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">amount</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">first_purchase</span><span style=\"color: #000000\">, </span><span style=\"color: #811F3F\">r&#39;[^0-9.]&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">):::</span><span style=\"color: #0000FF\">number</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">first_purchase</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">&#39;%USD&#39;</span><span style=\"color: #000000\"> or (</span><span style=\"color: #001080\">first_purchase</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;n/a&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;-&#39;</span><span style=\"color: #000000\">) or </span><span style=\"color: #001080\">first_purchase</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">null</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">352.10</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">USD</span></span></code> became the number 352.1. The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">n</span><span style=\"color: #000000\">/</span><span style=\"color: #001080\">a</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-</span></span></code> values became empty strings, which safely cast to <strong>null</strong>. Blank cells were already null. That's the honest answer: we don't know those amounts."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/expressions#safe-type-cast\">Type casts and safe casts</a> · <a href=\"https://docs.malloydata.dev/documentation/language/expressions#pick-expressions\">Pick expressions</a>"
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 6: Cleaning dates with DuckDB functions"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Dates are the hardest part of data cleaning. Our <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">signup_date</span></span></code> column mixes <strong>five formats</strong>, plus blanks and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">N</span><span style=\"color: #000000\">/</span><span style=\"color: #001080\">A</span></span></code>:"
      },
      {
        "type": "p",
        "text": "DuckDB has excellent functions for this, and Malloy can call all of them:"
      },
      {
        "type": "p",
        "text": "The format codes: <code>%Y</code> 4-digit year, <code>%m</code> month number, <code>%d</code> day, <code>%b</code> short month name (Mar), <code>%B</code> full month name (March), <code>%H:%M:%S</code> time, <code>%A</code> weekday name."
      },
      {
        "type": "p",
        "text": "First, try one format at a time with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">try_strptime</span></span></code>, so you can see which rows each format catches:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">signup_date</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">iso</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%Y-%m-%d&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">us</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%m/%d/%Y&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">dmy</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%d-%b-%Y&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">long_form</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%B %d, %Y&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">compact</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%Y%m%d&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Each row matches exactly one format. Give <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">try_strptime</span></span></code> a <strong>list</strong> of formats, and it tries them in order and keeps the first match. Then cast the timestamp to a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">date</span></span></code>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">signup_date</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">signup</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      [</span><span style=\"color: #A31515\">&#39;%Y-%m-%d&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%m/%d/%Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%d-%b-%Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%B %d, %Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%Y%m%d&#39;</span><span style=\"color: #000000\">]</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    )::</span><span style=\"color: #0000FF\">date</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Now check the result. Every non-blank value should have parsed. The rows where <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">signup</span></span></code> is null should only be the blanks and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">N</span><span style=\"color: #000000\">/</span><span style=\"color: #001080\">A</span></span></code>s:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">: {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">, [</span><span style=\"color: #A31515\">&#39;%Y-%m-%d&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%m/%d/%Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%d-%b-%Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%B %d, %Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%Y%m%d&#39;</span><span style=\"color: #000000\">]</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    )::</span><span style=\"color: #0000FF\">date</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">null</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup_date</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">row_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Ambiguous dates.</strong> Is <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">0</span><span style=\"color: #000000\">3/</span><span style=\"color: #098658\">0</span><span style=\"color: #000000\">4/</span><span style=\"color: #098658\">2024</span></span></code> March 4th or April 3rd? Americans and most of the rest of the world disagree, and no function can know which one was meant. If a file mixes <code>%m/%d/%Y</code> and <code>%d/%m/%Y</code>, the order of your format list decides, and some dates will be <strong>silently wrong</strong>. Find out where the data came from, and check by looking for \"months\" greater than 12."
      },
      {
        "type": "p",
        "text": "Once a column is a real <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #0000FF\">date</span></span></code>, everything from <a href=\"02_time_truncation\">Chapter 2</a> works on it:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">: {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">, [</span><span style=\"color: #A31515\">&#39;%Y-%m-%d&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%m/%d/%Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%d-%b-%Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%B %d, %Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%Y%m%d&#39;</span><span style=\"color: #000000\">]</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    )::</span><span style=\"color: #0000FF\">date</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> not </span><span style=\"color: #0000FF\">null</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup_quarter</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">signup</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">quarter</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signups</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">customer_id</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup_quarter</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 6: Cleaning dates with DuckDB functions",
      "Other date shapes you'll meet"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Dates show up in other odd shapes too. Here are three common ones, built from a tiny inline table: an <strong>Excel serial number</strong> (days since 1899-12-30), a <strong>Unix epoch</strong> (seconds since 1970-01-01), and <strong>separate year, month, and day columns</strong>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;&quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">SELECT</span><span style=\"color: #000000FF\"> </span><span style=\"color: #000000\">*</span><span style=\"color: #000000FF\"> </span><span style=\"color: #0000FF\">FROM</span><span style=\"color: #000000FF\"> (</span><span style=\"color: #0000FF\">VALUES</span><span style=\"color: #000000FF\"> (</span><span style=\"color: #A31515\">&#39;45365&#39;</span><span style=\"color: #000000FF\">, </span><span style=\"color: #A31515\">&#39;1710374400&#39;</span><span style=\"color: #000000FF\">, </span><span style=\"color: #A31515\">&#39;2024&#39;</span><span style=\"color: #000000FF\">, </span><span style=\"color: #A31515\">&#39;3&#39;</span><span style=\"color: #000000FF\">, </span><span style=\"color: #A31515\">&#39;14&#39;</span><span style=\"color: #000000FF\">))</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">    </span><span style=\"color: #0000FF\">AS</span><span style=\"color: #000000FF\"> t(excel_serial, unix_epoch, yr, mo, dy)</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">&quot;&quot;&quot;</span><span style=\"color: #000000FF\">)</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">from_excel</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #098658\">@1899-12-30</span><span style=\"color: #000000\"> + </span><span style=\"color: #001080\">excel_serial</span><span style=\"color: #000000\">:::</span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">days</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">from_epoch</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">to_timestamp</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">unix_epoch</span><span style=\"color: #000000\">:::</span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">from_parts</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">make_date</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">date</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">yr</span><span style=\"color: #000000\">::</span><span style=\"color: #A31515\">&quot;BIGINT&quot;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">mo</span><span style=\"color: #000000\">::</span><span style=\"color: #A31515\">&quot;BIGINT&quot;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">dy</span><span style=\"color: #000000\">::</span><span style=\"color: #A31515\">&quot;BIGINT&quot;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">pretty</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">strftime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">make_date</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">date</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">yr</span><span style=\"color: #000000\">::</span><span style=\"color: #A31515\">&quot;BIGINT&quot;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">mo</span><span style=\"color: #000000\">::</span><span style=\"color: #A31515\">&quot;BIGINT&quot;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">dy</span><span style=\"color: #000000\">::</span><span style=\"color: #A31515\">&quot;BIGINT&quot;</span><span style=\"color: #000000\">), </span><span style=\"color: #A31515\">&#39;%A, %B %-d, %Y&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "All three are the same day: March 14, 2024 (Pi Day!). Notice <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">@1899-12-30</span><span style=\"color: #000000\"> + </span><span style=\"color: #001080\">n</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">days</span></span></code>: Malloy can add an interval to a date literal. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">::</span><span style=\"color: #A31515\">&quot;BIGINT&quot;</span></span></code> casts to a specific DuckDB type, because <code>make_date</code> wants integers."
      },
      {
        "type": "p",
        "text": "📘 <strong>DuckDB docs.</strong> <a href=\"https://duckdb.org/docs/stable/sql/functions/dateformat\">Date format specifiers</a> · <a href=\"https://duckdb.org/docs/stable/sql/functions/date\">Date functions</a> · <a href=\"https://duckdb.org/docs/stable/sql/functions/timestamp\">Timestamp functions</a>"
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 7: Missing values"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">??</span></span></code> operator replaces null with a fallback value (SQL's <code>COALESCE</code>):"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">: {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">, [</span><span style=\"color: #A31515\">&#39;%Y-%m-%d&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%m/%d/%Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%d-%b-%Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%B %d, %Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%Y%m%d&#39;</span><span style=\"color: #000000\">]</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    )::</span><span style=\"color: #0000FF\">date</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">signup_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">year</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">signup</span><span style=\"color: #000000\">)::</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\"> ?? </span><span style=\"color: #A31515\">&#39;unknown&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">row_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Be careful with fallbacks. Replacing a missing <em>label</em> with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #A31515\">&#39;unknown&#39;</span></span></code> is helpful. Replacing a missing <em>number</em> with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #098658\">0</span></span></code> usually is <strong>not</strong>, because it drags averages down. Leave unknown numbers null. Malloy's aggregates skip nulls."
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 8: Duplicates"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Our profile found 126 rows but only 120 distinct customer IDs. Group by <strong>every raw column</strong> and count. Any group with more than one row is an exact duplicate:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">raw_customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">customer_id</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">full_name</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">email</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">phone</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">plan</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">first_purchase</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">copies</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">copies</span><span style=\"color: #000000\"> &gt; </span><span style=\"color: #098658\">1</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Six customers appear twice. Duplicates are dangerous because they quietly inflate sums and skew averages. Since these are <em>exact</em> copies, the simplest fix is <code>SELECT DISTINCT</code> when the file is read. (If the copies differed slightly, for example by a trailing space, you would clean first and then deduplicate on the cleaned columns.)"
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 9: Putting it together in a clean source"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "We've been testing each fix inside a query. Now move them all into <strong>one source</strong> that reads the file <em>without duplicates</em>, so every query gets clean data. Notice that the dimensions can refer to each other:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">customers</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;&quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">SELECT DISTINCT</span><span style=\"color: #000000FF\"> </span><span style=\"color: #000000\">*</span><span style=\"color: #000000FF\"> </span><span style=\"color: #0000FF\">FROM</span><span style=\"color: #000000FF\"> read_csv(</span><span style=\"color: #A31515\">&#39;data/messy_customers.csv&#39;</span><span style=\"color: #000000FF\">, all_varchar </span><span style=\"color: #000000\">=</span><span style=\"color: #000000FF\"> true)</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">&quot;&quot;&quot;</span><span style=\"color: #000000FF\">)</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">customer_key</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">customer_id</span><span style=\"color: #000000\">::</span><span style=\"color: #0000FF\">number</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">full_name</span><span style=\"color: #000000\">), </span><span style=\"color: #811F3F\">r&#39;</span><span style=\"color: #EE0000\">\\s</span><span style=\"color: #811F3F\">+&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39; &#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">email_clean</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">lower</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">email</span><span style=\"color: #000000\">))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">phone_digits</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">phone</span><span style=\"color: #000000\">, </span><span style=\"color: #811F3F\">r&#39;[^0-9]&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">phone_clean</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">phone_digits</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">2</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">length</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">phone_digits</span><span style=\"color: #000000\">) = </span><span style=\"color: #098658\">11</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">else</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">phone_digits</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">state_key</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">upper</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">, </span><span style=\"color: #811F3F\">r&#39;[</span><span style=\"color: #EE0000\">\\s</span><span style=\"color: #811F3F\">.]&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">state_clean</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">state_key</span><span style=\"color: #000000\"> ?</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;CA&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;CA&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;CALIF&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;CALIFORNIA&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;TX&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;TX&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;TEXAS&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;NY&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;NY&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;NEWYORK&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;FL&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;FL&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;FLA&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;FLORIDA&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;WA&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;WA&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;WASH&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;WASHINGTON&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;OR&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;OR&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;ORE&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;OREGON&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;UTAH&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;CO&#39;</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">when</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;CO&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;COLO&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;COLORADO&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">else</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">null</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">plan_clean</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">concat</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">upper</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">plan</span><span style=\"color: #000000\">), </span><span style=\"color: #098658\">1</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">1</span><span style=\"color: #000000\">)), </span><span style=\"color: #795E26\">lower</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">trim</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">plan</span><span style=\"color: #000000\">), </span><span style=\"color: #098658\">2</span><span style=\"color: #000000\">)))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">signup</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">signup_date</span><span style=\"color: #000000\">, [</span><span style=\"color: #A31515\">&#39;%Y-%m-%d&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%m/%d/%Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%d-%b-%Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%B %d, %Y&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;%Y%m%d&#39;</span><span style=\"color: #000000\">]</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    )::</span><span style=\"color: #0000FF\">date</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">first_purchase_amount</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">first_purchase</span><span style=\"color: #000000\">, </span><span style=\"color: #811F3F\">r&#39;[^0-9.]&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;g&#39;</span><span style=\"color: #000000\">):::</span><span style=\"color: #0000FF\">number</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">row_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">customer_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">customer_key</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">avg_first_purchase</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">first_purchase_amount</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">row_count</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">customer_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "One row per customer."
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 9: Putting it together in a clean source",
      "The payoff"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Now analysis is easy, and it's correct:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state_clean</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">customer_count</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">avg_first_purchase</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">by_plan</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">plan_clean</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">customer_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Step 9: Putting it together in a clean source",
      "Saving the cleaned data"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "To save the clean table as a Parquet file, run the clean query's SQL through DuckDB. You can see that SQL with the <strong>SQL</strong> button on any result. Or do the cleaning in Python with the same functions, using the pattern from <a href=\"07_csv_and_parquet\">Chapter 7</a>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-txt\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">import duckdb</span></span>\n<span class=\"line\"><span style=\"color: #000000\">duckdb.sql(&quot;&quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  COPY (</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    SELECT DISTINCT</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      customer_id::INTEGER                                        AS customer_id,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      regexp_replace(trim(full_name), &#39;\\\\s+&#39;, &#39; &#39;, &#39;g&#39;)           AS name,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      lower(trim(email))                                          AS email,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      try_strptime(signup_date,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">        [&#39;%Y-%m-%d&#39;,&#39;%m/%d/%Y&#39;,&#39;%d-%b-%Y&#39;,&#39;%B %d, %Y&#39;,&#39;%Y%m%d&#39;])::DATE AS signup,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      TRY_CAST(regexp_replace(first_purchase, &#39;[^0-9.]&#39;, &#39;&#39;, &#39;g&#39;) AS DOUBLE) AS first_purchase</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    FROM read_csv(&#39;data/messy_customers.csv&#39;, all_varchar = true)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  ) TO &#39;data/customers_clean.parquet&#39; (FORMAT parquet, COMPRESSION zstd)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">&quot;&quot;&quot;)</span></span></pre>"
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 9: Data Cleaning",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">text</span><span style=\"color: #000000\">, [</span><span style=\"color: #001080\">list</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">of</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">formats</span><span style=\"color: #000000\">])</span></span></code> parses mixed date formats. Watch out for ambiguous day/month orders."
      },
      {
        "type": "p",
        "text": "<strong>Profile first.</strong> Group by each column and count before you change anything."
      },
      {
        "type": "p",
        "text": "Read messy CSVs with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">all_varchar</span><span style=\"color: #000000\"> = </span><span style=\"color: #0000FF\">true</span></span></code>, then convert each column yourself."
      },
      {
        "type": "p",
        "text": "Use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">pick</span><span style=\"color: #000000\"> ... </span><span style=\"color: #AF00DB\">else</span><span style=\"color: #000000\"> </span><span style=\"color: #0000FF\">null</span></span></code> to standardize categories, and check for leftovers."
      },
      {
        "type": "p",
        "text": "Put all of your cleaning into <strong>one source</strong> so every query uses clean data."
      },
      {
        "type": "p",
        "text": "Use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">:::</span></span></code> (<strong>safe</strong> cast) to turn text into numbers. Bad values become null instead of errors."
      },
      {
        "type": "p",
        "text": "Call any DuckDB function with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">function_name</span><span style=\"color: #000000\">!</span><span style=\"color: #795E26\">return_type</span><span style=\"color: #000000\">(...)</span></span></code>, for example <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">regexp_replace</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">(...)</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">try_strptime</span><span style=\"color: #000000\">!</span><span style=\"color: #0000FF\">timestamp</span><span style=\"color: #000000\">(...)</span></span></code>."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 9.1: Email domains.</strong> Add a dimension to <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">customers</span></span></code> that extracts the <strong>domain</strong> of each email (everything after the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">@</span></span></code>). Hint: <code>regexp_extract!string(email_clean, '@(.*)$', 1)</code> or <code>split_part!string(email_clean, '@', 2)</code>. Count customers by domain."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 9.2: Signups by weekday.</strong> Using the cleaned <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">signup</span></span></code> date, count customers by <strong>day of the week</strong>. Display the weekday as a <em>name</em> (\"Monday\") rather than a number. (Hint: <code>strftime!string(signup, '%A')</code>.)"
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 9.3: Data-quality scorecard.</strong> Write one <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">transpose</span></span></code> query against <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">customers</span></span></code> that reports, for the <strong>cleaned</strong> columns, how many rows are still null in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">signup</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state_clean</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">first_purchase_amount</span></span></code>, and what <strong>percent</strong> of all rows each represents. Format the percentages with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">percent</span></span></code>."
      }
    ],
    "path": "/textbook/09_data_cleaning.malloynb"
  },
  {
    "titles": [
      "Chapter 10: Joins and Symmetric Aggregates"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Real data is spread over several tables. <strong>Joins</strong> connect them. In SQL, joins are also the number-one source of <em>wrong numbers</em>, because joining a \"one\" table to a \"many\" table repeats rows, and sums and averages quietly double count. In this chapter you'll learn:"
      },
      {
        "type": "p",
        "text": "the shape of a <strong>star schema</strong>"
      },
      {
        "type": "p",
        "text": "why Malloy's <strong>symmetric aggregates</strong> give correct answers where naive SQL doesn't"
      },
      {
        "type": "p",
        "text": "how to join a table to a <strong>summary query</strong> of itself"
      },
      {
        "type": "p",
        "text": "how to reach joined fields with dot paths like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">state</span></span></code>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">join_one</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">join_many</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">join_cross</span></span></code>, and when to use each"
      }
    ],
    "path": "/textbook/10_joins.malloynb"
  },
  {
    "titles": [
      "Chapter 10: Joins and Symmetric Aggregates",
      "The e-commerce star schema"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A <strong>star schema</strong> has one central <strong>fact</strong> table (events: sales, clicks, births) surrounded by <strong>dimension</strong> tables (things: customers, products, places). In our store:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-txt\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">                  ┌──────────────┐</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                  │    users     │  one row per customer</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                  └──────▲───────┘</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                         │ user_id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">┌──────────────────────────────────────────┐</span></span>\n<span class=\"line\"><span style=\"color: #000000\">│               order_items                │  FACT: one row per item sold</span></span>\n<span class=\"line\"><span style=\"color: #000000\">└──────────────────────────────────────────┘</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                         │ inventory_item_id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                  ┌──────▼──────────┐</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                  │ inventory_items │  one row per physical item</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                  └──────┬──────────┘</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                         │ product_id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                  ┌──────▼───────┐</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                  │   products   │  one row per catalog product</span></span>\n<span class=\"line\"><span style=\"color: #000000\">                  └──────────────┘</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Here's how <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">ecommerce</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> describes it. (Each source also defines some measures, left out here.)"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/users.parquet&#39;</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">primary_key</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">products</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/products.parquet&#39;</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">primary_key</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/inventory_items.parquet&#39;</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">primary_key</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">join_one</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">products</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">with</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">product_id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/order_items.parquet&#39;</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">primary_key</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">join_one</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">with</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">user_id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">join_one</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">with</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">inventory_item_id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Two things to notice:"
      },
      {
        "type": "p",
        "text": "Each source declares its <strong><code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">primary_key</span><span style=\"color: #000000\">:</span></span></code></strong>, the column that is unique for every row. Malloy needs it to do joins correctly."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">join_one</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">with</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">user_id</span></span></code> means <em>\"each order item has <strong>one</strong> user, found by matching my <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">user_id</span></span></code> to the user's primary key.\"</em> That's the most common kind of join, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">with</span></span></code> is its shorthand."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/join\">Joins</a> · <a href=\"https://docs.malloydata.dev/documentation/language/source#primary-keys\">Primary keys</a>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;ecommerce.malloy&quot;</span></span></pre>"
      }
    ],
    "path": "/textbook/10_joins.malloynb"
  },
  {
    "titles": [
      "Chapter 10: Joins and Symmetric Aggregates",
      "Using joined fields"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Once a join is declared, you reach the joined table's fields with a dot: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">state</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_category</span></span></code>. Joins can chain: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">products</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">brand</span></span></code> goes two hops."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">products</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">department</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">order_item_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "You can use <strong>measures</strong> from joined sources, too. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">user_count</span></span></code> counts <em>users</em>, not order items:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2022&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">traffic_source</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">order_item_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">order_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">user_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">sales_per_customer</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> / </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">user_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Malloy only joins the tables a query actually uses. If your query doesn't mention <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span></span></code>, the generated SQL has no join to <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span></span></code> at all. Click <strong>SQL</strong> on the results above and below to compare."
      }
    ],
    "path": "/textbook/10_joins.malloynb"
  },
  {
    "titles": [
      "Chapter 10: Joins and Symmetric Aggregates",
      "The three kinds of join"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You can write a join's condition two ways:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">join_one</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">with</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">user_id</span><span style=\"color: #000000\">                          </span><span style=\"color: #008000\">// my user_id = users&#39; primary key</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">join_one</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">on</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">user_id</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">id</span><span style=\"color: #000000\">                 </span><span style=\"color: #008000\">// any boolean condition</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">join_many</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">on</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">id</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">user_id</span><span style=\"color: #000000\">    </span><span style=\"color: #008000\">// join_many always uses &quot;on&quot;</span></span></pre>"
      }
    ],
    "path": "/textbook/10_joins.malloynb"
  },
  {
    "titles": [
      "Chapter 10: Joins and Symmetric Aggregates",
      "join_many: looking at the data from the customer's side"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "So far we started from <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_items</span></span></code> and looked \"up\" at users. To ask questions <strong>about customers</strong>, start from <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span></span></code> and look \"down\" at their orders with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">join_many</span></span></code>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">customers</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">join_many</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">on</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">id</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">user_id</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;0.0&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">avg_age</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">age</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">customers</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">traffic_source</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">user_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">avg_age</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">order_item_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Notice that <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">user_count</span></span></code> is the real number of users and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">avg_age</span></span></code> is the real average age, even though each user was joined to many order rows. That's not luck. Read on."
      }
    ],
    "path": "/textbook/10_joins.malloynb"
  },
  {
    "titles": [
      "Chapter 10: Joins and Symmetric Aggregates",
      "The fan-out problem, and how Malloy avoids it"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "When you join a \"one\" table to a \"many\" table, the \"one\" rows get <strong>repeated</strong>, once per matching \"many\" row. A customer with 12 order items appears 12 times in the joined result. Any <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">SUM</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">COUNT</span></span></code>, or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">AVG</span></span></code> over customer columns then counts that customer 12 times."
      },
      {
        "type": "p",
        "text": "Let's prove it with plain SQL. This is the query most people would write first:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;&quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">SELECT</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">    u.traffic_source,</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">    </span><span style=\"color: #795E26\">COUNT</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000\">*</span><span style=\"color: #000000FF\">)      </span><span style=\"color: #0000FF\">AS</span><span style=\"color: #000000FF\"> user_count_WRONG,</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">    </span><span style=\"color: #795E26\">AVG</span><span style=\"color: #000000FF\">(u.age)    </span><span style=\"color: #0000FF\">AS</span><span style=\"color: #000000FF\"> avg_age_WRONG,</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">    </span><span style=\"color: #795E26\">COUNT</span><span style=\"color: #000000FF\">(o.id)   </span><span style=\"color: #0000FF\">AS</span><span style=\"color: #000000FF\"> order_item_count,</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">    </span><span style=\"color: #795E26\">SUM</span><span style=\"color: #000000FF\">(o.sale_price) </span><span style=\"color: #0000FF\">AS</span><span style=\"color: #000000FF\"> total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">FROM</span><span style=\"color: #000000FF\"> </span><span style=\"color: #A31515\">&#39;data/users.parquet&#39;</span><span style=\"color: #000000FF\"> u</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">LEFT JOIN</span><span style=\"color: #000000FF\"> </span><span style=\"color: #A31515\">&#39;data/order_items.parquet&#39;</span><span style=\"color: #000000FF\"> o </span><span style=\"color: #0000FF\">ON</span><span style=\"color: #000000FF\"> o.user_id </span><span style=\"color: #000000\">=</span><span style=\"color: #000000FF\"> u.id</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">GROUP BY</span><span style=\"color: #000000FF\"> </span><span style=\"color: #098658\">1</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">ORDER BY</span><span style=\"color: #000000FF\"> </span><span style=\"color: #098658\">2</span><span style=\"color: #000000FF\"> </span><span style=\"color: #0000FF\">DESC</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">&quot;&quot;&quot;</span><span style=\"color: #000000FF\">)</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">select</span><span style=\"color: #000000\">: *</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Compare with the Malloy result above. The SQL <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">user_count_WRONG</span></span></code> is <strong>inflated</strong>. It's counting order rows, not users. The SQL <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">avg_age_WRONG</span></span></code> is <em>also</em> off, and much harder to notice: it's a weighted average that gives frequent shoppers more weight. These are exactly the bugs that slip into real reports."
      },
      {
        "type": "p",
        "text": "Malloy gets both right because of <strong>symmetric aggregates</strong>. Since every source has a primary key, Malloy knows which table each aggregate \"belongs to\". When it computes <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">user_count</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">avg_age</span></span></code> (measures of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span></span></code>) across a join that repeats users, it generates SQL that counts each user <strong>once</strong>, using the primary key to remove the repeats. You write the obvious query, and the number is right."
      },
      {
        "type": "p",
        "text": "💡 <strong>\"Locality\" of an aggregate.</strong> Every aggregate is computed <em>with respect to</em> some source in the join graph. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">age</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">()</span></span></code> written in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">customers</span></span></code> averages over <strong>customers</strong>. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">sale_price</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span></code> sums over <strong>order items</strong>. The path in front of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">()</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span></code> tells Malloy where to aggregate."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/aggregates\">Aggregates and symmetric aggregation</a> · <a href=\"https://docs.malloydata.dev/documentation/patterns/foreign_sums\">Pattern: foreign sums</a>"
      }
    ],
    "path": "/textbook/10_joins.malloynb"
  },
  {
    "titles": [
      "Chapter 10: Joins and Symmetric Aggregates",
      "The fan-out problem, and how Malloy avoids it",
      "A second example: two different averages"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "From <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_items</span></span></code>, what's \"the average age of the customers who bought from each category\"? There are actually <strong>two</strong> different questions hiding in that sentence:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_category</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">order_item_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">user_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;0.00&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">avg_age_per_customer</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">age</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;0.00&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">avg_age_per_item</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">age</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">8</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">age</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">()</span></span></code> averages over <strong>users</strong>: each customer counts once, no matter how many items they bought."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">age</span><span style=\"color: #000000\">)</span></span></code> averages over the rows of the <strong>current source</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_items</span></span></code>): a customer who bought 10 items counts 10 times. This is \"the average age <em>per item sold</em>.\""
      },
      {
        "type": "p",
        "text": "Both are reasonable questions, and they give different answers. Naive SQL silently gives you the second one. Malloy makes you <strong>choose</strong>. If you write a bare <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">age</span><span style=\"color: #000000\">)</span></span></code> across a join, Malloy warns you and asks you to be explicit."
      }
    ],
    "path": "/textbook/10_joins.malloynb"
  },
  {
    "titles": [
      "Chapter 10: Joins and Symmetric Aggregates",
      "Joining a source to a query"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A join target doesn't have to be a table. It can be a <strong>query</strong>, which is great for adding context such as totals. Let's go back to the baby names. To compare a name with the <em>total births in its state and year</em>, first build a summary, then join it with a two-column match:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state_year_totals</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">all_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_with_totals</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">join_one</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">sy</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">state_year_totals</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">on</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">sy</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> and </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">sy</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">share_of_state_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #001080\">sy</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">all_births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_with_totals</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;Emma&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;[2015 to 2021]&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">sy</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">all_births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">(), </span><span style=\"color: #001080\">share_of_state_year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Many <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> rows (one per name) match the same <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state_year_totals</span></span></code> row. That's normal for <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">join_one</span></span></code> (many of mine → one of theirs). Because of symmetric aggregates, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">sy</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">all_births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span></code> adds each state-year total only <strong>once</strong>, even though it was matched to many name rows."
      },
      {
        "type": "p",
        "text": "(In <a href=\"11_percent_of_total\">Chapter 11</a> you'll see an even easier way to get shares, with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">exclude</span><span style=\"color: #000000\">()</span></span></code>, and no join at all.)"
      }
    ],
    "path": "/textbook/10_joins.malloynb"
  },
  {
    "titles": [
      "Chapter 10: Joins and Symmetric Aggregates",
      "join_cross: many-to-many"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">join_cross</span></span></code> is for joins where <strong>both</strong> sides can have many matching rows, or where you want every combination. It's the least common join, but it's handy for \"what-if\" scenarios. Here we cross every 2022 sale with three hypothetical discount levels:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">discount_scenarios</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;&quot;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">  </span><span style=\"color: #0000FF\">SELECT</span><span style=\"color: #000000FF\"> </span><span style=\"color: #000000\">*</span><span style=\"color: #000000FF\"> </span><span style=\"color: #0000FF\">FROM</span><span style=\"color: #000000FF\"> (</span><span style=\"color: #0000FF\">VALUES</span><span style=\"color: #000000FF\"> (</span><span style=\"color: #A31515\">&#39;No discount&#39;</span><span style=\"color: #000000FF\">, </span><span style=\"color: #098658\">0</span><span style=\"color: #000000FF\">.</span><span style=\"color: #098658\">0</span><span style=\"color: #000000FF\">), (</span><span style=\"color: #A31515\">&#39;10% off&#39;</span><span style=\"color: #000000FF\">, </span><span style=\"color: #098658\">0</span><span style=\"color: #000000FF\">.</span><span style=\"color: #098658\">10</span><span style=\"color: #000000FF\">), (</span><span style=\"color: #A31515\">&#39;25% off&#39;</span><span style=\"color: #000000FF\">, </span><span style=\"color: #098658\">0</span><span style=\"color: #000000FF\">.</span><span style=\"color: #098658\">25</span><span style=\"color: #000000FF\">)) t(scenario, discount)</span></span>\n<span class=\"line\"><span style=\"color: #000000FF\">&quot;&quot;&quot;</span><span style=\"color: #000000FF\">)</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">what_if</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2022&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">join_cross</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">s</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">discount_scenarios</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">discounted_sales</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> * (</span><span style=\"color: #098658\">1</span><span style=\"color: #000000\"> - </span><span style=\"color: #795E26\">max</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">s</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">discount</span><span style=\"color: #000000\">))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">what_if</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">s</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">scenario</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">discounted_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Every order item is paired with every scenario, so the raw joined data has 3× the rows. But look at <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span></span></code>: it's the <strong>same correct number in every row</strong>. It isn't tripled, because <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span></span></code> is an <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_items</span></span></code> measure, and symmetric aggregates count each order item once per group. Within each scenario group, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">max</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">s</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">discount</span><span style=\"color: #000000\">)</span></span></code> is just that scenario's discount (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">min</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">max</span></span></code> are safe across any join, because repeated values don't change them), so <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">discounted_sales</span></span></code> is the correct sales total times the discount factor."
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Joins need primary keys.</strong> Symmetric aggregates depend on <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">primary_key</span><span style=\"color: #000000\">:</span></span></code>. If you join a source that has no primary key and then aggregate its fields across a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">join_many</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">join_cross</span></span></code>, Malloy can't protect you. Declare a primary key on every table you join."
      }
    ],
    "path": "/textbook/10_joins.malloynb"
  },
  {
    "titles": [
      "Chapter 10: Joins and Symmetric Aggregates",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Naive SQL joins double count. Malloy's <strong>symmetric aggregates</strong> use primary keys to compute each measure at its own grain, so counts, sums, and averages stay correct."
      },
      {
        "type": "p",
        "text": "You can join to a <strong>query</strong> (for example, a summary table), not just to a table."
      },
      {
        "type": "p",
        "text": "Reach joined fields with dots: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">state</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">products</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">brand</span></span></code>."
      },
      {
        "type": "p",
        "text": "A <strong>star schema</strong> is a central fact table plus dimension tables. Declare a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">primary_key</span><span style=\"color: #000000\">:</span></span></code> on each."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">join_one</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">x</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">with</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">fk</span></span></code> is the common case (many-to-one). Use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">join_many</span><span style=\"color: #000000\">:</span></span></code> to look from the \"one\" side down at the \"many\" side, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">join_cross</span><span style=\"color: #000000\">:</span></span></code> for many-to-many and scenarios."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 10.1: Two hops.</strong> Starting from <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_items</span></span></code>, show <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_item_count</span></span></code> by <strong>product brand</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">products</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">brand</span></span></code>) for the 10 biggest brands. Then add the number of distinct <strong>customers</strong> who bought each brand."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 10.2: Catch the double count.</strong> Using the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">customers</span></span></code> source (users with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">join_many</span></span></code> to order items), compute the <strong>average age</strong> of customers by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">country</span></span></code>. Then write the naive SQL version with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(...)</span></span></code> and a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">LEFT</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">JOIN</span></span></code>, as in the example. Which countries differ the most, and why?"
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 10.3: Name share.</strong> Using <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_with_totals</span></span></code>, find the 10 state-years where the name <strong>Mary</strong> had the <strong>highest share</strong> of all births in that state and year. (Hint: group by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">year_born</span></span></code>, and sort by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">share_of_state_year</span></span></code>.)"
      }
    ],
    "path": "/textbook/10_joins.malloynb"
  },
  {
    "titles": [
      "Chapter 11: Percent of Total"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "\"What share of the total is this?\" is one of the most common questions in analysis. What percent of babies were named Olivia? What share of sales came from Jeans? Which category drove this year's growth? In SQL, these questions need subqueries or window functions. In Malloy, they take two functions:"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">measure</span><span style=\"color: #000000\">)</span></span></code>: compute a measure while <strong>ignoring</strong> the query's grouping"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">exclude</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">measure</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">dimension</span><span style=\"color: #000000\">)</span></span></code>: compute a measure while ignoring <strong>specific</strong> grouping dimensions"
      },
      {
        "type": "p",
        "text": "You'll use them for <strong>share</strong>, <strong>contribution</strong>, and <strong>index</strong> calculations."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;ecommerce.malloy&quot;</span></span></pre>"
      }
    ],
    "path": "/textbook/11_percent_of_total.malloynb"
  },
  {
    "titles": [
      "Chapter 11: Percent of Total",
      "all(): the grand total"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)</span></span></code> is total births across <strong>all</strong> the rows the query sees, ignoring <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code>. Put it next to the regular measure and the idea is obvious:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">everyone</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Each row has its own <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code>, and the same <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">everyone</span></span></code> total. Notice that <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> still respects <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>. \"Everyone\" means everyone born <strong>in 2021</strong>, because those are the only rows the query sees."
      }
    ],
    "path": "/textbook/11_percent_of_total.malloynb"
  },
  {
    "titles": [
      "Chapter 11: Percent of Total",
      "Share: percent of total"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Divide by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(...)</span></span></code> to get a share. Add <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">percent</span></span></code> to format it:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">share_of_us</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> is computed <strong>before</strong> <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">:</span></span></code> cuts off the rows, so the shares are correct even though we only display 10 of the 51 states. That's a common bug with spreadsheet or window-function approaches, and Malloy avoids it."
      },
      {
        "type": "p",
        "text": "Remember the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">births_per_100k</span></span></code> measure in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>? Now you can read its definition:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">births_per_100k</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">floor</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">) * </span><span style=\"color: #098658\">100000</span><span style=\"color: #000000\">)</span></span></pre>"
      },
      {
        "type": "p",
        "text": "It's just a share, scaled up so it's easier to read."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/ungrouped-aggregates\">Ungrouped aggregates: all() and exclude()</a> · <a href=\"https://docs.malloydata.dev/documentation/patterns/percent_of_total\">Pattern: percent of total</a>"
      }
    ],
    "path": "/textbook/11_percent_of_total.malloynb"
  },
  {
    "titles": [
      "Chapter 11: Percent of Total",
      "all() with dimensions: share within a group"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Give <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> one or more dimension names, and it keeps grouping by <strong>those</strong> dimensions, ignoring the rest. With two <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> fields, this gives \"share within each group\":"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">state_total</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">share_of_state</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;VT&#39;</span><span style=\"color: #000000\"> | </span><span style=\"color: #A31515\">&#39;HI&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">share_of_state</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">)</span></span></code> means <em>\"total births, grouped only by state.\"</em> It's the state total, repeated on each of that state's rows."
      },
      {
        "type": "p",
        "text": "(We used <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code> to show just two states here. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code> runs after the totals are computed.)"
      }
    ],
    "path": "/textbook/11_percent_of_total.malloynb"
  },
  {
    "titles": [
      "Chapter 11: Percent of Total",
      "exclude(): ungroup specific dimensions"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">exclude</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">measure</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">dim</span><span style=\"color: #000000\">)</span></span></code> is the mirror image of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">measure</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">dim</span><span style=\"color: #000000\">)</span></span></code>: instead of listing the dimensions to <strong>keep</strong>, you list the ones to <strong>drop</strong>. With <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span></span></code>, these two are the same:"
      },
      {
        "type": "p",
        "text": "Here's the proof, with both forms side by side:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">keep_state</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">drop_name</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">exclude</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">keep_name</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">drop_state</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">exclude</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">keep_state</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">drop_name</span></span></code> are the California total (the biggest rows happen to be in California). <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">keep_name</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">drop_state</span></span></code> are each name's <strong>national</strong> total."
      }
    ],
    "path": "/textbook/11_percent_of_total.malloynb"
  },
  {
    "titles": [
      "Chapter 11: Percent of Total",
      "exclude(): ungroup specific dimensions",
      "Shares inside a nest"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "In a nested query, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">measure</span><span style=\"color: #000000\">)</span></span></code> is the total for the <strong>parent row</strong>. That makes \"share within each group\" easy to read:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">share_of_us</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">share_of_state</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">3</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "The outer <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> is the U.S. total. The nested <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> is each state's total."
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Check nested <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">exclude</span><span style=\"color: #000000\">()</span></span></code> results.</strong> The Malloy docs say <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">exclude</span><span style=\"color: #000000\">()</span></span></code> inside a nest may name a dimension from the <em>outer</em> query (for example, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">exclude</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">)</span></span></code> in a nest under <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span></span></code>). In the Malloy version used to build this book, that pattern sometimes returned the wrong number (the same value for every state). Until you've checked it, prefer flat queries with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">m</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">dim</span><span style=\"color: #000000\">)</span></span></code> for these comparisons, as in the index example below, and compare a few values against a query you trust."
      }
    ],
    "path": "/textbook/11_percent_of_total.malloynb"
  },
  {
    "titles": [
      "Chapter 11: Percent of Total",
      "Contribution: who drove the change?"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<strong>Contribution</strong> answers \"how much of the <em>change</em> came from each group?\" It's a share of a <em>difference</em>. Sales grew from 2020 to 2021, and each category contributed part of that growth:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">: {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">sales_2020</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2020&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">sales_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_category</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">sales_2020</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">sales_2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">growth</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">sales_2021</span><span style=\"color: #000000\"> - </span><span style=\"color: #001080\">sales_2020</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">share_of_2021_sales</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">sales_2021</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">sales_2021</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">contribution_to_growth</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> (</span><span style=\"color: #001080\">sales_2021</span><span style=\"color: #000000\"> - </span><span style=\"color: #001080\">sales_2020</span><span style=\"color: #000000\">) / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">sales_2021</span><span style=\"color: #000000\"> - </span><span style=\"color: #001080\">sales_2020</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">contribution_to_growth</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Compare the last two columns. A category whose <strong>contribution to growth</strong> is bigger than its <strong>share of sales</strong> is growing faster than the business as a whole. It's pulling the company forward."
      }
    ],
    "path": "/textbook/11_percent_of_total.malloynb"
  },
  {
    "titles": [
      "Chapter 11: Percent of Total",
      "Index: over- or under-represented?"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "An <strong>index</strong> compares a share in one group with the same share overall. 100 means \"typical.\" 200 means \"twice as common here as everywhere else.\" 50 means \"half as common.\""
      },
      {
        "type": "p",
        "text": "index = (share of the name <strong>within this state</strong>) ÷ (share of the name <strong>nationally</strong>) × 100"
      },
      {
        "type": "p",
        "text": "Which girls' names are most <em>distinctively</em> associated with a state? We need four ingredients, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> provides them all:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;[2010 to 2021]&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">state_share</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">national_share</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">) / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;0&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">popularity_index</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> (</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      / (</span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">) / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)) * </span><span style=\"color: #098658\">100</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> &gt; </span><span style=\"color: #098658\">2000</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">popularity_index</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">15</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Here <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> &gt; </span><span style=\"color: #098658\">2000</span></span></code> keeps out tiny names with wild ratios. Names tied to a language or culture that's concentrated in one region rise to the top."
      },
      {
        "type": "p",
        "text": "To look at one state's \"signature\" names, there's a neat trick. Don't group by state at all. Use <strong>filtered measures</strong> (from <a href=\"08_filtering\">Chapter 8</a>) for the state's numbers, and plain measures for the national ones. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> works on filtered measures too:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;[2010 to 2021]&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;M&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">utah_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">utah_share</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> } / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> })</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">national_share</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;0&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">utah_index</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> (</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> } / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> }))</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      / (</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)) * </span><span style=\"color: #098658\">100</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> } &gt; </span><span style=\"color: #098658\">300</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">utah_index</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Utah's list is full of names that are much rarer in the rest of the country."
      },
      {
        "type": "p",
        "text": "💡 <strong>Why not <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UT&#39;</span></span></code>?</strong> A <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> removes every other state's rows <em>before</em> anything is computed, so \"national share\" would quietly become \"Utah share\" and every index would be 100. When you compare a part with the whole, make sure the whole is still in the query."
      }
    ],
    "path": "/textbook/11_percent_of_total.malloynb"
  },
  {
    "titles": [
      "Chapter 11: Percent of Total",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "In a nest, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">m</span><span style=\"color: #000000\">)</span></span></code> is the parent row's total."
      },
      {
        "type": "p",
        "text": "To compare a part with the whole, keep the whole in the query. Use filtered measures, such as <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">m</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\"> }</span></span></code>, for the part, instead of a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> that throws the whole away."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">m</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">dim</span><span style=\"color: #000000\">)</span></span></code> keeps grouping by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">dim</span></span></code>. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">exclude</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">m</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">dim</span><span style=\"color: #000000\">)</span></span></code> drops <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">dim</span></span></code>. Both give \"share within a group.\""
      },
      {
        "type": "p",
        "text": "<strong>Share</strong> = part ÷ <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">part</span><span style=\"color: #000000\">)</span></span></code>. <strong>Contribution</strong> = change ÷ <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">change</span><span style=\"color: #000000\">)</span></span></code>. <strong>Index</strong> = local share ÷ overall share × 100."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">m</span><span style=\"color: #000000\">)</span></span></code> computes measure <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">m</span></span></code> over <strong>every row the query sees</strong>, ignoring <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code> (but respecting <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>, and before <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">:</span></span></code>)."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 11.1: Name market share.</strong> For the year 2000, show the top 10 boys' names with their <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code> and their <strong>share of all boys born that year</strong>, formatted as a percent."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 11.2: Gender split by decade.</strong> Group by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">decade</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">gender</span></span></code>, and show what <strong>percent of each decade's births</strong> were boys vs. girls. (Hint: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\">)</span></span></code>.) Make it a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">stack</span></span></code>."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 11.3: Brand index.</strong> In the e-commerce data, which <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">product_brand</span></span></code> sells unusually well in the <strong>UK</strong> compared with its share of global sales? Group by brand and build a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">uk_index</span></span></code> with filtered measures (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">users</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">country</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;UK&#39;</span><span style=\"color: #000000\"> }</span></span></code>) and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code>, as in the Utah example. Use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code> to ignore brands with tiny UK sales."
      }
    ],
    "path": "/textbook/11_percent_of_total.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Some questions can't be answered in one pass over the data:"
      },
      {
        "type": "p",
        "text": "<em>How many names does it take to cover half of all babies?</em> First total each name, <strong>then</strong> add up the totals in order."
      },
      {
        "type": "p",
        "text": "<em>In which decade did each name peak?</em> First find each name's best year, <strong>then</strong> group the names by that decade."
      },
      {
        "type": "p",
        "text": "<em>How did sales change from last month?</em> First total each month, <strong>then</strong> compare each month with the one before it."
      },
      {
        "type": "p",
        "text": "Malloy has two tools for this:"
      },
      {
        "type": "p",
        "text": "<strong>Pipelines</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-&gt; { } -&gt; { }</span></span></code>): the output of one query stage becomes the input to the next."
      },
      {
        "type": "p",
        "text": "<strong>Calculations</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">:</span></span></code>): window functions like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">lag</span><span style=\"color: #000000\">()</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">rank</span><span style=\"color: #000000\">()</span></span></code>, and running totals, computed on a query's <em>results</em>."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;ecommerce.malloy&quot;</span></span></pre>"
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Pipelines: chaining query stages"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You've been writing one-stage queries: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\"> -&gt; { ... }</span></span></code>. Add another <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-&gt;</span></span></code> and another <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">{ }</span></span></code>, and the second stage runs on the <strong>output</strong> of the first. The second stage can only see the first stage's output columns."
      },
      {
        "type": "p",
        "text": "<strong>Question:</strong> how are name lengths distributed? First get each name's total births (stage 1), then count how many <em>names</em> there are of each length (stage 2):"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name_length</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">} -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name_length</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name_length</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "In stage 2, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span></code> counts the rows produced by stage 1 (one per name), and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span></code> adds up stage 1's <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code> column. To stage 2, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code> is just a number column. The measure definition from the model doesn't come along."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/views#multi-stage-views\">Multi-stage views and pipelines</a> · <a href=\"https://docs.malloydata.dev/documentation/language/query\">Queries</a>"
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Pipelines: chaining query stages",
      "Example: when did each name peak?"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<strong>Stage 1:</strong> for each name and year, total the births. <strong>Stage 2:</strong> for each name, add up the lifetime total, find the biggest single year with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">max</span><span style=\"color: #000000\">()</span></span></code>, and use a nest with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">1</span></span></code> (sorted by births) to show <em>which</em> year that was:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;F&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">} -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">lifetime_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">peak_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">max</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">peak</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">births_that_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">births_that_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">1</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">births</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">sum</span><span style=\"color: #000000\">() &gt; </span><span style=\"color: #098658\">100000</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">lifetime_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Each of these popular girls' names shows its peak year. Pipelines can be as long as you need, and each stage can use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">nest</span><span style=\"color: #000000\">:</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code>, and everything else."
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Pipelines: chaining query stages",
      "Pipelines as sources"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Name a pipeline's output as a <strong>source</strong>, and you can query it like a table, and even <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span></span></code> it with new fields. This is how you build reusable summary tables:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name_summary</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">lifetime_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">first_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">min</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">last_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">max</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">states_used</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">state</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">} </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">years_in_use</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">last_year</span><span style=\"color: #000000\"> - </span><span style=\"color: #001080\">first_year</span><span style=\"color: #000000\"> + </span><span style=\"color: #098658\">1</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">measure</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name_count</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name_summary</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">lifetime_births</span><span style=\"color: #000000\"> &gt; </span><span style=\"color: #098658\">50000</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">name_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;0.0&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">avg_years_in_use</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">years_in_use</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Pipelines: chaining query stages",
      "Query-local fields with extend:"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Sometimes a field is only needed by one query. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">:</span></span></code> <em>inside</em> the query defines dimensions or measures that exist just for that query, without changing the model:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">: {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">is_double_letter_start</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">lower</span><span style=\"color: #000000\">(</span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">1</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">1</span><span style=\"color: #000000\">)) = </span><span style=\"color: #795E26\">substr</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">name</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">2</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">1</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">is_double_letter_start</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Window calculations with calculate:"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A <strong>calculation</strong> is computed on the <em>rows of a query's result</em>, after grouping and aggregating. Each row can look at other rows: the previous one, the running total so far, its rank. These are SQL's window functions, written in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">:</span></span></code>."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/calculations_windows\">Calculations and window functions</a> · <a href=\"https://docs.malloydata.dev/documentation/language/functions#window-functions\">Window function reference</a>"
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Window calculations with calculate:",
      "lag: change from the previous row"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Calculations follow the query's <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">:</span></span></code>. Sort by time, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">lag</span><span style=\"color: #000000\">()</span></span></code> means \"the previous period\":"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2022&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">prev_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">lag</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">change</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> - </span><span style=\"color: #795E26\">lag</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">pct_change</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">lag</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\">) - </span><span style=\"color: #098658\">1</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "The first row has no previous row, so its <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">lag</span></span></code> is null. This is the third way to do period-over-period comparisons, after the filtered measures and pivoted charts in <a href=\"08_filtering\">Chapter 8</a>."
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Window calculations with calculate:",
      "rank and row_number"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The query's ordering also decides <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">rank</span><span style=\"color: #000000\">()</span></span></code>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">1990</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;M&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">popularity_rank</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">rank</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">10</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Window calculations with calculate:",
      "Running totals: sum_cumulative"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "How many names does it take to cover <strong>half</strong> of all babies born in 2021? Sort names from most to least popular, keep a running total, and compare it with the overall total, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">sum_window</span><span style=\"color: #000000\">()</span></span></code>. Then a <strong>second stage</strong> counts the rows that are still under 50%. That's a pipeline <em>and</em> a window function together:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">running_total</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">sum_cumulative</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">grand_total</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">sum_window</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">} -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">running_total</span><span style=\"color: #000000\"> &lt;= </span><span style=\"color: #001080\">grand_total</span><span style=\"color: #000000\"> / </span><span style=\"color: #098658\">2</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_covering_half</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Just 262 names (out of more than 30,000) cover half of all babies born in 2021. How has that changed over time? We can do several years at once by restarting the running total for each year with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">partition_by</span><span style=\"color: #000000\">:</span></span></code> (more on that below):"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">1950</span><span style=\"color: #000000\"> | </span><span style=\"color: #098658\">1980</span><span style=\"color: #000000\"> | </span><span style=\"color: #098658\">2000</span><span style=\"color: #000000\"> | </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">running_total</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">sum_cumulative</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">) {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">partition_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">grand_total</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">sum_window</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">) {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">partition_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">} -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">running_total</span><span style=\"color: #000000\"> &lt;= </span><span style=\"color: #001080\">grand_total</span><span style=\"color: #000000\"> / </span><span style=\"color: #098658\">2</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names_covering_half</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">count</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "In 1950, a few dozen names covered half of all babies. By 2021, it took hundreds. Parents have been choosing more and more varied names."
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Window calculations with calculate:",
      "Moving averages"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">avg_moving</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">x</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">n</span><span style=\"color: #000000\">)</span></span></code> smooths a bumpy trend by averaging each row with the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">n</span></span></code> rows before it. Here's a 3-month moving average of sales, as a chart:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021 to 2023&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">three_month_avg</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">avg_moving</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\">, </span><span style=\"color: #098658\">2</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Window calculations with calculate:",
      "partition_by: restart the window for each group"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "By default, a calculation runs over <strong>all</strong> the rows of the result. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">partition_by</span><span style=\"color: #000000\">:</span></span></code> restarts it for each group. Here's a year-to-date running total that starts over every January:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;2021 to 2023&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">order_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">order_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">currency</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">ytd_sales</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">sum_cumulative</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_sales</span><span style=\"color: #000000\">) {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">partition_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">15</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Look at the row for January 2022. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">ytd_sales</span></span></code> starts over."
      },
      {
        "type": "p",
        "text": "The same idea works for names: year-over-year change <em>for each gender separately</em>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;Jordan&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #A31515\">f&#39;[1985 to 1995]&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">change_from_last_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> - </span><span style=\"color: #795E26\">lag</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">) {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">partition_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Calculations happen after <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>.</strong> A <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">:</span></span></code> only sees the rows that survived the query's filters. If you filter to 2022 and ask for <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">lag</span><span style=\"color: #000000\">()</span></span></code>, January 2022 has no \"previous month,\" even though December 2021 exists in the data. To compare with rows you don't want to <em>show</em>, compute in one stage and filter in the next stage of a pipeline."
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Window calculations with calculate:",
      "Calculations vs. all()"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Both give you numbers from \"other rows.\" So which should you use?"
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 12: Pipelines and Window Calculations",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\">:</span></span></code> inside a query adds fields for just that query."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">partition_by</span><span style=\"color: #000000\">:</span></span></code> restarts a calculation for each group, and an <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">:</span></span></code> inside the calculation sets its order separately from the result's order."
      },
      {
        "type": "p",
        "text": "A <strong>pipeline</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">-&gt; {...} -&gt; {...}</span></span></code>) feeds one stage's output into the next. Use it whenever a question needs \"first summarize, then summarize again.\""
      },
      {
        "type": "p",
        "text": "A pipeline can be turned into a <strong>source</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">x</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">s</span><span style=\"color: #000000\"> -&gt; {...} </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {...}</span></span></code>) or a multi-stage <strong>view</strong>."
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">:</span></span></code> runs window functions on the result rows, following the query's <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">:</span></span></code>: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">lag</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">lead</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">rank</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">row_number</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">sum_cumulative</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">avg_moving</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">sum_window</span></span></code>..."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 12.1: The #1 name each year.</strong> For girls, find the <strong>number-one name for each year</strong> from 2000 to 2021. Use <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">calculate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">r</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">rank</span><span style=\"color: #000000\">() { </span><span style=\"color: #AF00DB\">partition_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">desc</span><span style=\"color: #000000\"> }</span></span></code>, and then a <strong>second pipeline stage</strong> that keeps only rows where <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">r</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">1</span></span></code>. How many different names were #1?"
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 12.2: Biggest jump.</strong> Using <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">lag</span><span style=\"color: #000000\">()</span></span></code>, find the 10 <strong>year-to-year increases</strong> in births for the name <strong>Emma</strong> (girls only), largest first. Hint: compute the change in stage 1 (ordered by year), then sort by it in stage 2."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 12.3: Cumulative customers.</strong> In the e-commerce data, count <strong>new customers per month</strong> (customers whose first order was in that month). Then add a running total of customers over time with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">sum_cumulative</span></span></code>, and draw it as a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span></code>. (Hint: stage 1 groups by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">user_id</span></span></code> with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">first_order</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">min</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">)</span></span></code>. Stage 2 groups by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">first_order</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span></code>.)"
      }
    ],
    "path": "/textbook/12_pipelines_and_windows.malloynb"
  },
  {
    "titles": [
      "Chapter 13: Givens"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "So far every value in our queries has been written into the code: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;CA&#39;</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span></code>. But often the <em>same</em> analysis should run with <em>different</em> values: a report for each state, a dashboard where the user picks a date range, an app where each customer sees only their own data."
      },
      {
        "type": "p",
        "text": "<strong>Givens</strong> are named values that a Malloy model receives <strong>when a query runs</strong>. The model declares what it expects (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">given</span><span style=\"color: #000000\">:</span></span></code>), uses those values anywhere with a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">$</span></span></code> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">$STATE</span></span></code>), and whoever runs the query (VS Code, an app, a config file) supplies them."
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Experimental feature.</strong> Givens are new in Malloy and still marked <em>experimental</em>. To use them, a file must turn them on with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">##! </span><span style=\"color: #001080\">experimental</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">givens</span></span></code>. Details, and even the name \"given,\" may change in future versions. The examples here were tested with the version of Malloy used to build this book."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/experiments/givens\">Givens: model-level parameters</a> · <a href=\"https://docs.malloydata.dev/documentation/experiments/experiments\">Experimental features</a>"
      }
    ],
    "path": "/textbook/13_givens.malloynb"
  },
  {
    "titles": [
      "Chapter 13: Givens",
      "Turning givens on"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">##!</span></span></code> lines are <strong>compiler flags</strong> for the whole file. Put this one at the very top of a model or notebook:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">##! </span><span style=\"color: #001080\">experimental</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">givens</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names.malloy&quot;</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;ecommerce.malloy&quot;</span></span></pre>"
      }
    ],
    "path": "/textbook/13_givens.malloynb"
  },
  {
    "titles": [
      "Chapter 13: Givens",
      "Declaring givens"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">given</span><span style=\"color: #000000\">:</span></span></code> block lists each value's <strong>name</strong>, <strong>type</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">::</span></span></code>), and optional <strong>default</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">is</span></span></code>). By convention, given names are written in CAPITALS so they stand out:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">given</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">FOCUS_STATE</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;OR&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">FOCUS_NAME</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;Olivia&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">START_YEAR</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #098658\">2000</span></span></pre>"
      }
    ],
    "path": "/textbook/13_givens.malloynb"
  },
  {
    "titles": [
      "Chapter 13: Givens",
      "Using givens with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">$</span></span></code>"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Use a given anywhere an expression can go, by putting a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">$</span></span></code> in front of its name. (One exception in the Malloy version used for this book: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">:</span></span></code> needs a plain number, so <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">$TOP_N</span></span></code> doesn't work.)"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">$FOCUS_STATE</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> &gt;= </span><span style=\"color: #001080\">$START_YEAR</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "Here's the payoff. To get the same report for Texas, you don't touch the query. Change the <strong>value</strong> of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">FOCUS_STATE</span></span></code>, and every query that uses it follows. In a notebook, you change the value by editing the default in the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">given</span><span style=\"color: #000000\">:</span></span></code> cell and re-running. In an application, the app supplies the value (see below)."
      },
      {
        "type": "p",
        "text": "Givens work just as well inside sources and views. Here's a source that is <em>always</em> focused on the given state, and a view that compares the given name with the rest of that state:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">focus</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">$FOCUS_STATE</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">view</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name_vs_state</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">name_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">$FOCUS_NAME</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">all_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;0&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">      </span><span style=\"color: #001080\">per_100k</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">$FOCUS_NAME</span><span style=\"color: #000000\"> } / </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> * </span><span style=\"color: #098658\">100000</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">decade</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  }</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span><span style=\"color: #000000\"> { </span><span style=\"color: #001080\">y</span><span style=\"color: #000000\">=</span><span style=\"color: #001080\">per_100k</span><span style=\"color: #000000\"> }</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">focus</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">name_vs_state</span></span></pre>"
      },
      {
        "type": "p",
        "text": "That's <em>Olivia</em> per 100,000 babies in <em>Oregon</em>, by decade. Edit the two defaults above, re-run, and you have a different report without writing a new query."
      }
    ],
    "path": "/textbook/13_givens.malloynb"
  },
  {
    "titles": [
      "Chapter 13: Givens",
      "Given types"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A given can be any Malloy type, including <strong>arrays</strong> and even <strong>filter expressions</strong>:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">given</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">STATES</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">[] </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> [</span><span style=\"color: #A31515\">&#39;UT&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;ID&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;MT&#39;</span><span style=\"color: #000000\">, </span><span style=\"color: #A31515\">&#39;WY&#39;</span><span style=\"color: #000000\">]</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">NAME_FILTER</span><span style=\"color: #000000\"> :: </span><span style=\"color: #AF00DB\">filter</span><span style=\"color: #000000\">&lt;</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">&gt; </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">f&#39;Ja%, -Jason&#39;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">CUTOFF</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">date</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #098658\">@2022-07-01</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> in </span><span style=\"color: #001080\">$STATES</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #001080\">$NAME_FILTER</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> &gt;= </span><span style=\"color: #098658\">2010</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "A <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">filter</span><span style=\"color: #000000\">&lt;</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">&gt;</span></span></code> given is especially powerful. The <strong>user</strong> can type a whole <a href=\"08_filtering#part-3-filter-expressions\">filter expression</a> like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">Ja</span><span style=\"color: #000000\">%, -</span><span style=\"color: #001080\">Jason</span></span></code> or <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">Em</span><span style=\"color: #000000\">%, </span><span style=\"color: #001080\">Ol</span><span style=\"color: #000000\">%</span></span></code>, and your model applies it safely, without anyone writing code."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">::</span><span style=\"color: #0000FF\">date</span><span style=\"color: #000000\"> &gt;= </span><span style=\"color: #001080\">$CUTOFF</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">created_at</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_sales</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">order_month</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/13_givens.malloynb"
  },
  {
    "titles": [
      "Chapter 13: Givens",
      "Supplying values from outside the notebook"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Defaults are what you get when no one supplies a value. Applications and tools can supply values in several ways (see the <a href=\"https://docs.malloydata.dev/documentation/experiments/givens#supplying-values-from-a-host-application\">docs</a> for the full details):"
      },
      {
        "type": "p",
        "text": "<strong>A JSON values file</strong>, pointed to by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">config</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">json</span></span></code>. Each key is a given's name:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-json\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">{</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #0451A5\">&quot;connections&quot;</span><span style=\"color: #000000\">: { </span><span style=\"color: #0451A5\">&quot;duckdb&quot;</span><span style=\"color: #000000\">: { </span><span style=\"color: #0451A5\">&quot;is&quot;</span><span style=\"color: #000000\">: </span><span style=\"color: #A31515\">&quot;duckdb&quot;</span><span style=\"color: #000000\"> } },</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #0451A5\">&quot;givensPath&quot;</span><span style=\"color: #000000\">: </span><span style=\"color: #A31515\">&quot;./my-givens.json&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-json\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">{</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #0451A5\">&quot;FOCUS_STATE&quot;</span><span style=\"color: #000000\">: </span><span style=\"color: #A31515\">&quot;TX&quot;</span><span style=\"color: #000000\">,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #0451A5\">&quot;FOCUS_NAME&quot;</span><span style=\"color: #000000\">: </span><span style=\"color: #A31515\">&quot;Sofia&quot;</span><span style=\"color: #000000\">,</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #0451A5\">&quot;START_YEAR&quot;</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">2010</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<strong>From code</strong>, for example in a web app that uses the Malloy JavaScript API: <code>new Runtime({ givens: { FOCUS_STATE: \"TX\" } })</code> for the whole runtime, or <code>query.run({ givens: { START_YEAR: 2015 } })</code> for a single query."
      },
      {
        "type": "p",
        "text": "💡 <strong>A given with no default must be supplied.</strong> <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">TENANT</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">string</span></span></code> (no <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> ...</span></span></code>) means \"the app <em>must</em> provide this.\" If a query uses <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">$TENANT</span></span></code> and nobody supplied it, the query fails with a \"missing given\" error. That's exactly what you want for security-sensitive values."
      }
    ],
    "path": "/textbook/13_givens.malloynb"
  },
  {
    "titles": [
      "Chapter 13: Givens",
      "A real use: row-level security"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "The motivating use for givens is <strong>row-level access control</strong>: one model, many users, each allowed to see only some of the rows. The model writes the rule once:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">##! </span><span style=\"color: #001080\">experimental</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">givens</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">given</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">ALLOWED_STATES</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">[]        </span><span style=\"color: #008000\">// no default: the app MUST supply it</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">secure_names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/usa_names.parquet&#39;</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> in </span><span style=\"color: #001080\">$ALLOWED_STATES</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "The web application looks up the logged-in user's permissions and supplies <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">ALLOWED_STATES</span></span></code> for every query. Since the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code> is part of the <strong>source</strong>, no query, view, or Explorer session built on <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">secure_names</span></span></code> can see other states. Applications can even <em>finalize</em> a given (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #A31515\">&quot;finalizeGivens&quot;</span><span style=\"color: #000000\">: [</span><span style=\"color: #A31515\">&quot;ALLOWED_STATES&quot;</span><span style=\"color: #000000\">]</span></span></code> in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">config</span><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">json</span></span></code>) so a query can never override it."
      }
    ],
    "path": "/textbook/13_givens.malloynb"
  },
  {
    "titles": [
      "Chapter 13: Givens",
      "Inline givens: values derived from other givens"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "An <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inline</span></span></code> given is computed from other givens when the query is compiled, and it reaches the SQL as a plain constant. Its main use is turning a list of permissions into a yes/no switch:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">given</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">CAPABILITIES</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">[]</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">inline</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">CAN_SEE_SALES</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">boolean</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;read_sales&#39;</span><span style=\"color: #000000\"> in </span><span style=\"color: #001080\">$CAPABILITIES</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">secure_orders</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">order_items</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">$CAN_SEE_SALES</span><span style=\"color: #000000\">        </span><span style=\"color: #008000\">// becomes WHERE ... AND TRUE (or FALSE)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/13_givens.malloynb"
  },
  {
    "titles": [
      "Chapter 13: Givens",
      "Givens vs. source parameters"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Malloy also has (experimental) <strong>source parameters</strong>: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #795E26\">by_state</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">st</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">st</span><span style=\"color: #000000\"> }</span></span></code>. How are they different?"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/experiments/parameters\">Source parameters</a>"
      }
    ],
    "path": "/textbook/13_givens.malloynb"
  },
  {
    "titles": [
      "Chapter 13: Givens",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Main uses: reusable reports, user-chosen filters, and row-level security."
      },
      {
        "type": "p",
        "text": "Turn givens on with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">##! </span><span style=\"color: #001080\">experimental</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">givens</span></span></code>."
      },
      {
        "type": "p",
        "text": "Defaults are used unless a value is supplied by a values file, the app's runtime, or per-query options. A given with no default <em>must</em> be supplied."
      },
      {
        "type": "p",
        "text": "Givens can be strings, numbers, dates, booleans, arrays (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">in </span><span style=\"color: #001080\">$ARRAY</span></span></code>), and filter expressions (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">~ </span><span style=\"color: #001080\">$FILTER</span></span></code>)."
      },
      {
        "type": "p",
        "text": "Declare them with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">given</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">NAME</span><span style=\"color: #000000\"> :: </span><span style=\"color: #001080\">type</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">default</span></span></code>, and use them with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">$NAME</span></span></code> anywhere an expression can go: in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">:</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code>, measures, sources, and views."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 13.1: Your state, your name.</strong> Change the defaults of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">FOCUS_STATE</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">FOCUS_NAME</span></span></code> in this notebook to your home state and your own name (or any name), then re-run the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_vs_state</span></span></code> chart. What decade was your name most popular in your state?"
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 13.2: A minimum-size given.</strong> Declare a new given, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">MIN_BIRTHS</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #098658\">10000</span></span></code>, in a new cell. Then write a query that lists girls' names born since <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">$START_YEAR</span></span></code> in the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">$STATES</span></span></code> states, but only names with more than <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">$MIN_BIRTHS</span></span></code> births in total. (Hint: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">having</span><span style=\"color: #000000\">:</span></span></code>.)"
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 13.3: A filter the user can type.</strong> Declare <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">STATUS_FILTER</span><span style=\"color: #000000\"> :: </span><span style=\"color: #AF00DB\">filter</span><span style=\"color: #000000\">&lt;</span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\">&gt; </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">f&#39;Complete, Shipped&#39;</span></span></code>. Write a query on <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_items</span></span></code> that uses <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">status</span><span style=\"color: #000000\"> ~ </span><span style=\"color: #001080\">$STATUS_FILTER</span></span></code> and shows <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_item_count</span></span></code> by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">status</span></span></code>. Then change the default to <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #A31515\">f&#39;-Cancelled&#39;</span></span></code> and run it again. What changed?"
      }
    ],
    "path": "/textbook/13_givens.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You've now met every major part of a Malloy model. This last chapter puts them all together in one file, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_full</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> (it's in the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">malloy</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">textbook</span><span style=\"color: #000000\">-</span><span style=\"color: #001080\">notebooks</span></span></code> folder), and walks through it section by section. Use this chapter as a <strong>review</strong> and as a <strong>checklist</strong> when you build your own models."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/user_guides/quickstart_modeling\">Building a semantic model</a> · <a href=\"https://docs.malloydata.dev/documentation/language/statement\">Models</a> · <a href=\"https://docs.malloydata.dev/documentation/language/source\">Sources</a> · <a href=\"https://docs.malloydata.dev/documentation/language/fields\">Fields</a>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&quot;names_full.malloy&quot;</span></span></pre>"
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "1. Compiler flags"
    ],
    "paragraphs": [
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">##! </span><span style=\"color: #001080\">experimental</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">givens</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">##!</span></span></code> lines at the top of a file turn on compiler features for that file. Only experimental features need them. Right now that's givens (and, in older versions, things like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">partition_by</span><span style=\"color: #000000\">:</span></span></code>)."
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "2. Documentation"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A model is read by people, by the Explorer, and more and more by AI assistants. Two kinds of documentation help them:"
      },
      {
        "type": "p",
        "text": "<strong><code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">//</span></span></code> comments</strong> are for people reading the <em>code</em>: why a choice was made, what a section is for. The compiler ignores them."
      },
      {
        "type": "p",
        "text": "<strong><code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">#&quot;</span></span></code> descriptions</strong> attach to the <em>next object</em> (a source, field, view, or given). Tools can read them: the Explorer shows them when you hover over a field, and AI tools that query the model see them too."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">#&quot; U.S. baby names: one row per state, gender, birth year, and name (1910–2021).</span></span>\n<span class=\"line\"><span style=\"color: #008000\">#&quot; Source: U.S. Social Security Administration. Names given to fewer than 5</span></span>\n<span class=\"line\"><span style=\"color: #008000\">#&quot; babies in a state and year are not included.</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/usa_names.parquet&#39;</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #008000\">#&quot; The decade a baby was born in, e.g. 1990.</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">decade</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">floor</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> / </span><span style=\"color: #098658\">10</span><span style=\"color: #000000\">) * </span><span style=\"color: #098658\">10</span></span></pre>"
      },
      {
        "type": "p",
        "text": "💡 <strong>Good descriptions say what a field <em>means</em>, not what the code does.</strong> \"Births to girls\" is better than \"sum of births where gender = F.\" Also note the grain (\"one row per...\") and the source of the data on every source."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> <a href=\"https://docs.malloydata.dev/documentation/language/tags\">Annotations</a> · <a href=\"https://docs.malloydata.dev/documentation/language/statement#comments\">Comments</a>"
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "3. Givens"
    ],
    "paragraphs": [
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">given</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #008000\">#&quot; Two-letter code of the state the `home_state_names` source focuses on.</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #001080\">HOME_STATE</span><span style=\"color: #000000\"> :: </span><span style=\"color: #0000FF\">string</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #A31515\">&#39;OR&#39;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">home_state_names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">$HOME_STATE</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "The model declares the values it needs from outside, near the top where they're easy to find. Here <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">home_state_names</span></span></code> follows whatever <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">HOME_STATE</span></span></code> is set to:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">home_state_names</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\">, </span><span style=\"color: #AF00DB\">limit</span><span style=\"color: #000000\">: </span><span style=\"color: #098658\">5</span><span style=\"color: #000000\"> }</span></span></pre>"
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "4. Sources"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "A model usually has three kinds of sources:"
      },
      {
        "type": "p",
        "text": "<strong>Base sources</strong> read a table or file: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/usa_names.parquet&#39;</span><span style=\"color: #000000\">)</span></span></code>, or the CSV <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/state_regions.csv&#39;</span><span style=\"color: #000000\">)</span></span></code>."
      },
      {
        "type": "p",
        "text": "<strong>SQL sources</strong> run any SQL your database understands: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000FF\">.</span><span style=\"color: #AF00DB\">sql</span><span style=\"color: #000000FF\">(</span><span style=\"color: #000000FF\">&quot;</span><span style=\"color: #0000FF\">SELECT</span><span style=\"color: #000000FF\"> ...</span><span style=\"color: #000000FF\">&quot;</span><span style=\"color: #000000FF\">)</span></span></code> (<a href=\"09_data_cleaning\">Chapter 9</a>)."
      },
      {
        "type": "p",
        "text": "<strong>Query sources</strong> are built from another source's query: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_summary</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {...} </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {...}</span></span></code> (<a href=\"12_pipelines_and_windows\">Chapter 12</a>)."
      },
      {
        "type": "p",
        "text": "Any of them can be <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">extend</span></span></code>ed with fields, joins, and views."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name_summary</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">lifetime_births</span><span style=\"color: #000000\"> &gt; </span><span style=\"color: #098658\">100000</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">gender</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">summary_name_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #0000FF\">number</span><span style=\"color: #000000\">=</span><span style=\"color: #A31515\">&quot;0.0&quot;</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">avg_years_in_use</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">years_in_use</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">avg</span><span style=\"color: #000000\">()</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "5. Primary keys and joins"
    ],
    "paragraphs": [
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">states</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/state_regions.csv&#39;</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">primary_key</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">state_code</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">source</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">duckdb</span><span style=\"color: #000000\">.</span><span style=\"color: #795E26\">table</span><span style=\"color: #000000\">(</span><span style=\"color: #A31515\">&#39;data/usa_names.parquet&#39;</span><span style=\"color: #000000\">) </span><span style=\"color: #AF00DB\">extend</span><span style=\"color: #000000\"> {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">join_one</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">states</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">on</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">state</span><span style=\"color: #000000\"> = </span><span style=\"color: #001080\">states</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">state_code</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">dimension</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">region</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">states</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">region</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  ...</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">states</span></span></code> is a small <strong>dimension table</strong>: one row per state, with its Census region and division. Every <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> row matches exactly one state, so it's a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">join_one</span></span></code>. The primary key lets symmetric aggregates count each state once (<a href=\"10_joins\">Chapter 10</a>). Promoting <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">states</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">region</span></span></code> to a dimension called <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">region</span></span></code> makes the most useful joined field easy to find."
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">region</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">states</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">division</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">states</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">state_count</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">region</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "6. Renames, dimensions, and measures"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<strong>Measures</strong> are aggregates. Good models include:"
      },
      {
        "type": "p",
        "text": "<strong>Renames</strong> fix awkward raw column names: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">rename</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">`year`</span></span></code>."
      },
      {
        "type": "p",
        "text": "base measures: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_count</span></span></code>"
      },
      {
        "type": "p",
        "text": "<strong>Dimensions</strong> are per-row values you group by and filter on: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">decade</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_length</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">generation</span></span></code>."
      },
      {
        "type": "p",
        "text": "<strong>filtered measures</strong> for common slices: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">girls</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">boys</span></span></code> (<a href=\"08_filtering\">Chapter 8</a>)"
      },
      {
        "type": "p",
        "text": "<strong>ratio measures</strong> using <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code>: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">share_of_births</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">births_per_100k</span></span></code> (<a href=\"11_percent_of_total\">Chapter 11</a>)"
      },
      {
        "type": "p",
        "text": "Because they live in the model, every query, notebook, and Explorer session uses the same definitions:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; {</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">group_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">generation</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">aggregate</span><span style=\"color: #000000\">:</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">girls</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">boys</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">share_of_births</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    # </span><span style=\"color: #001080\">hidden</span></span>\n<span class=\"line\"><span style=\"color: #000000\">    </span><span style=\"color: #001080\">first_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #795E26\">min</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"><span style=\"color: #000000\">  </span><span style=\"color: #AF00DB\">order_by</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">first_year</span></span>\n<span class=\"line\"><span style=\"color: #000000\">}</span></span></pre>"
      },
      {
        "type": "p",
        "text": "(The <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">hidden</span></span></code> tag keeps <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">first_year</span></span></code> out of the display, but the query can still sort by it, so the generations come out in time order instead of alphabetically.)"
      },
      {
        "type": "p",
        "text": "💡 <strong>Limiting what users see.</strong> In a bigger model, you may want to hide helper fields. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">accept</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">a</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">b</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">c</span></span></code> keeps only the listed fields, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">except</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">x</span><span style=\"color: #000000\">, </span><span style=\"color: #001080\">y</span></span></code> removes fields. See <a href=\"https://docs.malloydata.dev/documentation/language/source#limiting-access-to-fields\">Limiting access to fields</a>."
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "7. Render tags in the model"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Format and chart tags written in the model apply everywhere a field or view is used:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">percent</span></span>\n<span class=\"line\"><span style=\"color: #001080\">share_of_births</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\"> / </span><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">(</span><span style=\"color: #001080\">total_births</span><span style=\"color: #000000\">)</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">line_chart</span></span>\n<span class=\"line\"><span style=\"color: #AF00DB\">view</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">by_year</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> { ... }</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">by_year</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;Ava&#39;</span><span style=\"color: #000000\"> }</span></span></pre>"
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "8. Views"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Views are the model's ready-made answers. <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_full</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> has every kind:"
      },
      {
        "type": "p",
        "text": "<strong>a dashboard view</strong> made of nests: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_report</span></span></code>"
      },
      {
        "type": "p",
        "text": "<strong>a multi-stage view</strong> with window calculations: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_for_half_by_decade</span></span></code>"
      },
      {
        "type": "p",
        "text": "<strong>simple views</strong>: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_name</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_year</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">by_region</span></span></code>"
      },
      {
        "type": "p",
        "text": "A dashboard view plus refinement gives a whole report in one line:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">name_report</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">name</span><span style=\"color: #000000\"> = </span><span style=\"color: #A31515\">&#39;Harper&#39;</span><span style=\"color: #000000\"> }</span></span></pre>"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">names_for_half_by_decade</span></span></pre>"
      },
      {
        "type": "p",
        "text": "It took about 60 names to cover half of all births in each decade from the 1910s to the 1950s. Since then the number has climbed, and it has quadrupled since the 1980s."
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "9. Named queries"
    ],
    "paragraphs": [
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">query</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_names_2021</span><span style=\"color: #000000\"> </span><span style=\"color: #AF00DB\">is</span><span style=\"color: #000000\"> </span><span style=\"color: #001080\">names</span><span style=\"color: #000000\"> -&gt; </span><span style=\"color: #001080\">by_name</span><span style=\"color: #000000\"> + { </span><span style=\"color: #AF00DB\">where</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">year_born</span><span style=\"color: #000000\"> = </span><span style=\"color: #098658\">2021</span><span style=\"color: #000000\"> }</span></span></pre>"
      },
      {
        "type": "p",
        "text": "A named query is a finished question with a name, ready to be run by tools, scheduled, or referenced by other queries:"
      },
      {
        "type": "code",
        "text": "<pre class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">run</span><span style=\"color: #000000\">: </span><span style=\"color: #001080\">top_names_2021</span></span></pre>"
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "A checklist for your own models"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "When you build a model, run through this list:"
      },
      {
        "type": "p",
        "text": "☐ Every table you join has a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">primary_key</span><span style=\"color: #000000\">:</span></span></code>."
      },
      {
        "type": "p",
        "text": "☐ The important business numbers are <strong>measures</strong>, with filtered and ratio versions of the common ones."
      },
      {
        "type": "p",
        "text": "☐ Common questions are <strong>views</strong>, and one dashboard view gives a quick overview."
      },
      {
        "type": "p",
        "text": "☐ Values that should change at run time are <strong>givens</strong>, declared near the top."
      },
      {
        "type": "p",
        "text": "☐ Number formats (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">currency</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">percent</span></span></code>) are on the measures, not repeated in every query."
      },
      {
        "type": "p",
        "text": "☐ Notebooks <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #AF00DB\">import</span></span></code> the model, and contain narrative and questions, not definitions (<a href=\"05_files_and_notebooks\">Chapter 5</a>)."
      },
      {
        "type": "p",
        "text": "☐ Every source has a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">#&quot;</span></span></code> description that says <strong>what one row is</strong> and <strong>where the data comes from</strong>."
      },
      {
        "type": "p",
        "text": "☐ Awkward raw columns are <strong>renamed</strong>, and messy columns are <strong>cleaned</strong> in dimensions (<a href=\"09_data_cleaning\">Chapter 9</a>)."
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Chapter 14: Anatomy of a Malloy Model",
      "Key takeaways"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Logic lives in <strong>one place</strong> (the model), so every notebook, the Explorer, and every app agree on what the numbers mean."
      },
      {
        "type": "p",
        "text": "Document with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">//</span></span></code> for people reading code and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">#&quot;</span></span></code> for tools and users."
      },
      {
        "type": "p",
        "text": "A Malloy model is a set of documented <strong>sources</strong>, each with <strong>joins</strong>, <strong>dimensions</strong>, <strong>measures</strong>, and <strong>views</strong>, plus optional <strong>givens</strong> and <strong>named queries</strong>."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 14.1: Extend the full model.</strong> Open <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_full</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> and add to the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> source: (a) a dimension <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">starts_with_vowel</span></span></code> that is true when the name starts with A, E, I, O, or U, and (b) a measure <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">avg_name_length</span></span></code> (the average of <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">name_length</span></span></code>). Give each one a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">#&quot;</span></span></code> description. Save the file, re-run this notebook's import cell, and write a query that shows <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">avg_name_length</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">share_of_births</span></span></code> by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">starts_with_vowel</span></span></code> for each <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">decade</span></span></code>."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 14.2: A view for the Explorer.</strong> Add a view called <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">region_report</span></span></code> to <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names</span></span></code> in <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_full</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>. It should be a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">dashboard</span></span></code> with <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">total_births</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">share_of_births</span></span></code> at the top, a <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">bar_chart</span></span></code> of births by <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">states</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">division</span></span></code>, and the top 5 names. Open the Explorer on <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">names_full</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code> and run your view from the <strong>Views</strong> list."
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge 14.3: Capstone — model the store.</strong> Create a new file, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">my_ecommerce</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloy</span></span></code>, that imports nothing and models the e-commerce data from scratch: sources for <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">order_items</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">users</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">inventory_items</span></span></code>, and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">products</span></span></code> with primary keys, joins, at least 3 documented dimensions, at least 4 documented measures (including one filtered measure, one <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> ratio, and one <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\"># </span><span style=\"color: #001080\">currency</span></span></code>), at least 2 views (one nested), and one given. Then write a short notebook, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">my_ecommerce_report</span><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloynb</span></span></code>, that imports your model and tells a story about the business in 3–5 Markdown + Malloy cells."
      }
    ],
    "path": "/textbook/14_model_review.malloynb"
  },
  {
    "titles": [
      "Learning Malloy"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Welcome! This textbook teaches you to analyze data with <strong>Malloy</strong>, an open-source language for describing data and asking questions of it. Malloy compiles to SQL and runs on databases such as DuckDB, BigQuery, Snowflake, and Postgres. You write less code than in SQL, and the code is easier to reuse."
      },
      {
        "type": "p",
        "text": "You'll learn Malloy the way analysts actually use it: by asking real questions of real data, one small step at a time. Every query on this site actually ran when the site was built. Each result has <strong>HTML</strong>, <strong>JSON</strong>, and <strong>SQL</strong> buttons, so you can see the SQL that Malloy wrote for you."
      }
    ],
    "path": "/textbook/index.malloynb"
  },
  {
    "titles": [
      "Learning Malloy",
      "How this book works"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "Every chapter exists in two forms:"
      },
      {
        "type": "p",
        "text": "<strong>A web page</strong> (what you're reading now), with the query results already filled in."
      },
      {
        "type": "p",
        "text": "<strong>A Malloy notebook</strong> (<code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #001080\">malloynb</span></span></code> file) that you open in VS Code and run yourself. The notebooks have their own GitHub repository: <a href=\"https://github.com/mrtimo/malloy-textbook-notebooks\">mrtimo/malloy-textbook-notebooks</a>."
      },
      {
        "type": "p",
        "text": "Read the web page to learn. Open the notebook to practice. The <strong>Open in VS Code</strong> button at the top of each chapter opens that chapter's notebook in <a href=\"https://github.dev\">github.dev</a>, a free copy of VS Code that runs in your browser."
      },
      {
        "type": "p",
        "text": "💡 <strong>Fast start.</strong> Want to run queries right now? Go to <a href=\"05_files_and_notebooks#setting-up-your-environment\">Chapter 5</a> for the full setup. The short version: install VS Code, install the <strong>Malloy</strong> extension, then download the <a href=\"https://github.com/mrtimo/malloy-textbook-notebooks\">notebooks repository</a> and open its folder <em>as the workspace root</em>. That's it. DuckDB is built into the extension."
      }
    ],
    "path": "/textbook/index.malloynb"
  },
  {
    "titles": [
      "Learning Malloy",
      "The datasets"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "We use two datasets throughout the book. Both ship with the notebooks in the <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">data</span><span style=\"color: #000000\">/</span></span></code> folder."
      },
      {
        "type": "p",
        "text": "We also use a few small CSV files filled with deliberately messy fake data for the <a href=\"09_data_cleaning\">data cleaning chapter</a>."
      }
    ],
    "path": "/textbook/index.malloynb"
  },
  {
    "titles": [
      "Learning Malloy",
      "Conventions"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "You will see a few kinds of colored boxes:"
      },
      {
        "type": "p",
        "text": "🎯 <strong>Challenge.</strong> Green boxes are challenges. Try them yourself, usually by adding a new cell to the chapter's notebook."
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> Blue boxes link to the matching page of the official <a href=\"https://docs.malloydata.dev/documentation/\">Malloy documentation</a>."
      },
      {
        "type": "p",
        "text": "💡 <strong>Tip.</strong> Yellow boxes are tips and shortcuts."
      },
      {
        "type": "p",
        "text": "⚠️ <strong>Watch out.</strong> Red boxes warn about common mistakes."
      },
      {
        "type": "p",
        "text": "💡 <strong>About <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">#(docs)</span></span></code> lines.</strong> Some code cells start with a line like <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #008000\">#(docs) size=large limit=5000</span></span></code>. These lines only tell <em>this website</em> how big to draw a result and how many rows to show. Malloy in VS Code ignores them. You can leave them in or delete them."
      }
    ],
    "path": "/textbook/index.malloynb"
  },
  {
    "titles": [
      "Learning Malloy",
      "Chapters"
    ],
    "paragraphs": [
      {
        "type": "p",
        "text": "<strong>Part I · Foundations</strong>"
      },
      {
        "type": "p",
        "text": "<a href=\"01_basics\">The Basics</a>: sources, queries, dimensions, and measures"
      },
      {
        "type": "p",
        "text": "<a href=\"03_views_and_nesting\">Views and Nesting</a>: reusable queries and nested results"
      },
      {
        "type": "p",
        "text": "<a href=\"04_render_tags\">Render Tags</a>: charts, dashboards, and number formats"
      },
      {
        "type": "p",
        "text": "<a href=\"02_time_truncation\">Time Truncation</a>: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">month</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">quarter</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #000000\">.</span><span style=\"color: #0000FF\">year</span></span></code>, and trends"
      },
      {
        "type": "p",
        "text": "<strong>Part II · Tools and Data</strong>"
      },
      {
        "type": "p",
        "text": "<a href=\"05_files_and_notebooks\">Malloy Files vs. Notebooks</a>: setting up VS Code and DuckDB"
      },
      {
        "type": "p",
        "text": "<a href=\"06_explorer\">The Malloy Explorer</a>: building queries by pointing and clicking"
      },
      {
        "type": "p",
        "text": "<a href=\"07_csv_and_parquet\">CSV and Parquet</a>: file formats, compression, and reading data over the network"
      },
      {
        "type": "p",
        "text": "<strong>Part III · Analysis</strong>"
      },
      {
        "type": "p",
        "text": "<a href=\"08_filtering\">Filtering and Time Comparisons</a>: filter expressions and period-over-period analysis"
      },
      {
        "type": "p",
        "text": "<a href=\"09_data_cleaning\">Data Cleaning</a>: fixing messy text, numbers, and dates"
      },
      {
        "type": "p",
        "text": "<a href=\"10_joins\">Joins and Symmetric Aggregates</a>: star schemas without double counting"
      },
      {
        "type": "p",
        "text": "<a href=\"11_percent_of_total\">Percent of Total</a>: <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">all</span><span style=\"color: #000000\">()</span></span></code> and <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #795E26\">exclude</span><span style=\"color: #000000\">()</span></span></code>"
      },
      {
        "type": "p",
        "text": "<a href=\"12_pipelines_and_windows\">Pipelines and Window Calculations</a>: multi-stage queries, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">lag</span></span></code>, <code class=\"language-malloy\" style=\"background-color: #FBFBFB\"><span class=\"line\"><span style=\"color: #001080\">rank</span></span></code>, and running totals"
      },
      {
        "type": "p",
        "text": "<strong>Part IV · Modeling</strong>"
      },
      {
        "type": "p",
        "text": "<a href=\"13_givens\">Givens</a>: values your model receives when a query runs"
      },
      {
        "type": "p",
        "text": "<a href=\"14_model_review\">Anatomy of a Malloy Model</a>: putting all the pieces together"
      },
      {
        "type": "p",
        "text": "📘 <strong>Malloy docs.</strong> The official documentation is at <a href=\"https://docs.malloydata.dev/documentation/\">docs.malloydata.dev</a>. Keep it open in another tab. Every chapter links to the pages that go deeper."
      }
    ],
    "path": "/textbook/index.malloynb"
  }
]