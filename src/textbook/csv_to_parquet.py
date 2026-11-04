"""csv_to_parquet.py: convert CSV files to Parquet with DuckDB.

Usage:
    pip install duckdb
    python csv_to_parquet.py data/names_utah.csv
    python csv_to_parquet.py "data/*.csv" --codec snappy
"""
import argparse
import glob
import os

import duckdb


def csv_to_parquet(csv_path: str, codec: str = "zstd", sort_by: str | None = None) -> str:
    parquet_path = os.path.splitext(csv_path)[0] + ".parquet"
    order = f"ORDER BY {sort_by}" if sort_by else ""
    duckdb.sql(f"""
        COPY (
            SELECT * FROM read_csv('{csv_path}', header = true)  -- DuckDB infers types
            {order}
        )
        TO '{parquet_path}'
        (FORMAT parquet, COMPRESSION {codec}, ROW_GROUP_SIZE 122880)
    """)
    before = os.path.getsize(csv_path)
    after = os.path.getsize(parquet_path)
    print(f"{csv_path} ({before:,} bytes) -> {parquet_path} ({after:,} bytes), "
          f"{after / before:.0%} of original")
    return parquet_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("pattern", help="a CSV file or a glob like 'data/*.csv'")
    parser.add_argument("--codec", default="zstd",
                        choices=["zstd", "snappy", "gzip", "lz4", "brotli", "uncompressed"])
    parser.add_argument("--sort-by", default=None,
                        help="optional ORDER BY columns, e.g. 'state, year'")
    args = parser.parse_args()
    for path in sorted(glob.glob(args.pattern)):
        csv_to_parquet(path, args.codec, args.sort_by)
