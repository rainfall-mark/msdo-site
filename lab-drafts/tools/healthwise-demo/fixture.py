import json
DRAWS = ["2023-10-12","2024-04-18","2024-10-24","2025-04-10","2025-10-16","2026-04-09","2026-09-24"]
# name, cat, unit, rmin, rmax, range_string, values (per draw, None = not tested), description, neutral
M = [
 ("ApoB","Heart","mg/dL",None,90,"<90",[118,112,109,101,97,94,92],"Apolipoprotein B counts every particle that can carry cholesterol into the artery wall. Many clinicians treat it as the most direct lipid marker of heart risk.",False),
 ("LDL Cholesterol","Heart","mg/dL",None,100,"<100",[148,141,138,127,121,117,113],"Cholesterol carried in low-density lipoprotein particles, the main driver of plaque build-up.",False),
 ("Non-HDL Cholesterol","Heart","mg/dL",None,130,"<130",[175,167,162,150,144,139,135],"Total cholesterol minus HDL: all the cholesterol in particles that can contribute to plaque.",False),
 ("Lipoprotein (a)","Heart","nmol/L",None,75,"<75",[142,None,None,138,None,None,145],"A largely inherited LDL-like particle. Levels are set mostly by genetics and change little with diet or exercise.",False),
 ("LDL Particle Number","Heart","nmol/L",None,1138,"<1138",[1720,1650,1610,1490,1420,1380,1340],"The number of LDL particles, measured directly by NMR.",False),
 ("LDL Small","Heart","nmol/L",None,142,"<142",[312,281,264,231,208,190,176],"Small, dense LDL particles, which tend to track with insulin resistance and high triglycerides.",False),
 ("LDL Medium","Heart","nmol/L",None,215,"<215",[288,270,251,230,214,205,198],"",False),
 ("HDL Cholesterol","Heart","mg/dL",39,None,">=39",[46,47,49,51,52,54,55],"Cholesterol carried in high-density lipoprotein, which helps move cholesterol back to the liver.",False),
 ("Total Cholesterol","Heart","mg/dL",None,200,"<200",[221,214,211,201,196,193,190],"",False),
 ("Triglycerides","Heart","mg/dL",None,150,"<150",[162,141,128,112,104,96,88],"Fat carried in the blood. Sensitive to refined carbohydrates, alcohol and fitness.",False),
 ("Cholesterol/HDL Ratio","Heart","ratio",None,5,"<5.0",[4.8,4.6,4.3,3.9,3.8,3.6,3.5],"",False),
 ("Homocysteine","Heart","umol/L",None,10.3,"<=10.3",[12.4,11.8,11.1,10.6,9.8,9.4,9.1],"An amino acid linked to B-vitamin status. High levels are associated with vascular and cognitive risk.",False),
 ("Hemoglobin A1c","Metabolic","%",None,5.7,"<5.7",[5.8,5.8,5.7,5.6,5.6,5.5,5.5],"Average blood sugar over roughly the last three months.",False),
 ("Glucose","Metabolic","mg/dL",65,99,"65-99",[102,99,97,95,94,92,91],"Fasting blood sugar.",False),
 ("Insulin","Metabolic","uIU/mL",None,18.4,"<=18.4",[14.2,12.8,11.4,9.6,8.9,8.1,7.4],"Fasting insulin. Rising insulin often shows up years before glucose changes.",False),
 ("Uric Acid","Metabolic","mg/dL",4.0,8.0,"4.0-8.0",[7.2,7.0,6.8,6.5,6.4,6.2,6.1],"",False),
 ("Biological Age","Biological Age","years",None,None,"",[47.8,None,47.1,None,45.9,None,44.6],"An estimate of the pace of aging calculated from several blood markers, compared with calendar age.",True),
 ("Cortisol","Stress & Aging","ug/dL",4.0,22.0,"4.0-22.0",[17.2,15.8,14.9,16.1,13.8,14.4,13.2],"",False),
 ("DHEA-Sulfate","Stress & Aging","ug/dL",102.6,416.3,"102.6-416.3",[186,181,178,175,172,170,168],"",False),
 ("TSH","Thyroid","mIU/L",0.4,4.5,"0.40-4.50",[2.1,2.4,1.9,2.2,2.0,1.8,2.1],"Thyroid-stimulating hormone, the pituitary's signal to the thyroid.",False),
 ("Free T4","Thyroid","ng/dL",0.8,1.8,"0.8-1.8",[1.2,1.3,1.2,1.1,1.2,1.3,1.2],"",False),
 ("Free T3","Thyroid","pg/mL",2.3,4.2,"2.3-4.2",[3.1,3.0,3.2,3.1,3.3,3.2,3.2],"",False),
 ("Thyroid Peroxidase Antibodies","Thyroid","IU/mL",None,9,"<9",["<1","<1","<1","1","<1","<1","1"],"",False),
 ("Testosterone, Total","Male Health","ng/dL",250,1100,"250-1100",[412,438,451,486,502,518,534],"",False),
 ("Testosterone, Free","Male Health","pg/mL",46,224,"46.0-224.0",[58,62,64,71,74,78,81],"",False),
 ("SHBG","Male Health","nmol/L",10,50,"10-50",[44,42,41,39,38,37,36],"",False),
 ("Estradiol","Male Health","pg/mL",None,39,"<=39",[24,26,25,27,28,26,27],"",False),
 ("PSA, Total","Male Health","ng/mL",None,4.0,"<4.0",[0.6,None,0.7,None,0.7,None,0.8],"",False),
 ("Vitamin D, 25-Hydroxy","Nutrients","ng/mL",30,100,"30-100",[22,26,29,34,38,41,44],"The storage form of vitamin D.",False),
 ("Omega-3 Total","Nutrients","%",5.4,None,">5.4",[4.1,4.3,4.6,4.9,5.0,5.1,5.2],"EPA plus DHA as a share of blood fatty acids. Reflects fish and omega-3 intake over the last few months.",False),
 ("Omega-6/Omega-3 Ratio","Nutrients","ratio",3.7,14.4,"3.7-14.4",[13.9,13.1,12.4,11.6,11.2,10.8,10.5],"",False),
 ("Magnesium, RBC","Nutrients","mg/dL",4.0,6.4,"4.0-6.4",[4.6,4.8,4.9,5.1,5.2,5.3,5.4],"",False),
 ("Vitamin B12","Nutrients","pg/mL",200,1100,"200-1100",[512,498,545,560,571,588,602],"",False),
 ("Folate, Serum","Nutrients","ng/mL",5.4,None,">5.4",[9.8,10.4,11.2,12.6,13.1,14.0,14.8],"",False),
 ("Ferritin","Nutrients","ng/mL",38,380,"38-380",[212,198,186,174,166,158,152],"",False),
 ("Zinc","Nutrients","ug/dL",60,130,"60-130",[88,91,86,94,92,95,93],"",False),
 ("ALT","Liver","U/L",9,46,"9-46",[52,47,44,38,34,31,29],"A liver enzyme. Often rises with fat in the liver.",False),
 ("AST","Liver","U/L",10,40,"10-40",[34,32,30,28,27,25,24],"",False),
 ("GGT","Liver","U/L",3,90,"3-90",[41,38,35,31,29,27,26],"",False),
 ("Albumin","Liver","g/dL",3.6,5.1,"3.6-5.1",[4.6,4.5,4.7,4.6,4.6,4.7,4.6],"",False),
 ("Bilirubin, Total","Liver","mg/dL",0.2,1.2,"0.2-1.2",[0.8,0.7,0.9,0.8,0.8,0.7,0.8],"",False),
 ("Alkaline Phosphatase","Liver","U/L",36,130,"36-130",[72,70,74,69,71,68,70],"",False),
 ("Creatinine","Kidney","mg/dL",0.6,1.29,"0.60-1.29",[1.02,1.05,0.99,1.04,1.01,1.03,1.0],"",False),
 ("eGFR","Kidney","mL/min/1.73m2",60,None,">=60",[91,89,94,90,92,91,93],"",False),
 ("BUN","Kidney","mg/dL",7,25,"7-25",[16,17,15,18,16,17,16],"",False),
 ("Cystatin C","Kidney","mg/L",0.52,1.31,"0.52-1.31",[0.86,None,0.88,None,0.85,None,0.84],"",False),
 ("Amylase","Pancreas","U/L",21,101,"21-101",[58,61,55,60,57,59,56],"",False),
 ("Lipase","Pancreas","U/L",7,60,"7-60",[31,29,33,30,28,31,30],"",False),
 ("Hemoglobin","Blood","g/dL",13.2,17.1,"13.2-17.1",[15.1,15.3,14.9,15.2,15.0,15.4,15.2],"",False),
 ("Hematocrit","Blood","%",38.5,50.0,"38.5-50.0",[45.2,45.8,44.6,45.5,45.0,46.1,45.4],"",False),
 ("Platelet Count","Blood","x10E3/uL",140,400,"140-400",[238,244,229,251,240,236,242],"",False),
 ("White Blood Cell Count","Blood","x10E3/uL",3.8,10.8,"3.8-10.8",[5.9,6.2,5.6,5.8,5.4,5.7,5.5],"",False),
 ("RDW","Blood","%",11.0,15.0,"11.0-15.0",[12.8,12.9,12.6,12.7,12.5,12.6,12.5],"",False),
 ("Sodium","Electrolytes","mmol/L",135,146,"135-146",[140,139,141,140,139,140,141],"",False),
 ("Potassium","Electrolytes","mmol/L",3.5,5.3,"3.5-5.3",[4.4,4.5,4.3,4.6,4.4,4.5,4.4],"",False),
 ("Calcium","Electrolytes","mg/dL",8.6,10.3,"8.6-10.3",[9.6,9.5,9.7,9.6,9.4,9.6,9.5],"",False),
 ("Chloride","Electrolytes","mmol/L",98,110,"98-110",[103,104,102,103,104,103,102],"",False),
 ("hs-CRP","Immune Regulation","mg/L",None,1.0,"<1.0",[2.1,1.6,1.4,1.1,0.9,0.8,0.7],"High-sensitivity C-reactive protein, a general marker of inflammation.",False),
 ("ANA Screen","Autoimmunity","",None,None,"Negative",["Negative",None,"Negative",None,"Negative",None,"Negative"],"",False),
 ("Mercury, Blood","Heavy Metals","ug/L",None,10,"<=10",[6.8,None,7.4,None,9.1,None,11.6],"Mostly reflects recent fish and seafood intake, especially large predatory fish.",False),
 ("Lead, Blood","Heavy Metals","ug/dL",None,3.5,"<3.5",["<1",None,"<1",None,"1.1",None,"<1"],"",False),
 ("pH, Urine","Urine","",5.0,8.0,"5.0-8.0",[6.0,6.5,6.0,6.5,6.0,6.0,6.5],"",False),
]
M += [["VLDL Cholesterol", "Heart", "mg/dL", None, 30, "<30", [19.0, 19.1, 19.4, 19.0, 19.0, 19.1, 18.7], "", False], ["HDL Particle Number", "Heart", "umol/L", 30.5, None, ">=30.5", [36.2, 36.4, 36.7, 35.5, 35.8, 35.5, 36.8], "", False], ["HDL Large", "Heart", "umol/L", 4.8, None, ">=4.8", [7.2, 6.9, 7.3, 7.3, 7.2, 7.1, 7.0], "", False], ["Apolipoprotein A1", "Heart", "mg/dL", 120, None, ">=120", [144.0, 148.0, 145.0, 146.0, 146.0, 145.0, 148.0], "", False], ["Triglycerides/HDL Ratio", "Heart", "ratio", None, 2.0, "<2.0", [1.69, 1.73, 1.7, 1.71, 1.7, 1.71, 1.7], "", False], ["LDL Pattern", "Heart", "", None, None, "A", ["A", "A", "A", "A", "A", "A", "A"], "", False], ["HOMA-IR", "Metabolic", "", None, 2.5, "<2.5", [1.68, 1.74, 1.74, 1.73, 1.72, 1.68, 1.68], "", False], ["Adiponectin", "Metabolic", "ug/mL", 5.0, None, ">=5.0", [8.3, None, 8.2, None, 8.5, None, 8.4], "", False], ["Leptin", "Metabolic", "ng/mL", None, 10.0, "<=10.0", [6.3, None, 6.2, None, 6.3, None, 6.3], "", False], ["C-Peptide", "Metabolic", "ng/mL", 0.8, 3.5, "0.8-3.5", [1.85, 1.87, 1.94, 1.9, 1.95, 1.89, 1.86], "", False], ["Pregnenolone", "Stress & Aging", "ng/dL", 22, 237, "22-237", [97.0, None, 97.0, None, 95.0, None, 94.0], "", False], ["Reverse T3", "Thyroid", "ng/dL", 9.2, 24.1, "9.2-24.1", [15.3, 15.8, 15.6, 15.1, 15.2, 15.1, 15.1], "", False], ["Thyroglobulin Antibodies", "Thyroid", "IU/mL", None, 1, "<=1", ["<1", "<1", "<1", "<1", "<1", "<1", "<1"], "", False], ["Total T4", "Thyroid", "ug/dL", 4.5, 12.0, "4.5-12.0", [7.7, 7.5, 7.6, 7.6, 7.5, 7.7, 7.5], "", False], ["Total T3", "Thyroid", "ng/dL", 71, 180, "71-180", [113.0, 110.0, 112.0, 110.0, 111.0, 115.0, 114.0], "", False], ["Luteinizing Hormone", "Male Health", "mIU/mL", 1.7, 8.6, "1.7-8.6", [4.3, 4.4, 4.2, 4.3, 4.4, 4.3, 4.2], "", False], ["Follicle Stimulating Hormone", "Male Health", "mIU/mL", 1.5, 12.4, "1.5-12.4", [5.2, 5.0, 5.0, 5.2, 5.1, 5.0, 5.0], "", False], ["Prolactin", "Male Health", "ng/mL", 4.0, 15.2, "4.0-15.2", [8.5, 8.7, 8.6, 8.7, 8.6, 8.7, 8.9], "", False], ["Vitamin A", "Nutrients", "ug/dL", 38, 98, "38-98", [58.0, 58.0, 59.0, 57.0, 57.0, 59.0, 59.0], "", False], ["Vitamin E", "Nutrients", "mg/L", 5.5, 17.0, "5.5-17.0", [10.7, 10.6, 10.9, 11.0, 10.6, 11.0, 11.0], "", False], ["Vitamin B6", "Nutrients", "ug/L", 2.1, 21.7, "2.1-21.7", [9.4, 9.4, 9.2, 9.2, 9.6, 9.3, 9.5], "", False], ["Coenzyme Q10", "Nutrients", "ug/mL", 0.37, 2.2, "0.37-2.20", [0.95, None, 0.98, None, 0.96, None, 0.95], "", False], ["Copper", "Nutrients", "ug/dL", 69, 132, "69-132", [96.0, 99.0, 96.0, 97.0, 98.0, 100.0, 99.0], "", False], ["Selenium", "Nutrients", "ug/L", 63, 160, "63-160", [117.0, 120.0, 116.0, 115.0, 117.0, 118.0, 115.0], "", False], ["Iron", "Nutrients", "ug/dL", 38, 169, "38-169", [94.0, 95.0, 96.0, 94.0, 95.0, 98.0, 98.0], "", False], ["Iron Binding Capacity", "Nutrients", "ug/dL", 250, 450, "250-450", [320.0, 321.0, 319.0, 312.0, 311.0, 310.0, 325.0], "", False], ["Iron Saturation", "Nutrients", "%", 15, 55, "15-55", [30.3, 30.7, 29.3, 30.2, 30.0, 30.3, 29.7], "", False], ["Transferrin", "Nutrients", "mg/dL", 200, 360, "200-360", [269.0, 256.0, 263.0, 265.0, 267.0, 265.0, 265.0], "", False], ["Magnesium", "Nutrients", "mg/dL", 1.6, 2.3, "1.6-2.3", [2.13, 2.14, 2.08, 2.12, 2.14, 2.14, 2.09], "", False], ["Phosphorus", "Nutrients", "mg/dL", 2.5, 4.5, "2.5-4.5", [3.4, 3.5, 3.4, 3.4, 3.4, 3.4, 3.4], "", False], ["EPA", "Nutrients", "%", 0.2, None, ">=0.2", [1.27, 1.31, 1.33, 1.32, 1.31, 1.29, 1.32], "", False], ["DHA", "Nutrients", "%", 1.4, None, ">=1.4", [3.2, 3.2, 3.3, 3.1, 3.2, 3.1, 3.2], "", False], ["Arachidonic Acid", "Nutrients", "%", 8.6, 15.6, "8.6-15.6", [11.2, 11.0, 11.3, 11.2, 11.3, 11.4, 11.1], "", False], ["Linoleic Acid", "Nutrients", "%", 18.6, 29.5, "18.6-29.5", [22.8, 23.2, 23.6, 23.1, 23.0, 23.9, 23.6], "", False], ["Total Protein", "Liver", "g/dL", 6.0, 8.5, "6.0-8.5", [7.1, 7.2, 7.0, 7.2, 7.0, 7.1, 7.2], "", False], ["Globulin", "Liver", "g/dL", 1.5, 4.5, "1.5-4.5", [2.55, 2.55, 2.49, 2.51, 2.48, 2.45, 2.5], "", False], ["Albumin/Globulin Ratio", "Liver", "ratio", 1.2, 2.2, "1.2-2.2", [1.83, 1.83, 1.82, 1.84, 1.78, 1.77, 1.8], "", False], ["Bilirubin, Direct", "Liver", "mg/dL", None, 0.4, "0.0-0.4", [0.198, 0.197, 0.199, 0.201, 0.2, 0.198, 0.203], "", False], ["BUN/Creatinine Ratio", "Kidney", "ratio", 9, 20, "9-20", [16.4, 16.0, 15.7, 15.6, 16.3, 15.6, 16.2], "", False], ["Red Blood Cell Count", "Blood", "x10E6/uL", 4.14, 5.8, "4.14-5.80", [4.9, 4.9, 5.0, 4.8, 4.8, 4.9, 4.8], "", False], ["MCV", "Blood", "fL", 79, 97, "79-97", [89.0, 87.0, 86.0, 86.0, 89.0, 88.0, 89.0], "", False], ["MCH", "Blood", "pg", 26.6, 33.0, "26.6-33.0", [30.8, 31.1, 31.3, 30.9, 30.1, 30.6, 30.1], "", False], ["MCHC", "Blood", "g/dL", 31.5, 35.7, "31.5-35.7", [33.0, 33.8, 34.2, 33.3, 33.4, 33.5, 34.1], "", False], ["MPV", "Blood", "fL", 8.0, 13.0, "8.0-13.0", [10.4, 10.5, 10.5, 10.3, 10.6, 10.6, 10.2], "", False], ["Neutrophils (Absolute)", "Blood", "x10E3/uL", 1.4, 7.0, "1.4-7.0", [3.3, 3.2, 3.1, 3.2, 3.2, 3.3, 3.2], "", False], ["Lymphocytes (Absolute)", "Blood", "x10E3/uL", 0.7, 3.1, "0.7-3.1", [1.71, 1.73, 1.73, 1.74, 1.7, 1.71, 1.67], "", False], ["Monocytes (Absolute)", "Blood", "x10E3/uL", 0.1, 0.9, "0.1-0.9", [0.4, 0.41, 0.4, 0.4, 0.39, 0.41, 0.41], "", False], ["Eosinophils (Absolute)", "Blood", "x10E3/uL", 0.0, 0.4, "0.0-0.4", [0.102, 0.1, 0.101, 0.099, 0.102, 0.102, 0.099], "", False], ["Basophils (Absolute)", "Blood", "x10E3/uL", 0.0, 0.2, "0.0-0.2", [0.049, 0.05, 0.05, 0.051, 0.05, 0.049, 0.051], "", False], ["Carbon Dioxide", "Electrolytes", "mmol/L", 20, 29, "20-29", [24.5, 25.4, 24.6, 24.8, 25.4, 24.6, 24.6], "", False], ["Anion Gap", "Electrolytes", "mmol/L", 8, 16, "8-16", [12.0, 12.1, 12.2, 12.1, 12.3, 12.0, 12.3], "", False], ["Immunoglobulin A", "Immune Regulation", "mg/dL", 90, 386, "90-386", [184.0, None, 185.0, None, 188.0, None, 186.0], "", False], ["Immunoglobulin G", "Immune Regulation", "mg/dL", 586, 1602, "586-1602", [1052.0, None, 1047.0, None, 1041.0, None, 1058.0], "", False], ["Immunoglobulin M", "Immune Regulation", "mg/dL", 26, 217, "26-217", [88.0, None, 87.0, None, 87.0, None, 90.0], "", False], ["Immunoglobulin E", "Immune Regulation", "IU/mL", None, 114, "<=114", [42.8, None, 41.4, None, 42.7, None, 43.0], "", False], ["Rheumatoid Factor", "Autoimmunity", "IU/mL", None, 14, "<14", ["<10", None, "<10", None, "<10", None, "<10"], "", False], ["Cyclic Citrullinated Peptide Ab", "Autoimmunity", "units", None, 20, "<20", ["<16", None, "<16", None, "<16", None, "<16"], "", False], ["Tissue Transglutaminase IgA", "Autoimmunity", "U/mL", None, 4, "<4", ["<2", None, "<2", None, "<2", None, "<2"], "", False], ["Arsenic, Blood", "Heavy Metals", "ug/L", None, 13, "<=13", [4.2, None, 4.2, None, 4.1, None, 4.2], "", False], ["Cadmium, Blood", "Heavy Metals", "ug/L", None, 1.0, "<=1.0", [0.3, None, 0.3, None, 0.29, None, 0.31], "", False], ["PFOA", "Environmental Toxins", "ng/mL", None, 2.0, "<2.0", [1.1, None, 1.09, None, 1.12, None, 1.1], "", False], ["PFOS", "Environmental Toxins", "ng/mL", None, 5.0, "<5.0", [2.8, None, 2.83, None, 2.74, None, 2.81], "", False], ["Specific Gravity, Urine", "Urine", "", 1.005, 1.03, "1.005-1.030", [1.01, 1.04, 1.04, 1.01, 1.02, 1.0, 1.01], "", False], ["Protein, Urine", "Urine", "", None, None, "Negative", ["Negative", "Negative", "Negative", "Negative", "Negative", "Negative", "Negative"], "", False], ["Glucose, Urine", "Urine", "", None, None, "Negative", ["Negative", "Negative", "Negative", "Negative", "Negative", "Negative", "Negative"], "", False], ["Ketones, Urine", "Urine", "", None, None, "Negative", ["Negative", "Negative", "Negative", "Negative", "Negative", "Negative", "Negative"], "", False], ["Blood, Urine", "Urine", "", None, None, "Negative", ["Negative", "Negative", "Negative", "Negative", "Negative", "Negative", "Negative"], "", False], ["Microalbumin/Creatinine Ratio, Urine", "Urine", "mg/g", None, 30, "<30", [8.1, 8.2, 8.0, 7.9, 7.9, 8.0, 8.2], "", False]]


def num(v):
    if isinstance(v,(int,float)): return float(v)
    try: return float(str(v).lstrip('<>='))
    except: return None
def inr(v, lo, hi, rs):
    if isinstance(v,str) and not v[0].isdigit() and v[0] not in '<>': return v == rs
    x = num(v)
    if x is None: return None
    if hi is not None and x > hi: return False
    if lo is not None and x < lo: return False
    return True
def fmt(v):
    if isinstance(v,str): return v
    return ('%g' % v)
details=[]
for i,(name,cat,unit,lo,hi,rs,vals,desc,neutral) in enumerate(M):
    pts=[(DRAWS[k],v) for k,v in enumerate(vals) if v is not None]
    (ld,lv)=pts[-1]; prev=pts[-2][1] if len(pts)>1 else None
    ok=inr(lv,lo,hi,rs)
    status = 'neutral' if neutral else ('in range' if ok else ('below' if (lo is not None and num(lv) is not None and num(lv) < lo) else 'above'))
    def dist(v):
        x=num(v)
        if x is None: return 0
        if hi is not None and x>hi: return x-hi
        if lo is not None and x<lo: return lo-x
        return 0
    improving = None if prev is None else (dist(lv) < dist(prev) if not ok else True)
    details.append({
      "biomarker_id": "b%02d" % i, "biomarker_name": name, "category": [cat], "description": desc,
      "date_of_service": ld,
      "result": {"value": fmt(lv), "units": unit, "range_min": lo, "range_max": hi},
      "range": {"range_min": lo, "range_max": hi, "is_in_range": None if neutral else ok, "status": status, "range_string": rs},
      "is_neutral": neutral,
      "comparison": {"is_improving": improving},
      "past_results": [{"dateOfService": d, "calculatedResult": fmt(v), "inRange": None if neutral else inr(v,lo,hi,rs), "visible": True} for d,v in pts[:-1]][::-1],
    })
out={"summary":{"details":details}}
json.dump(out, open('fixture.json','w'), separators=(',',':'))
fl=[d['biomarker_name'] for d in details if d['range']['is_in_range'] is False]
print(len(details),'markers; flagged:',fl)
