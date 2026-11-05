import re, sys
S = sys.argv[1]
src = open(f"{S}/sources.malloy").read()
blocks = {}
for b in re.split(r"^// ===== ", src, flags=re.M):
    if b.strip():
        k, body = b.split("\n", 1)
        blocks[k.strip()] = body.strip()

# key, title, emoji, phrase, rows, format/size, host label, host url, try-it
D = [
 ("penguins", "Palmer Penguins", "🐧", "Body measurements of 344 Antarctic penguins from three species.", "344", "CSV · 15 KB", "GitHub: allisonhorst/palmerpenguins", "https://github.com/allisonhorst/palmerpenguins",
  "Compare `flipper_length` by `sex` within each species. The numbers come in as text because missing values are written `NA`, so the source uses a safe cast (`:::`) to turn `NA` into null."),
 ("pokemon", "Pokémon", "⚡", "Battle stats for 1,215 Pokémon and their alternate forms, Generations 1–9.", "1,215", "CSV · 74 KB", "GitHub: lgreski/pokemonData", "https://github.com/lgreski/pokemonData",
  "Which `Generation` has the strongest Pokémon on average? Column names with spaces or dots, like `` `Sp. Atk` ``, need backticks."),
 ("gapminder", "Gapminder", "🌍", "Life expectancy, population and GDP per person for 142 countries, 1952–2007.", "1,704", "TSV · 82 KB", "GitHub: jennybc/gapminder", "https://github.com/jennybc/gapminder",
  "Change the chart to `avg_life_expectancy` by `country` for one continent. Which country improved the most?"),
 ("coffee", "Coffee Quality Ratings", "☕", "Expert cupping scores for 1,339 coffees from the Coffee Quality Institute.", "1,339", "CSV · 0.6 MB", "TidyTuesday 2020-07-07", "https://github.com/rfordatascience/tidytuesday/tree/main/data/2020/2020-07-07",
  "Group by `processing_method` or `variety` instead. Does washed coffee score higher than natural?"),
 ("squirrels", "Central Park Squirrel Census", "🐿️", "Every squirrel spotted in New York's Central Park during the 2018 census.", "3,023", "CSV · 0.8 MB", "TidyTuesday 2019-10-29 (NYC Open Data)", "https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-10-29",
  "Do squirrels behave differently in the morning and afternoon? Group by `shift` and add measures for `eating` and `chasing`."),
 ("eurovision", "Eurovision Song Contest", "🎤", "Every Eurovision entry and result, 1956–2022.", "2,005", "CSV · 0.5 MB", "TidyTuesday 2022-05-17", "https://github.com/rfordatascience/tidytuesday/tree/main/data/2022/2022-05-17",
  "Which countries host most often? Group by `host_country` and count the distinct `year` values."),
 ("lego", "LEGO Sets", "🧱", "Every LEGO set released from 1949 to 2022, with its piece count.", "19,798", "CSV.GZ · 0.4 MB", "TidyTuesday 2022-09-06 (Rebrickable)", "https://github.com/rfordatascience/tidytuesday/tree/main/data/2022/2022-09-06",
  "Add `# line_chart` above the `run:` to see sets getting bigger over time. DuckDB reads the gzipped CSV directly."),
 ("netflix", "Netflix Titles", "🎬", "About 7,800 movies and TV shows on Netflix as of 2021.", "7,787", "CSV · 3 MB", "TidyTuesday 2021-04-20", "https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-04-20",
  "Group by `rating`, or by `country`. `date_added` is text like “April 15, 2018”, a good data-cleaning exercise."),
 ("adult", "Adult Census Income", "💼", "32,561 records from the 1994 U.S. Census, used to predict who earns over $50K.", "32,561", "CSV · 4 MB", "Hugging Face: scikit-learn/adult-census-income", "https://huggingface.co/datasets/scikit-learn/adult-census-income",
  "Swap `education` for `occupation`, or add `sex` to the `group_by:`. Hugging Face links use `/resolve/main/`."),
 ("quakes", "USGS Earthquakes (live)", "🌋", "Every earthquake recorded worldwide in the past 30 days, updated every minute.", "~10,000", "CSV · ~4 MB · live", "U.S. Geological Survey", "https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php",
  "This feed changes every time you run it! Find the 10 biggest quakes with `select: quake_time, mag, place` and `order_by: mag desc`."),
 ("tornadoes", "U.S. Tornadoes", "🌪️", "Every U.S. tornado since 1950, with strength, path length, injuries and deaths.", "68,693", "CSV · 9.5 MB", "TidyTuesday 2023-05-16 (NOAA Storm Prediction Center)", "https://github.com/rfordatascience/tidytuesday/tree/main/data/2023/2023-05-16",
  "Which `state` has the most tornadoes? Which `mo` (month) is the peak? `mag` is the (E)F scale, and −9 means unknown."),
 ("power", "Global Power Plants", "🔌", "About 35,000 power plants worldwide, with fuel type and capacity.", "34,936", "CSV · 12 MB", "GitHub: wri/global-power-plant-database", "https://github.com/wri/global-power-plant-database",
  "Add `country_long` to the `group_by:` and `where: primary_fuel = 'Solar'`. Who has the most solar capacity?"),
 ("co2", "CO₂ Emissions", "🏭", "CO₂ emissions, energy use and population for every country since 1750.", "50,411", "CSV · 14 MB", "GitHub: owid/co2-data (Our World in Data)", "https://github.com/owid/co2-data",
  "Change the year to 1990 and compare. Then try `co2_per_capita` over time for a few countries."),
 ("ufo", "UFO Sightings", "🛸", "80,000 UFO sightings reported to NUFORC, with shape and duration.", "80,332", "CSV · 14 MB", "TidyTuesday 2019-06-25", "https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-06-25",
  "Which `state` reports the most sightings? Does the favorite `ufo_shape` differ by state? (Try `nest:`.)"),
 ("spotify", "Spotify Tracks", "🎧", "114,000 Spotify tracks across 114 genres, with danceability, energy and tempo.", "114,000", "CSV · 20 MB", "Hugging Face: maharshipandya/spotify-tracks-dataset", "https://huggingface.co/datasets/maharshipandya/spotify-tracks-dataset",
  "Order by `avg_energy` instead. Or find the most `popularity` artist in each genre with a `nest:`."),
 ("billboard", "Billboard Hot 100", "📈", "Every Billboard Hot 100 chart since August 1958, updated weekly.", "~356,000", "CSV · 21 MB", "GitHub: utdata/rwd-billboard-data", "https://github.com/utdata/rwd-billboard-data",
  "Which `performer` has the most different songs on the chart? Use `count(title)`."),
 ("olympics", "Olympic Athletes", "🏅", "Every Olympic athlete and event result from Athens 1896 to Rio 2016.", "271,116", "CSV · 36 MB", "TidyTuesday 2021-07-27", "https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-07-27",
  "Change `season` to `'Winter'`. Careful: in team events every team member gets a medal, so these counts are athlete-medals, not podium places."),
 ("wine", "Wine Reviews", "🍷", "130,000 Wine Enthusiast reviews, with points, price and tasting notes.", "129,971", "CSV · 53 MB", "TidyTuesday 2019-05-28", "https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-05-28",
  "Is expensive wine better? Group by a price band using `pick` and compare `avg_points`."),
 ("flights", "Airline Flights", "✈️", "345,000 U.S. airline flights, with airport and carrier tables to join.", "344,827", "Parquet · 12 MB", "GitHub: malloydata/malloy-samples", "https://github.com/malloydata/malloy-samples/tree/main/data",
  "Join a destination airport too (`join_one: destination_airport is airports with destination`) and find the longest routes."),
 ("taxi", "NYC Yellow Taxi Trips", "🚕", "Every yellow-cab ride in New York City in January 2024.", "~3 million", "Parquet · 50 MB", "NYC Taxi & Limousine Commission", "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page",
  "Change `2024-01` in the URL to another month (any month since 2009 works). Group by `tpep_pickup_datetime.hour` to see the daily rhythm."),
]
assert len(D) == 20 and all(d[0] in blocks for d in D)

out = []
md = lambda s: out.append(">>>markdown\n" + s.strip() + "\n")
ml = lambda s: out.append(">>>malloy\n" + s.strip() + "\n")

md("""
# Chapter 16: Data Sources

The best way to get good at Malloy is to explore data *you* find interesting. This chapter gives you 20 public datasets to start with, each with ready-made Malloy code that reads it **straight from the internet**, plus advice on finding more.

In this chapter you'll find:

* **20 interesting datasets**, from penguins and Pokémon to 3 million taxi rides, each with a source you can copy and a first query
* **where to find more data**: GitHub, Hugging Face, government portals and more
* **how to ask an AI assistant for data**, with prompts that get you real, working links

> 💡 **How these work.** Each source below points `duckdb.table()` at a URL. DuckDB downloads the data as it reads it, so there's nothing to install and no file to save. You need an internet connection, and bigger files take a few seconds. [Chapter 7](07_csv_and_parquet.malloynb) explains how DuckDB reads files over the network.

> 💡 **To use one:** copy the code into a new `.malloy` file or notebook cell in VS Code and click **Run**. Then change the query, add dimensions and measures, and explore. Every query on this page ran when the site was built.
""")

slug = lambda t: re.sub(r"[^\w]+", "-", t.lower(), flags=re.ASCII)
rows = "\n".join(f"| {i+1} | [{d[2]} {d[1]}](#{slug(str(i+1)+'. '+d[1])}) | {d[3]} | {d[4]} | {d[5]} |" for i, d in enumerate(D))
md(f"""
## The datasets at a glance

They're roughly in order of size, from tiny to large.

| # | Dataset | What it is | Rows | Format · size |
|---|---|---|---|---|
{rows}
""")

md("""
## 20 datasets to explore
""")
for i, (k, title, emo, phrase, nrows, fmt, host, hurl, tryit) in enumerate(D):
    md(f"""
### {i+1}. {title}

{emo} **{phrase}** {nrows} rows · {fmt} · [{host}]({hurl})
""")
    docs = {"gapminder": "#(docs) size=large limit=5000\n", "lego": "#(docs) limit=100\n", "quakes": "#(docs) limit=100\n", "netflix": "#(docs) limit=100\n", "tornadoes": "#(docs) limit=100\n"}.get(k, "")
    body = blocks[k]
    if docs:
        at = body.rindex("# line_chart\nrun:") if "# line_chart\nrun:" in body else body.rindex("\nrun:") + 1
        body = body[:at] + docs + body[at:]
    ml(body)
    md(f"> 🎯 **Try it:** {tryit}")

md("""
> 📘 **Malloy docs.** [DuckDB in Malloy](https://docs.malloydata.dev/documentation/language/dialect/duckdb) (reading CSV, Parquet and JSON files) · [Joins](https://docs.malloydata.dev/documentation/language/join) · [Render tags](https://docs.malloydata.dev/documentation/visualizations/overview)

## Where to find more data

Any CSV, TSV, Parquet or JSON file with a public **direct download link** works the same way: put the link inside `duckdb.table('...')`.

| Where | What you'll find | Tip |
|---|---|---|
| [TidyTuesday](https://github.com/rfordatascience/tidytuesday) | A new, cleaned, interesting dataset every week since 2018 (several above come from it) | Browse `data/<year>/<date>/`; each folder's README describes the columns |
| [FiveThirtyEight data](https://github.com/fivethirtyeight/data) | The data behind FiveThirtyEight's news stories: sports, politics, culture | Each folder links to the article that used it |
| [Our World in Data](https://ourworldindata.org) | Global data on health, energy, poverty, climate and more | Every chart has a **Download** tab with a CSV link |
| [Hugging Face datasets](https://huggingface.co/datasets) | Hundreds of thousands of datasets, many tabular | Filter by **Modalities: Tabular** and **Format: parquet**; see below |
| [data.gov](https://data.gov) and city portals ([NYC](https://opendata.cityofnewyork.us), [Chicago](https://data.cityofchicago.org), [Seattle](https://data.seattle.gov)) | Government data: crime, permits, 311 calls, transit, inspections | On Socrata portals, use **Export → CSV** and copy the link |
| [Awesome Public Datasets](https://github.com/awesomedata/awesome-public-datasets) | A huge, categorized list of public datasets | Good for browsing by topic |
| [Data Is Plural](https://www.data-is-plural.com) | A weekly newsletter of unusual datasets, with a searchable archive | Great for project ideas |
| [Google Dataset Search](https://datasetsearch.research.google.com) | A search engine just for datasets | Look for results with a downloadable file |
| [AWS Open Data](https://registry.opendata.aws) and [Source Cooperative](https://source.coop) | Very large datasets stored as Parquet in the cloud | Start with a single file, not the whole collection |
| [Kaggle](https://www.kaggle.com/datasets) | Thousands of datasets from competitions and users | Needs a login, so download the file into your `data/` folder and use a local path |

### Getting the right link

The link must point to the **file itself**, not to a web page *about* the file:

* **GitHub:** open the file and click **Raw**. Use the `raw.githubusercontent.com/...` link, or a `github.com/.../raw/...` link. A `github.com/.../blob/...` link is a web page and won't work.
* **Hugging Face:** open the **Files and versions** tab, right-click the download arrow next to a file, and copy the link. It contains `/resolve/main/`. DuckDB also understands `hf://` paths, such as `duckdb.table('hf://datasets/scikit-learn/adult-census-income/adult.csv')`. Datasets that aren't Parquet often have an automatic Parquet copy too: look for **Auto-converted to Parquet**.
* **Zip files don't work.** DuckDB can read `.gz` files but not `.zip`. Download and unzip it, then point to the local file.
* **If a file is big and you'll use it a lot,** save a copy in your `data/` folder and use the local path instead. It's much faster. [Chapter 7](07_csv_and_parquet.malloynb) shows how to convert a CSV to Parquet.

> ⚠️ **Check the license and the documentation.** Most of the datasets here are free to use for learning, but read the source's license before you publish anything. Always read the data's documentation (the README or "data dictionary"). It tells you what each column means and how the data was collected, which is often where the surprises are.

## Asking an AI assistant for data sources

An AI assistant such as Claude or ChatGPT is a great way to brainstorm datasets, but it can **invent links that don't exist** or remember files that have moved. Use it to get *ideas and leads*, then check every link yourself by running it in Malloy.

**Ask for the things you need to start immediately:**

1. **A direct download link** to a CSV, TSV, Parquet or JSON file (not a web page, not a zip file, no login).
2. **What one row means** ("one row per flight", "one row per song per week"). This is the most important fact about any dataset.
3. **The columns**, with their types: dates, places, categories, numbers.
4. **The size** (rows and megabytes), the **time period**, and **who published it**.
5. **The license**, and whether it's still being updated.

**A prompt that works well:**

```
I'm a student learning Malloy, which reads data with DuckDB.
Suggest 5 public datasets about [your topic, e.g. "college sports" or "air quality"].

For each one, give me:
- a direct download URL to a CSV or Parquet file that needs no login and is not zipped
  (for GitHub, the raw.githubusercontent.com link; for Hugging Face, a /resolve/main/ link)
- what one row represents
- the main columns and their types
- approximate row count and file size
- the time period covered and who publishes it
- the license

Only include links you are confident exist. If you're not sure of the exact file URL,
give me the page where I can find it instead and say so.
```

**Ask for data that fits the kind of analysis you want to do.** The most interesting datasets have columns that work *together*. [Making Data Sing](https://making-data-sing.pages.dev) is a framework for spotting them. For example:

```
Find a public dataset (direct CSV or Parquet link) that has:
- an entity (like a person, product, or song),
- a date or timestamp,
- a place (state, country, or city),
- and a number I can add up.
It should have at least 10,000 rows and be about [your interest].
```

```
Find a public dataset that works as an event log: one row per event, with a case ID,
an activity name, and a timestamp, so I can study the paths cases take.
```

**Then test it.** Paste the link into this template and run it. If it fails, ask the assistant for another source, or check the page yourself:

```malloy
source: my_data is duckdb.table('PASTE-THE-URL-HERE')

run: my_data -> { select: *  limit: 10 }
```

> ⚠️ **Never trust a number the AI tells you about a dataset.** Row counts, date ranges and "interesting facts" from an assistant are often wrong. Run the query and look at the data yourself.

> 🎯 **Challenge 16.1: Your own dataset.** Find a dataset you care about, using the sites above or an AI prompt. Write a Malloy source for it with at least two dimensions, two measures and one view. Then write three questions about it, and answer them with queries.

> 🎯 **Challenge 16.2: Join two sources.** Pick a dataset from this chapter and find a second one that shares a column with it, such as a country, state or year. For example, join **CO₂ Emissions** to **Gapminder** on country and year, or **Power Plants** to **CO₂ Emissions** on country. Use `join_one:` and explain what the combined data lets you ask that neither could alone.

## Summary

* `duckdb.table('https://...')` reads a CSV, TSV, Parquet or JSON file straight from the internet. Gzipped files work; zip files don't.
* Use **direct file links**: GitHub's **Raw** link, or Hugging Face's `/resolve/main/` or `hf://` path.
* Good places to look include TidyTuesday, FiveThirtyEight, Our World in Data, Hugging Face, government open-data portals and Data Is Plural.
* An AI assistant is a good way to find ideas, but **test every link and check every fact** by running a query.
""")

open(sys.argv[2], "w").write("\n".join(out))
print("ok")
