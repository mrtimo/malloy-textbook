"""Generate the small, deliberately messy CSV files used in Chapters 7 and 9.

Run from the textbook-site folder:  python3 scripts-data/make_fake_csvs.py
The output is deterministic (fixed random seed) so the textbook results never change.
"""
import csv, random, datetime, os

random.seed(42)
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "textbook", "data")

first = ["Olivia","Liam","Emma","Noah","Ava","Elijah","Sophia","James","Mia","Lucas",
         "Isabella","Mason","Amelia","Ethan","Harper","Logan","Evelyn","Aiden","Abigail","Jackson"]
last = ["Smith","Johnson","Garcia","Brown","Lee","Martinez","Davis","Lopez","Wilson","Clark"]
states_clean = ["CA","TX","NY","FL","WA","OR","UT","CO"]
state_variants = {
    "CA": ["CA","ca","Calif.","California"," CA"],
    "TX": ["TX","tx","Texas","TX "],
    "NY": ["NY","N.Y.","New York","ny"],
    "FL": ["FL","Fla","Florida"],
    "WA": ["WA","Wash.","Washington"],
    "OR": ["OR","Ore.","Oregon"],
    "UT": ["UT","Utah","ut"],
    "CO": ["CO","Colo.","Colorado"],
}
date_formats = ["%Y-%m-%d", "%m/%d/%Y", "%d-%b-%Y", "%B %d, %Y", "%Y%m%d"]
plans = ["Basic","basic","BASIC","Pro","pro ","Premium","premium","Pro"]

rows = []
start = datetime.date(2023, 1, 1)
for i in range(1, 121):
    fn, ln = random.choice(first), random.choice(last)
    name_style = random.choice(["normal","upper","lower","spaces"])
    full = f"{fn} {ln}"
    if name_style == "upper": full = full.upper()
    elif name_style == "lower": full = full.lower()
    elif name_style == "spaces": full = f"  {fn}   {ln} "
    st = random.choice(states_clean)
    state = random.choice(state_variants[st])
    d = start + datetime.timedelta(days=random.randint(0, 540))
    signup = d.strftime(random.choice(date_formats))
    if random.random() < 0.05: signup = ""
    if random.random() < 0.03: signup = "N/A"
    amt = round(random.uniform(5, 400), 2)
    amount = random.choice([f"${amt:,.2f}", f"{amt}", f"{amt:.2f} USD", f"${amt:,.0f}"])
    if random.random() < 0.05: amount = random.choice(["", "n/a", "-"])
    phone_digits = f"{random.randint(200,999)}{random.randint(200,999)}{random.randint(1000,9999)}"
    phone = random.choice([
        f"({phone_digits[:3]}) {phone_digits[3:6]}-{phone_digits[6:]}",
        f"{phone_digits[:3]}-{phone_digits[3:6]}-{phone_digits[6:]}",
        f"{phone_digits[:3]}.{phone_digits[3:6]}.{phone_digits[6:]}",
        phone_digits,
        f"+1 {phone_digits[:3]} {phone_digits[3:6]} {phone_digits[6:]}",
    ])
    email = f"{fn}.{ln}{random.randint(1,99)}@example.com"
    if random.random() < 0.3: email = email.upper()
    if random.random() < 0.2: email = "  " + email + " "
    plan = random.choice(plans)
    rows.append([i, full, email, phone, state, signup, plan, amount])

# Exact duplicate rows -- a classic problem.
for dup in random.sample(rows, 6):
    rows.append(list(dup))
random.shuffle(rows)

with open(os.path.join(OUT, "messy_customers.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["customer_id","full_name","email","phone","state","signup_date","plan","first_purchase"])
    w.writerows(rows)

# A clean CSV slice of the names data, used in Chapter 7 to compare CSV vs Parquet.
print("wrote", len(rows), "rows to messy_customers.csv")
