import React, { createContext, useState, useContext, useEffect } from 'react';

// Initial data (moved from Projects.jsx)
const initialProjects = [
    {
        id: 1,
        title: 'מתחם היוקרה TLV',
        category: 'מגורים',
        location: 'תל אביב',
        size: '280 יח"ד',
        year: '2027',
        description: 'מגדלי יוקרה עם נוף לים בלב תל אביב.',
        fullDescription: `פרויקט הדגל שלנו בלב תל אביב מציב רף חדש של יוקרה ואיכות חיים. 
        צמד המגדלים המרהיבים, המתנשאים לגובה 40 קומות, תוכננו בקפידה על ידי משרד האדריכלים יסקי-מור-סיון כדי להעניק לדיירים חווית מגורים שאין שנייה לה.
        
        כל דירה בפרויקט נהנית ממרפסת שמש רחבת ידיים הצופה לים התיכון ולנוף האורבני המרהיב של העיר ללא הפסקה. המפרט הטכני העשיר כולל מטבחי יוקרה, מערכות בית חכם מלאות וחיפויים בסטנדרט בינלאומי.`,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        status: 'בביצוע',
        startDate: '2024-01-01',
        deliveryDate: '2027-06-01',
        architect: 'יסקי מור סיון',
        floors: '40',
        buildings: '2',
        units: '280',
        features: ['לובי מפואר בגובה כפול', 'בריכת שחייה היקפית', 'חדר כושר מאובזר', 'חניון תת קרקעי חכם', 'מערכת בית חכם', 'שמירה 24/7'],
        floorPlans: [
            {
                title: 'דירת 3 חדרים',
                size: '85 מ"ר + 12 מ"ר מרפסת',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                title: 'דירת 4 חדרים',
                size: '110 מ"ר + 14 מ"ר מרפסת',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                title: 'פנטהאוז דופלקס',
                size: '180 מ"ר + 60 מ"ר מרפסת',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1512918760532-3edbed135119?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
                ]
            }
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', caption: 'סלון מרווח עם ויטרינות ענק' },
            { image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', caption: 'מטבח פרימיום מאובזר' },
            { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', caption: 'מרפסת שמש מול הים' }
        ]
    },
    {
        id: 2,
        title: 'פארק ההייטק הרצליה',
        category: 'מסחר ומשרדים',
        location: 'הרצליה פיתוח',
        size: '28,000 מ"ר',
        year: '2026',
        description: 'קמפוס משרדים ירוק וחכם לחברות טכנולוגיה.',
        fullDescription: `פארק ההייטק החדש בהרצליה פיתוח הוא בשורה של ממש לחברות הטכנולוגיה המובילות. הפרויקט תוכנן כקמפוס ירוק וחכם, המשלב סביבת עבודה מתקדמת עם שטחים ירוקים נרחבים.
        
        המבנים בפרויקט מצוידים במערכות בקרת אקלים מתקדמות, זכוכיות מסננות קרינה, ומערכות מחזור מים, המבטיחים יעילות אנרגטית מקסימלית ותו תקן ירוק אמריקאי (LEED Gold).
        
        בקומת הקרקע שדרת מסחר שוקקת עם מסעדות, בתי קפה ופינות ישיבה מוצלות, המייצרת אקו-סיסטם עסקי וחברתי תוסס. הגגות הירוקים משמשים למפגשים בלתי פורמליים ואירועי חברה מול השקיעה.`,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        status: 'בביצוע',
        startDate: '2023-06-01',
        deliveryDate: '2026-08-01',
        architect: 'משה צור',
        floors: '8',
        buildings: '4',
        units: '-',
        features: ['תקן בנייה ירוקה LEED', 'מערכות בקרת אקלים', 'גגות ירוקים', 'חניון אופניים ומקלחות', 'שדרת מסחר', 'אודיטוריום לכנסים'],
        floorPlans: [
            {
                title: 'קומה טיפוסית (Open Space)',
                size: '1200 מ"ר',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                title: 'סוויטת מנהלים',
                size: '150 מ"ר',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=800&q=80'
                ]
            }
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80', caption: 'חללי עבודה משותפים' },
            { image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=800&q=80', caption: 'לובי ראשי' }
        ]
    },
    {
        id: 3,
        title: 'שכונת הגפן החדשה',
        category: 'התחדשות עירונית',
        location: 'רמת גן',
        size: '120 יח"ד',
        year: '2025',
        description: 'פרויקט פינוי-בינוי רחב היקף בלב העיר.',
        fullDescription: `בלב שכונת הגפן הוותיקה והירוקה ברמת גן, אנו מקימים פרויקט התחדשות עירונית המשלב בניה חדשנית עם שמירה על האופי האינטימי של השכונה.
        
        הפרויקט כולל הריסת מבנים ישנים ובניית 3 בנייני בוטיק מודרניים בני 9 קומות, המקיפים גינה פנימית פרטית ומושקעת לרווחת הדיירים. הדירות תוכננו בקפידה כדי למקסם את האור הטבעי ואת זרימת האוויר.`,
        image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80',
        status: 'בתכנון',
        startDate: '2025-01-01',
        deliveryDate: '2028-01-01',
        architect: 'קיקה בראז',
        floors: '9',
        buildings: '3',
        units: '120',
        features: ['גינה פרטית לדיירים', 'מועדון דיירים', 'חניון רובוטי', 'קרבה לרכבת הקלה', 'מפרט טכני עשיר'],
        floorPlans: [
            {
                title: 'דירת 3 חדרים',
                size: '80 מ"ר + 10 מ"ר מרפסת',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                title: 'דירת 4 חדרים',
                size: '105 מ"ר + 12 מ"ר מרפסת',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80'
                ]
            }
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80', caption: 'גינה קהילתית משותפת' },
            { image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80', caption: 'אינטרייר מודרני מואר' }
        ]
    },
    {
        id: 4,
        title: 'מרכז לוגיסטי צפון',
        category: 'תעשייה',
        location: 'חיפה',
        size: '15,000 מ"ר',
        year: '2022',
        description: 'מרכז הפצה מתקדם עם מערכות אוטומציה.',
        fullDescription: `מרכז לוגיסטי מתקדם במיקום אסטרטגי במפרץ חיפה, בסמוך לנמל ולצירי תנועה ראשיים. המבנה תוכנן לשרת צרכים לוגיסטיים מורכבים עם דגש על יעילות תפעולית.`,
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        status: 'אוכלס',
        architect: 'פלג אדריכלים',
        floors: '2',
        buildings: '1',
        units: '-',
        features: ['רמפות העמסה הידראוליות', 'גובה תקרה 12 מטר', 'מערכות ספרינקלרים מתקדמות', 'רצפת בטון מוחלק', 'משרדים ממוזגים'],
        floorPlans: [
            {
                title: 'אולם אחסנה ראשי',
                size: '5,000 מ"ר',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1565610261709-5b6c31e9d5f6?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                title: 'אזור בקרת מלאי',
                size: '500 מ"ר',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80'
                ]
            }
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80', caption: 'מערכות אחסון אוטומטיות' },
            { image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80', caption: 'שטחי העמסה' }
        ]
    },
    {
        id: 5,
        title: 'קניון העמקים',
        category: 'מסחר ומשרדים',
        location: 'עפולה',
        size: '32,000 מ"ר',
        year: '2026',
        description: 'מרכז קניות פתוח המשלב פנאי ועסקים.',
        fullDescription: `מרכז המסחר והפנאי החדש של בירת העמק. תכנון ארכיטקטוני פתוח ומזמין המשלב שדרות חנויות, מתחמי הסעדה ומוקדי בילוי לכל המשפחה.`,
        image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80',
        status: 'בביצוע',
        startDate: '2024-01-01',
        deliveryDate: '2026-11-01',
        architect: 'רכטר אדריכלים',
        floors: '3',
        buildings: '1',
        units: '-',
        features: ['חניון חינם', 'מתחם סינמה סיטי', 'ג\'ימבורי ענק', 'תמהיל חנויות מגוון', 'נגישות מלאה'],
        floorPlans: [
            {
                title: 'חנות אופנה (טיפוסי)',
                size: '120 מ"ר',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                title: 'מתחם הסעדה',
                size: '50 מ"ר + רחבת ישיבה',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80'
                ]
            }
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3d9f?auto=format&fit=crop&w=800&q=80', caption: 'שדרת החנויות הפתוחה' },
            { image: 'https://images.unsplash.com/photo-1580828343064-fbb4c3e04bb5?auto=format&fit=crop&w=800&q=80', caption: 'מתחם ההסעדה' }
        ]
    },
    {
        id: 6,
        title: 'מתחם הווילות Savion',
        category: 'מגורים',
        location: 'סביון',
        size: '12 דונם',
        year: '2024',
        description: 'שכונת וילות אקסקלוסיבית עם פיתוח סביבתי עשיר.',
        fullDescription: `במיקום היוקרתי ביותר בישראל, אנו מקימים מתחם מגורים פרטי וסגור הכולל 12 וילות יוקרה בעיצוב אדריכלי מוקפד. כל וילה יושבת על מגרש של דונם וכוללת בריכה פרטית וגינון עשיר.`,
        image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=800&q=80',
        status: 'בשיווק',
        startDate: '2025-01-01',
        deliveryDate: '2027-04-01',
        architect: 'פיצו קדם',
        floors: '2',
        buildings: '12',
        units: '12',
        features: ['בריכה פרטית לכל וילה', 'בית חכם מלא', 'מטבח חוץ מאובזר', 'מרתף יינות', 'חניה מקורה ל-3 רכבים'],
        floorPlans: [
            {
                title: 'וילה דגם A',
                size: '350 מ"ר בנוי + דונם מגרש',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80', // Villa exterior
                images: [
                    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?auto=format&fit=crop&w=800&q=80'  // Pool
                ]
            },
            {
                title: 'וילה דגם B',
                size: '420 מ"ר בנוי + דונם וחצי מגרש',
                image: 'https://images.unsplash.com/photo-1596280424560-6060c57c427f?auto=format&fit=crop&w=800&q=80', // Inside villa
                images: [
                    'https://images.unsplash.com/photo-1600596542815-3ad19fb21208?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=800&q=80'  // Pool evening
                ]
            }
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', caption: 'בריכת אינפיניטי פרטית' }
        ]
    }
];

const ProjectsContext = createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
    // Load from localStorage if available, else use initial
    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem('spir_projects_v8');
        return saved ? JSON.parse(saved) : initialProjects;
    });

    useEffect(() => {
        localStorage.setItem('spir_projects_v8', JSON.stringify(projects));
    }, [projects]);

    const deleteProject = (id) => {
        setProjects(prev => prev.filter(p => p.id !== id));
    };

    const addProject = (project) => {
        setProjects(prev => [...prev, { ...project, id: Date.now() }]);
    };

    const updateProject = (id, updatedFields) => {
        setProjects(prev => prev.map(p =>
            (p.id.toString() === id.toString()) ? { ...p, ...updatedFields } : p
        ));
    };

    return (
        <ProjectsContext.Provider value={{ projects, addProject, deleteProject, updateProject }}>
            {children}
        </ProjectsContext.Provider>
    );
};
