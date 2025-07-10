/* Use the following code to upload the code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/cboyette01/degree-order-new.git
git push -u origin master

npm install
npm start

npm install --save gh-pages
npm run deploy
*/


import React, { useState, useEffect } from 'react';

const mockData = {
    occupations: [
        { id: 11, name: "Management", exposure: -1.93, median_salary: "122,090", median_salary_change: '-$2,356', new_median_salary: '119,734', count: 0, time: 0, major: ["Business Management and Administration", "General Business", "Accounting"], occupation: [16, 1, 3] },
        { id: 13, name: "Business and Financial", exposure: -3.47, median_salary: "80,920", median_salary_change: '-$2,808', new_median_salary: '78,112', count: 0, time: 0, major: ["Accounting", "Business Management and Administration", "General Business"], occupation: [0, 16, 2] },
        { id: 15, name: "Computer and Mathematical", exposure: -3.47, median_salary: "105,850", median_salary_change: '-$3,673', new_median_salary: '102,177', count: 0, time: 0, major: ["Computer Science", "Electrical Engineering", "Computer Engineering"], occupation: [3, 16, 19] },
        { id: 17, name: "Architecture and Engineering", exposure: -1.89, median_salary: "97,310", median_salary_change: '-$1,839', new_median_salary: '95,471', count: 0, time: 0, major: ["Civil Engineering", "Mechanical Engineering", "General Engineering"], occupation: [20, 19, 18] },
        { id: 19, name: "Life, Physical, and Social Science", exposure: -1.91, median_salary: "78,980", median_salary_change: '-$1,509', new_median_salary: '77,471', count: 0, time: 0, major: ["Psychology", "Biology", "Chemistry"], occupation: [7, 9, 3] },
        { id: 21, name: "Community and Social Service", exposure: -0.93, median_salary: "57,530", median_salary_change: '-$535', new_median_salary: '56,995', count: 0, time: 0, major: ["Psychology", "Social Work", "Sociology"], occupation: [9, 7, 10] },
        { id: 23, name: "Legal", exposure: -1.61, median_salary: "99,990", median_salary_change: '-$1,610', new_median_salary: '98,380', count: 0, time: 0, major: ["Political Science and Government", "Criminal Justice and Fire Protection", "Psychology"], occupation: [16, 1, 0] },
        { id: 25, name: "Educational Instruction and Library", exposure: -1.53, median_salary: "59,220", median_salary_change: '-$906', new_median_salary: '58,314', count: 0, time: 0, major: ["Education"], occupation: [16, 9, 0] },
        { id: 27, name: "Arts, Design, Entertainment, Sports, and Media", exposure: -2.22, median_salary: "60,140", median_salary_change: '-$1,335', new_median_salary: '58,805', count: 0, time: 0, major: ["Commercial Art and Graphic Design", "Communications", "English Language and Literature"], occupation: [0, 7, 2] },
        { id: 29, name: "Healthcare Practitioners and Technical", exposure: -2.08, median_salary: "83,090", median_salary_change: '-$1,728', new_median_salary: '81,362', count: 0, time: 0, major: ["Nursing", "Biology", "Psychology"], occupation: [10, 7, 5] },
        { id: 31, name: "Healthcare Support", exposure: -2.74, median_salary: "37,180", median_salary_change: '-$1,019', new_median_salary: '36,161', count: 0, time: 0, major: ["BioScience", "Patient Care Technician Training", "Medical Assistant Training", "Sports Medicine & Rehabilitation"], occupation: [9, 5, 7] },
        { id: 33, name: "Protective Service", exposure: -3.21, median_salary: "50,580", median_salary_change: '-$1,624', new_median_salary: '48,956', count: 0, time: 0, major: ["Criminal Justice"], occupation: [21, 0, 5] },
        { id: 35, name: "Food Preparation and Serving Related", exposure: -5.10, median_salary: "34,130", median_salary_change: '-$1,741', new_median_salary: '32,389', count: 0, time: 0, major: ["Culinary Arts"], occupation: [20, 14, 15] },
        { id: 37, name: "Building and Grounds Cleaning and Maintenance", exposure: -4.08, median_salary: "36,790", median_salary_change: '-$1,501', new_median_salary: '35,289', count: 0, time: 0, major: ["None"], occupation: [20, 18, 19] },
        { id: 39, name: "Personal Care and Service", exposure: -2.32, median_salary: "35,110", median_salary_change: '-$815', new_median_salary: '34,295', count: 0, time: 0, major: ["Cosmetology", "Manicurist Training"], occupation: [9, 10, 7] },
        { id: 41, name: "Sales and Related", exposure: -5.86, median_salary: "37,460", median_salary_change: '-$2,195', new_median_salary: '35,265', count: 0, time: 0, major: ["Business & Risk Management"], occupation: [16, 1, 0] },
        { id: 43, name: "Office and Administrative Support", exposure: -8.66, median_salary: "46,320", median_salary_change: '-$4,011', new_median_salary: '42,309', count: 0, time: 0, major: ["Business & Risk Management"], occupation: [1, 0, 15] },
        { id: 45, name: "Farming, Fishing, and Forestry", exposure: -4.11, median_salary: "36,750", median_salary_change: '-$1,510', new_median_salary: '35,240', count: 0, time: 0, major: ["BioScience"], occupation: [20, 18, 21] },
        { id: 47, name: "Construction and Extraction", exposure: -1.78, median_salary: "58,360", median_salary_change: '-$1,039', new_median_salary: '57,321', count: 0, time: 0, major: ["Construction Technology"], occupation: [20, 19, 21] },
        { id: 49, name: "Installation, Maintenance, and Repair", exposure: -2.12, median_salary: "58,230", median_salary_change: '-$1,234', new_median_salary: '56,996', count: 0, time: 0, major: ["Automotive Technology", "Engineering Technologies"], occupation: [20, 18, 21] },
        { id: 51, name: "Production", exposure: -6.34, median_salary: "45,960", median_salary_change: '-$2,914', new_median_salary: '43,046', count: 0, time: 0, major: ["Precision Machining", "Welding Technology"], occupation: [18, 19, 21] },
        { id: 53, name: "Transportation and Material Moving", exposure: -6.88, median_salary: "42,740", median_salary_change: '-$2,941', new_median_salary: '39,799', count: 0, time: 0, major: ["Automotive Technology"], occupation: [20, 18, 19] },
    ]
};

function AIExposureVisualization() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerms, setSearchTerms] = useState('');
    const [ranked, setRanked] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [list, setList] = useState([]);
    const [showSearch, setShowSearch] = useState(true);
    const [showTop, setShowTop] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const [timeSpentPages, setTimeSpentPages] = useState([0, 0, 0]);
    const [timeSpentDetailStart, setTimeSpentDetailStart] = useState(0);
    const [timeSpentDetail, setTimeSpentDetail] = useState(mockData.occupations);

    // Get correct listing of elements. Ex. X, Y, and Z
    const listFormatter = new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' });

    // Define top 3 positive and negative occupations
    const most_positive = 3;
    const second_positive = 8;
    const third_positive = 13;
    const most_negative = 21;
    const second_negative = 15;
    const third_negative = 20;

    // Set timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent(prev => prev + 1);
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(timer);
    }, []);

    // Colors for the bars
    const negativeColor = ['#c0c0c0'];
    const neutralColor = ['#c0c0c0'];
    const positiveColor = ['#c0c0c0'];

    // Updated getColor function to accept a type parameter
    const getColor = (value) => {
        const colors = [negativeColor, neutralColor, positiveColor]
        if (value <= -2) return colors[0];
        if (value >= 2) return colors[2];
        return colors[1];
    };

    // Filter and sort data
    let data = [...mockData['occupations']];

    // Apply search filter
    if (searchTerm) {
        data = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Handle item selection
    const handleItemClick = (item) => {
        if (!list.find(i => i.name === item.name) & list.length < 6) {
            setList([...list, item]);
            if (searchTerms === '') {
                setSearchTerms(searchTerm);
            }
            else {
                setSearchTerms(searchTerms + ', ' + searchTerm);
            }
        }
    };

    // Map to create a new array with the updated item
    const updateTimeSpentDetail = (indexToUpdate, newValue) => {
        setTimeSpentDetail(newtimeSpentDetail => newtimeSpentDetail.map(item =>
            item.id === indexToUpdate ? { ...item, time: item.time + newValue } : item
        ));
    };

    const updateTimeSpentPages = (indexToUpdate, newValue) => {
        setTimeSpentPages(timeSpentPages.map((item, index) => index === indexToUpdate ? newValue + item : item)); // Map to create a new array with the updated item
    };

    const handleItemClickDetailed = (item) => {
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart);
        }
        if ((selectedItem && selectedItem !== item) || !selectedItem) {
            item.count++;
        }
        setSelectedItem(selectedItem?.name === item.name ? null : item);
        setTimeSpentDetailStart(timeSpent);
    };

    // Handler to clear all items from the list
    const handleClearItems = () => {
        // Optional: confirm before clearing
        if (window.confirm('Are you sure you want to clear the list?')) {
            setList([]);
        }
    };

    const handleRemove = (id) => {
        setList(list.filter((item) => item.name !== id));
    };

    const handleSubmit = () => {
        if (list.length === 6) {
            const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name))
            setRanked(sortedList);
            setShowSearch(false);
            updateTimeSpentPages(0, timeSpent);
            setTimeSpent(0);
        }
        else {
            alert("You need to select 6 occupations before you can move on.");
        }
    };

    const handleNext = () => {
        setShowTop(true);
        setRanked(null);
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart)
        }
        setSelectedItem(null);
        updateTimeSpentPages(1, timeSpent);
        setTimeSpent(0);
    };

    const handleBack = () => {
        setShowTop(false);
        handleSubmit();
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart)
        }
        setSelectedItem(null);
        updateTimeSpentPages(2, timeSpent);
        setTimeSpent(0);
    };

    const handleEnd = () => {
        setShowTop(false);
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart)
        }
        setSelectedItem(null);
        updateTimeSpentPages(2, timeSpent);
        setTimeSpent(0);
        window.parent.postMessage("showNextButton", "*");
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px',
                color: '#333'
            }}>Exploring the Impact of Career Nomenclature</h1>
            {showSearch && (
                <p style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: 'black'
                }}>
                    Please select the top 6 occupations you would consider for your future career.
                </p>
            )}
            {showSearch && (
                <p style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: 'black'
                }}>
                </p>
            )}
            {(ranked || showTop) && (
                <p style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: 'black'
                }}>
                    Click on an occupation for detailed information.
                </p>
            )}

            {showSearch && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px',
                    marginBottom: '30px'
                }}>
                    {/* Search Section */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '10px',
                            color: 'black'
                        }}>
                            Please click on an occupation to add it to your list of preferred occupations. <br /><br />
                            Use the search bar to search for your preferred occupations.
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder='Search for occupations'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 10px 10px 35px',
                                    borderRadius: '6px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#9ca3af'
                            }}>
                                🔍
                            </div>
                        </div>
                        <div
                            style={{
                                height: '250px',
                                overflowY: 'scroll'
                            }}
                        >
                            {data.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleItemClick(item)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: '2px solid transparent',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            backgroundColor: 'transparent'
                                        }}
                                    >
                                        {/* <div style={{
                                            width: '150px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            fontWeight: 'normal',
                                            fontSize: '15px'
                                        }}> */}
                                        {item.name}
                                        {/* </div> */}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <label style={{
                                display: 'block',
                                fontSize: '18px',
                                fontWeight: '500',
                                marginBottom: '10px',
                                color: 'black'
                            }}>
                                Preferred Occupations
                            </label>
                            <div>
                                <ol>
                                    {list.map(item => (
                                        <li key={item.name}>{item.name}
                                            <button
                                                onClick={() => handleRemove(item.name)}
                                                style={{
                                                    marginLeft: '16px',
                                                    backgroundColor: 'white',
                                                    color: 'red',
                                                    border: 'none',
                                                    fontSize: '1rem',
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                &#x2715;
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                                <button
                                    onClick={handleClearItems}
                                    disabled={list.length === 0}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    Clear List
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={list.length === 0}
                                    style={{
                                        marginLeft: '16px',
                                        cursor: 'pointer',
                                        float: 'right'
                                    }}
                                >
                                    Submit
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Ordered List */}
            {ranked && (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            {/* <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}> */}
                            <p style={{
                                textAlign: 'center',
                                marginBottom: '30px',
                                color: 'black'
                            }}>
                                Here are the occupations you selected. </p>

                            They are ranked in alphabetical order.
                            {/* </label> */}
                            <div>
                                <ol style={{ paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: 'black' }}>
                                    {ranked.map((item, index) => {
                                        return (
                                            <li key={item.name} style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                                <button onClick={() => handleItemClickDetailed(item)}
                                                    style={{
                                                        // backgroundColor: getColor(item.exposure),
                                                        border: '1px solid #ccc',
                                                        borderRadius: '6px',
                                                        padding: '10px 16px',
                                                        cursor: 'pointer',
                                                        color: '#222',
                                                        fontWeight: 'bold',
                                                        fontSize: '1rem',
                                                        width: '100%',
                                                        textAlign: 'left',
                                                        transition: 'background 0.2s, color 0.2s'
                                                    }}
                                                    // onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e7ff'}
                                                    // onMouseOut={e => e.currentTarget.style.backgroundColor = getColor(item.exposure)}
                                                >{index + 1}. {item.name}
                                                </button>
                                                {/* : from ${item.median_salary} to ${item.new_median_salary} (<span style={{ backgroundColor: getColor(item.exposure) }}>{item.median_salary_change}</span> change) each year */}
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {showTop && (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            {/* <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}> */}
                            <p style={{
                                textAlign: 'center',
                                marginBottom: '30px',
                                color: 'black'
                            }}>Of all occupations, including occupations you did not select...</p>
                            ...here are the first 3 occupations in terms of alphabetical order.
                            {/* </label> */}
                            <div>
                                <ol style={{ paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: 'black' }}>
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[most_positive])}
                                            style={{
                                                // backgroundColor: getColor(mockData.occupations[most_positive].exposure),
                                                border: '1px solid #ccc',
                                                borderRadius: '6px',
                                                padding: '10px 16px',
                                                cursor: 'pointer',
                                                color: '#222',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                width: '100%',
                                                textAlign: 'left',
                                                transition: 'background 0.2s, color 0.2s'
                                            }}
                                            // onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e7ff'}
                                            // onMouseOut={e => e.currentTarget.style.backgroundColor = getColor(mockData.occupations[most_positive].exposure)}
                                        >
                                            1. {mockData.occupations[most_positive].name}
                                        </button>
                                        {/* : from ${mockData.occupations[most_positive].median_salary} to ${mockData.occupations[most_positive].new_median_salary} (<span style={{ backgroundColor: getColor(mockData.occupations[most_positive].exposure) }}>{mockData.occupations[most_positive].median_salary_change}</span> change) each year */}
                                    </li>
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        <button
                                            onClick={() => handleItemClickDetailed(mockData.occupations[second_positive])}
                                            style={{
                                                // backgroundColor: getColor(mockData.occupations[second_positive].exposure),
                                                border: '1px solid #ccc',
                                                borderRadius: '6px',
                                                padding: '10px 16px',
                                                cursor: 'pointer',
                                                color: '#222',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                width: '100%',
                                                textAlign: 'left',
                                                transition: 'background 0.2s, color 0.2s'
                                            }}
                                            // onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e7ff'}
                                            // onMouseOut={e => e.currentTarget.style.backgroundColor = getColor(mockData.occupations[second_positive].exposure)}
                                        >
                                            2. {mockData.occupations[second_positive].name}
                                        </button>
                                        {/* : from ${mockData.occupations[second_positive].median_salary} to ${mockData.occupations[second_positive].new_median_salary} (<span style={{ backgroundColor: getColor(mockData.occupations[second_positive].exposure) }}>{mockData.occupations[second_positive].median_salary_change}</span> change) each year */}

                                    </li>
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[third_positive])}
                                            style={{
                                                // backgroundColor: getColor(mockData.occupations[third_positive].exposure),
                                                border: '1px solid #ccc',
                                                borderRadius: '6px',
                                                padding: '10px 16px',
                                                cursor: 'pointer',
                                                color: '#222',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                width: '100%',
                                                textAlign: 'left',
                                                transition: 'background 0.2s, color 0.2s'
                                            }}
                                            // onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e7ff'}
                                            // onMouseOut={e => e.currentTarget.style.backgroundColor = getColor(mockData.occupations[third_positive].exposure)}
                                        >
                                            3. {mockData.occupations[third_positive].name}
                                        </button>
                                        {/* : from ${mockData.occupations[third_positive].median_salary} to ${mockData.occupations[third_positive].new_median_salary} (<span style={{ backgroundColor: getColor(mockData.occupations[third_positive].exposure) }}>{mockData.occupations[third_positive].median_salary_change}</span> change) each year */}
                                    </li>
                                </ol>
                            </div>
                            {/* <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}> */}
                            ...here are the last 3 occupations in terms of alphabetical order.
                            {/* </label> */}
                            <div>
                                <ol style={{ paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: 'black' }}>
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[most_negative])}
                                            style={{
                                                // backgroundColor: getColor(mockData.occupations[most_negative].exposure),
                                                border: '1px solid #ccc',
                                                borderRadius: '6px',
                                                padding: '10px 16px',
                                                cursor: 'pointer',
                                                color: '#222',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                width: '100%',
                                                textAlign: 'left',
                                                transition: 'background 0.2s, color 0.2s'
                                            }}
                                            // onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e7ff'}
                                            // onMouseOut={e => e.currentTarget.style.backgroundColor = getColor(mockData.occupations[most_negative].exposure)}
                                        >
                                            1. {mockData.occupations[most_negative].name}
                                        </button></li>
                                    {/* : from ${mockData.occupations[most_negative].median_salary} to ${mockData.occupations[most_negative].new_median_salary} (<span style={{ backgroundColor: getColor(mockData.occupations[most_negative].exposure) }}>{mockData.occupations[most_negative].median_salary_change}</span> change) each year */}
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[second_negative])}
                                            style={{
                                                // backgroundColor: getColor(mockData.occupations[second_negative].exposure),
                                                border: '1px solid #ccc',
                                                borderRadius: '6px',
                                                padding: '10px 16px',
                                                cursor: 'pointer',
                                                color: '#222',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                width: '100%',
                                                textAlign: 'left',
                                                transition: 'background 0.2s, color 0.2s'
                                            }}
                                            // onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e7ff'}
                                            // onMouseOut={e => e.currentTarget.style.backgroundColor = getColor(mockData.occupations[second_negative].exposure)}
                                        >
                                            2. {mockData.occupations[second_negative].name}
                                        </button></li>
                                    {/* : from ${mockData.occupations[second_negative].median_salary} to ${mockData.occupations[second_negative].new_median_salary}
                                            (<span style={{ backgroundColor: getColor(mockData.occupations[second_negative].exposure) }}>{mockData.occupations[second_negative].median_salary_change}</span> change) each year */}
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[third_negative])}
                                            style={{
                                                // backgroundColor: getColor(mockData.occupations[third_negative].exposure),
                                                border: '1px solid #ccc',
                                                borderRadius: '6px',
                                                padding: '10px 16px',
                                                cursor: 'pointer',
                                                color: '#222',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                width: '100%',
                                                textAlign: 'left',
                                                transition: 'background 0.2s, color 0.2s'
                                            }}
                                            // onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e7ff'}
                                            // onMouseOut={e => e.currentTarget.style.backgroundColor = getColor(mockData.occupations[third_negative].exposure)}
                                        >
                                            3.  {mockData.occupations[third_negative].name}
                                        </button></li>
                                    {/* : from ${mockData.occupations[third_negative].median_salary} to ${mockData.occupations[third_negative].new_median_salary} (<span style={{ backgroundColor: getColor(mockData.occupations[third_negative].exposure) }}>{mockData.occupations[third_negative].median_salary_change}</span> change) each year */}
                                </ol>
                            </div>
                        </div >
                    </div >
                </>
            )
            }
            {!showTop && !ranked && !showSearch && (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginBottom: '30px'
                    }}>

                        <div style={{
                            backgroundColor: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            {/* <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}> */}
                            {/* Number of clicks and time spent on detailed information for each occupation */}
                            {/* </label> */}
                            <div>
                                {/* <ul>
                                    {mockData.occupations.map(occupation => {
                                        return (
                                            <li key={occupation.name}>{occupation.name}: {occupation.count} clicks and {timeSpentDetail[occupation.id].time} seconds</li>
                                        )
                                    })}
                                </ul> */}
                            </div>
                            {/* <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}>
                                Amount of time spent on each page
                            </label>
                            <div>
                                <ul>
                                    <li>Page 1: {timeSpentPages[0]} seconds</li>
                                    <li>Page 2: {timeSpentPages[1]} seconds</li>
                                    <li>Page 3: {timeSpentPages[2]} seconds</li>
                                </ul>
                            </div>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}>
                                What the user searched for
                            </label>
                            <div>
                                <p>Search Terms: {searchTerms}</p>
                            </div> */}
                            Thank you for completing this portion of the survey. Please click Next at the bottom right of the page to continue the survey.
                        </div >
                    </div >
                </>
            )
            }
            {/* Detail view when an item is selected */}
            {
                selectedItem && (
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '20px',
                            marginBottom: '20px'
                        }}>
                        </div>
                        <div style={{
                            marginTop: '20px',
                            padding: '15px',
                            backgroundColor: '#f0f9ff',
                            borderRadius: '6px',
                            border: '1px solid #bfdbfe'
                        }}>
                            <h4 style={{ marginBottom: '10px', fontWeight: 'bold', color: '#1e40af' }}>
                                Detailed Information
                            </h4>
                            {/* <p style={{ marginBottom: '10px', lineHeight: '1.5', color: 'black' }}>
                                Workers in the {selectedItem.name} occupations have a projected <strong>
                                    {selectedItem.exposure < -2.53 ?
                                        `big decrease` :
                                        `small decrease`
                                    }
                                </strong> in money earned.
                            </p> */}
                            <p style={{ lineHeight: '1.5', color: 'black' }}>
                                <strong>{`Occupations similar to ${selectedItem.name} are shown below.`}</strong>
                            </p>
                            <p style={{ lineHeight: '1.5', color: 'black' }}>
                                <ol style={{ paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: 'black' }}>
                                    {(selectedItem.occupation).map(occupation_number => {
                                        return (
                                            <li><span style={{ }}>
                                                {mockData.occupations[occupation_number].name}</span></li>
                                            // : from ${mockData.occupations[occupation_number].median_salary} to ${mockData.occupations[occupation_number].new_median_salary} (<span style={{ backgroundColor: getColor(mockData.occupations[occupation_number].exposure) }}> {mockData.occupations[occupation_number].median_salary_change}</span> change) each year
                                        )
                                    })}
                                </ol>
                            </p>
                            <p style={{ lineHeight: '1.5', color: 'black' }}>
                                <strong>Relevant areas of study</strong>
                            </p>
                            <p style={{ lineHeight: '1.5', color: 'black' }}>
                                <ul style={{ textAlign: 'left', listStylePosition: 'inside', paddingLeft: 0, margin: 0 }}>
                                    <li>
                                        {selectedItem.name}:
                                        {selectedItem.id <= 27 ?
                                            ` The majority of workers in this occupation hold at least a college (bachelor’s) degree. ` :
                                            selectedItem.id >= 31 ?
                                                ` The majority of workers in this occupation have less than a college (bachelor’s) degree. ` :
                                                ` A college (bachelor’s) degree is the most prevalent credential among workers in this occupation. `
                                        }
                                        Workers typically study <strong>{listFormatter.format(selectedItem.major)}</strong>.
                                    </li>
                                    {(selectedItem.occupation).map(occupation_number => {
                                        return (
                                            <li >
                                                {mockData.occupations[occupation_number].name}:
                                                {mockData.occupations[occupation_number].id <= 27 ?
                                                    ` The majority of workers in this occupation hold at least a college (bachelor’s) degree. ` :
                                                    mockData.occupations[occupation_number].id >= 31 ?
                                                        ` The majority of workers in this occupation have less than a college (bachelor’s) degree. ` :
                                                        ` A college (bachelor’s) degree is the most prevalent credential among workers in this occupation. `
                                                }
                                                Workers typically study <strong>{listFormatter.format(mockData.occupations[occupation_number].major)}</strong>.
                                            </li>
                                        )
                                    })}
                                </ul>
                            </p>
                            {/* {(selectedItem.occupation).map(occupation_number => {
                                return (
                                    <li >
                                        Workers in the {mockData.occupations[occupation_number].name} occupations tend to study <strong>{mockData.occupations[occupation_number].major.join(', ')}</strong>.
                                    </li>
                                )
                            })} */}

                        </div>
                    </div>
                )
            }
            {ranked && (
                <div
                    style={{
                        paddingBottom: '20px'
                    }}
                >
                    <button
                        onClick={handleNext}
                        style={{
                            cursor: 'pointer',
                            float: 'right',
                            margingBottom: '10px'
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
            {showTop && (
                <div
                    style={{
                        paddingBottom: '20px'
                    }}
                >
                    <div>
                        <button
                            onClick={handleBack}
                            style={{
                                cursor: 'pointer',
                                float: 'left'
                            }}
                        >
                            Back
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={handleEnd}
                            style={{
                                cursor: 'pointer',
                                float: 'right'
                            }}
                        >
                            End
                        </button>
                    </div>
                </div>
            )}
        </div >
    );

}

export default AIExposureVisualization;