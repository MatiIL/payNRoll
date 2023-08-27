export interface payRollData {
    onFinalRoster: string;
    nextSeasonSalary: any[];
    season26Salary: number[];
    season27Salary: number[];
    season28Salary: number[];
    tooltipContent?: string[];
}

export const TABLE_DATA: payRollData[] = [ 
    {
        onFinalRoster: "Jayson Tatum 52$",
        nextSeasonSalary: [52, 0],
        season26Salary: [52, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["סכום רכישה של 40$ ומעלה; ברכישה והחתמה מחדש, ניתן להוסיף שנתיים לחוזה המקס הבא", ""],
    },
    {
        onFinalRoster: "Damian Lillard 44$",
        nextSeasonSalary: [49, 0],
        season26Salary: [0, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["מקס גאי שני: תוספת של עונה אחת בלבד עם העלאה של 5$. ניתן להוסיף עונה אחת בלבד אם נרכש ומוחתם מחדש. מונע החתמת שואף-מקס (דזמונד ביין)", ""]
    },
    {
        onFinalRoster: "Desmond Bane 33$",
        nextSeasonSalary: [33, 0],
        season26Salary: [0, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["רכישה מחדש בדראפט אוקשן שלקראת עונת 2025/26 תאפשר החתמה לשנתיים נוספות (עד סוף עונת 2027/28) במידה ותישאר בטווח של 30$-39$; או לחמש שנים נוספות (עד סוף עונת 2030/31) במידה וישתדרג לחוזה מקס ", ""]
    },
    {
        onFinalRoster: "O.G. Anunoby 27$",
        nextSeasonSalary: [27, 0],
        season26Salary: [27, 0],
        season27Salary: [27, 0],
        season28Salary: [0, 0],
        tooltipContent: ["חוזה סולידי מלא: רכישה מחדש בדראפט אוקשן שלקראת עונת 2027/28 תאפשר החתמה לארבע שנים נוספות (עד סוף עונת 2031/32).)", ""]
    },
    {
        onFinalRoster: "Deandre Ayton 19$",
        nextSeasonSalary: [19, 0],
        season26Salary: [19, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["חוזה סולידי שמחולק בינו ובין אוקונגוו (עלות משותפת שלא עולה על 29$)", ""]
    },
    {
        onFinalRoster: "Tobias Harris 12$",
            nextSeasonSalary: [12, 0],
            season26Salary: [12, 0],
            season27Salary: [0, 0],
            season28Salary: [0, 0],
            tooltipContent: ["החתמת וטרן יקר באמצעות חוזה סולידי - לשנתיים בלבד, עונת 2025/26 אופציית קבוצה", ""]
        },
    {
        onFinalRoster: "Onyeka Okongwu 10$",
        nextSeasonSalary: [10, 0],
        season26Salary: [10, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["חוזה סולידי שמחולק בינו ובין אייטון (עלות משותפת שלא עולה על 29$)", ""]
    },
    {
        onFinalRoster: "CJ McCollum 8$",
        nextSeasonSalary: [8, 0],
        season26Salary: [0, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["חוזה וטרן זול (10+ עונות בליגה, עלות של 1$ עד 9$)", ""]
    },
    
    {
        onFinalRoster: "Kevin Huerter 5$",
        nextSeasonSalary: [0, 0],
        season26Salary: [0, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["", ""]
    },
    {
        onFinalRoster: "Delon Wright 4$",
        nextSeasonSalary: [0, 0],
        season26Salary: [0, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["", ""]
    },
    {
        onFinalRoster: "Aaron Gordon 2$",
        nextSeasonSalary: [0, 0],
        season26Salary: [0, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["", ""]
    },
    {
        onFinalRoster: "Taylor Hendricks (Undrafted Rookie) 1$",
        nextSeasonSalary: [1, 0],
        season26Salary: [1, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["נרכש כרוקי בסכום של 1-5$, רכישה והחתמה מחדש מאפשרים ומחייבים הוספת שנה אקסטרה לחוזה הבא", ""]
    },
    {
        onFinalRoster: "Justin Edwards (Rookie, 7th pick)",
        nextSeasonSalary: [1, "הועברה תמורת בחירה עתידית"],
        season26Salary: [3, 0],
        season27Salary: [5, 0],
        season28Salary: [7, 7],
        tooltipContent: ["בחירה 7 כנגד סיום עונה במקום הרביעי; פריסת חוזה חלופית - 4 מיליון פר עונה", ""]
    },
    {
        onFinalRoster: "Brandon Ingram (Sellsword) 9$",
        nextSeasonSalary: [7, 0],
        season26Salary: [0, 0],
        season27Salary: [0, 0],
        season28Salary: [0, 0],
        tooltipContent: ["לא זכאי לחוזה סטנדרטי ממי שהחזיק בו, הנחה של 2$ כנגד סיום עונה במקום רביעי", ""]
    },
    {
        onFinalRoster: "Auction Draft Budget",
            nextSeasonSalary: [117, 100, 185],
            season26Salary: [0, 0, 0],
            season27Salary: [0, 0, 0],
            season28Salary: [0, 0, 0],
            tooltipContent: [
                "תקציב בסיס של 200$, מינוס המשכורות לשישיית הקיפרים המופיעים בעמודה זו, פלוס 45$ כנגד סיום עונה במקום 4",
                "",
            ]
        }
];