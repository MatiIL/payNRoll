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
        onFinalRoster: "דמיאן לילארד 49$ (קיפר מקס גאי)",
        nextSeasonSalary: 49,
        season25Salary: 49,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "סכום רכישה של 40$ ומעלה; החתמה מחדש מחייבת חוזה לשנתיים נוספות",
    },
    {
        onFinalRoster: "דומנטאס סבוניס 38$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "דזמונד ביין 23$ (קיפר maxpiring)",
        nextSeasonSalary: 23,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "רכישה מחדש בדראפט אוקשן שלקראת עונת 2024/25 תאפשר החתמה לשנתיים נוספות (עד סוף עונת 2026/27) במידה ותישאר בטווח של 20$-39$; או לחמש שנים נוספות (עד סוף עונת 2029/30) במידה וישתדרג למקס גאי"
    },
    {
        onFinalRoster: "ניקולה ווצ'ביץ' 21$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "או. ג'י. אנאנובי 19$ (קיפר סולידי)",
        nextSeasonSalary: 19,
        season25Salary: 19,
        season26Salary: 19,
        season27Salary: 0,
        tooltipContent: "רכישה מחדש בדראפט אוקשן שלקראת עונת 2024/25 תאפשר החתמה לארבע שנים נוספות (עד סוף עונת 2028/29). ניתן היה גם לפצל ולהחתים לשנתיים נוספות בלבד (עד סוף עונת 2024/25) לצד וויליאמס/בוגדנוביץ' על חוזה באורך דומה (19 + 10 = סכום משותף שאינו עולה 29$)"
    },
    {
        onFinalRoster: "כריס פול 14$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "זכאות (בלתי ממומשת) לחוזה Pricey Vet לשנתיים הבאות, אופציית קבוצה על עונת 2024/25"
    },
    {
        onFinalRoster: "רוברט וויליאמס 10$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "בויאן בוגדנוביץ' 10$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "יונאס ולנצ'יונאס 6$ (קיפר וטרן זול)",
        nextSeasonSalary: 6,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "5$ עד 9$, ותק של 10 עונות ומעלה"
    },
    {
        onFinalRoster: "ג'וש הארט 6$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "קווין הורטר 4$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
    },
    {
        onFinalRoster: "דילון רייט 2$",
        nextSeasonSalary: 0,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "בעל ותק של 8 עונות, זמין להחתמה עונתית בשוק וטרנים"
    },
    {
        onFinalRoster: "טיילור הנדריקס (קיפר רוקי, בחירה 7)",
        nextSeasonSalary: 1,
        season25Salary: 3,
        season26Salary: 5,
        season27Salary: 7,
        tooltipContent: "בחירה 7 כנגד סיום עונה במקום הרביעי; פריסת חוזה חלופית - 4 מיליון פר עונה"
    },
    {
    onFinalRoster: "ג'וליוס רנדל (שכיר חרב, הנחה בסך 2$) 12$",
        nextSeasonSalary: 11,
        season25Salary: 0,
        season26Salary: 0,
        season27Salary: 0,
        tooltipContent: "ותק של 8 עונות ומעלה, לא הוחתם מחדש על ידי המנג'ר שסיים אצלו עונה (היה זכאי לחוזה סולידי של 14$ בכל אחת משלוש העונות הבאות)"
    },
    {
        onFinalRoster: "תקציב דראפט אוקשן",
            nextSeasonSalary: 91,
            season25Salary: 0,
            season26Salary: 0,
            season27Salary: 0,
            tooltipContent: "200$ מינוס המשכורות לשישיית הקיפרים המופיעים בעמודה זו"
        }
]