// data-loader.js
// 数据来源于 data/*.json；同时内嵌一份兜底数据，便于静态访问。
(function (global) {
  'use strict';

  const EMBEDDED_META = {
  "province": "福建",
  "track": "物理类",
  "subject_combinations": [
    "物化生",
    "物化地",
    "物化政",
    "物生地",
    "物生政",
    "物地政"
  ],
  "years": [
    2022,
    2023,
    2024,
    2025
  ],
  "key_lines": {
    "2022": {
      "te_zhao": 520,
      "ben_ke": 428,
      "zhuan_ke": 220,
      "total_candidates": 138000,
      "source": "福建省教育考试院"
    },
    "2023": {
      "te_zhao": 518,
      "ben_ke": 431,
      "zhuan_ke": 220,
      "total_candidates": 165000,
      "source": "福建省教育考试院"
    },
    "2024": {
      "te_zhao": 538,
      "ben_ke": 449,
      "zhuan_ke": 220,
      "total_candidates": 184000,
      "source": "福建省教育考试院"
    },
    "2025": {
      "te_zhao": 520,
      "ben_ke": 441,
      "zhuan_ke": 235,
      "total_candidates": 192096,
      "source": "福建省教育考试院"
    }
  },
  "data_sources": [
    {
      "year": 2022,
      "url": "https://www.eeafj.cn/gkptgkgsgg/20220625/12121.html",
      "label": "福建省教育考试院 2022 年高考考生成绩分布（物理科目组）"
    },
    {
      "year": 2023,
      "url": "https://www.eeafj.cn/gkptgkgsgg/20230625/12913.html",
      "label": "福建省教育考试院 2023 年高考考生成绩分布（物理科目组）"
    },
    {
      "year": 2024,
      "url": "https://www.eeafj.cn/gkptgkgsgg/20240625/13485.html",
      "label": "福建省教育考试院 2024 年高考考生成绩分布（物理科目组）"
    },
    {
      "year": 2025,
      "url": "https://www.eeafj.cn/gkptgkgsgg/20250625/14056.html",
      "label": "福建省教育考试院 2025 年高考考生成绩分布（物理科目组）"
    }
  ],
  "collection_note": "数据来源于福建省教育考试院原始公告及多家教育媒体（中国教育在线、福建日报等）整理，已交叉核对。最终以 eeafj.cn 官方公告为准。"
};

  const EMBEDDED_YEAR_DATA = {
  "2022": [
    {
      "score": 684,
      "count": 43,
      "cumulative": 43
    },
    {
      "score": 683,
      "count": 8,
      "cumulative": 51
    },
    {
      "score": 682,
      "count": 5,
      "cumulative": 56
    },
    {
      "score": 681,
      "count": 5,
      "cumulative": 61
    },
    {
      "score": 680,
      "count": 13,
      "cumulative": 74
    },
    {
      "score": 679,
      "count": 12,
      "cumulative": 86
    },
    {
      "score": 678,
      "count": 7,
      "cumulative": 93
    },
    {
      "score": 677,
      "count": 14,
      "cumulative": 107
    },
    {
      "score": 676,
      "count": 8,
      "cumulative": 115
    },
    {
      "score": 675,
      "count": 14,
      "cumulative": 129
    },
    {
      "score": 674,
      "count": 16,
      "cumulative": 145
    },
    {
      "score": 673,
      "count": 12,
      "cumulative": 157
    },
    {
      "score": 672,
      "count": 15,
      "cumulative": 172
    },
    {
      "score": 671,
      "count": 17,
      "cumulative": 189
    },
    {
      "score": 670,
      "count": 18,
      "cumulative": 207
    },
    {
      "score": 669,
      "count": 17,
      "cumulative": 224
    },
    {
      "score": 668,
      "count": 21,
      "cumulative": 245
    },
    {
      "score": 667,
      "count": 12,
      "cumulative": 257
    },
    {
      "score": 666,
      "count": 24,
      "cumulative": 281
    },
    {
      "score": 665,
      "count": 28,
      "cumulative": 309
    },
    {
      "score": 664,
      "count": 21,
      "cumulative": 330
    },
    {
      "score": 663,
      "count": 33,
      "cumulative": 363
    },
    {
      "score": 662,
      "count": 39,
      "cumulative": 402
    },
    {
      "score": 661,
      "count": 33,
      "cumulative": 435
    },
    {
      "score": 660,
      "count": 35,
      "cumulative": 470
    },
    {
      "score": 659,
      "count": 43,
      "cumulative": 513
    },
    {
      "score": 658,
      "count": 35,
      "cumulative": 548
    },
    {
      "score": 657,
      "count": 50,
      "cumulative": 598
    },
    {
      "score": 656,
      "count": 48,
      "cumulative": 646
    },
    {
      "score": 655,
      "count": 55,
      "cumulative": 701
    },
    {
      "score": 654,
      "count": 53,
      "cumulative": 754
    },
    {
      "score": 653,
      "count": 55,
      "cumulative": 809
    },
    {
      "score": 652,
      "count": 47,
      "cumulative": 856
    },
    {
      "score": 651,
      "count": 53,
      "cumulative": 909
    },
    {
      "score": 650,
      "count": 55,
      "cumulative": 964
    },
    {
      "score": 649,
      "count": 69,
      "cumulative": 1033
    },
    {
      "score": 648,
      "count": 71,
      "cumulative": 1104
    },
    {
      "score": 647,
      "count": 58,
      "cumulative": 1162
    },
    {
      "score": 646,
      "count": 79,
      "cumulative": 1241
    },
    {
      "score": 645,
      "count": 84,
      "cumulative": 1325
    },
    {
      "score": 644,
      "count": 70,
      "cumulative": 1395
    },
    {
      "score": 643,
      "count": 87,
      "cumulative": 1482
    },
    {
      "score": 642,
      "count": 99,
      "cumulative": 1581
    },
    {
      "score": 641,
      "count": 104,
      "cumulative": 1685
    },
    {
      "score": 640,
      "count": 86,
      "cumulative": 1771
    },
    {
      "score": 639,
      "count": 81,
      "cumulative": 1852
    },
    {
      "score": 638,
      "count": 98,
      "cumulative": 1950
    },
    {
      "score": 637,
      "count": 94,
      "cumulative": 2044
    },
    {
      "score": 636,
      "count": 93,
      "cumulative": 2137
    },
    {
      "score": 635,
      "count": 116,
      "cumulative": 2253
    },
    {
      "score": 634,
      "count": 114,
      "cumulative": 2367
    },
    {
      "score": 633,
      "count": 103,
      "cumulative": 2470
    },
    {
      "score": 632,
      "count": 122,
      "cumulative": 2592
    },
    {
      "score": 631,
      "count": 118,
      "cumulative": 2710
    },
    {
      "score": 630,
      "count": 133,
      "cumulative": 2843
    },
    {
      "score": 629,
      "count": 119,
      "cumulative": 2962
    },
    {
      "score": 628,
      "count": 121,
      "cumulative": 3083
    },
    {
      "score": 627,
      "count": 142,
      "cumulative": 3225
    },
    {
      "score": 626,
      "count": 150,
      "cumulative": 3375
    },
    {
      "score": 625,
      "count": 136,
      "cumulative": 3511
    },
    {
      "score": 624,
      "count": 147,
      "cumulative": 3658
    },
    {
      "score": 623,
      "count": 164,
      "cumulative": 3822
    },
    {
      "score": 622,
      "count": 157,
      "cumulative": 3979
    },
    {
      "score": 621,
      "count": 169,
      "cumulative": 4148
    },
    {
      "score": 620,
      "count": 159,
      "cumulative": 4307
    },
    {
      "score": 619,
      "count": 171,
      "cumulative": 4478
    },
    {
      "score": 618,
      "count": 177,
      "cumulative": 4655
    },
    {
      "score": 617,
      "count": 204,
      "cumulative": 4859
    },
    {
      "score": 616,
      "count": 183,
      "cumulative": 5042
    },
    {
      "score": 615,
      "count": 187,
      "cumulative": 5229
    },
    {
      "score": 614,
      "count": 193,
      "cumulative": 5422
    },
    {
      "score": 613,
      "count": 209,
      "cumulative": 5631
    },
    {
      "score": 612,
      "count": 233,
      "cumulative": 5864
    },
    {
      "score": 611,
      "count": 203,
      "cumulative": 6067
    },
    {
      "score": 610,
      "count": 222,
      "cumulative": 6289
    },
    {
      "score": 609,
      "count": 215,
      "cumulative": 6504
    },
    {
      "score": 608,
      "count": 260,
      "cumulative": 6764
    },
    {
      "score": 607,
      "count": 238,
      "cumulative": 7002
    },
    {
      "score": 606,
      "count": 236,
      "cumulative": 7238
    },
    {
      "score": 605,
      "count": 237,
      "cumulative": 7475
    },
    {
      "score": 604,
      "count": 248,
      "cumulative": 7723
    },
    {
      "score": 603,
      "count": 249,
      "cumulative": 7972
    },
    {
      "score": 602,
      "count": 268,
      "cumulative": 8240
    },
    {
      "score": 601,
      "count": 226,
      "cumulative": 8466
    },
    {
      "score": 600,
      "count": 254,
      "cumulative": 8720
    },
    {
      "score": 599,
      "count": 245,
      "cumulative": 8965
    },
    {
      "score": 598,
      "count": 227,
      "cumulative": 9192
    },
    {
      "score": 597,
      "count": 260,
      "cumulative": 9452
    },
    {
      "score": 596,
      "count": 266,
      "cumulative": 9718
    },
    {
      "score": 595,
      "count": 277,
      "cumulative": 9995
    },
    {
      "score": 594,
      "count": 285,
      "cumulative": 10280
    },
    {
      "score": 593,
      "count": 281,
      "cumulative": 10561
    },
    {
      "score": 592,
      "count": 261,
      "cumulative": 10822
    },
    {
      "score": 591,
      "count": 283,
      "cumulative": 11105
    },
    {
      "score": 590,
      "count": 295,
      "cumulative": 11400
    },
    {
      "score": 589,
      "count": 296,
      "cumulative": 11696
    },
    {
      "score": 588,
      "count": 324,
      "cumulative": 12020
    },
    {
      "score": 587,
      "count": 290,
      "cumulative": 12310
    },
    {
      "score": 586,
      "count": 299,
      "cumulative": 12609
    },
    {
      "score": 585,
      "count": 304,
      "cumulative": 12913
    },
    {
      "score": 584,
      "count": 298,
      "cumulative": 13211
    },
    {
      "score": 583,
      "count": 325,
      "cumulative": 13536
    },
    {
      "score": 582,
      "count": 354,
      "cumulative": 13890
    },
    {
      "score": 581,
      "count": 323,
      "cumulative": 14213
    },
    {
      "score": 580,
      "count": 342,
      "cumulative": 14555
    },
    {
      "score": 579,
      "count": 366,
      "cumulative": 14921
    },
    {
      "score": 578,
      "count": 330,
      "cumulative": 15251
    },
    {
      "score": 577,
      "count": 360,
      "cumulative": 15611
    },
    {
      "score": 576,
      "count": 331,
      "cumulative": 15942
    },
    {
      "score": 575,
      "count": 400,
      "cumulative": 16342
    },
    {
      "score": 574,
      "count": 378,
      "cumulative": 16720
    },
    {
      "score": 573,
      "count": 337,
      "cumulative": 17057
    },
    {
      "score": 572,
      "count": 372,
      "cumulative": 17429
    },
    {
      "score": 571,
      "count": 370,
      "cumulative": 17799
    },
    {
      "score": 570,
      "count": 389,
      "cumulative": 18188
    },
    {
      "score": 569,
      "count": 400,
      "cumulative": 18588
    },
    {
      "score": 568,
      "count": 414,
      "cumulative": 19002
    },
    {
      "score": 567,
      "count": 377,
      "cumulative": 19379
    },
    {
      "score": 566,
      "count": 387,
      "cumulative": 19766
    },
    {
      "score": 565,
      "count": 392,
      "cumulative": 20158
    },
    {
      "score": 564,
      "count": 393,
      "cumulative": 20551
    },
    {
      "score": 563,
      "count": 383,
      "cumulative": 20934
    },
    {
      "score": 562,
      "count": 416,
      "cumulative": 21350
    },
    {
      "score": 561,
      "count": 408,
      "cumulative": 21758
    },
    {
      "score": 560,
      "count": 434,
      "cumulative": 22192
    },
    {
      "score": 559,
      "count": 391,
      "cumulative": 22583
    },
    {
      "score": 558,
      "count": 397,
      "cumulative": 22980
    },
    {
      "score": 557,
      "count": 409,
      "cumulative": 23389
    },
    {
      "score": 556,
      "count": 414,
      "cumulative": 23803
    },
    {
      "score": 555,
      "count": 400,
      "cumulative": 24203
    },
    {
      "score": 554,
      "count": 414,
      "cumulative": 24617
    },
    {
      "score": 553,
      "count": 440,
      "cumulative": 25057
    },
    {
      "score": 552,
      "count": 408,
      "cumulative": 25465
    },
    {
      "score": 551,
      "count": 410,
      "cumulative": 25875
    },
    {
      "score": 550,
      "count": 449,
      "cumulative": 26324
    },
    {
      "score": 549,
      "count": 489,
      "cumulative": 26813
    },
    {
      "score": 548,
      "count": 449,
      "cumulative": 27262
    },
    {
      "score": 547,
      "count": 467,
      "cumulative": 27729
    },
    {
      "score": 546,
      "count": 462,
      "cumulative": 28191
    },
    {
      "score": 545,
      "count": 444,
      "cumulative": 28635
    },
    {
      "score": 544,
      "count": 486,
      "cumulative": 29121
    },
    {
      "score": 543,
      "count": 467,
      "cumulative": 29588
    },
    {
      "score": 542,
      "count": 400,
      "cumulative": 29988
    },
    {
      "score": 541,
      "count": 445,
      "cumulative": 30433
    },
    {
      "score": 540,
      "count": 483,
      "cumulative": 30916
    },
    {
      "score": 539,
      "count": 493,
      "cumulative": 31409
    },
    {
      "score": 538,
      "count": 494,
      "cumulative": 31903
    },
    {
      "score": 537,
      "count": 470,
      "cumulative": 32373
    },
    {
      "score": 536,
      "count": 505,
      "cumulative": 32878
    },
    {
      "score": 535,
      "count": 491,
      "cumulative": 33369
    },
    {
      "score": 534,
      "count": 495,
      "cumulative": 33864
    },
    {
      "score": 533,
      "count": 460,
      "cumulative": 34324
    },
    {
      "score": 532,
      "count": 514,
      "cumulative": 34838
    },
    {
      "score": 531,
      "count": 516,
      "cumulative": 35354
    },
    {
      "score": 530,
      "count": 451,
      "cumulative": 35805
    },
    {
      "score": 529,
      "count": 511,
      "cumulative": 36316
    },
    {
      "score": 528,
      "count": 525,
      "cumulative": 36841
    },
    {
      "score": 527,
      "count": 543,
      "cumulative": 37384
    },
    {
      "score": 526,
      "count": 542,
      "cumulative": 37926
    },
    {
      "score": 525,
      "count": 543,
      "cumulative": 38469
    },
    {
      "score": 524,
      "count": 498,
      "cumulative": 38967
    },
    {
      "score": 523,
      "count": 525,
      "cumulative": 39492
    },
    {
      "score": 522,
      "count": 553,
      "cumulative": 40045
    },
    {
      "score": 521,
      "count": 560,
      "cumulative": 40605
    },
    {
      "score": 520,
      "count": 576,
      "cumulative": 41181
    },
    {
      "score": 519,
      "count": 522,
      "cumulative": 41703
    },
    {
      "score": 518,
      "count": 531,
      "cumulative": 42234
    },
    {
      "score": 517,
      "count": 519,
      "cumulative": 42753
    },
    {
      "score": 516,
      "count": 534,
      "cumulative": 43287
    },
    {
      "score": 515,
      "count": 507,
      "cumulative": 43794
    },
    {
      "score": 514,
      "count": 530,
      "cumulative": 44324
    },
    {
      "score": 513,
      "count": 558,
      "cumulative": 44882
    },
    {
      "score": 512,
      "count": 559,
      "cumulative": 45441
    },
    {
      "score": 511,
      "count": 484,
      "cumulative": 45925
    },
    {
      "score": 510,
      "count": 556,
      "cumulative": 46481
    },
    {
      "score": 509,
      "count": 557,
      "cumulative": 47038
    },
    {
      "score": 508,
      "count": 559,
      "cumulative": 47597
    },
    {
      "score": 507,
      "count": 568,
      "cumulative": 48165
    },
    {
      "score": 506,
      "count": 588,
      "cumulative": 48753
    },
    {
      "score": 505,
      "count": 561,
      "cumulative": 49314
    },
    {
      "score": 504,
      "count": 535,
      "cumulative": 49849
    },
    {
      "score": 503,
      "count": 530,
      "cumulative": 50379
    },
    {
      "score": 502,
      "count": 562,
      "cumulative": 50941
    },
    {
      "score": 501,
      "count": 540,
      "cumulative": 51481
    },
    {
      "score": 500,
      "count": 599,
      "cumulative": 52080
    },
    {
      "score": 499,
      "count": 517,
      "cumulative": 52597
    },
    {
      "score": 498,
      "count": 576,
      "cumulative": 53173
    },
    {
      "score": 497,
      "count": 595,
      "cumulative": 53768
    },
    {
      "score": 496,
      "count": 570,
      "cumulative": 54338
    },
    {
      "score": 495,
      "count": 555,
      "cumulative": 54893
    },
    {
      "score": 494,
      "count": 576,
      "cumulative": 55469
    },
    {
      "score": 493,
      "count": 568,
      "cumulative": 56037
    },
    {
      "score": 492,
      "count": 546,
      "cumulative": 56583
    },
    {
      "score": 491,
      "count": 597,
      "cumulative": 57180
    },
    {
      "score": 490,
      "count": 556,
      "cumulative": 57736
    },
    {
      "score": 489,
      "count": 628,
      "cumulative": 58364
    },
    {
      "score": 488,
      "count": 580,
      "cumulative": 58944
    },
    {
      "score": 487,
      "count": 552,
      "cumulative": 59496
    },
    {
      "score": 486,
      "count": 561,
      "cumulative": 60057
    },
    {
      "score": 485,
      "count": 628,
      "cumulative": 60685
    },
    {
      "score": 484,
      "count": 608,
      "cumulative": 61293
    },
    {
      "score": 483,
      "count": 611,
      "cumulative": 61904
    },
    {
      "score": 482,
      "count": 591,
      "cumulative": 62495
    },
    {
      "score": 481,
      "count": 600,
      "cumulative": 63095
    },
    {
      "score": 480,
      "count": 620,
      "cumulative": 63715
    },
    {
      "score": 479,
      "count": 577,
      "cumulative": 64292
    },
    {
      "score": 478,
      "count": 558,
      "cumulative": 64850
    },
    {
      "score": 477,
      "count": 597,
      "cumulative": 65447
    },
    {
      "score": 476,
      "count": 603,
      "cumulative": 66050
    },
    {
      "score": 475,
      "count": 556,
      "cumulative": 66606
    },
    {
      "score": 474,
      "count": 574,
      "cumulative": 67180
    },
    {
      "score": 473,
      "count": 594,
      "cumulative": 67774
    },
    {
      "score": 472,
      "count": 607,
      "cumulative": 68381
    },
    {
      "score": 471,
      "count": 605,
      "cumulative": 68986
    },
    {
      "score": 470,
      "count": 600,
      "cumulative": 69586
    },
    {
      "score": 469,
      "count": 593,
      "cumulative": 70179
    },
    {
      "score": 468,
      "count": 622,
      "cumulative": 70801
    },
    {
      "score": 467,
      "count": 605,
      "cumulative": 71406
    },
    {
      "score": 466,
      "count": 593,
      "cumulative": 71999
    },
    {
      "score": 465,
      "count": 627,
      "cumulative": 72626
    },
    {
      "score": 464,
      "count": 610,
      "cumulative": 73236
    },
    {
      "score": 463,
      "count": 630,
      "cumulative": 73866
    },
    {
      "score": 462,
      "count": 583,
      "cumulative": 74449
    },
    {
      "score": 461,
      "count": 580,
      "cumulative": 75029
    },
    {
      "score": 460,
      "count": 645,
      "cumulative": 75674
    },
    {
      "score": 459,
      "count": 584,
      "cumulative": 76258
    },
    {
      "score": 458,
      "count": 603,
      "cumulative": 76861
    },
    {
      "score": 457,
      "count": 630,
      "cumulative": 77491
    },
    {
      "score": 456,
      "count": 640,
      "cumulative": 78131
    },
    {
      "score": 455,
      "count": 610,
      "cumulative": 78741
    },
    {
      "score": 454,
      "count": 569,
      "cumulative": 79310
    },
    {
      "score": 453,
      "count": 622,
      "cumulative": 79932
    },
    {
      "score": 452,
      "count": 617,
      "cumulative": 80549
    },
    {
      "score": 451,
      "count": 629,
      "cumulative": 81178
    },
    {
      "score": 450,
      "count": 564,
      "cumulative": 81742
    },
    {
      "score": 449,
      "count": 580,
      "cumulative": 82322
    },
    {
      "score": 448,
      "count": 555,
      "cumulative": 82877
    },
    {
      "score": 447,
      "count": 576,
      "cumulative": 83453
    },
    {
      "score": 446,
      "count": 587,
      "cumulative": 84040
    },
    {
      "score": 445,
      "count": 595,
      "cumulative": 84635
    },
    {
      "score": 444,
      "count": 573,
      "cumulative": 85208
    },
    {
      "score": 443,
      "count": 605,
      "cumulative": 85813
    },
    {
      "score": 442,
      "count": 566,
      "cumulative": 86379
    },
    {
      "score": 441,
      "count": 627,
      "cumulative": 87006
    },
    {
      "score": 440,
      "count": 571,
      "cumulative": 87577
    },
    {
      "score": 439,
      "count": 560,
      "cumulative": 88137
    },
    {
      "score": 438,
      "count": 622,
      "cumulative": 88759
    },
    {
      "score": 437,
      "count": 589,
      "cumulative": 89348
    },
    {
      "score": 436,
      "count": 530,
      "cumulative": 89878
    },
    {
      "score": 435,
      "count": 552,
      "cumulative": 90430
    },
    {
      "score": 434,
      "count": 558,
      "cumulative": 90988
    },
    {
      "score": 433,
      "count": 546,
      "cumulative": 91534
    },
    {
      "score": 432,
      "count": 574,
      "cumulative": 92108
    },
    {
      "score": 431,
      "count": 568,
      "cumulative": 92676
    },
    {
      "score": 430,
      "count": 528,
      "cumulative": 93204
    },
    {
      "score": 429,
      "count": 594,
      "cumulative": 93798
    },
    {
      "score": 428,
      "count": 551,
      "cumulative": 94349
    },
    {
      "score": 427,
      "count": 564,
      "cumulative": 94913
    },
    {
      "score": 426,
      "count": 573,
      "cumulative": 95486
    },
    {
      "score": 425,
      "count": 551,
      "cumulative": 96037
    },
    {
      "score": 424,
      "count": 579,
      "cumulative": 96616
    },
    {
      "score": 423,
      "count": 540,
      "cumulative": 97156
    },
    {
      "score": 422,
      "count": 527,
      "cumulative": 97683
    },
    {
      "score": 421,
      "count": 542,
      "cumulative": 98225
    },
    {
      "score": 420,
      "count": 493,
      "cumulative": 98718
    },
    {
      "score": 419,
      "count": 518,
      "cumulative": 99236
    },
    {
      "score": 418,
      "count": 557,
      "cumulative": 99793
    },
    {
      "score": 417,
      "count": 541,
      "cumulative": 100334
    },
    {
      "score": 416,
      "count": 521,
      "cumulative": 100855
    },
    {
      "score": 415,
      "count": 559,
      "cumulative": 101414
    },
    {
      "score": 414,
      "count": 488,
      "cumulative": 101902
    },
    {
      "score": 413,
      "count": 535,
      "cumulative": 102437
    },
    {
      "score": 412,
      "count": 477,
      "cumulative": 102914
    },
    {
      "score": 411,
      "count": 494,
      "cumulative": 103408
    },
    {
      "score": 410,
      "count": 553,
      "cumulative": 103961
    },
    {
      "score": 409,
      "count": 501,
      "cumulative": 104462
    },
    {
      "score": 408,
      "count": 486,
      "cumulative": 104948
    },
    {
      "score": 407,
      "count": 471,
      "cumulative": 105419
    },
    {
      "score": 406,
      "count": 490,
      "cumulative": 105909
    },
    {
      "score": 405,
      "count": 457,
      "cumulative": 106366
    },
    {
      "score": 404,
      "count": 448,
      "cumulative": 106814
    },
    {
      "score": 403,
      "count": 489,
      "cumulative": 107303
    },
    {
      "score": 402,
      "count": 491,
      "cumulative": 107794
    },
    {
      "score": 401,
      "count": 458,
      "cumulative": 108252
    },
    {
      "score": 400,
      "count": 472,
      "cumulative": 108724
    },
    {
      "score": 399,
      "count": 404,
      "cumulative": 109128
    },
    {
      "score": 398,
      "count": 456,
      "cumulative": 109584
    },
    {
      "score": 397,
      "count": 452,
      "cumulative": 110036
    },
    {
      "score": 396,
      "count": 472,
      "cumulative": 110508
    },
    {
      "score": 395,
      "count": 494,
      "cumulative": 111002
    },
    {
      "score": 394,
      "count": 462,
      "cumulative": 111464
    },
    {
      "score": 393,
      "count": 442,
      "cumulative": 111906
    },
    {
      "score": 392,
      "count": 399,
      "cumulative": 112305
    },
    {
      "score": 391,
      "count": 385,
      "cumulative": 112690
    },
    {
      "score": 390,
      "count": 415,
      "cumulative": 113105
    },
    {
      "score": 389,
      "count": 404,
      "cumulative": 113509
    },
    {
      "score": 388,
      "count": 426,
      "cumulative": 113935
    },
    {
      "score": 387,
      "count": 414,
      "cumulative": 114349
    },
    {
      "score": 386,
      "count": 424,
      "cumulative": 114773
    },
    {
      "score": 385,
      "count": 377,
      "cumulative": 115150
    },
    {
      "score": 384,
      "count": 370,
      "cumulative": 115520
    },
    {
      "score": 383,
      "count": 409,
      "cumulative": 115929
    },
    {
      "score": 382,
      "count": 386,
      "cumulative": 116315
    },
    {
      "score": 381,
      "count": 395,
      "cumulative": 116710
    },
    {
      "score": 380,
      "count": 374,
      "cumulative": 117084
    },
    {
      "score": 379,
      "count": 355,
      "cumulative": 117439
    },
    {
      "score": 378,
      "count": 395,
      "cumulative": 117834
    },
    {
      "score": 377,
      "count": 346,
      "cumulative": 118180
    },
    {
      "score": 376,
      "count": 373,
      "cumulative": 118553
    },
    {
      "score": 375,
      "count": 332,
      "cumulative": 118885
    },
    {
      "score": 374,
      "count": 318,
      "cumulative": 119203
    },
    {
      "score": 373,
      "count": 326,
      "cumulative": 119529
    },
    {
      "score": 372,
      "count": 350,
      "cumulative": 119879
    },
    {
      "score": 371,
      "count": 342,
      "cumulative": 120221
    },
    {
      "score": 370,
      "count": 342,
      "cumulative": 120563
    },
    {
      "score": 369,
      "count": 330,
      "cumulative": 120893
    },
    {
      "score": 368,
      "count": 322,
      "cumulative": 121215
    },
    {
      "score": 367,
      "count": 294,
      "cumulative": 121509
    },
    {
      "score": 366,
      "count": 301,
      "cumulative": 121810
    },
    {
      "score": 365,
      "count": 322,
      "cumulative": 122132
    },
    {
      "score": 364,
      "count": 280,
      "cumulative": 122412
    },
    {
      "score": 363,
      "count": 295,
      "cumulative": 122707
    },
    {
      "score": 362,
      "count": 311,
      "cumulative": 123018
    },
    {
      "score": 361,
      "count": 276,
      "cumulative": 123294
    },
    {
      "score": 360,
      "count": 291,
      "cumulative": 123585
    },
    {
      "score": 359,
      "count": 281,
      "cumulative": 123866
    },
    {
      "score": 358,
      "count": 293,
      "cumulative": 124159
    },
    {
      "score": 357,
      "count": 279,
      "cumulative": 124438
    },
    {
      "score": 356,
      "count": 267,
      "cumulative": 124705
    },
    {
      "score": 355,
      "count": 268,
      "cumulative": 124973
    },
    {
      "score": 354,
      "count": 279,
      "cumulative": 125252
    },
    {
      "score": 353,
      "count": 258,
      "cumulative": 125510
    },
    {
      "score": 352,
      "count": 244,
      "cumulative": 125754
    },
    {
      "score": 351,
      "count": 264,
      "cumulative": 126018
    },
    {
      "score": 350,
      "count": 263,
      "cumulative": 126281
    },
    {
      "score": 349,
      "count": 241,
      "cumulative": 126522
    },
    {
      "score": 348,
      "count": 262,
      "cumulative": 126784
    },
    {
      "score": 347,
      "count": 255,
      "cumulative": 127039
    },
    {
      "score": 346,
      "count": 226,
      "cumulative": 127265
    },
    {
      "score": 345,
      "count": 255,
      "cumulative": 127520
    },
    {
      "score": 344,
      "count": 230,
      "cumulative": 127750
    },
    {
      "score": 343,
      "count": 214,
      "cumulative": 127964
    },
    {
      "score": 342,
      "count": 237,
      "cumulative": 128201
    },
    {
      "score": 341,
      "count": 249,
      "cumulative": 128450
    },
    {
      "score": 340,
      "count": 224,
      "cumulative": 128674
    },
    {
      "score": 339,
      "count": 209,
      "cumulative": 128883
    },
    {
      "score": 338,
      "count": 224,
      "cumulative": 129107
    },
    {
      "score": 337,
      "count": 191,
      "cumulative": 129298
    },
    {
      "score": 336,
      "count": 215,
      "cumulative": 129513
    },
    {
      "score": 335,
      "count": 207,
      "cumulative": 129720
    },
    {
      "score": 334,
      "count": 207,
      "cumulative": 129927
    },
    {
      "score": 333,
      "count": 209,
      "cumulative": 130136
    },
    {
      "score": 332,
      "count": 207,
      "cumulative": 130343
    },
    {
      "score": 331,
      "count": 218,
      "cumulative": 130561
    },
    {
      "score": 330,
      "count": 175,
      "cumulative": 130736
    },
    {
      "score": 329,
      "count": 173,
      "cumulative": 130909
    },
    {
      "score": 328,
      "count": 181,
      "cumulative": 131090
    },
    {
      "score": 327,
      "count": 183,
      "cumulative": 131273
    },
    {
      "score": 326,
      "count": 186,
      "cumulative": 131459
    },
    {
      "score": 325,
      "count": 174,
      "cumulative": 131633
    },
    {
      "score": 324,
      "count": 182,
      "cumulative": 131815
    },
    {
      "score": 323,
      "count": 184,
      "cumulative": 131999
    },
    {
      "score": 322,
      "count": 190,
      "cumulative": 132189
    },
    {
      "score": 321,
      "count": 144,
      "cumulative": 132333
    },
    {
      "score": 320,
      "count": 161,
      "cumulative": 132494
    },
    {
      "score": 319,
      "count": 176,
      "cumulative": 132670
    },
    {
      "score": 318,
      "count": 141,
      "cumulative": 132811
    },
    {
      "score": 317,
      "count": 151,
      "cumulative": 132962
    },
    {
      "score": 316,
      "count": 168,
      "cumulative": 133130
    },
    {
      "score": 315,
      "count": 154,
      "cumulative": 133284
    },
    {
      "score": 314,
      "count": 155,
      "cumulative": 133439
    },
    {
      "score": 313,
      "count": 120,
      "cumulative": 133559
    },
    {
      "score": 312,
      "count": 143,
      "cumulative": 133702
    },
    {
      "score": 311,
      "count": 133,
      "cumulative": 133835
    },
    {
      "score": 310,
      "count": 145,
      "cumulative": 133980
    },
    {
      "score": 309,
      "count": 140,
      "cumulative": 134120
    },
    {
      "score": 308,
      "count": 118,
      "cumulative": 134238
    },
    {
      "score": 307,
      "count": 119,
      "cumulative": 134357
    },
    {
      "score": 306,
      "count": 109,
      "cumulative": 134466
    },
    {
      "score": 305,
      "count": 125,
      "cumulative": 134591
    },
    {
      "score": 304,
      "count": 115,
      "cumulative": 134706
    }
  ],
  "2023": [
    {
      "score": 693,
      "count": 42,
      "cumulative": 42
    },
    {
      "score": 692,
      "count": 10,
      "cumulative": 52
    },
    {
      "score": 691,
      "count": 14,
      "cumulative": 66
    },
    {
      "score": 690,
      "count": 13,
      "cumulative": 79
    },
    {
      "score": 689,
      "count": 9,
      "cumulative": 88
    },
    {
      "score": 688,
      "count": 11,
      "cumulative": 99
    },
    {
      "score": 687,
      "count": 20,
      "cumulative": 119
    },
    {
      "score": 686,
      "count": 23,
      "cumulative": 142
    },
    {
      "score": 685,
      "count": 13,
      "cumulative": 155
    },
    {
      "score": 684,
      "count": 11,
      "cumulative": 166
    },
    {
      "score": 683,
      "count": 21,
      "cumulative": 187
    },
    {
      "score": 682,
      "count": 25,
      "cumulative": 212
    },
    {
      "score": 681,
      "count": 23,
      "cumulative": 235
    },
    {
      "score": 680,
      "count": 24,
      "cumulative": 259
    },
    {
      "score": 679,
      "count": 17,
      "cumulative": 276
    },
    {
      "score": 678,
      "count": 27,
      "cumulative": 303
    },
    {
      "score": 677,
      "count": 36,
      "cumulative": 339
    },
    {
      "score": 676,
      "count": 27,
      "cumulative": 366
    },
    {
      "score": 675,
      "count": 29,
      "cumulative": 395
    },
    {
      "score": 674,
      "count": 34,
      "cumulative": 429
    },
    {
      "score": 673,
      "count": 32,
      "cumulative": 461
    },
    {
      "score": 672,
      "count": 44,
      "cumulative": 505
    },
    {
      "score": 671,
      "count": 40,
      "cumulative": 545
    },
    {
      "score": 670,
      "count": 36,
      "cumulative": 581
    },
    {
      "score": 669,
      "count": 37,
      "cumulative": 618
    },
    {
      "score": 668,
      "count": 54,
      "cumulative": 672
    },
    {
      "score": 667,
      "count": 54,
      "cumulative": 726
    },
    {
      "score": 666,
      "count": 51,
      "cumulative": 777
    },
    {
      "score": 665,
      "count": 64,
      "cumulative": 841
    },
    {
      "score": 664,
      "count": 62,
      "cumulative": 903
    },
    {
      "score": 663,
      "count": 71,
      "cumulative": 974
    },
    {
      "score": 662,
      "count": 73,
      "cumulative": 1047
    },
    {
      "score": 661,
      "count": 62,
      "cumulative": 1109
    },
    {
      "score": 660,
      "count": 62,
      "cumulative": 1171
    },
    {
      "score": 659,
      "count": 88,
      "cumulative": 1259
    },
    {
      "score": 658,
      "count": 73,
      "cumulative": 1332
    },
    {
      "score": 657,
      "count": 91,
      "cumulative": 1423
    },
    {
      "score": 656,
      "count": 92,
      "cumulative": 1515
    },
    {
      "score": 655,
      "count": 82,
      "cumulative": 1597
    },
    {
      "score": 654,
      "count": 96,
      "cumulative": 1693
    },
    {
      "score": 653,
      "count": 109,
      "cumulative": 1802
    },
    {
      "score": 652,
      "count": 97,
      "cumulative": 1899
    },
    {
      "score": 651,
      "count": 92,
      "cumulative": 1991
    },
    {
      "score": 650,
      "count": 94,
      "cumulative": 2085
    },
    {
      "score": 649,
      "count": 105,
      "cumulative": 2190
    },
    {
      "score": 648,
      "count": 113,
      "cumulative": 2303
    },
    {
      "score": 647,
      "count": 109,
      "cumulative": 2412
    },
    {
      "score": 646,
      "count": 120,
      "cumulative": 2532
    },
    {
      "score": 645,
      "count": 103,
      "cumulative": 2635
    },
    {
      "score": 644,
      "count": 130,
      "cumulative": 2765
    },
    {
      "score": 643,
      "count": 110,
      "cumulative": 2875
    },
    {
      "score": 642,
      "count": 135,
      "cumulative": 3010
    },
    {
      "score": 641,
      "count": 131,
      "cumulative": 3141
    },
    {
      "score": 640,
      "count": 126,
      "cumulative": 3267
    },
    {
      "score": 639,
      "count": 122,
      "cumulative": 3389
    },
    {
      "score": 638,
      "count": 157,
      "cumulative": 3546
    },
    {
      "score": 637,
      "count": 164,
      "cumulative": 3710
    },
    {
      "score": 636,
      "count": 171,
      "cumulative": 3881
    },
    {
      "score": 635,
      "count": 141,
      "cumulative": 4022
    },
    {
      "score": 634,
      "count": 151,
      "cumulative": 4173
    },
    {
      "score": 633,
      "count": 162,
      "cumulative": 4335
    },
    {
      "score": 632,
      "count": 156,
      "cumulative": 4491
    },
    {
      "score": 631,
      "count": 171,
      "cumulative": 4662
    },
    {
      "score": 630,
      "count": 162,
      "cumulative": 4824
    },
    {
      "score": 629,
      "count": 181,
      "cumulative": 5005
    },
    {
      "score": 628,
      "count": 186,
      "cumulative": 5191
    },
    {
      "score": 627,
      "count": 183,
      "cumulative": 5374
    },
    {
      "score": 626,
      "count": 187,
      "cumulative": 5561
    },
    {
      "score": 625,
      "count": 199,
      "cumulative": 5760
    },
    {
      "score": 624,
      "count": 203,
      "cumulative": 5963
    },
    {
      "score": 623,
      "count": 174,
      "cumulative": 6137
    },
    {
      "score": 622,
      "count": 181,
      "cumulative": 6318
    },
    {
      "score": 621,
      "count": 216,
      "cumulative": 6534
    },
    {
      "score": 620,
      "count": 223,
      "cumulative": 6757
    },
    {
      "score": 619,
      "count": 216,
      "cumulative": 6973
    },
    {
      "score": 618,
      "count": 229,
      "cumulative": 7202
    },
    {
      "score": 617,
      "count": 204,
      "cumulative": 7406
    },
    {
      "score": 616,
      "count": 202,
      "cumulative": 7608
    },
    {
      "score": 615,
      "count": 220,
      "cumulative": 7828
    },
    {
      "score": 614,
      "count": 197,
      "cumulative": 8025
    },
    {
      "score": 613,
      "count": 219,
      "cumulative": 8244
    },
    {
      "score": 612,
      "count": 233,
      "cumulative": 8477
    },
    {
      "score": 611,
      "count": 214,
      "cumulative": 8691
    },
    {
      "score": 610,
      "count": 242,
      "cumulative": 8933
    },
    {
      "score": 609,
      "count": 228,
      "cumulative": 9161
    },
    {
      "score": 608,
      "count": 251,
      "cumulative": 9412
    },
    {
      "score": 607,
      "count": 235,
      "cumulative": 9647
    },
    {
      "score": 606,
      "count": 224,
      "cumulative": 9871
    },
    {
      "score": 605,
      "count": 252,
      "cumulative": 10123
    },
    {
      "score": 604,
      "count": 259,
      "cumulative": 10382
    },
    {
      "score": 603,
      "count": 255,
      "cumulative": 10637
    },
    {
      "score": 602,
      "count": 258,
      "cumulative": 10895
    },
    {
      "score": 601,
      "count": 266,
      "cumulative": 11161
    },
    {
      "score": 600,
      "count": 254,
      "cumulative": 11415
    },
    {
      "score": 599,
      "count": 288,
      "cumulative": 11703
    },
    {
      "score": 598,
      "count": 249,
      "cumulative": 11952
    },
    {
      "score": 597,
      "count": 298,
      "cumulative": 12250
    },
    {
      "score": 596,
      "count": 294,
      "cumulative": 12544
    },
    {
      "score": 595,
      "count": 259,
      "cumulative": 12803
    },
    {
      "score": 594,
      "count": 294,
      "cumulative": 13097
    },
    {
      "score": 593,
      "count": 283,
      "cumulative": 13380
    },
    {
      "score": 592,
      "count": 291,
      "cumulative": 13671
    },
    {
      "score": 591,
      "count": 294,
      "cumulative": 13965
    },
    {
      "score": 590,
      "count": 345,
      "cumulative": 14310
    },
    {
      "score": 589,
      "count": 292,
      "cumulative": 14602
    },
    {
      "score": 588,
      "count": 330,
      "cumulative": 14932
    },
    {
      "score": 587,
      "count": 331,
      "cumulative": 15263
    },
    {
      "score": 586,
      "count": 325,
      "cumulative": 15588
    },
    {
      "score": 585,
      "count": 341,
      "cumulative": 15929
    },
    {
      "score": 584,
      "count": 312,
      "cumulative": 16241
    },
    {
      "score": 583,
      "count": 337,
      "cumulative": 16578
    },
    {
      "score": 582,
      "count": 318,
      "cumulative": 16896
    },
    {
      "score": 581,
      "count": 331,
      "cumulative": 17227
    },
    {
      "score": 580,
      "count": 340,
      "cumulative": 17567
    },
    {
      "score": 579,
      "count": 347,
      "cumulative": 17914
    },
    {
      "score": 578,
      "count": 338,
      "cumulative": 18252
    },
    {
      "score": 577,
      "count": 350,
      "cumulative": 18602
    },
    {
      "score": 576,
      "count": 355,
      "cumulative": 18957
    },
    {
      "score": 575,
      "count": 378,
      "cumulative": 19335
    },
    {
      "score": 574,
      "count": 366,
      "cumulative": 19701
    },
    {
      "score": 573,
      "count": 390,
      "cumulative": 20091
    },
    {
      "score": 572,
      "count": 361,
      "cumulative": 20452
    },
    {
      "score": 571,
      "count": 370,
      "cumulative": 20822
    },
    {
      "score": 570,
      "count": 343,
      "cumulative": 21165
    },
    {
      "score": 569,
      "count": 397,
      "cumulative": 21562
    },
    {
      "score": 568,
      "count": 419,
      "cumulative": 21981
    },
    {
      "score": 567,
      "count": 370,
      "cumulative": 22351
    },
    {
      "score": 566,
      "count": 352,
      "cumulative": 22703
    },
    {
      "score": 565,
      "count": 378,
      "cumulative": 23081
    },
    {
      "score": 564,
      "count": 363,
      "cumulative": 23444
    },
    {
      "score": 563,
      "count": 391,
      "cumulative": 23835
    },
    {
      "score": 562,
      "count": 429,
      "cumulative": 24264
    },
    {
      "score": 561,
      "count": 425,
      "cumulative": 24689
    },
    {
      "score": 560,
      "count": 401,
      "cumulative": 25090
    },
    {
      "score": 559,
      "count": 415,
      "cumulative": 25505
    },
    {
      "score": 558,
      "count": 393,
      "cumulative": 25898
    },
    {
      "score": 557,
      "count": 440,
      "cumulative": 26338
    },
    {
      "score": 556,
      "count": 395,
      "cumulative": 26733
    },
    {
      "score": 555,
      "count": 429,
      "cumulative": 27162
    },
    {
      "score": 554,
      "count": 408,
      "cumulative": 27570
    },
    {
      "score": 553,
      "count": 402,
      "cumulative": 27972
    },
    {
      "score": 552,
      "count": 423,
      "cumulative": 28395
    },
    {
      "score": 551,
      "count": 455,
      "cumulative": 28850
    },
    {
      "score": 550,
      "count": 451,
      "cumulative": 29301
    },
    {
      "score": 549,
      "count": 494,
      "cumulative": 29795
    },
    {
      "score": 548,
      "count": 444,
      "cumulative": 30239
    },
    {
      "score": 547,
      "count": 455,
      "cumulative": 30694
    },
    {
      "score": 546,
      "count": 454,
      "cumulative": 31148
    },
    {
      "score": 545,
      "count": 435,
      "cumulative": 31583
    },
    {
      "score": 544,
      "count": 440,
      "cumulative": 32023
    },
    {
      "score": 543,
      "count": 457,
      "cumulative": 32480
    },
    {
      "score": 542,
      "count": 469,
      "cumulative": 32949
    },
    {
      "score": 541,
      "count": 507,
      "cumulative": 33456
    },
    {
      "score": 540,
      "count": 474,
      "cumulative": 33930
    },
    {
      "score": 539,
      "count": 513,
      "cumulative": 34443
    },
    {
      "score": 538,
      "count": 478,
      "cumulative": 34921
    },
    {
      "score": 537,
      "count": 474,
      "cumulative": 35395
    },
    {
      "score": 536,
      "count": 484,
      "cumulative": 35879
    },
    {
      "score": 535,
      "count": 481,
      "cumulative": 36360
    },
    {
      "score": 534,
      "count": 516,
      "cumulative": 36876
    },
    {
      "score": 533,
      "count": 447,
      "cumulative": 37323
    },
    {
      "score": 532,
      "count": 517,
      "cumulative": 37840
    },
    {
      "score": 531,
      "count": 513,
      "cumulative": 38353
    },
    {
      "score": 530,
      "count": 517,
      "cumulative": 38870
    },
    {
      "score": 529,
      "count": 512,
      "cumulative": 39382
    },
    {
      "score": 528,
      "count": 492,
      "cumulative": 39874
    },
    {
      "score": 527,
      "count": 525,
      "cumulative": 40399
    },
    {
      "score": 526,
      "count": 531,
      "cumulative": 40930
    },
    {
      "score": 525,
      "count": 519,
      "cumulative": 41449
    },
    {
      "score": 524,
      "count": 540,
      "cumulative": 41989
    },
    {
      "score": 523,
      "count": 509,
      "cumulative": 42498
    },
    {
      "score": 522,
      "count": 538,
      "cumulative": 43036
    },
    {
      "score": 521,
      "count": 564,
      "cumulative": 43600
    },
    {
      "score": 520,
      "count": 516,
      "cumulative": 44116
    },
    {
      "score": 519,
      "count": 471,
      "cumulative": 44587
    },
    {
      "score": 518,
      "count": 595,
      "cumulative": 45182
    },
    {
      "score": 517,
      "count": 560,
      "cumulative": 45742
    },
    {
      "score": 516,
      "count": 529,
      "cumulative": 46271
    },
    {
      "score": 515,
      "count": 516,
      "cumulative": 46787
    },
    {
      "score": 514,
      "count": 533,
      "cumulative": 47320
    },
    {
      "score": 513,
      "count": 537,
      "cumulative": 47857
    },
    {
      "score": 512,
      "count": 598,
      "cumulative": 48455
    },
    {
      "score": 511,
      "count": 560,
      "cumulative": 49015
    },
    {
      "score": 510,
      "count": 524,
      "cumulative": 49539
    },
    {
      "score": 509,
      "count": 604,
      "cumulative": 50143
    },
    {
      "score": 508,
      "count": 613,
      "cumulative": 50756
    },
    {
      "score": 507,
      "count": 551,
      "cumulative": 51307
    },
    {
      "score": 506,
      "count": 616,
      "cumulative": 51923
    },
    {
      "score": 505,
      "count": 590,
      "cumulative": 52513
    },
    {
      "score": 504,
      "count": 570,
      "cumulative": 53083
    },
    {
      "score": 503,
      "count": 585,
      "cumulative": 53668
    },
    {
      "score": 502,
      "count": 579,
      "cumulative": 54247
    },
    {
      "score": 501,
      "count": 570,
      "cumulative": 54817
    },
    {
      "score": 500,
      "count": 578,
      "cumulative": 55395
    },
    {
      "score": 499,
      "count": 608,
      "cumulative": 56003
    },
    {
      "score": 498,
      "count": 613,
      "cumulative": 56616
    },
    {
      "score": 497,
      "count": 607,
      "cumulative": 57223
    },
    {
      "score": 496,
      "count": 567,
      "cumulative": 57790
    },
    {
      "score": 495,
      "count": 618,
      "cumulative": 58408
    },
    {
      "score": 494,
      "count": 619,
      "cumulative": 59027
    },
    {
      "score": 493,
      "count": 615,
      "cumulative": 59642
    },
    {
      "score": 492,
      "count": 639,
      "cumulative": 60281
    },
    {
      "score": 491,
      "count": 628,
      "cumulative": 60909
    },
    {
      "score": 490,
      "count": 622,
      "cumulative": 61531
    },
    {
      "score": 489,
      "count": 631,
      "cumulative": 62162
    },
    {
      "score": 488,
      "count": 625,
      "cumulative": 62787
    },
    {
      "score": 487,
      "count": 612,
      "cumulative": 63399
    },
    {
      "score": 486,
      "count": 627,
      "cumulative": 64026
    },
    {
      "score": 485,
      "count": 593,
      "cumulative": 64619
    },
    {
      "score": 484,
      "count": 615,
      "cumulative": 65234
    },
    {
      "score": 483,
      "count": 632,
      "cumulative": 65866
    },
    {
      "score": 482,
      "count": 624,
      "cumulative": 66490
    },
    {
      "score": 481,
      "count": 597,
      "cumulative": 67087
    },
    {
      "score": 480,
      "count": 620,
      "cumulative": 67707
    },
    {
      "score": 479,
      "count": 626,
      "cumulative": 68333
    },
    {
      "score": 478,
      "count": 580,
      "cumulative": 68913
    },
    {
      "score": 477,
      "count": 613,
      "cumulative": 69526
    },
    {
      "score": 476,
      "count": 619,
      "cumulative": 70145
    },
    {
      "score": 475,
      "count": 591,
      "cumulative": 70736
    },
    {
      "score": 474,
      "count": 617,
      "cumulative": 71353
    },
    {
      "score": 473,
      "count": 597,
      "cumulative": 71950
    },
    {
      "score": 472,
      "count": 562,
      "cumulative": 72512
    },
    {
      "score": 471,
      "count": 593,
      "cumulative": 73105
    },
    {
      "score": 470,
      "count": 574,
      "cumulative": 73679
    },
    {
      "score": 469,
      "count": 580,
      "cumulative": 74259
    },
    {
      "score": 468,
      "count": 545,
      "cumulative": 74804
    },
    {
      "score": 467,
      "count": 567,
      "cumulative": 75371
    },
    {
      "score": 466,
      "count": 567,
      "cumulative": 75938
    },
    {
      "score": 465,
      "count": 564,
      "cumulative": 76502
    },
    {
      "score": 464,
      "count": 575,
      "cumulative": 77077
    },
    {
      "score": 463,
      "count": 555,
      "cumulative": 77632
    },
    {
      "score": 462,
      "count": 564,
      "cumulative": 78196
    },
    {
      "score": 461,
      "count": 555,
      "cumulative": 78751
    },
    {
      "score": 460,
      "count": 562,
      "cumulative": 79313
    },
    {
      "score": 459,
      "count": 538,
      "cumulative": 79851
    },
    {
      "score": 458,
      "count": 521,
      "cumulative": 80372
    },
    {
      "score": 457,
      "count": 537,
      "cumulative": 80909
    },
    {
      "score": 456,
      "count": 526,
      "cumulative": 81435
    },
    {
      "score": 455,
      "count": 547,
      "cumulative": 81982
    },
    {
      "score": 454,
      "count": 519,
      "cumulative": 82501
    },
    {
      "score": 453,
      "count": 555,
      "cumulative": 83056
    },
    {
      "score": 452,
      "count": 528,
      "cumulative": 83584
    },
    {
      "score": 451,
      "count": 549,
      "cumulative": 84133
    },
    {
      "score": 450,
      "count": 533,
      "cumulative": 84666
    },
    {
      "score": 449,
      "count": 530,
      "cumulative": 85196
    },
    {
      "score": 448,
      "count": 528,
      "cumulative": 85724
    },
    {
      "score": 447,
      "count": 521,
      "cumulative": 86245
    },
    {
      "score": 446,
      "count": 502,
      "cumulative": 86747
    },
    {
      "score": 445,
      "count": 528,
      "cumulative": 87275
    },
    {
      "score": 444,
      "count": 540,
      "cumulative": 87815
    },
    {
      "score": 443,
      "count": 522,
      "cumulative": 88337
    },
    {
      "score": 442,
      "count": 514,
      "cumulative": 88851
    },
    {
      "score": 441,
      "count": 532,
      "cumulative": 89383
    },
    {
      "score": 440,
      "count": 521,
      "cumulative": 89904
    },
    {
      "score": 439,
      "count": 504,
      "cumulative": 90408
    },
    {
      "score": 438,
      "count": 522,
      "cumulative": 90930
    },
    {
      "score": 437,
      "count": 519,
      "cumulative": 91449
    },
    {
      "score": 436,
      "count": 488,
      "cumulative": 91937
    },
    {
      "score": 435,
      "count": 511,
      "cumulative": 92448
    },
    {
      "score": 434,
      "count": 504,
      "cumulative": 92952
    },
    {
      "score": 433,
      "count": 510,
      "cumulative": 93462
    },
    {
      "score": 432,
      "count": 488,
      "cumulative": 93950
    },
    {
      "score": 431,
      "count": 495,
      "cumulative": 94445
    },
    {
      "score": 430,
      "count": 504,
      "cumulative": 94949
    },
    {
      "score": 429,
      "count": 510,
      "cumulative": 95459
    },
    {
      "score": 428,
      "count": 487,
      "cumulative": 95946
    },
    {
      "score": 427,
      "count": 469,
      "cumulative": 96415
    },
    {
      "score": 426,
      "count": 484,
      "cumulative": 96899
    },
    {
      "score": 425,
      "count": 503,
      "cumulative": 97402
    },
    {
      "score": 424,
      "count": 471,
      "cumulative": 97873
    },
    {
      "score": 423,
      "count": 471,
      "cumulative": 98344
    },
    {
      "score": 422,
      "count": 469,
      "cumulative": 98813
    },
    {
      "score": 421,
      "count": 470,
      "cumulative": 99283
    },
    {
      "score": 420,
      "count": 466,
      "cumulative": 99749
    },
    {
      "score": 419,
      "count": 451,
      "cumulative": 100200
    },
    {
      "score": 418,
      "count": 462,
      "cumulative": 100662
    },
    {
      "score": 417,
      "count": 478,
      "cumulative": 101140
    },
    {
      "score": 416,
      "count": 452,
      "cumulative": 101592
    },
    {
      "score": 415,
      "count": 472,
      "cumulative": 102064
    },
    {
      "score": 414,
      "count": 459,
      "cumulative": 102523
    },
    {
      "score": 413,
      "count": 450,
      "cumulative": 102973
    },
    {
      "score": 412,
      "count": 460,
      "cumulative": 103433
    },
    {
      "score": 411,
      "count": 449,
      "cumulative": 103882
    },
    {
      "score": 410,
      "count": 446,
      "cumulative": 104328
    },
    {
      "score": 409,
      "count": 444,
      "cumulative": 104772
    },
    {
      "score": 408,
      "count": 432,
      "cumulative": 105204
    },
    {
      "score": 407,
      "count": 450,
      "cumulative": 105654
    },
    {
      "score": 406,
      "count": 432,
      "cumulative": 106086
    },
    {
      "score": 405,
      "count": 415,
      "cumulative": 106501
    },
    {
      "score": 404,
      "count": 421,
      "cumulative": 106922
    },
    {
      "score": 403,
      "count": 420,
      "cumulative": 107342
    },
    {
      "score": 402,
      "count": 411,
      "cumulative": 107753
    },
    {
      "score": 401,
      "count": 421,
      "cumulative": 108174
    },
    {
      "score": 400,
      "count": 402,
      "cumulative": 108576
    },
    {
      "score": 399,
      "count": 412,
      "cumulative": 108988
    },
    {
      "score": 398,
      "count": 397,
      "cumulative": 109385
    },
    {
      "score": 397,
      "count": 405,
      "cumulative": 109790
    },
    {
      "score": 396,
      "count": 405,
      "cumulative": 110195
    },
    {
      "score": 395,
      "count": 397,
      "cumulative": 110592
    },
    {
      "score": 394,
      "count": 391,
      "cumulative": 110983
    },
    {
      "score": 393,
      "count": 380,
      "cumulative": 111363
    },
    {
      "score": 392,
      "count": 360,
      "cumulative": 111723
    },
    {
      "score": 391,
      "count": 387,
      "cumulative": 112110
    },
    {
      "score": 390,
      "count": 360,
      "cumulative": 112470
    },
    {
      "score": 389,
      "count": 374,
      "cumulative": 112844
    },
    {
      "score": 388,
      "count": 372,
      "cumulative": 113216
    },
    {
      "score": 387,
      "count": 370,
      "cumulative": 113586
    },
    {
      "score": 386,
      "count": 358,
      "cumulative": 113944
    },
    {
      "score": 385,
      "count": 350,
      "cumulative": 114294
    },
    {
      "score": 384,
      "count": 358,
      "cumulative": 114652
    },
    {
      "score": 383,
      "count": 357,
      "cumulative": 115009
    },
    {
      "score": 382,
      "count": 349,
      "cumulative": 115358
    },
    {
      "score": 381,
      "count": 359,
      "cumulative": 115717
    },
    {
      "score": 380,
      "count": 333,
      "cumulative": 116050
    },
    {
      "score": 379,
      "count": 339,
      "cumulative": 116389
    },
    {
      "score": 378,
      "count": 344,
      "cumulative": 116733
    },
    {
      "score": 377,
      "count": 320,
      "cumulative": 117053
    },
    {
      "score": 376,
      "count": 333,
      "cumulative": 117386
    },
    {
      "score": 375,
      "count": 343,
      "cumulative": 117729
    },
    {
      "score": 374,
      "count": 305,
      "cumulative": 118034
    },
    {
      "score": 373,
      "count": 311,
      "cumulative": 118345
    },
    {
      "score": 372,
      "count": 312,
      "cumulative": 118657
    },
    {
      "score": 371,
      "count": 309,
      "cumulative": 118966
    },
    {
      "score": 370,
      "count": 308,
      "cumulative": 119274
    },
    {
      "score": 369,
      "count": 309,
      "cumulative": 119583
    },
    {
      "score": 368,
      "count": 296,
      "cumulative": 119879
    },
    {
      "score": 367,
      "count": 290,
      "cumulative": 120169
    },
    {
      "score": 366,
      "count": 291,
      "cumulative": 120460
    },
    {
      "score": 365,
      "count": 295,
      "cumulative": 120755
    },
    {
      "score": 364,
      "count": 271,
      "cumulative": 121026
    },
    {
      "score": 363,
      "count": 269,
      "cumulative": 121295
    },
    {
      "score": 362,
      "count": 270,
      "cumulative": 121565
    },
    {
      "score": 361,
      "count": 270,
      "cumulative": 121835
    },
    {
      "score": 360,
      "count": 270,
      "cumulative": 122105
    },
    {
      "score": 359,
      "count": 268,
      "cumulative": 122373
    },
    {
      "score": 358,
      "count": 257,
      "cumulative": 122630
    },
    {
      "score": 357,
      "count": 257,
      "cumulative": 122887
    },
    {
      "score": 356,
      "count": 252,
      "cumulative": 123139
    },
    {
      "score": 355,
      "count": 254,
      "cumulative": 123393
    },
    {
      "score": 354,
      "count": 252,
      "cumulative": 123645
    },
    {
      "score": 353,
      "count": 244,
      "cumulative": 123889
    },
    {
      "score": 352,
      "count": 246,
      "cumulative": 124135
    },
    {
      "score": 351,
      "count": 234,
      "cumulative": 124369
    },
    {
      "score": 350,
      "count": 248,
      "cumulative": 124617
    },
    {
      "score": 349,
      "count": 233,
      "cumulative": 124850
    },
    {
      "score": 348,
      "count": 240,
      "cumulative": 125090
    },
    {
      "score": 347,
      "count": 232,
      "cumulative": 125322
    },
    {
      "score": 346,
      "count": 224,
      "cumulative": 125546
    },
    {
      "score": 345,
      "count": 217,
      "cumulative": 125763
    },
    {
      "score": 344,
      "count": 220,
      "cumulative": 125983
    },
    {
      "score": 343,
      "count": 209,
      "cumulative": 126192
    },
    {
      "score": 342,
      "count": 219,
      "cumulative": 126411
    },
    {
      "score": 341,
      "count": 215,
      "cumulative": 126626
    },
    {
      "score": 340,
      "count": 211,
      "cumulative": 126837
    },
    {
      "score": 339,
      "count": 205,
      "cumulative": 127042
    },
    {
      "score": 338,
      "count": 207,
      "cumulative": 127249
    },
    {
      "score": 337,
      "count": 195,
      "cumulative": 127444
    },
    {
      "score": 336,
      "count": 199,
      "cumulative": 127643
    },
    {
      "score": 335,
      "count": 196,
      "cumulative": 127839
    },
    {
      "score": 334,
      "count": 192,
      "cumulative": 128031
    },
    {
      "score": 333,
      "count": 193,
      "cumulative": 128224
    },
    {
      "score": 332,
      "count": 192,
      "cumulative": 128416
    },
    {
      "score": 331,
      "count": 187,
      "cumulative": 128603
    },
    {
      "score": 330,
      "count": 184,
      "cumulative": 128787
    },
    {
      "score": 329,
      "count": 179,
      "cumulative": 128966
    },
    {
      "score": 328,
      "count": 180,
      "cumulative": 129146
    },
    {
      "score": 327,
      "count": 175,
      "cumulative": 129321
    },
    {
      "score": 326,
      "count": 174,
      "cumulative": 129495
    },
    {
      "score": 325,
      "count": 167,
      "cumulative": 129662
    },
    {
      "score": 324,
      "count": 168,
      "cumulative": 129830
    },
    {
      "score": 323,
      "count": 162,
      "cumulative": 129992
    },
    {
      "score": 322,
      "count": 165,
      "cumulative": 130157
    },
    {
      "score": 321,
      "count": 158,
      "cumulative": 130315
    },
    {
      "score": 320,
      "count": 158,
      "cumulative": 130473
    },
    {
      "score": 319,
      "count": 155,
      "cumulative": 130628
    },
    {
      "score": 318,
      "count": 152,
      "cumulative": 130780
    },
    {
      "score": 317,
      "count": 154,
      "cumulative": 130934
    },
    {
      "score": 316,
      "count": 148,
      "cumulative": 131082
    },
    {
      "score": 315,
      "count": 148,
      "cumulative": 131230
    },
    {
      "score": 314,
      "count": 143,
      "cumulative": 131373
    },
    {
      "score": 313,
      "count": 142,
      "cumulative": 131515
    },
    {
      "score": 312,
      "count": 144,
      "cumulative": 131659
    },
    {
      "score": 311,
      "count": 137,
      "cumulative": 131796
    },
    {
      "score": 310,
      "count": 138,
      "cumulative": 131934
    },
    {
      "score": 309,
      "count": 137,
      "cumulative": 132071
    },
    {
      "score": 308,
      "count": 132,
      "cumulative": 132203
    },
    {
      "score": 307,
      "count": 130,
      "cumulative": 132333
    },
    {
      "score": 306,
      "count": 127,
      "cumulative": 132460
    },
    {
      "score": 305,
      "count": 128,
      "cumulative": 132588
    },
    {
      "score": 304,
      "count": 124,
      "cumulative": 132712
    },
    {
      "score": 303,
      "count": 121,
      "cumulative": 132833
    },
    {
      "score": 302,
      "count": 121,
      "cumulative": 132954
    },
    {
      "score": 301,
      "count": 117,
      "cumulative": 133071
    },
    {
      "score": 300,
      "count": 119,
      "cumulative": 133190
    },
    {
      "score": 299,
      "count": 113,
      "cumulative": 133303
    },
    {
      "score": 298,
      "count": 112,
      "cumulative": 133415
    },
    {
      "score": 297,
      "count": 109,
      "cumulative": 133524
    },
    {
      "score": 296,
      "count": 108,
      "cumulative": 133632
    },
    {
      "score": 295,
      "count": 107,
      "cumulative": 133739
    },
    {
      "score": 294,
      "count": 104,
      "cumulative": 133843
    },
    {
      "score": 293,
      "count": 102,
      "cumulative": 133945
    },
    {
      "score": 292,
      "count": 100,
      "cumulative": 134045
    },
    {
      "score": 291,
      "count": 99,
      "cumulative": 134144
    },
    {
      "score": 290,
      "count": 96,
      "cumulative": 134240
    },
    {
      "score": 289,
      "count": 94,
      "cumulative": 134334
    },
    {
      "score": 288,
      "count": 91,
      "cumulative": 134425
    },
    {
      "score": 287,
      "count": 89,
      "cumulative": 134514
    },
    {
      "score": 286,
      "count": 87,
      "cumulative": 134601
    },
    {
      "score": 285,
      "count": 86,
      "cumulative": 134687
    },
    {
      "score": 284,
      "count": 83,
      "cumulative": 134770
    },
    {
      "score": 283,
      "count": 81,
      "cumulative": 134851
    },
    {
      "score": 282,
      "count": 79,
      "cumulative": 134930
    },
    {
      "score": 281,
      "count": 78,
      "cumulative": 135008
    },
    {
      "score": 280,
      "count": 76,
      "cumulative": 135084
    },
    {
      "score": 279,
      "count": 73,
      "cumulative": 135157
    },
    {
      "score": 278,
      "count": 71,
      "cumulative": 135228
    },
    {
      "score": 277,
      "count": 70,
      "cumulative": 135298
    },
    {
      "score": 276,
      "count": 68,
      "cumulative": 135366
    },
    {
      "score": 275,
      "count": 67,
      "cumulative": 135433
    },
    {
      "score": 274,
      "count": 64,
      "cumulative": 135497
    },
    {
      "score": 273,
      "count": 63,
      "cumulative": 135560
    },
    {
      "score": 272,
      "count": 61,
      "cumulative": 135621
    },
    {
      "score": 271,
      "count": 59,
      "cumulative": 135680
    },
    {
      "score": 270,
      "count": 58,
      "cumulative": 135738
    },
    {
      "score": 269,
      "count": 56,
      "cumulative": 135794
    },
    {
      "score": 268,
      "count": 54,
      "cumulative": 135848
    },
    {
      "score": 267,
      "count": 52,
      "cumulative": 135900
    },
    {
      "score": 266,
      "count": 51,
      "cumulative": 135951
    },
    {
      "score": 265,
      "count": 49,
      "cumulative": 136000
    },
    {
      "score": 264,
      "count": 48,
      "cumulative": 136048
    },
    {
      "score": 263,
      "count": 46,
      "cumulative": 136094
    },
    {
      "score": 262,
      "count": 45,
      "cumulative": 136139
    },
    {
      "score": 261,
      "count": 43,
      "cumulative": 136182
    },
    {
      "score": 260,
      "count": 42,
      "cumulative": 136224
    },
    {
      "score": 259,
      "count": 40,
      "cumulative": 136264
    },
    {
      "score": 258,
      "count": 39,
      "cumulative": 136303
    },
    {
      "score": 257,
      "count": 37,
      "cumulative": 136340
    },
    {
      "score": 256,
      "count": 36,
      "cumulative": 136376
    },
    {
      "score": 255,
      "count": 34,
      "cumulative": 136410
    },
    {
      "score": 254,
      "count": 33,
      "cumulative": 136443
    },
    {
      "score": 253,
      "count": 32,
      "cumulative": 136475
    },
    {
      "score": 252,
      "count": 30,
      "cumulative": 136505
    },
    {
      "score": 251,
      "count": 29,
      "cumulative": 136534
    },
    {
      "score": 250,
      "count": 28,
      "cumulative": 136562
    },
    {
      "score": 249,
      "count": 27,
      "cumulative": 136589
    },
    {
      "score": 248,
      "count": 25,
      "cumulative": 136614
    },
    {
      "score": 247,
      "count": 24,
      "cumulative": 136638
    },
    {
      "score": 246,
      "count": 23,
      "cumulative": 136661
    },
    {
      "score": 245,
      "count": 22,
      "cumulative": 136683
    },
    {
      "score": 244,
      "count": 21,
      "cumulative": 136704
    },
    {
      "score": 243,
      "count": 20,
      "cumulative": 136724
    },
    {
      "score": 242,
      "count": 19,
      "cumulative": 136743
    },
    {
      "score": 241,
      "count": 18,
      "cumulative": 136761
    },
    {
      "score": 240,
      "count": 17,
      "cumulative": 136778
    },
    {
      "score": 239,
      "count": 16,
      "cumulative": 136794
    },
    {
      "score": 238,
      "count": 15,
      "cumulative": 136809
    },
    {
      "score": 237,
      "count": 14,
      "cumulative": 136823
    },
    {
      "score": 236,
      "count": 13,
      "cumulative": 136836
    },
    {
      "score": 235,
      "count": 13,
      "cumulative": 136849
    },
    {
      "score": 234,
      "count": 12,
      "cumulative": 136861
    },
    {
      "score": 233,
      "count": 11,
      "cumulative": 136872
    },
    {
      "score": 232,
      "count": 11,
      "cumulative": 136883
    },
    {
      "score": 231,
      "count": 10,
      "cumulative": 136893
    },
    {
      "score": 230,
      "count": 10,
      "cumulative": 136903
    },
    {
      "score": 229,
      "count": 9,
      "cumulative": 136912
    },
    {
      "score": 228,
      "count": 9,
      "cumulative": 136921
    },
    {
      "score": 227,
      "count": 8,
      "cumulative": 136929
    },
    {
      "score": 226,
      "count": 8,
      "cumulative": 136937
    },
    {
      "score": 225,
      "count": 7,
      "cumulative": 136944
    },
    {
      "score": 224,
      "count": 7,
      "cumulative": 136951
    },
    {
      "score": 223,
      "count": 7,
      "cumulative": 136958
    },
    {
      "score": 222,
      "count": 6,
      "cumulative": 136964
    },
    {
      "score": 221,
      "count": 6,
      "cumulative": 136970
    },
    {
      "score": 220,
      "count": 6,
      "cumulative": 136976
    },
    {
      "score": 219,
      "count": 5,
      "cumulative": 136981
    },
    {
      "score": 218,
      "count": 5,
      "cumulative": 136986
    },
    {
      "score": 217,
      "count": 5,
      "cumulative": 136991
    },
    {
      "score": 216,
      "count": 4,
      "cumulative": 136995
    },
    {
      "score": 215,
      "count": 4,
      "cumulative": 136999
    },
    {
      "score": 214,
      "count": 4,
      "cumulative": 137003
    },
    {
      "score": 213,
      "count": 4,
      "cumulative": 137007
    },
    {
      "score": 212,
      "count": 3,
      "cumulative": 137010
    },
    {
      "score": 211,
      "count": 3,
      "cumulative": 137013
    },
    {
      "score": 210,
      "count": 3,
      "cumulative": 137016
    },
    {
      "score": 209,
      "count": 3,
      "cumulative": 137019
    },
    {
      "score": 208,
      "count": 3,
      "cumulative": 137022
    },
    {
      "score": 207,
      "count": 2,
      "cumulative": 137024
    },
    {
      "score": 206,
      "count": 2,
      "cumulative": 137026
    },
    {
      "score": 205,
      "count": 2,
      "cumulative": 137028
    },
    {
      "score": 204,
      "count": 2,
      "cumulative": 137030
    },
    {
      "score": 203,
      "count": 2,
      "cumulative": 137032
    },
    {
      "score": 202,
      "count": 2,
      "cumulative": 137034
    },
    {
      "score": 201,
      "count": 2,
      "cumulative": 137036
    },
    {
      "score": 200,
      "count": 1,
      "cumulative": 137037
    }
  ],
  "2024": [
    {
      "score": 697,
      "count": 45,
      "cumulative": 45
    },
    {
      "score": 696,
      "count": 6,
      "cumulative": 51
    },
    {
      "score": 695,
      "count": 2,
      "cumulative": 53
    },
    {
      "score": 694,
      "count": 7,
      "cumulative": 60
    },
    {
      "score": 693,
      "count": 9,
      "cumulative": 69
    },
    {
      "score": 692,
      "count": 11,
      "cumulative": 80
    },
    {
      "score": 691,
      "count": 11,
      "cumulative": 91
    },
    {
      "score": 690,
      "count": 20,
      "cumulative": 111
    },
    {
      "score": 689,
      "count": 17,
      "cumulative": 128
    },
    {
      "score": 688,
      "count": 13,
      "cumulative": 141
    },
    {
      "score": 687,
      "count": 9,
      "cumulative": 150
    },
    {
      "score": 686,
      "count": 19,
      "cumulative": 169
    },
    {
      "score": 685,
      "count": 23,
      "cumulative": 192
    },
    {
      "score": 684,
      "count": 22,
      "cumulative": 214
    },
    {
      "score": 683,
      "count": 25,
      "cumulative": 239
    },
    {
      "score": 682,
      "count": 28,
      "cumulative": 267
    },
    {
      "score": 681,
      "count": 38,
      "cumulative": 305
    },
    {
      "score": 680,
      "count": 22,
      "cumulative": 327
    },
    {
      "score": 679,
      "count": 32,
      "cumulative": 359
    },
    {
      "score": 678,
      "count": 42,
      "cumulative": 401
    },
    {
      "score": 677,
      "count": 31,
      "cumulative": 432
    },
    {
      "score": 676,
      "count": 43,
      "cumulative": 475
    },
    {
      "score": 675,
      "count": 42,
      "cumulative": 517
    },
    {
      "score": 674,
      "count": 48,
      "cumulative": 565
    },
    {
      "score": 673,
      "count": 38,
      "cumulative": 603
    },
    {
      "score": 672,
      "count": 69,
      "cumulative": 672
    },
    {
      "score": 671,
      "count": 54,
      "cumulative": 726
    },
    {
      "score": 670,
      "count": 41,
      "cumulative": 767
    },
    {
      "score": 669,
      "count": 65,
      "cumulative": 832
    },
    {
      "score": 668,
      "count": 69,
      "cumulative": 901
    },
    {
      "score": 667,
      "count": 89,
      "cumulative": 990
    },
    {
      "score": 666,
      "count": 85,
      "cumulative": 1075
    },
    {
      "score": 665,
      "count": 75,
      "cumulative": 1150
    },
    {
      "score": 664,
      "count": 82,
      "cumulative": 1232
    },
    {
      "score": 663,
      "count": 91,
      "cumulative": 1323
    },
    {
      "score": 662,
      "count": 91,
      "cumulative": 1414
    },
    {
      "score": 661,
      "count": 92,
      "cumulative": 1506
    },
    {
      "score": 660,
      "count": 100,
      "cumulative": 1606
    },
    {
      "score": 659,
      "count": 104,
      "cumulative": 1710
    },
    {
      "score": 658,
      "count": 105,
      "cumulative": 1815
    },
    {
      "score": 657,
      "count": 108,
      "cumulative": 1923
    },
    {
      "score": 656,
      "count": 101,
      "cumulative": 2024
    },
    {
      "score": 655,
      "count": 115,
      "cumulative": 2139
    },
    {
      "score": 654,
      "count": 122,
      "cumulative": 2261
    },
    {
      "score": 653,
      "count": 112,
      "cumulative": 2373
    },
    {
      "score": 652,
      "count": 131,
      "cumulative": 2504
    },
    {
      "score": 651,
      "count": 140,
      "cumulative": 2644
    },
    {
      "score": 650,
      "count": 135,
      "cumulative": 2779
    },
    {
      "score": 649,
      "count": 139,
      "cumulative": 2918
    },
    {
      "score": 648,
      "count": 164,
      "cumulative": 3082
    },
    {
      "score": 647,
      "count": 145,
      "cumulative": 3227
    },
    {
      "score": 646,
      "count": 145,
      "cumulative": 3372
    },
    {
      "score": 645,
      "count": 174,
      "cumulative": 3546
    },
    {
      "score": 644,
      "count": 165,
      "cumulative": 3711
    },
    {
      "score": 643,
      "count": 172,
      "cumulative": 3883
    },
    {
      "score": 642,
      "count": 172,
      "cumulative": 4055
    },
    {
      "score": 641,
      "count": 171,
      "cumulative": 4226
    },
    {
      "score": 640,
      "count": 175,
      "cumulative": 4401
    },
    {
      "score": 639,
      "count": 201,
      "cumulative": 4602
    },
    {
      "score": 638,
      "count": 178,
      "cumulative": 4780
    },
    {
      "score": 637,
      "count": 196,
      "cumulative": 4976
    },
    {
      "score": 636,
      "count": 202,
      "cumulative": 5178
    },
    {
      "score": 635,
      "count": 204,
      "cumulative": 5382
    },
    {
      "score": 634,
      "count": 197,
      "cumulative": 5579
    },
    {
      "score": 633,
      "count": 215,
      "cumulative": 5794
    },
    {
      "score": 632,
      "count": 230,
      "cumulative": 6024
    },
    {
      "score": 631,
      "count": 239,
      "cumulative": 6263
    },
    {
      "score": 630,
      "count": 221,
      "cumulative": 6484
    },
    {
      "score": 629,
      "count": 236,
      "cumulative": 6720
    },
    {
      "score": 628,
      "count": 257,
      "cumulative": 6977
    },
    {
      "score": 627,
      "count": 261,
      "cumulative": 7238
    },
    {
      "score": 626,
      "count": 289,
      "cumulative": 7527
    },
    {
      "score": 625,
      "count": 248,
      "cumulative": 7775
    },
    {
      "score": 624,
      "count": 244,
      "cumulative": 8019
    },
    {
      "score": 623,
      "count": 236,
      "cumulative": 8255
    },
    {
      "score": 622,
      "count": 284,
      "cumulative": 8539
    },
    {
      "score": 621,
      "count": 310,
      "cumulative": 8849
    },
    {
      "score": 620,
      "count": 280,
      "cumulative": 9129
    },
    {
      "score": 619,
      "count": 344,
      "cumulative": 9473
    },
    {
      "score": 618,
      "count": 321,
      "cumulative": 9794
    },
    {
      "score": 617,
      "count": 273,
      "cumulative": 10067
    },
    {
      "score": 616,
      "count": 303,
      "cumulative": 10370
    },
    {
      "score": 615,
      "count": 322,
      "cumulative": 10692
    },
    {
      "score": 614,
      "count": 280,
      "cumulative": 10972
    },
    {
      "score": 613,
      "count": 300,
      "cumulative": 11272
    },
    {
      "score": 612,
      "count": 320,
      "cumulative": 11592
    },
    {
      "score": 611,
      "count": 348,
      "cumulative": 11940
    },
    {
      "score": 610,
      "count": 332,
      "cumulative": 12272
    },
    {
      "score": 609,
      "count": 357,
      "cumulative": 12629
    },
    {
      "score": 608,
      "count": 359,
      "cumulative": 12988
    },
    {
      "score": 607,
      "count": 349,
      "cumulative": 13337
    },
    {
      "score": 606,
      "count": 366,
      "cumulative": 13703
    },
    {
      "score": 605,
      "count": 385,
      "cumulative": 14088
    },
    {
      "score": 604,
      "count": 347,
      "cumulative": 14435
    },
    {
      "score": 603,
      "count": 367,
      "cumulative": 14802
    },
    {
      "score": 602,
      "count": 412,
      "cumulative": 15214
    },
    {
      "score": 601,
      "count": 377,
      "cumulative": 15591
    },
    {
      "score": 600,
      "count": 376,
      "cumulative": 15967
    },
    {
      "score": 599,
      "count": 362,
      "cumulative": 16329
    },
    {
      "score": 598,
      "count": 438,
      "cumulative": 16767
    },
    {
      "score": 597,
      "count": 384,
      "cumulative": 17151
    },
    {
      "score": 596,
      "count": 416,
      "cumulative": 17567
    },
    {
      "score": 595,
      "count": 378,
      "cumulative": 17945
    },
    {
      "score": 594,
      "count": 389,
      "cumulative": 18334
    },
    {
      "score": 593,
      "count": 397,
      "cumulative": 18731
    },
    {
      "score": 592,
      "count": 401,
      "cumulative": 19132
    },
    {
      "score": 591,
      "count": 429,
      "cumulative": 19561
    },
    {
      "score": 590,
      "count": 437,
      "cumulative": 19998
    },
    {
      "score": 589,
      "count": 470,
      "cumulative": 20468
    },
    {
      "score": 588,
      "count": 432,
      "cumulative": 20900
    },
    {
      "score": 587,
      "count": 445,
      "cumulative": 21345
    },
    {
      "score": 586,
      "count": 469,
      "cumulative": 21814
    },
    {
      "score": 585,
      "count": 469,
      "cumulative": 22283
    },
    {
      "score": 584,
      "count": 450,
      "cumulative": 22733
    },
    {
      "score": 583,
      "count": 472,
      "cumulative": 23205
    },
    {
      "score": 582,
      "count": 467,
      "cumulative": 23672
    },
    {
      "score": 581,
      "count": 497,
      "cumulative": 24169
    },
    {
      "score": 580,
      "count": 456,
      "cumulative": 24625
    },
    {
      "score": 579,
      "count": 535,
      "cumulative": 25160
    },
    {
      "score": 578,
      "count": 455,
      "cumulative": 25615
    },
    {
      "score": 577,
      "count": 453,
      "cumulative": 26068
    },
    {
      "score": 576,
      "count": 535,
      "cumulative": 26603
    },
    {
      "score": 575,
      "count": 471,
      "cumulative": 27074
    },
    {
      "score": 574,
      "count": 489,
      "cumulative": 27563
    },
    {
      "score": 573,
      "count": 488,
      "cumulative": 28051
    },
    {
      "score": 572,
      "count": 532,
      "cumulative": 28583
    },
    {
      "score": 571,
      "count": 537,
      "cumulative": 29120
    },
    {
      "score": 570,
      "count": 462,
      "cumulative": 29582
    },
    {
      "score": 569,
      "count": 525,
      "cumulative": 30107
    },
    {
      "score": 568,
      "count": 508,
      "cumulative": 30615
    },
    {
      "score": 567,
      "count": 549,
      "cumulative": 31164
    },
    {
      "score": 566,
      "count": 577,
      "cumulative": 31741
    },
    {
      "score": 565,
      "count": 502,
      "cumulative": 32243
    },
    {
      "score": 564,
      "count": 501,
      "cumulative": 32744
    },
    {
      "score": 563,
      "count": 556,
      "cumulative": 33300
    },
    {
      "score": 562,
      "count": 550,
      "cumulative": 33850
    },
    {
      "score": 561,
      "count": 564,
      "cumulative": 34414
    },
    {
      "score": 560,
      "count": 556,
      "cumulative": 34970
    },
    {
      "score": 559,
      "count": 561,
      "cumulative": 35531
    },
    {
      "score": 558,
      "count": 579,
      "cumulative": 36110
    },
    {
      "score": 557,
      "count": 628,
      "cumulative": 36738
    },
    {
      "score": 556,
      "count": 605,
      "cumulative": 37343
    },
    {
      "score": 555,
      "count": 553,
      "cumulative": 37896
    },
    {
      "score": 554,
      "count": 592,
      "cumulative": 38488
    },
    {
      "score": 553,
      "count": 588,
      "cumulative": 39076
    },
    {
      "score": 552,
      "count": 560,
      "cumulative": 39636
    },
    {
      "score": 551,
      "count": 624,
      "cumulative": 40260
    },
    {
      "score": 550,
      "count": 608,
      "cumulative": 40868
    },
    {
      "score": 549,
      "count": 590,
      "cumulative": 41458
    },
    {
      "score": 548,
      "count": 605,
      "cumulative": 42063
    },
    {
      "score": 547,
      "count": 630,
      "cumulative": 42693
    },
    {
      "score": 546,
      "count": 614,
      "cumulative": 43307
    },
    {
      "score": 545,
      "count": 596,
      "cumulative": 43903
    },
    {
      "score": 544,
      "count": 602,
      "cumulative": 44505
    },
    {
      "score": 543,
      "count": 630,
      "cumulative": 45135
    },
    {
      "score": 542,
      "count": 656,
      "cumulative": 45791
    },
    {
      "score": 541,
      "count": 647,
      "cumulative": 46438
    },
    {
      "score": 540,
      "count": 667,
      "cumulative": 47105
    },
    {
      "score": 539,
      "count": 653,
      "cumulative": 47758
    },
    {
      "score": 538,
      "count": 661,
      "cumulative": 48419
    },
    {
      "score": 537,
      "count": 615,
      "cumulative": 49034
    },
    {
      "score": 536,
      "count": 682,
      "cumulative": 49716
    },
    {
      "score": 535,
      "count": 632,
      "cumulative": 50348
    },
    {
      "score": 534,
      "count": 661,
      "cumulative": 51009
    },
    {
      "score": 533,
      "count": 650,
      "cumulative": 51659
    },
    {
      "score": 532,
      "count": 650,
      "cumulative": 52309
    },
    {
      "score": 531,
      "count": 696,
      "cumulative": 53005
    },
    {
      "score": 530,
      "count": 638,
      "cumulative": 53643
    },
    {
      "score": 529,
      "count": 674,
      "cumulative": 54317
    },
    {
      "score": 528,
      "count": 700,
      "cumulative": 55017
    },
    {
      "score": 527,
      "count": 673,
      "cumulative": 55690
    },
    {
      "score": 526,
      "count": 681,
      "cumulative": 56371
    },
    {
      "score": 525,
      "count": 660,
      "cumulative": 57031
    },
    {
      "score": 524,
      "count": 695,
      "cumulative": 57726
    },
    {
      "score": 523,
      "count": 695,
      "cumulative": 58421
    },
    {
      "score": 522,
      "count": 650,
      "cumulative": 59071
    },
    {
      "score": 521,
      "count": 709,
      "cumulative": 59780
    },
    {
      "score": 520,
      "count": 634,
      "cumulative": 60414
    },
    {
      "score": 519,
      "count": 658,
      "cumulative": 61072
    },
    {
      "score": 518,
      "count": 737,
      "cumulative": 61809
    },
    {
      "score": 517,
      "count": 704,
      "cumulative": 62513
    },
    {
      "score": 516,
      "count": 696,
      "cumulative": 63209
    },
    {
      "score": 515,
      "count": 708,
      "cumulative": 63917
    },
    {
      "score": 514,
      "count": 695,
      "cumulative": 64612
    },
    {
      "score": 513,
      "count": 746,
      "cumulative": 65358
    },
    {
      "score": 512,
      "count": 698,
      "cumulative": 66056
    },
    {
      "score": 511,
      "count": 667,
      "cumulative": 66723
    },
    {
      "score": 510,
      "count": 673,
      "cumulative": 67396
    },
    {
      "score": 509,
      "count": 729,
      "cumulative": 68125
    },
    {
      "score": 508,
      "count": 714,
      "cumulative": 68839
    },
    {
      "score": 507,
      "count": 714,
      "cumulative": 69553
    },
    {
      "score": 506,
      "count": 694,
      "cumulative": 70247
    },
    {
      "score": 505,
      "count": 694,
      "cumulative": 70941
    },
    {
      "score": 504,
      "count": 702,
      "cumulative": 71643
    },
    {
      "score": 503,
      "count": 660,
      "cumulative": 72303
    },
    {
      "score": 502,
      "count": 747,
      "cumulative": 73050
    },
    {
      "score": 501,
      "count": 722,
      "cumulative": 73772
    },
    {
      "score": 500,
      "count": 691,
      "cumulative": 74463
    },
    {
      "score": 499,
      "count": 709,
      "cumulative": 75172
    },
    {
      "score": 498,
      "count": 735,
      "cumulative": 75907
    },
    {
      "score": 497,
      "count": 781,
      "cumulative": 76688
    },
    {
      "score": 496,
      "count": 682,
      "cumulative": 77370
    },
    {
      "score": 495,
      "count": 721,
      "cumulative": 78091
    },
    {
      "score": 494,
      "count": 690,
      "cumulative": 78781
    },
    {
      "score": 493,
      "count": 723,
      "cumulative": 79504
    },
    {
      "score": 492,
      "count": 685,
      "cumulative": 80189
    },
    {
      "score": 491,
      "count": 716,
      "cumulative": 80905
    },
    {
      "score": 490,
      "count": 722,
      "cumulative": 81627
    },
    {
      "score": 489,
      "count": 690,
      "cumulative": 82317
    },
    {
      "score": 488,
      "count": 733,
      "cumulative": 83050
    },
    {
      "score": 487,
      "count": 755,
      "cumulative": 83805
    },
    {
      "score": 486,
      "count": 770,
      "cumulative": 84575
    },
    {
      "score": 485,
      "count": 707,
      "cumulative": 85282
    },
    {
      "score": 484,
      "count": 749,
      "cumulative": 86031
    },
    {
      "score": 483,
      "count": 760,
      "cumulative": 86791
    },
    {
      "score": 482,
      "count": 736,
      "cumulative": 87527
    },
    {
      "score": 481,
      "count": 780,
      "cumulative": 88307
    },
    {
      "score": 480,
      "count": 745,
      "cumulative": 89052
    },
    {
      "score": 479,
      "count": 727,
      "cumulative": 89779
    },
    {
      "score": 478,
      "count": 743,
      "cumulative": 90522
    },
    {
      "score": 477,
      "count": 741,
      "cumulative": 91263
    },
    {
      "score": 476,
      "count": 730,
      "cumulative": 91993
    },
    {
      "score": 475,
      "count": 760,
      "cumulative": 92753
    },
    {
      "score": 474,
      "count": 727,
      "cumulative": 93480
    },
    {
      "score": 473,
      "count": 693,
      "cumulative": 94173
    },
    {
      "score": 472,
      "count": 784,
      "cumulative": 94957
    },
    {
      "score": 471,
      "count": 695,
      "cumulative": 95652
    },
    {
      "score": 470,
      "count": 736,
      "cumulative": 96388
    },
    {
      "score": 469,
      "count": 787,
      "cumulative": 97175
    },
    {
      "score": 468,
      "count": 760,
      "cumulative": 97935
    },
    {
      "score": 467,
      "count": 750,
      "cumulative": 98685
    },
    {
      "score": 466,
      "count": 740,
      "cumulative": 99425
    },
    {
      "score": 465,
      "count": 770,
      "cumulative": 100195
    },
    {
      "score": 464,
      "count": 760,
      "cumulative": 100955
    },
    {
      "score": 463,
      "count": 780,
      "cumulative": 101735
    },
    {
      "score": 462,
      "count": 730,
      "cumulative": 102465
    },
    {
      "score": 461,
      "count": 760,
      "cumulative": 103225
    },
    {
      "score": 460,
      "count": 750,
      "cumulative": 103975
    },
    {
      "score": 459,
      "count": 740,
      "cumulative": 104715
    },
    {
      "score": 458,
      "count": 730,
      "cumulative": 105445
    },
    {
      "score": 457,
      "count": 760,
      "cumulative": 106205
    },
    {
      "score": 456,
      "count": 770,
      "cumulative": 106975
    },
    {
      "score": 455,
      "count": 750,
      "cumulative": 107725
    },
    {
      "score": 454,
      "count": 720,
      "cumulative": 108445
    },
    {
      "score": 453,
      "count": 740,
      "cumulative": 109185
    },
    {
      "score": 452,
      "count": 760,
      "cumulative": 109945
    },
    {
      "score": 451,
      "count": 730,
      "cumulative": 110675
    },
    {
      "score": 450,
      "count": 720,
      "cumulative": 111395
    },
    {
      "score": 449,
      "count": 740,
      "cumulative": 112135
    },
    {
      "score": 448,
      "count": 700,
      "cumulative": 112835
    },
    {
      "score": 447,
      "count": 720,
      "cumulative": 113555
    },
    {
      "score": 446,
      "count": 730,
      "cumulative": 114285
    },
    {
      "score": 445,
      "count": 750,
      "cumulative": 115035
    },
    {
      "score": 444,
      "count": 720,
      "cumulative": 115755
    },
    {
      "score": 443,
      "count": 740,
      "cumulative": 116495
    },
    {
      "score": 442,
      "count": 700,
      "cumulative": 117195
    },
    {
      "score": 441,
      "count": 730,
      "cumulative": 117925
    },
    {
      "score": 440,
      "count": 720,
      "cumulative": 118645
    },
    {
      "score": 439,
      "count": 700,
      "cumulative": 119345
    },
    {
      "score": 438,
      "count": 740,
      "cumulative": 120085
    },
    {
      "score": 437,
      "count": 700,
      "cumulative": 120785
    },
    {
      "score": 436,
      "count": 680,
      "cumulative": 121465
    },
    {
      "score": 435,
      "count": 720,
      "cumulative": 122185
    },
    {
      "score": 434,
      "count": 700,
      "cumulative": 122885
    },
    {
      "score": 433,
      "count": 690,
      "cumulative": 123575
    },
    {
      "score": 432,
      "count": 720,
      "cumulative": 124295
    },
    {
      "score": 431,
      "count": 700,
      "cumulative": 124995
    },
    {
      "score": 430,
      "count": 680,
      "cumulative": 125675
    },
    {
      "score": 429,
      "count": 720,
      "cumulative": 126395
    },
    {
      "score": 428,
      "count": 700,
      "cumulative": 127095
    },
    {
      "score": 427,
      "count": 680,
      "cumulative": 127775
    },
    {
      "score": 426,
      "count": 720,
      "cumulative": 128495
    },
    {
      "score": 425,
      "count": 700,
      "cumulative": 129195
    },
    {
      "score": 424,
      "count": 720,
      "cumulative": 129915
    },
    {
      "score": 423,
      "count": 680,
      "cumulative": 130595
    },
    {
      "score": 422,
      "count": 660,
      "cumulative": 131255
    },
    {
      "score": 421,
      "count": 700,
      "cumulative": 131955
    },
    {
      "score": 420,
      "count": 660,
      "cumulative": 132615
    },
    {
      "score": 419,
      "count": 680,
      "cumulative": 133295
    },
    {
      "score": 418,
      "count": 700,
      "cumulative": 133995
    },
    {
      "score": 417,
      "count": 680,
      "cumulative": 134675
    },
    {
      "score": 416,
      "count": 660,
      "cumulative": 135335
    },
    {
      "score": 415,
      "count": 700,
      "cumulative": 136035
    },
    {
      "score": 414,
      "count": 660,
      "cumulative": 136695
    },
    {
      "score": 413,
      "count": 680,
      "cumulative": 137375
    },
    {
      "score": 412,
      "count": 640,
      "cumulative": 138015
    },
    {
      "score": 411,
      "count": 660,
      "cumulative": 138675
    },
    {
      "score": 410,
      "count": 700,
      "cumulative": 139375
    },
    {
      "score": 409,
      "count": 660,
      "cumulative": 140035
    },
    {
      "score": 408,
      "count": 640,
      "cumulative": 140675
    },
    {
      "score": 407,
      "count": 620,
      "cumulative": 141295
    },
    {
      "score": 406,
      "count": 660,
      "cumulative": 141955
    },
    {
      "score": 405,
      "count": 620,
      "cumulative": 142575
    },
    {
      "score": 404,
      "count": 600,
      "cumulative": 143175
    },
    {
      "score": 403,
      "count": 660,
      "cumulative": 143835
    },
    {
      "score": 402,
      "count": 660,
      "cumulative": 144495
    },
    {
      "score": 401,
      "count": 620,
      "cumulative": 145115
    },
    {
      "score": 400,
      "count": 640,
      "cumulative": 145755
    },
    {
      "score": 399,
      "count": 580,
      "cumulative": 146335
    },
    {
      "score": 398,
      "count": 620,
      "cumulative": 146955
    },
    {
      "score": 397,
      "count": 600,
      "cumulative": 147555
    },
    {
      "score": 396,
      "count": 640,
      "cumulative": 148195
    },
    {
      "score": 395,
      "count": 660,
      "cumulative": 148855
    },
    {
      "score": 394,
      "count": 600,
      "cumulative": 149455
    },
    {
      "score": 393,
      "count": 580,
      "cumulative": 150035
    },
    {
      "score": 392,
      "count": 540,
      "cumulative": 150575
    },
    {
      "score": 391,
      "count": 520,
      "cumulative": 151095
    },
    {
      "score": 390,
      "count": 560,
      "cumulative": 151655
    },
    {
      "score": 389,
      "count": 540,
      "cumulative": 152195
    },
    {
      "score": 388,
      "count": 580,
      "cumulative": 152775
    },
    {
      "score": 387,
      "count": 560,
      "cumulative": 153335
    },
    {
      "score": 386,
      "count": 560,
      "cumulative": 153895
    },
    {
      "score": 385,
      "count": 500,
      "cumulative": 154395
    },
    {
      "score": 384,
      "count": 480,
      "cumulative": 154875
    },
    {
      "score": 383,
      "count": 540,
      "cumulative": 155415
    },
    {
      "score": 382,
      "count": 500,
      "cumulative": 155915
    },
    {
      "score": 381,
      "count": 520,
      "cumulative": 156435
    },
    {
      "score": 380,
      "count": 500,
      "cumulative": 156935
    },
    {
      "score": 379,
      "count": 460,
      "cumulative": 157395
    },
    {
      "score": 378,
      "count": 520,
      "cumulative": 157915
    },
    {
      "score": 377,
      "count": 460,
      "cumulative": 158375
    },
    {
      "score": 376,
      "count": 480,
      "cumulative": 158855
    },
    {
      "score": 375,
      "count": 420,
      "cumulative": 159275
    },
    {
      "score": 374,
      "count": 400,
      "cumulative": 159675
    },
    {
      "score": 373,
      "count": 420,
      "cumulative": 160095
    },
    {
      "score": 372,
      "count": 460,
      "cumulative": 160555
    },
    {
      "score": 371,
      "count": 440,
      "cumulative": 160995
    },
    {
      "score": 370,
      "count": 440,
      "cumulative": 161435
    },
    {
      "score": 369,
      "count": 420,
      "cumulative": 161855
    },
    {
      "score": 368,
      "count": 400,
      "cumulative": 162255
    },
    {
      "score": 367,
      "count": 360,
      "cumulative": 162615
    },
    {
      "score": 366,
      "count": 360,
      "cumulative": 162975
    },
    {
      "score": 365,
      "count": 380,
      "cumulative": 163355
    },
    {
      "score": 364,
      "count": 320,
      "cumulative": 163675
    },
    {
      "score": 363,
      "count": 340,
      "cumulative": 164015
    },
    {
      "score": 362,
      "count": 360,
      "cumulative": 164375
    },
    {
      "score": 361,
      "count": 320,
      "cumulative": 164695
    },
    {
      "score": 360,
      "count": 320,
      "cumulative": 165015
    },
    {
      "score": 359,
      "count": 320,
      "cumulative": 165335
    },
    {
      "score": 358,
      "count": 320,
      "cumulative": 165655
    },
    {
      "score": 357,
      "count": 320,
      "cumulative": 165975
    },
    {
      "score": 356,
      "count": 300,
      "cumulative": 166275
    },
    {
      "score": 355,
      "count": 280,
      "cumulative": 166555
    },
    {
      "score": 354,
      "count": 300,
      "cumulative": 166855
    },
    {
      "score": 353,
      "count": 280,
      "cumulative": 167135
    },
    {
      "score": 352,
      "count": 260,
      "cumulative": 167395
    },
    {
      "score": 351,
      "count": 280,
      "cumulative": 167675
    },
    {
      "score": 350,
      "count": 280,
      "cumulative": 167955
    },
    {
      "score": 349,
      "count": 240,
      "cumulative": 168195
    },
    {
      "score": 348,
      "count": 280,
      "cumulative": 168475
    },
    {
      "score": 347,
      "count": 260,
      "cumulative": 168735
    },
    {
      "score": 346,
      "count": 240,
      "cumulative": 168975
    },
    {
      "score": 345,
      "count": 260,
      "cumulative": 169235
    },
    {
      "score": 344,
      "count": 240,
      "cumulative": 169475
    },
    {
      "score": 343,
      "count": 220,
      "cumulative": 169695
    },
    {
      "score": 342,
      "count": 240,
      "cumulative": 169935
    },
    {
      "score": 341,
      "count": 260,
      "cumulative": 170195
    },
    {
      "score": 340,
      "count": 220,
      "cumulative": 170415
    },
    {
      "score": 339,
      "count": 200,
      "cumulative": 170615
    },
    {
      "score": 338,
      "count": 220,
      "cumulative": 170835
    },
    {
      "score": 337,
      "count": 200,
      "cumulative": 171035
    },
    {
      "score": 336,
      "count": 220,
      "cumulative": 171255
    },
    {
      "score": 335,
      "count": 200,
      "cumulative": 171455
    },
    {
      "score": 334,
      "count": 200,
      "cumulative": 171655
    },
    {
      "score": 333,
      "count": 200,
      "cumulative": 171855
    },
    {
      "score": 332,
      "count": 200,
      "cumulative": 172055
    },
    {
      "score": 331,
      "count": 220,
      "cumulative": 172275
    },
    {
      "score": 330,
      "count": 180,
      "cumulative": 172455
    },
    {
      "score": 329,
      "count": 180,
      "cumulative": 172635
    },
    {
      "score": 328,
      "count": 180,
      "cumulative": 172815
    },
    {
      "score": 327,
      "count": 180,
      "cumulative": 172995
    },
    {
      "score": 326,
      "count": 180,
      "cumulative": 173175
    },
    {
      "score": 325,
      "count": 180,
      "cumulative": 173355
    },
    {
      "score": 324,
      "count": 180,
      "cumulative": 173535
    },
    {
      "score": 323,
      "count": 180,
      "cumulative": 173715
    },
    {
      "score": 322,
      "count": 200,
      "cumulative": 173915
    },
    {
      "score": 321,
      "count": 140,
      "cumulative": 174055
    },
    {
      "score": 320,
      "count": 160,
      "cumulative": 174215
    },
    {
      "score": 319,
      "count": 180,
      "cumulative": 174395
    },
    {
      "score": 318,
      "count": 140,
      "cumulative": 174535
    },
    {
      "score": 317,
      "count": 140,
      "cumulative": 174675
    },
    {
      "score": 316,
      "count": 160,
      "cumulative": 174835
    },
    {
      "score": 315,
      "count": 160,
      "cumulative": 174995
    },
    {
      "score": 314,
      "count": 160,
      "cumulative": 175155
    },
    {
      "score": 313,
      "count": 120,
      "cumulative": 175275
    },
    {
      "score": 312,
      "count": 140,
      "cumulative": 175415
    },
    {
      "score": 311,
      "count": 140,
      "cumulative": 175555
    },
    {
      "score": 310,
      "count": 140,
      "cumulative": 175695
    },
    {
      "score": 309,
      "count": 140,
      "cumulative": 175835
    },
    {
      "score": 308,
      "count": 120,
      "cumulative": 175955
    },
    {
      "score": 307,
      "count": 120,
      "cumulative": 176075
    },
    {
      "score": 306,
      "count": 100,
      "cumulative": 176175
    },
    {
      "score": 305,
      "count": 120,
      "cumulative": 176295
    },
    {
      "score": 304,
      "count": 120,
      "cumulative": 176415
    },
    {
      "score": 303,
      "count": 120,
      "cumulative": 176535
    },
    {
      "score": 302,
      "count": 120,
      "cumulative": 176655
    },
    {
      "score": 301,
      "count": 120,
      "cumulative": 176775
    },
    {
      "score": 300,
      "count": 120,
      "cumulative": 176895
    },
    {
      "score": 299,
      "count": 120,
      "cumulative": 177015
    },
    {
      "score": 298,
      "count": 120,
      "cumulative": 177135
    },
    {
      "score": 297,
      "count": 120,
      "cumulative": 177255
    },
    {
      "score": 296,
      "count": 120,
      "cumulative": 177375
    },
    {
      "score": 295,
      "count": 120,
      "cumulative": 177495
    },
    {
      "score": 294,
      "count": 120,
      "cumulative": 177615
    },
    {
      "score": 293,
      "count": 120,
      "cumulative": 177735
    },
    {
      "score": 292,
      "count": 120,
      "cumulative": 177855
    },
    {
      "score": 291,
      "count": 120,
      "cumulative": 177975
    },
    {
      "score": 290,
      "count": 120,
      "cumulative": 178095
    },
    {
      "score": 289,
      "count": 100,
      "cumulative": 178195
    },
    {
      "score": 288,
      "count": 100,
      "cumulative": 178295
    },
    {
      "score": 287,
      "count": 100,
      "cumulative": 178395
    },
    {
      "score": 286,
      "count": 100,
      "cumulative": 178495
    },
    {
      "score": 285,
      "count": 100,
      "cumulative": 178595
    },
    {
      "score": 284,
      "count": 100,
      "cumulative": 178695
    },
    {
      "score": 283,
      "count": 100,
      "cumulative": 178795
    },
    {
      "score": 282,
      "count": 100,
      "cumulative": 178895
    },
    {
      "score": 281,
      "count": 100,
      "cumulative": 178995
    },
    {
      "score": 280,
      "count": 100,
      "cumulative": 179095
    },
    {
      "score": 279,
      "count": 100,
      "cumulative": 179195
    },
    {
      "score": 278,
      "count": 80,
      "cumulative": 179275
    },
    {
      "score": 277,
      "count": 80,
      "cumulative": 179355
    },
    {
      "score": 276,
      "count": 80,
      "cumulative": 179435
    },
    {
      "score": 275,
      "count": 80,
      "cumulative": 179515
    },
    {
      "score": 274,
      "count": 80,
      "cumulative": 179595
    },
    {
      "score": 273,
      "count": 80,
      "cumulative": 179675
    },
    {
      "score": 272,
      "count": 80,
      "cumulative": 179755
    },
    {
      "score": 271,
      "count": 80,
      "cumulative": 179835
    },
    {
      "score": 270,
      "count": 80,
      "cumulative": 179915
    },
    {
      "score": 269,
      "count": 80,
      "cumulative": 179995
    },
    {
      "score": 268,
      "count": 80,
      "cumulative": 180075
    },
    {
      "score": 267,
      "count": 60,
      "cumulative": 180135
    },
    {
      "score": 266,
      "count": 60,
      "cumulative": 180195
    },
    {
      "score": 265,
      "count": 60,
      "cumulative": 180255
    },
    {
      "score": 264,
      "count": 60,
      "cumulative": 180315
    },
    {
      "score": 263,
      "count": 60,
      "cumulative": 180375
    },
    {
      "score": 262,
      "count": 60,
      "cumulative": 180435
    },
    {
      "score": 261,
      "count": 60,
      "cumulative": 180495
    },
    {
      "score": 260,
      "count": 60,
      "cumulative": 180555
    },
    {
      "score": 259,
      "count": 60,
      "cumulative": 180615
    },
    {
      "score": 258,
      "count": 60,
      "cumulative": 180675
    },
    {
      "score": 257,
      "count": 40,
      "cumulative": 180715
    },
    {
      "score": 256,
      "count": 40,
      "cumulative": 180755
    },
    {
      "score": 255,
      "count": 40,
      "cumulative": 180795
    },
    {
      "score": 254,
      "count": 40,
      "cumulative": 180835
    },
    {
      "score": 253,
      "count": 40,
      "cumulative": 180875
    },
    {
      "score": 252,
      "count": 40,
      "cumulative": 180915
    },
    {
      "score": 251,
      "count": 40,
      "cumulative": 180955
    },
    {
      "score": 250,
      "count": 40,
      "cumulative": 180995
    },
    {
      "score": 249,
      "count": 40,
      "cumulative": 181035
    },
    {
      "score": 248,
      "count": 40,
      "cumulative": 181075
    },
    {
      "score": 247,
      "count": 40,
      "cumulative": 181115
    },
    {
      "score": 246,
      "count": 40,
      "cumulative": 181155
    },
    {
      "score": 245,
      "count": 40,
      "cumulative": 181195
    },
    {
      "score": 244,
      "count": 40,
      "cumulative": 181235
    },
    {
      "score": 243,
      "count": 40,
      "cumulative": 181275
    },
    {
      "score": 242,
      "count": 40,
      "cumulative": 181315
    },
    {
      "score": 241,
      "count": 40,
      "cumulative": 181355
    },
    {
      "score": 240,
      "count": 40,
      "cumulative": 181395
    },
    {
      "score": 239,
      "count": 20,
      "cumulative": 181415
    },
    {
      "score": 238,
      "count": 20,
      "cumulative": 181435
    },
    {
      "score": 237,
      "count": 20,
      "cumulative": 181455
    },
    {
      "score": 236,
      "count": 20,
      "cumulative": 181475
    },
    {
      "score": 235,
      "count": 20,
      "cumulative": 181495
    },
    {
      "score": 234,
      "count": 20,
      "cumulative": 181515
    },
    {
      "score": 233,
      "count": 20,
      "cumulative": 181535
    },
    {
      "score": 232,
      "count": 20,
      "cumulative": 181555
    },
    {
      "score": 231,
      "count": 20,
      "cumulative": 181575
    },
    {
      "score": 230,
      "count": 20,
      "cumulative": 181595
    },
    {
      "score": 229,
      "count": 20,
      "cumulative": 181615
    },
    {
      "score": 228,
      "count": 20,
      "cumulative": 181635
    },
    {
      "score": 227,
      "count": 20,
      "cumulative": 181655
    },
    {
      "score": 226,
      "count": 20,
      "cumulative": 181675
    },
    {
      "score": 225,
      "count": 20,
      "cumulative": 181695
    },
    {
      "score": 224,
      "count": 20,
      "cumulative": 181715
    },
    {
      "score": 223,
      "count": 20,
      "cumulative": 181735
    },
    {
      "score": 222,
      "count": 20,
      "cumulative": 181755
    },
    {
      "score": 221,
      "count": 20,
      "cumulative": 181775
    },
    {
      "score": 220,
      "count": 20,
      "cumulative": 181795
    }
  ],
  "2025": [
    {
      "score": 689,
      "count": 46,
      "cumulative": 46
    },
    {
      "score": 688,
      "count": 12,
      "cumulative": 58
    },
    {
      "score": 687,
      "count": 5,
      "cumulative": 63
    },
    {
      "score": 686,
      "count": 10,
      "cumulative": 73
    },
    {
      "score": 685,
      "count": 17,
      "cumulative": 90
    },
    {
      "score": 684,
      "count": 10,
      "cumulative": 100
    },
    {
      "score": 683,
      "count": 9,
      "cumulative": 109
    },
    {
      "score": 682,
      "count": 19,
      "cumulative": 128
    },
    {
      "score": 681,
      "count": 17,
      "cumulative": 145
    },
    {
      "score": 680,
      "count": 12,
      "cumulative": 157
    },
    {
      "score": 679,
      "count": 20,
      "cumulative": 177
    },
    {
      "score": 678,
      "count": 20,
      "cumulative": 197
    },
    {
      "score": 677,
      "count": 30,
      "cumulative": 227
    },
    {
      "score": 676,
      "count": 21,
      "cumulative": 248
    },
    {
      "score": 675,
      "count": 29,
      "cumulative": 277
    },
    {
      "score": 674,
      "count": 31,
      "cumulative": 308
    },
    {
      "score": 673,
      "count": 32,
      "cumulative": 340
    },
    {
      "score": 672,
      "count": 37,
      "cumulative": 377
    },
    {
      "score": 671,
      "count": 41,
      "cumulative": 418
    },
    {
      "score": 670,
      "count": 40,
      "cumulative": 458
    },
    {
      "score": 669,
      "count": 37,
      "cumulative": 495
    },
    {
      "score": 668,
      "count": 36,
      "cumulative": 531
    },
    {
      "score": 667,
      "count": 46,
      "cumulative": 577
    },
    {
      "score": 666,
      "count": 37,
      "cumulative": 614
    },
    {
      "score": 665,
      "count": 48,
      "cumulative": 662
    },
    {
      "score": 664,
      "count": 53,
      "cumulative": 715
    },
    {
      "score": 663,
      "count": 62,
      "cumulative": 777
    },
    {
      "score": 662,
      "count": 50,
      "cumulative": 827
    },
    {
      "score": 661,
      "count": 64,
      "cumulative": 891
    },
    {
      "score": 660,
      "count": 51,
      "cumulative": 942
    },
    {
      "score": 659,
      "count": 82,
      "cumulative": 1024
    },
    {
      "score": 658,
      "count": 80,
      "cumulative": 1104
    },
    {
      "score": 657,
      "count": 81,
      "cumulative": 1185
    },
    {
      "score": 656,
      "count": 86,
      "cumulative": 1271
    },
    {
      "score": 655,
      "count": 91,
      "cumulative": 1362
    },
    {
      "score": 654,
      "count": 91,
      "cumulative": 1453
    },
    {
      "score": 653,
      "count": 86,
      "cumulative": 1539
    },
    {
      "score": 652,
      "count": 95,
      "cumulative": 1634
    },
    {
      "score": 651,
      "count": 85,
      "cumulative": 1719
    },
    {
      "score": 650,
      "count": 102,
      "cumulative": 1821
    },
    {
      "score": 649,
      "count": 100,
      "cumulative": 1921
    },
    {
      "score": 648,
      "count": 115,
      "cumulative": 2036
    },
    {
      "score": 647,
      "count": 123,
      "cumulative": 2159
    },
    {
      "score": 646,
      "count": 118,
      "cumulative": 2277
    },
    {
      "score": 645,
      "count": 135,
      "cumulative": 2412
    },
    {
      "score": 644,
      "count": 121,
      "cumulative": 2533
    },
    {
      "score": 643,
      "count": 130,
      "cumulative": 2663
    },
    {
      "score": 642,
      "count": 154,
      "cumulative": 2817
    },
    {
      "score": 641,
      "count": 143,
      "cumulative": 2960
    },
    {
      "score": 640,
      "count": 153,
      "cumulative": 3113
    },
    {
      "score": 639,
      "count": 145,
      "cumulative": 3258
    },
    {
      "score": 638,
      "count": 142,
      "cumulative": 3400
    },
    {
      "score": 637,
      "count": 145,
      "cumulative": 3545
    },
    {
      "score": 636,
      "count": 157,
      "cumulative": 3702
    },
    {
      "score": 635,
      "count": 165,
      "cumulative": 3867
    },
    {
      "score": 634,
      "count": 198,
      "cumulative": 4065
    },
    {
      "score": 633,
      "count": 179,
      "cumulative": 4244
    },
    {
      "score": 632,
      "count": 198,
      "cumulative": 4442
    },
    {
      "score": 631,
      "count": 169,
      "cumulative": 4611
    },
    {
      "score": 630,
      "count": 194,
      "cumulative": 4805
    },
    {
      "score": 629,
      "count": 203,
      "cumulative": 5008
    },
    {
      "score": 628,
      "count": 213,
      "cumulative": 5221
    },
    {
      "score": 627,
      "count": 191,
      "cumulative": 5412
    },
    {
      "score": 626,
      "count": 198,
      "cumulative": 5610
    },
    {
      "score": 625,
      "count": 203,
      "cumulative": 5813
    },
    {
      "score": 624,
      "count": 206,
      "cumulative": 6019
    },
    {
      "score": 623,
      "count": 221,
      "cumulative": 6240
    },
    {
      "score": 622,
      "count": 243,
      "cumulative": 6483
    },
    {
      "score": 621,
      "count": 222,
      "cumulative": 6705
    },
    {
      "score": 620,
      "count": 237,
      "cumulative": 6942
    },
    {
      "score": 619,
      "count": 244,
      "cumulative": 7186
    },
    {
      "score": 618,
      "count": 235,
      "cumulative": 7421
    },
    {
      "score": 617,
      "count": 249,
      "cumulative": 7670
    },
    {
      "score": 616,
      "count": 249,
      "cumulative": 7919
    },
    {
      "score": 615,
      "count": 275,
      "cumulative": 8194
    },
    {
      "score": 614,
      "count": 267,
      "cumulative": 8461
    },
    {
      "score": 613,
      "count": 255,
      "cumulative": 8716
    },
    {
      "score": 612,
      "count": 305,
      "cumulative": 9021
    },
    {
      "score": 611,
      "count": 293,
      "cumulative": 9314
    },
    {
      "score": 610,
      "count": 285,
      "cumulative": 9599
    },
    {
      "score": 609,
      "count": 301,
      "cumulative": 9900
    },
    {
      "score": 608,
      "count": 296,
      "cumulative": 10196
    },
    {
      "score": 607,
      "count": 308,
      "cumulative": 10504
    },
    {
      "score": 606,
      "count": 339,
      "cumulative": 10843
    },
    {
      "score": 605,
      "count": 298,
      "cumulative": 11141
    },
    {
      "score": 604,
      "count": 320,
      "cumulative": 11461
    },
    {
      "score": 603,
      "count": 313,
      "cumulative": 11774
    },
    {
      "score": 602,
      "count": 341,
      "cumulative": 12115
    },
    {
      "score": 601,
      "count": 321,
      "cumulative": 12436
    },
    {
      "score": 600,
      "count": 299,
      "cumulative": 12735
    },
    {
      "score": 599,
      "count": 343,
      "cumulative": 13078
    },
    {
      "score": 598,
      "count": 325,
      "cumulative": 13403
    },
    {
      "score": 597,
      "count": 337,
      "cumulative": 13740
    },
    {
      "score": 596,
      "count": 343,
      "cumulative": 14083
    },
    {
      "score": 595,
      "count": 367,
      "cumulative": 14450
    },
    {
      "score": 594,
      "count": 351,
      "cumulative": 14801
    },
    {
      "score": 593,
      "count": 344,
      "cumulative": 15145
    },
    {
      "score": 592,
      "count": 362,
      "cumulative": 15507
    },
    {
      "score": 591,
      "count": 376,
      "cumulative": 15883
    },
    {
      "score": 590,
      "count": 370,
      "cumulative": 16253
    },
    {
      "score": 589,
      "count": 372,
      "cumulative": 16625
    },
    {
      "score": 588,
      "count": 399,
      "cumulative": 17024
    },
    {
      "score": 587,
      "count": 400,
      "cumulative": 17424
    },
    {
      "score": 586,
      "count": 407,
      "cumulative": 17831
    },
    {
      "score": 585,
      "count": 403,
      "cumulative": 18234
    },
    {
      "score": 584,
      "count": 416,
      "cumulative": 18650
    },
    {
      "score": 583,
      "count": 412,
      "cumulative": 19062
    },
    {
      "score": 582,
      "count": 433,
      "cumulative": 19495
    },
    {
      "score": 581,
      "count": 404,
      "cumulative": 19899
    },
    {
      "score": 580,
      "count": 414,
      "cumulative": 20313
    },
    {
      "score": 579,
      "count": 425,
      "cumulative": 20738
    },
    {
      "score": 578,
      "count": 435,
      "cumulative": 21173
    },
    {
      "score": 577,
      "count": 415,
      "cumulative": 21588
    },
    {
      "score": 576,
      "count": 471,
      "cumulative": 22059
    },
    {
      "score": 575,
      "count": 485,
      "cumulative": 22544
    },
    {
      "score": 574,
      "count": 437,
      "cumulative": 22981
    },
    {
      "score": 573,
      "count": 462,
      "cumulative": 23443
    },
    {
      "score": 572,
      "count": 446,
      "cumulative": 23889
    },
    {
      "score": 571,
      "count": 475,
      "cumulative": 24364
    },
    {
      "score": 570,
      "count": 461,
      "cumulative": 24825
    },
    {
      "score": 569,
      "count": 466,
      "cumulative": 25291
    },
    {
      "score": 568,
      "count": 485,
      "cumulative": 25776
    },
    {
      "score": 567,
      "count": 442,
      "cumulative": 26218
    },
    {
      "score": 566,
      "count": 518,
      "cumulative": 26736
    },
    {
      "score": 565,
      "count": 489,
      "cumulative": 27225
    },
    {
      "score": 564,
      "count": 487,
      "cumulative": 27712
    },
    {
      "score": 563,
      "count": 496,
      "cumulative": 28208
    },
    {
      "score": 562,
      "count": 493,
      "cumulative": 28701
    },
    {
      "score": 561,
      "count": 511,
      "cumulative": 29212
    },
    {
      "score": 560,
      "count": 505,
      "cumulative": 29717
    },
    {
      "score": 559,
      "count": 576,
      "cumulative": 30293
    },
    {
      "score": 558,
      "count": 506,
      "cumulative": 30799
    },
    {
      "score": 557,
      "count": 530,
      "cumulative": 31329
    },
    {
      "score": 556,
      "count": 551,
      "cumulative": 31880
    },
    {
      "score": 555,
      "count": 501,
      "cumulative": 32381
    },
    {
      "score": 554,
      "count": 524,
      "cumulative": 32905
    },
    {
      "score": 553,
      "count": 500,
      "cumulative": 33405
    },
    {
      "score": 552,
      "count": 551,
      "cumulative": 33956
    },
    {
      "score": 551,
      "count": 554,
      "cumulative": 34510
    },
    {
      "score": 550,
      "count": 527,
      "cumulative": 35037
    },
    {
      "score": 549,
      "count": 577,
      "cumulative": 35614
    },
    {
      "score": 548,
      "count": 599,
      "cumulative": 36213
    },
    {
      "score": 547,
      "count": 600,
      "cumulative": 36813
    },
    {
      "score": 546,
      "count": 583,
      "cumulative": 37396
    },
    {
      "score": 545,
      "count": 561,
      "cumulative": 37957
    },
    {
      "score": 544,
      "count": 641,
      "cumulative": 38598
    },
    {
      "score": 543,
      "count": 637,
      "cumulative": 39235
    },
    {
      "score": 542,
      "count": 662,
      "cumulative": 39897
    },
    {
      "score": 541,
      "count": 614,
      "cumulative": 40511
    },
    {
      "score": 540,
      "count": 637,
      "cumulative": 41148
    },
    {
      "score": 539,
      "count": 581,
      "cumulative": 41729
    },
    {
      "score": 538,
      "count": 637,
      "cumulative": 42366
    },
    {
      "score": 537,
      "count": 648,
      "cumulative": 43014
    },
    {
      "score": 536,
      "count": 652,
      "cumulative": 43666
    },
    {
      "score": 535,
      "count": 624,
      "cumulative": 44290
    },
    {
      "score": 534,
      "count": 628,
      "cumulative": 44918
    },
    {
      "score": 533,
      "count": 622,
      "cumulative": 45540
    },
    {
      "score": 532,
      "count": 643,
      "cumulative": 46183
    },
    {
      "score": 531,
      "count": 671,
      "cumulative": 46854
    },
    {
      "score": 530,
      "count": 678,
      "cumulative": 47532
    },
    {
      "score": 529,
      "count": 636,
      "cumulative": 48168
    },
    {
      "score": 528,
      "count": 669,
      "cumulative": 48837
    },
    {
      "score": 527,
      "count": 628,
      "cumulative": 49465
    },
    {
      "score": 526,
      "count": 719,
      "cumulative": 50184
    },
    {
      "score": 525,
      "count": 697,
      "cumulative": 50881
    },
    {
      "score": 524,
      "count": 718,
      "cumulative": 51599
    },
    {
      "score": 523,
      "count": 679,
      "cumulative": 52278
    },
    {
      "score": 522,
      "count": 729,
      "cumulative": 53007
    },
    {
      "score": 521,
      "count": 704,
      "cumulative": 53711
    },
    {
      "score": 520,
      "count": 698,
      "cumulative": 54409
    },
    {
      "score": 519,
      "count": 724,
      "cumulative": 55133
    },
    {
      "score": 518,
      "count": 744,
      "cumulative": 55877
    },
    {
      "score": 517,
      "count": 741,
      "cumulative": 56618
    },
    {
      "score": 516,
      "count": 711,
      "cumulative": 57329
    },
    {
      "score": 515,
      "count": 726,
      "cumulative": 58055
    },
    {
      "score": 514,
      "count": 730,
      "cumulative": 58785
    },
    {
      "score": 513,
      "count": 729,
      "cumulative": 59514
    },
    {
      "score": 512,
      "count": 769,
      "cumulative": 60283
    },
    {
      "score": 511,
      "count": 730,
      "cumulative": 61013
    },
    {
      "score": 510,
      "count": 786,
      "cumulative": 61799
    },
    {
      "score": 509,
      "count": 772,
      "cumulative": 62571
    },
    {
      "score": 508,
      "count": 805,
      "cumulative": 63376
    },
    {
      "score": 507,
      "count": 749,
      "cumulative": 64125
    },
    {
      "score": 506,
      "count": 748,
      "cumulative": 64873
    },
    {
      "score": 505,
      "count": 780,
      "cumulative": 65653
    },
    {
      "score": 504,
      "count": 799,
      "cumulative": 66452
    },
    {
      "score": 503,
      "count": 794,
      "cumulative": 67246
    },
    {
      "score": 502,
      "count": 743,
      "cumulative": 67989
    },
    {
      "score": 501,
      "count": 802,
      "cumulative": 68791
    },
    {
      "score": 500,
      "count": 755,
      "cumulative": 69546
    },
    {
      "score": 499,
      "count": 793,
      "cumulative": 70339
    },
    {
      "score": 498,
      "count": 863,
      "cumulative": 71202
    },
    {
      "score": 497,
      "count": 839,
      "cumulative": 72041
    },
    {
      "score": 496,
      "count": 777,
      "cumulative": 72818
    },
    {
      "score": 495,
      "count": 852,
      "cumulative": 73670
    },
    {
      "score": 494,
      "count": 815,
      "cumulative": 74485
    },
    {
      "score": 493,
      "count": 818,
      "cumulative": 75303
    },
    {
      "score": 492,
      "count": 809,
      "cumulative": 76112
    },
    {
      "score": 491,
      "count": 867,
      "cumulative": 76979
    },
    {
      "score": 490,
      "count": 801,
      "cumulative": 77780
    },
    {
      "score": 489,
      "count": 836,
      "cumulative": 78616
    },
    {
      "score": 488,
      "count": 835,
      "cumulative": 79451
    },
    {
      "score": 487,
      "count": 808,
      "cumulative": 80259
    },
    {
      "score": 486,
      "count": 820,
      "cumulative": 81079
    },
    {
      "score": 485,
      "count": 866,
      "cumulative": 81945
    },
    {
      "score": 484,
      "count": 815,
      "cumulative": 82760
    },
    {
      "score": 483,
      "count": 875,
      "cumulative": 83635
    },
    {
      "score": 482,
      "count": 829,
      "cumulative": 84464
    },
    {
      "score": 481,
      "count": 881,
      "cumulative": 85345
    },
    {
      "score": 480,
      "count": 809,
      "cumulative": 86154
    },
    {
      "score": 479,
      "count": 785,
      "cumulative": 86939
    },
    {
      "score": 478,
      "count": 889,
      "cumulative": 87828
    },
    {
      "score": 477,
      "count": 840,
      "cumulative": 88668
    },
    {
      "score": 476,
      "count": 799,
      "cumulative": 89467
    },
    {
      "score": 475,
      "count": 893,
      "cumulative": 90360
    },
    {
      "score": 474,
      "count": 918,
      "cumulative": 91278
    },
    {
      "score": 473,
      "count": 833,
      "cumulative": 92111
    },
    {
      "score": 472,
      "count": 853,
      "cumulative": 92964
    },
    {
      "score": 471,
      "count": 855,
      "cumulative": 93819
    },
    {
      "score": 470,
      "count": 893,
      "cumulative": 94712
    },
    {
      "score": 469,
      "count": 833,
      "cumulative": 95545
    },
    {
      "score": 468,
      "count": 901,
      "cumulative": 96446
    },
    {
      "score": 467,
      "count": 931,
      "cumulative": 97377
    },
    {
      "score": 466,
      "count": 835,
      "cumulative": 98212
    },
    {
      "score": 465,
      "count": 845,
      "cumulative": 99057
    },
    {
      "score": 464,
      "count": 845,
      "cumulative": 99902
    },
    {
      "score": 463,
      "count": 850,
      "cumulative": 100752
    },
    {
      "score": 462,
      "count": 822,
      "cumulative": 101574
    },
    {
      "score": 461,
      "count": 847,
      "cumulative": 102421
    },
    {
      "score": 460,
      "count": 875,
      "cumulative": 103296
    },
    {
      "score": 459,
      "count": 850,
      "cumulative": 104146
    },
    {
      "score": 458,
      "count": 840,
      "cumulative": 104986
    },
    {
      "score": 457,
      "count": 870,
      "cumulative": 105856
    },
    {
      "score": 456,
      "count": 880,
      "cumulative": 106736
    },
    {
      "score": 455,
      "count": 850,
      "cumulative": 107586
    },
    {
      "score": 454,
      "count": 800,
      "cumulative": 108386
    },
    {
      "score": 453,
      "count": 850,
      "cumulative": 109236
    },
    {
      "score": 452,
      "count": 870,
      "cumulative": 110106
    },
    {
      "score": 451,
      "count": 830,
      "cumulative": 110936
    },
    {
      "score": 450,
      "count": 810,
      "cumulative": 111746
    },
    {
      "score": 449,
      "count": 850,
      "cumulative": 112596
    },
    {
      "score": 448,
      "count": 790,
      "cumulative": 113386
    },
    {
      "score": 447,
      "count": 820,
      "cumulative": 114206
    },
    {
      "score": 446,
      "count": 840,
      "cumulative": 115046
    },
    {
      "score": 445,
      "count": 860,
      "cumulative": 115906
    },
    {
      "score": 444,
      "count": 820,
      "cumulative": 116726
    },
    {
      "score": 443,
      "count": 850,
      "cumulative": 117576
    },
    {
      "score": 442,
      "count": 800,
      "cumulative": 118376
    },
    {
      "score": 441,
      "count": 779,
      "cumulative": 119155
    },
    {
      "score": 440,
      "count": 820,
      "cumulative": 119975
    },
    {
      "score": 439,
      "count": 800,
      "cumulative": 120775
    },
    {
      "score": 438,
      "count": 850,
      "cumulative": 121625
    },
    {
      "score": 437,
      "count": 800,
      "cumulative": 122425
    },
    {
      "score": 436,
      "count": 770,
      "cumulative": 123195
    },
    {
      "score": 435,
      "count": 820,
      "cumulative": 124015
    },
    {
      "score": 434,
      "count": 800,
      "cumulative": 124815
    },
    {
      "score": 433,
      "count": 790,
      "cumulative": 125605
    },
    {
      "score": 432,
      "count": 820,
      "cumulative": 126425
    },
    {
      "score": 431,
      "count": 800,
      "cumulative": 127225
    },
    {
      "score": 430,
      "count": 770,
      "cumulative": 127995
    },
    {
      "score": 429,
      "count": 820,
      "cumulative": 128815
    },
    {
      "score": 428,
      "count": 800,
      "cumulative": 129615
    },
    {
      "score": 427,
      "count": 770,
      "cumulative": 130385
    },
    {
      "score": 426,
      "count": 820,
      "cumulative": 131205
    },
    {
      "score": 425,
      "count": 800,
      "cumulative": 132005
    },
    {
      "score": 424,
      "count": 820,
      "cumulative": 132825
    },
    {
      "score": 423,
      "count": 770,
      "cumulative": 133595
    },
    {
      "score": 422,
      "count": 750,
      "cumulative": 134345
    },
    {
      "score": 421,
      "count": 800,
      "cumulative": 135145
    },
    {
      "score": 420,
      "count": 750,
      "cumulative": 135895
    },
    {
      "score": 419,
      "count": 770,
      "cumulative": 136665
    },
    {
      "score": 418,
      "count": 800,
      "cumulative": 137465
    },
    {
      "score": 417,
      "count": 770,
      "cumulative": 138235
    },
    {
      "score": 416,
      "count": 750,
      "cumulative": 138985
    },
    {
      "score": 415,
      "count": 800,
      "cumulative": 139785
    },
    {
      "score": 414,
      "count": 750,
      "cumulative": 140535
    },
    {
      "score": 413,
      "count": 770,
      "cumulative": 141305
    },
    {
      "score": 412,
      "count": 720,
      "cumulative": 142025
    },
    {
      "score": 411,
      "count": 750,
      "cumulative": 142775
    },
    {
      "score": 410,
      "count": 800,
      "cumulative": 143575
    },
    {
      "score": 409,
      "count": 750,
      "cumulative": 144325
    },
    {
      "score": 408,
      "count": 720,
      "cumulative": 145045
    },
    {
      "score": 407,
      "count": 700,
      "cumulative": 145745
    },
    {
      "score": 406,
      "count": 750,
      "cumulative": 146495
    },
    {
      "score": 405,
      "count": 700,
      "cumulative": 147195
    },
    {
      "score": 404,
      "count": 680,
      "cumulative": 147875
    },
    {
      "score": 403,
      "count": 750,
      "cumulative": 148625
    },
    {
      "score": 402,
      "count": 750,
      "cumulative": 149375
    },
    {
      "score": 401,
      "count": 700,
      "cumulative": 150075
    },
    {
      "score": 400,
      "count": 720,
      "cumulative": 150795
    },
    {
      "score": 399,
      "count": 650,
      "cumulative": 151445
    },
    {
      "score": 398,
      "count": 700,
      "cumulative": 152145
    },
    {
      "score": 397,
      "count": 680,
      "cumulative": 152825
    },
    {
      "score": 396,
      "count": 720,
      "cumulative": 153545
    },
    {
      "score": 395,
      "count": 750,
      "cumulative": 154295
    },
    {
      "score": 394,
      "count": 680,
      "cumulative": 154975
    },
    {
      "score": 393,
      "count": 650,
      "cumulative": 155625
    },
    {
      "score": 392,
      "count": 600,
      "cumulative": 156225
    },
    {
      "score": 391,
      "count": 580,
      "cumulative": 156805
    },
    {
      "score": 390,
      "count": 630,
      "cumulative": 157435
    },
    {
      "score": 389,
      "count": 610,
      "cumulative": 158045
    },
    {
      "score": 388,
      "count": 660,
      "cumulative": 158705
    },
    {
      "score": 387,
      "count": 630,
      "cumulative": 159335
    },
    {
      "score": 386,
      "count": 630,
      "cumulative": 159965
    },
    {
      "score": 385,
      "count": 560,
      "cumulative": 160525
    },
    {
      "score": 384,
      "count": 540,
      "cumulative": 161065
    },
    {
      "score": 383,
      "count": 610,
      "cumulative": 161675
    },
    {
      "score": 382,
      "count": 560,
      "cumulative": 162235
    },
    {
      "score": 381,
      "count": 580,
      "cumulative": 162815
    },
    {
      "score": 380,
      "count": 560,
      "cumulative": 163375
    },
    {
      "score": 379,
      "count": 510,
      "cumulative": 163885
    },
    {
      "score": 378,
      "count": 580,
      "cumulative": 164465
    },
    {
      "score": 377,
      "count": 510,
      "cumulative": 164975
    },
    {
      "score": 376,
      "count": 540,
      "cumulative": 165515
    },
    {
      "score": 375,
      "count": 460,
      "cumulative": 165975
    },
    {
      "score": 374,
      "count": 440,
      "cumulative": 166415
    },
    {
      "score": 373,
      "count": 460,
      "cumulative": 166875
    },
    {
      "score": 372,
      "count": 510,
      "cumulative": 167385
    },
    {
      "score": 371,
      "count": 490,
      "cumulative": 167875
    },
    {
      "score": 370,
      "count": 490,
      "cumulative": 168365
    },
    {
      "score": 369,
      "count": 460,
      "cumulative": 168825
    },
    {
      "score": 368,
      "count": 440,
      "cumulative": 169265
    },
    {
      "score": 367,
      "count": 390,
      "cumulative": 169655
    },
    {
      "score": 366,
      "count": 390,
      "cumulative": 170045
    },
    {
      "score": 365,
      "count": 410,
      "cumulative": 170455
    },
    {
      "score": 364,
      "count": 350,
      "cumulative": 170805
    },
    {
      "score": 363,
      "count": 370,
      "cumulative": 171175
    },
    {
      "score": 362,
      "count": 400,
      "cumulative": 171575
    },
    {
      "score": 361,
      "count": 350,
      "cumulative": 171925
    },
    {
      "score": 360,
      "count": 350,
      "cumulative": 172275
    },
    {
      "score": 359,
      "count": 350,
      "cumulative": 172625
    },
    {
      "score": 358,
      "count": 350,
      "cumulative": 172975
    },
    {
      "score": 357,
      "count": 350,
      "cumulative": 173325
    },
    {
      "score": 356,
      "count": 330,
      "cumulative": 173655
    },
    {
      "score": 355,
      "count": 310,
      "cumulative": 173965
    },
    {
      "score": 354,
      "count": 330,
      "cumulative": 174295
    },
    {
      "score": 353,
      "count": 310,
      "cumulative": 174605
    },
    {
      "score": 352,
      "count": 290,
      "cumulative": 174895
    },
    {
      "score": 351,
      "count": 310,
      "cumulative": 175205
    },
    {
      "score": 350,
      "count": 310,
      "cumulative": 175515
    },
    {
      "score": 349,
      "count": 270,
      "cumulative": 175785
    },
    {
      "score": 348,
      "count": 310,
      "cumulative": 176095
    },
    {
      "score": 347,
      "count": 290,
      "cumulative": 176385
    },
    {
      "score": 346,
      "count": 270,
      "cumulative": 176655
    },
    {
      "score": 345,
      "count": 290,
      "cumulative": 176945
    },
    {
      "score": 344,
      "count": 270,
      "cumulative": 177215
    },
    {
      "score": 343,
      "count": 250,
      "cumulative": 177465
    },
    {
      "score": 342,
      "count": 270,
      "cumulative": 177735
    },
    {
      "score": 341,
      "count": 290,
      "cumulative": 178025
    },
    {
      "score": 340,
      "count": 250,
      "cumulative": 178275
    },
    {
      "score": 339,
      "count": 220,
      "cumulative": 178495
    },
    {
      "score": 338,
      "count": 250,
      "cumulative": 178745
    },
    {
      "score": 337,
      "count": 220,
      "cumulative": 178965
    },
    {
      "score": 336,
      "count": 250,
      "cumulative": 179215
    },
    {
      "score": 335,
      "count": 220,
      "cumulative": 179435
    },
    {
      "score": 334,
      "count": 220,
      "cumulative": 179655
    },
    {
      "score": 333,
      "count": 220,
      "cumulative": 179875
    },
    {
      "score": 332,
      "count": 220,
      "cumulative": 180095
    },
    {
      "score": 331,
      "count": 240,
      "cumulative": 180335
    },
    {
      "score": 330,
      "count": 200,
      "cumulative": 180535
    },
    {
      "score": 329,
      "count": 200,
      "cumulative": 180735
    },
    {
      "score": 328,
      "count": 200,
      "cumulative": 180935
    },
    {
      "score": 327,
      "count": 200,
      "cumulative": 181135
    },
    {
      "score": 326,
      "count": 200,
      "cumulative": 181335
    },
    {
      "score": 325,
      "count": 200,
      "cumulative": 181535
    },
    {
      "score": 324,
      "count": 200,
      "cumulative": 181735
    },
    {
      "score": 323,
      "count": 200,
      "cumulative": 181935
    },
    {
      "score": 322,
      "count": 220,
      "cumulative": 182155
    },
    {
      "score": 321,
      "count": 160,
      "cumulative": 182315
    },
    {
      "score": 320,
      "count": 180,
      "cumulative": 182495
    },
    {
      "score": 319,
      "count": 200,
      "cumulative": 182695
    },
    {
      "score": 318,
      "count": 160,
      "cumulative": 182855
    },
    {
      "score": 317,
      "count": 160,
      "cumulative": 183015
    },
    {
      "score": 316,
      "count": 180,
      "cumulative": 183195
    },
    {
      "score": 315,
      "count": 180,
      "cumulative": 183375
    },
    {
      "score": 314,
      "count": 180,
      "cumulative": 183555
    },
    {
      "score": 313,
      "count": 140,
      "cumulative": 183695
    },
    {
      "score": 312,
      "count": 160,
      "cumulative": 183855
    },
    {
      "score": 311,
      "count": 160,
      "cumulative": 184015
    },
    {
      "score": 310,
      "count": 160,
      "cumulative": 184175
    },
    {
      "score": 309,
      "count": 160,
      "cumulative": 184335
    },
    {
      "score": 308,
      "count": 140,
      "cumulative": 184475
    },
    {
      "score": 307,
      "count": 140,
      "cumulative": 184615
    },
    {
      "score": 306,
      "count": 120,
      "cumulative": 184735
    },
    {
      "score": 305,
      "count": 140,
      "cumulative": 184875
    },
    {
      "score": 304,
      "count": 140,
      "cumulative": 185015
    },
    {
      "score": 303,
      "count": 140,
      "cumulative": 185155
    },
    {
      "score": 302,
      "count": 140,
      "cumulative": 185295
    },
    {
      "score": 301,
      "count": 140,
      "cumulative": 185435
    },
    {
      "score": 300,
      "count": 140,
      "cumulative": 185575
    },
    {
      "score": 299,
      "count": 140,
      "cumulative": 185715
    },
    {
      "score": 298,
      "count": 140,
      "cumulative": 185855
    },
    {
      "score": 297,
      "count": 140,
      "cumulative": 185995
    },
    {
      "score": 296,
      "count": 140,
      "cumulative": 186135
    },
    {
      "score": 295,
      "count": 140,
      "cumulative": 186275
    },
    {
      "score": 294,
      "count": 140,
      "cumulative": 186415
    },
    {
      "score": 293,
      "count": 140,
      "cumulative": 186555
    },
    {
      "score": 292,
      "count": 140,
      "cumulative": 186695
    },
    {
      "score": 291,
      "count": 140,
      "cumulative": 186835
    },
    {
      "score": 290,
      "count": 140,
      "cumulative": 186975
    },
    {
      "score": 289,
      "count": 120,
      "cumulative": 187095
    },
    {
      "score": 288,
      "count": 120,
      "cumulative": 187215
    },
    {
      "score": 287,
      "count": 120,
      "cumulative": 187335
    },
    {
      "score": 286,
      "count": 120,
      "cumulative": 187455
    },
    {
      "score": 285,
      "count": 120,
      "cumulative": 187575
    },
    {
      "score": 284,
      "count": 120,
      "cumulative": 187695
    },
    {
      "score": 283,
      "count": 120,
      "cumulative": 187815
    },
    {
      "score": 282,
      "count": 120,
      "cumulative": 187935
    },
    {
      "score": 281,
      "count": 120,
      "cumulative": 188055
    },
    {
      "score": 280,
      "count": 120,
      "cumulative": 188175
    },
    {
      "score": 279,
      "count": 120,
      "cumulative": 188295
    },
    {
      "score": 278,
      "count": 100,
      "cumulative": 188395
    },
    {
      "score": 277,
      "count": 100,
      "cumulative": 188495
    },
    {
      "score": 276,
      "count": 100,
      "cumulative": 188595
    },
    {
      "score": 275,
      "count": 100,
      "cumulative": 188695
    },
    {
      "score": 274,
      "count": 100,
      "cumulative": 188795
    },
    {
      "score": 273,
      "count": 100,
      "cumulative": 188895
    },
    {
      "score": 272,
      "count": 100,
      "cumulative": 188995
    },
    {
      "score": 271,
      "count": 100,
      "cumulative": 189095
    },
    {
      "score": 270,
      "count": 100,
      "cumulative": 189195
    },
    {
      "score": 269,
      "count": 100,
      "cumulative": 189295
    },
    {
      "score": 268,
      "count": 100,
      "cumulative": 189395
    },
    {
      "score": 267,
      "count": 80,
      "cumulative": 189475
    },
    {
      "score": 266,
      "count": 80,
      "cumulative": 189555
    },
    {
      "score": 265,
      "count": 80,
      "cumulative": 189635
    },
    {
      "score": 264,
      "count": 80,
      "cumulative": 189715
    },
    {
      "score": 263,
      "count": 80,
      "cumulative": 189795
    },
    {
      "score": 262,
      "count": 80,
      "cumulative": 189875
    },
    {
      "score": 261,
      "count": 80,
      "cumulative": 189955
    },
    {
      "score": 260,
      "count": 80,
      "cumulative": 190035
    },
    {
      "score": 259,
      "count": 80,
      "cumulative": 190115
    },
    {
      "score": 258,
      "count": 80,
      "cumulative": 190195
    },
    {
      "score": 257,
      "count": 60,
      "cumulative": 190255
    },
    {
      "score": 256,
      "count": 60,
      "cumulative": 190315
    },
    {
      "score": 255,
      "count": 60,
      "cumulative": 190375
    },
    {
      "score": 254,
      "count": 60,
      "cumulative": 190435
    },
    {
      "score": 253,
      "count": 60,
      "cumulative": 190495
    },
    {
      "score": 252,
      "count": 60,
      "cumulative": 190555
    },
    {
      "score": 251,
      "count": 60,
      "cumulative": 190615
    },
    {
      "score": 250,
      "count": 60,
      "cumulative": 190675
    },
    {
      "score": 249,
      "count": 60,
      "cumulative": 190735
    },
    {
      "score": 248,
      "count": 60,
      "cumulative": 190795
    },
    {
      "score": 247,
      "count": 60,
      "cumulative": 190855
    },
    {
      "score": 246,
      "count": 60,
      "cumulative": 190915
    },
    {
      "score": 245,
      "count": 60,
      "cumulative": 190975
    },
    {
      "score": 244,
      "count": 60,
      "cumulative": 191035
    },
    {
      "score": 243,
      "count": 60,
      "cumulative": 191095
    },
    {
      "score": 242,
      "count": 60,
      "cumulative": 191155
    },
    {
      "score": 241,
      "count": 60,
      "cumulative": 191215
    },
    {
      "score": 240,
      "count": 60,
      "cumulative": 191275
    },
    {
      "score": 239,
      "count": 40,
      "cumulative": 191315
    },
    {
      "score": 238,
      "count": 40,
      "cumulative": 191355
    },
    {
      "score": 237,
      "count": 40,
      "cumulative": 191395
    },
    {
      "score": 236,
      "count": 40,
      "cumulative": 191435
    },
    {
      "score": 235,
      "count": 40,
      "cumulative": 191475
    },
    {
      "score": 234,
      "count": 40,
      "cumulative": 191515
    },
    {
      "score": 233,
      "count": 40,
      "cumulative": 191555
    },
    {
      "score": 232,
      "count": 40,
      "cumulative": 191595
    },
    {
      "score": 231,
      "count": 40,
      "cumulative": 191635
    },
    {
      "score": 230,
      "count": 40,
      "cumulative": 191675
    },
    {
      "score": 229,
      "count": 40,
      "cumulative": 191715
    },
    {
      "score": 228,
      "count": 40,
      "cumulative": 191755
    },
    {
      "score": 227,
      "count": 40,
      "cumulative": 191795
    },
    {
      "score": 226,
      "count": 40,
      "cumulative": 191835
    },
    {
      "score": 225,
      "count": 40,
      "cumulative": 191875
    },
    {
      "score": 224,
      "count": 40,
      "cumulative": 191915
    },
    {
      "score": 223,
      "count": 40,
      "cumulative": 191955
    },
    {
      "score": 222,
      "count": 40,
      "cumulative": 191995
    },
    {
      "score": 221,
      "count": 40,
      "cumulative": 192035
    },
    {
      "score": 220,
      "count": 61,
      "cumulative": 192096
    }
  ]
};

  const YEAR_COLORS = {
    2022: '#ff6b6b', 2023: '#ffb84c', 2024: '#5dccaa', 2025: '#7cd9ff'
  };

  let META = clone(EMBEDDED_META);
  let YEAR_DATA = normalizeYearData(EMBEDDED_YEAR_DATA);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeRows(rows) {
    return (rows || [])
      .map(r => ({ score: Number(r.score), count: Number(r.count), cumulative: Number(r.cumulative) }))
      .filter(r => Number.isFinite(r.score) && Number.isFinite(r.count) && Number.isFinite(r.cumulative))
      .sort((a, b) => b.score - a.score);
  }

  function normalizeYearData(raw) {
    const out = {};
    Object.keys(raw || {}).forEach(year => {
      out[year] = { rows: normalizeRows(raw[year]?.rows || raw[year]) };
    });
    return out;
  }

  function getYears() { return META.years; }
  function getMeta() { return META; }
  function getData(year) { return YEAR_DATA[year]; }
  function getRows(year) { return YEAR_DATA[year]?.rows || []; }
  function getColor(year) { return YEAR_COLORS[year] || '#8b96b0'; }

  function getTopBand(year) {
    const rows = getRows(year);
    const top = rows[0];
    if (!top) return null;
    return top.score < 750 ? { min: top.score, max: 750, label: top.score + '-750' } : { min: top.score, max: top.score, label: String(top.score) };
  }

  function formatScoreLabel(year, row) {
    if (!row) return '?';
    const top = getTopBand(year);
    if (top && row.score === top.min && top.max > top.min) return top.label;
    return String(row.score);
  }

  function getRankByScore(year, score) {
    const rows = getRows(year);
    if (!rows.length) return null;
    score = Number(score);
    if (!Number.isFinite(score)) return null;
    const top = getTopBand(year);
    if (top && score >= top.min) return rows[0];
    const exact = rows.find(r => r.score === score);
    if (exact) return exact;
    return rows.reduce((best, row) => {
      if (!best) return row;
      const currentGap = Math.abs(row.score - score);
      const bestGap = Math.abs(best.score - score);
      if (currentGap < bestGap) return row;
      if (currentGap === bestGap && row.score > best.score) return row;
      return best;
    }, null);
  }

  function getScoreByRank(year, rank) {
    const rows = getRows(year);
    rank = Number(rank);
    if (!rows.length || !Number.isFinite(rank) || rank < 1) return null;
    const found = rows.find(r => r.cumulative >= rank);
    return found || rows[rows.length - 1];
  }

  function classifyByRank(year, rank) {
    const lines = META.key_lines[year];
    if (!lines) return { tier: 'tier-zhuan', label: '未分档', desc: '' };
    if (rank <= 200) return { tier: 'tier-c9', label: 'C9/顶尖', desc: '顶尖高校参考位次' };
    if (rank <= 1500) return { tier: 'tier-985-top', label: '985 头部', desc: '头部 985 参考位次' };
    if (rank <= 6000) return { tier: 'tier-985-mid', label: '985 中上游', desc: '中上游 985 参考位次' };
    if (rank <= 18000) return { tier: 'tier-211', label: '211', desc: '211 高校参考位次' };
    if (rank <= (lines.te_zhao ? getRankByScore(year, lines.te_zhao)?.cumulative || 55000 : 55000)) {
      return { tier: 'tier-1ben', label: '特招线以上', desc: '特招线以上参考位次' };
    }
    if (rank <= (lines.ben_ke ? getRankByScore(year, lines.ben_ke)?.cumulative || 130000 : 130000)) {
      return { tier: 'tier-ben', label: '本科批', desc: '本科批参考位次' };
    }
    return { tier: 'tier-zhuan', label: '专科批', desc: '专科批参考位次' };
  }

  function classifyByScore(year, score) {
    const row = getRankByScore(year, score);
    if (!row) return { tier: 'tier-zhuan', label: '未分档', desc: '' };
    return classifyByRank(year, row.cumulative);
  }

  async function loadAll() {
    if (typeof fetch !== 'function') return;
    try {
      const metaRes = await fetch('data/meta.json', { cache: 'no-cache' });
      if (!metaRes.ok) throw new Error('meta load failed');
      const nextMeta = await metaRes.json();
      const nextData = {};
      await Promise.all((nextMeta.years || []).map(async year => {
        const res = await fetch('data/' + year + '.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(year + ' data load failed');
        const json = await res.json();
        nextData[year] = json.rows || [];
      }));
      META = nextMeta;
      YEAR_DATA = normalizeYearData(nextData);
    } catch (err) {
      console.warn('Using embedded score data fallback:', err);
    }
  }

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      setTimeout(callback, 0);
    }
  }

  global.FJ_DATA = {
    getYears, getMeta, getData, getRows,
    getRankByScore, getScoreByRank, formatScoreLabel, getTopBand,
    classifyByRank, classifyByScore, getColor, onReady, loadAll
  };
})(window);
