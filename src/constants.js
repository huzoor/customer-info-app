
export const CUSTOMER_INFO = `2343225,2345,us_east,RedTeam,ProjectApple,3445s
1223456,2345,us_west,BlueTeam,ProjectBanana,2211s
3244332,2346,eu_west,YellowTeam3,ProjectCarrot,4322s
1233456,2345,us_west,BlueTeam,ProjectDate,2221s
3244132,2346,eu_west,YellowTeam3,ProjectEgg,4122s`;

export const MAPPED_KEYS = ['customerId', 'contractId', 'geozone', 'teamcode', 'projectcode', 'buildduration'];


export const BUTTON_LIST = [
    {
        id: 1,
        title: 'contractId',
        desc: 'Uniq customerIds for contractId',
    },
    {
        id: 2,
        title: 'geozone',
        desc: 'Number of Uniq customerIds for geozone',
    },
    {
        id: 3,
        title: 'average',
        desc: 'Average buildduration for each geozone',
    },
    {
        id: 4,
        title: 'unique',
        desc: 'List Unique customerId for each geozone',
    }
];