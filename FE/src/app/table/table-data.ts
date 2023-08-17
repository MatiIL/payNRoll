export interface payRollData {
    onFinalRoster: string;
    nextSeasonSalary: number;
    season25Salary: number;
    season26Salary: number;
    season27Salary: number;
    tooltipContent?: string;
}

export const TABLE_DATA: payRollData[] = [ 
    {
        onFinalRoster: "Damian Lillard 49$ (Max Guy)",
        nextSeasonSalary: 49,
        season25Salary: 49,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "סכום רכישה של 40$ ומעלה; החתמה מחדש מחייבת חוזה לשנתיים נוספות",
    },
    {
        onFinalRoster: "Domantas Sabonis 38$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "Desmond Bane 23$ (Maxpiring)",
        nextSeasonSalary: 23,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "רכישה מחדש בדראפט אוקשן שלקראת עונת 2024/25 תאפשר החתמה לשנתיים נוספות (עד סוף עונת 2026/27) במידה ותישאר בטווח של 20$-39$; או לחמש שנים נוספות (עד סוף עונת 2029/30) במידה וישתדרג למקס גאי"
    },
    {
        onFinalRoster: "Nikola Vucevic 21$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "O.G. Anunoby 19$ (Solid)",
        nextSeasonSalary: 19,
        season25Salary: 19,
        season26Salary: 19,
        season27Salary: 0,
        tooltipContent: "רכישה מחדש בדראפט אוקשן שלקראת עונת 2024/25 תאפשר החתמה לארבע שנים נוספות (עד סוף עונת 2028/29). ניתן היה גם לפצל ולהחתים לשנתיים נוספות בלבד (עד סוף עונת 2024/25) לצד וויליאמס/בוגדנוביץ' על חוזה באורך דומה (19 + 10 = סכום משותף שאינו עולה 29$)"
    },
    {
        onFinalRoster: "Chris Paul 14$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "זכאות (בלתי ממומשת) לחוזה Pricey Vet לשנתיים הבאות, אופציית קבוצה על עונת 2024/25"
    },
    {
        onFinalRoster: "Robert Williams 10$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "Bojan Bogdanovic 10$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "Jonas Valanciunas 6$ (Cheap Veteran)",
        nextSeasonSalary: 6,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "בעל ותק של 10+ עונות, עלות בטווח של 5$ עד 9$"
    },
    {
        onFinalRoster: "Josh Hart 6$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "Kevin Huerter 4$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "Delon Wright 2$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "בעל ותק של 8 עונות, זמין להחתמה עונתית בשוק וטרנים"
    },
    {
        onFinalRoster: "Taylor Hendricks (Rookie, 7th pick)",
        nextSeasonSalary: 1,
        season25Salary: 3,
        season26Salary: 5,
        season27Salary: 7,
        tooltipContent: "בחירה 7 כנגד סיום עונה במקום הרביעי; פריסת חוזה חלופית - 4 מיליון פר עונה"
    },
    {
    onFinalRoster: "Tobias Harris (Sellsword, 2$ discount) 8$",
        nextSeasonSalary: 6,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "ותק של 10 עונות ומעלה, לא הוחתם מחדש על ידי המנג'ר שסיים אצלו עונה (היה זכאי לחוזה וטרן זול בסך 8$)"
    },
    {
        onFinalRoster: "Auction Draft Budget",
            nextSeasonSalary: 141,
            season25Salary: 0,
            season26Salary: 0,
            season27Salary: 0,
            tooltipContent: "תקציב בסיס של 200$, מינוס המשכורות לשישיית הקיפרים המופיעים בעמודה זו, פלוס 45$ כנגד סיום עונה במקום 4"
        }
]