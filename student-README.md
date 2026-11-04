# Learning Malloy: Student Notebooks

These are the hands-on notebooks for the **[Learning Malloy](https://mrtimo.github.io/malloy-textbook/) textbook**. Each chapter of the
website has a matching `.malloynb` notebook here that you can run, change, and add to.

## Setup (5 minutes)

1. Install [VS Code](https://code.visualstudio.com/).
2. Install the **Malloy** extension (Extensions panel → search "Malloy" → Install).
   DuckDB is built in. There's nothing else to install.
3. **File → Open Folder…** and open *this* folder (the one containing `malloy-config.json`).
4. Open `01_basics.malloynb` and click **Run All**.

No install? Press `.` on this repository's GitHub page to open it in [github.dev](https://github.dev),
install the Malloy extension there, and open any notebook.

## What's here

| File | What it is |
|---|---|
| `index.malloynb` | Welcome and table of contents |
| `01_basics.malloynb` … `14_model_review.malloynb` | One notebook per chapter |
| `15_worked_example_ice.malloynb` | Worked example: ICE arrests data taken through every chapter |
| `ice.malloy` | The finished model for the worked example |
| `names.malloy` | The baby names model (used from Chapter 2 on) |
| `names_full.malloy` | The complete names model reviewed in Chapter 14 |
| `ecommerce.malloy` | The e-commerce star-schema model |
| `data/` | Parquet and CSV data files |
| `img/` | Screenshots used by the notebooks |
| `csv_to_parquet.py` | Chapter 7's CSV → Parquet conversion script |
| `malloy-config.json` | Tells Malloy to use DuckDB, with paths relative to this folder |

## Tips

* Notebook cells build on each other. If you see *"Reference to undefined object"*, use **Run All**.
* Lines starting with `#(docs)` only affect how the textbook website displays results. Ignore them.
* Challenges (🎯) are at the end of each chapter. Add new cells to try them.
* Malloy documentation: <https://docs.malloydata.dev/documentation/>
