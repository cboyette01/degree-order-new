/* Use the following code to upload the code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote remove origin
git remote add origin https://github.com/cboyette01/degree-order-new.git
git push -u origin master

npm install
npm start

npm install --save gh-pages
npm run deploy

npm install
npm start
*/


import React, { useState, useEffect } from 'react';

/* Stores data for each occupation. The data is the two digit SOC code, the name of the occupation, the predicted percent median wage change from Kogan et al. (2023), the 2024 median salary, the predicted actual median wage change from Kogan et al. (2023), the number of times a user
has viewed the detailed information, the time each user has spent viewing the detailed information, the top majors that individuals in the occupation have, and the top related occupations from O*NET
*/
const mockData = {
    occupations: [
        { id: 11, name: "Management", exposure: 3.91, median_salary: "122,090", median_salary_change: "$4,774", new_median_salary: "126,864", count: 0, time: 0, major: ["Business", "Engineering", "Social Sciences"], occupation: [16, 1, 3] },
        { id: 13, name: "Business and Financial", exposure: 6.16, median_salary: "80,920", median_salary_change: "$4,985", new_median_salary: "85,905", count: 0, time: 0, major: ["Business", "Social Sciences", "Engineering"], occupation: [16, 0, 2] },
        { id: 15, name: "Computer and Mathematical", exposure: 3.84, median_salary: "105,850", median_salary_change: "$4,065", new_median_salary: "109.915", count: 0, time: 0, major: ["Computer and Information Sciences", "Business", "Engineering"], occupation: [3, 16, 19] },
        { id: 17, name: "Architecture and Engineering", exposure: 3.07, median_salary: "97,310", median_salary_change: "$2,987", new_median_salary: "100,297", count: 0, time: 0, major: ["Engineering", "Business", "Architecture"], occupation: [20, 19, 18] },
        { id: 19, name: "Life, Physical, and Social Science", exposure: 3.41, median_salary: "78,980", median_salary_change: "$2,693", new_median_salary: "81,673", count: 0, time: 0, major: ["Biology and Life Sciences", "Physical Sciences", "Psychology"], occupation: [9, 3, 7] },
        { id: 21, name: "Community and Social Service", exposure: 2.23, median_salary: "57,530", median_salary_change: "$1,283", new_median_salary: "58,813", count: 0, time: 0, major: ["Psychology", "Public Affairs, Policy, and Social Work", "Education Administration and Teaching"], occupation: [9, 7, 10] },
        { id: 23, name: "Legal", exposure: 2.51, median_salary: "99,990", median_salary_change: "$2,510", new_median_salary: "102,500", count: 0, time: 0, major: ["Social Sciences", "Business", "History"], occupation: [1, 16, 0] },
        { id: 25, name: "Educational Instruction and Library", exposure: 3.35, median_salary: "59,220", median_salary_change: "$1,984", new_median_salary: "61,204", count: 0, time: 0, major: ["Education Administration and Teaching", "Business", "Social Sciences"], occupation: [9, 5] },
        { id: 27, name: "Arts, Design, Entertainment, Sports, and Media", exposure: 2.75, median_salary: "60,140", median_salary_change: "$1,654", new_median_salary: "61,794", count: 0, time: 0, major: ["Fine Arts", "Communications", "Business"], occupation: [] },
        { id: 29, name: "Healthcare Practitioners and Technical", exposure: 2.27, median_salary: "83,090", median_salary_change: "$1,886", new_median_salary: "84,976", count: 0, time: 0, major: ["Medical and Health Sciences and Services", "Biology and Life Sciences", "Psychology"], occupation: [10, 5, 7] },
        { id: 31, name: "Healthcare Support", exposure: 3.17, median_salary: "37,180", median_salary_change: "$1,179", new_median_salary: "38,359", count: 0, time: 0, major: ["BioScience", "Patient Care Technician Training", "Medical Assistant Training", "Sports Medicine & Rehabilitation"], occupation: [9, 7, 5] },
        { id: 33, name: "Protective Service", exposure: 2.6, median_salary: "50,580", median_salary_change: "$1,315", new_median_salary: "51,895", count: 0, time: 0, major: ["Criminal Justice"], occupation: [21, 16] },
        { id: 35, name: "Food Preparation and Serving Related", exposure: 0.27, median_salary: "34,130", median_salary_change: "$92", new_median_salary: "34,222", count: 0, time: 0, major: ["Culinary Arts"], occupation: [20] },
        { id: 37, name: "Building and Grounds Cleaning and Maintenance", exposure: 0.42, median_salary: "36,790", median_salary_change: "$155", new_median_salary: "36,945", count: 0, time: 0, major: ["None"], occupation: [20, 18, 19] },
        { id: 39, name: "Personal Care and Service", exposure: 1.13, median_salary: "35,110", median_salary_change: "$397", new_median_salary: "35,507", count: 0, time: 0, major: ["Cosmetology", "Manicurist Training"], occupation: [9] },
        { id: 41, name: "Sales and Related", exposure: 4.32, median_salary: "37,460", median_salary_change: "$1,618", new_median_salary: "39,078", count: 0, time: 0, major: ["Business & Risk Management"], occupation: [16, 1, 0] },
        { id: 43, name: "Office and Administrative Support", exposure: -0.1, median_salary: "46,320", median_salary_change: "-$46", new_median_salary: "46,274", count: 0, time: 0, major: ["Business & Risk Management"], occupation: [1, 0, 15] },
        { id: 45, name: "Farming, Fishing, and Forestry", exposure: -0.27, median_salary: "36,750", median_salary_change: "-$99", new_median_salary: "36,651", count: 0, time: 0, major: ["BioScience"], occupation: [20, 18, 19] },
        { id: 47, name: "Construction and Extraction", exposure: 2.15, median_salary: "58,360", median_salary_change: "$1,255", new_median_salary: "59.615", count: 0, time: 0, major: ["Construction Technology"], occupation: [20, 19, 21] },
        { id: 49, name: "Installation, Maintenance, and Repair", exposure: 1.31, median_salary: "58,230", median_salary_change: "$763", new_median_salary: "58,993", count: 0, time: 0, major: ["Automotive Technology", "Engineering Technologies"], occupation: [20, 18, 21] },
        { id: 51, name: "Production", exposure: -2.04, median_salary: "45,960", median_salary_change: "-$938", new_median_salary: "45,022", count: 0, time: 0, major: ["Precision Machining", "Welding Technology"], occupation: [18, 19, 3] },
        { id: 53, name: "Transportation and Material Moving", exposure: -0.49, median_salary: "42,740", median_salary_change: "-$209", new_median_salary: "42,531", count: 0, time: 0, major: ["Automotive Technology"], occupation: [20, 19, 18] },
        // { id: 31, name: "Healthcare Support", exposure: -2.74, median_salary: "37,180", median_salary_change: '-$1,019', new_median_salary: '36,161', count: 0, time: 0, major: ["Medical and Health Sciences and Services", "Business", "Biology and Life Sciences"], occupation: [9, 5, 7] },
        // { id: 33, name: "Protective Service", exposure: -3.21, median_salary: "50,580", median_salary_change: '-$1,624', new_median_salary: '48,956', count: 0, time: 0, major: ["Criminal Justice and Fire Protection", "Business", "Social Sciences"], occupation: [21, 0, 5] },
        // { id: 35, name: "Food Preparation and Serving Related", exposure: -5.10, median_salary: "34,130", median_salary_change: '-$1,741', new_median_salary: '32,389', count: 0, time: 0, major: ["Business", "Fine Arts", "Social Sciences"], occupation: [20, 14, 15] },
        // { id: 37, name: "Building and Grounds Cleaning and Maintenance", exposure: -4.08, median_salary: "36,790", median_salary_change: '-$1,501', new_median_salary: '35,289', count: 0, time: 0, major: ["Business", "Education Administration and Teaching", "Social Sciences"], occupation: [20, 18, 19] },
        // { id: 39, name: "Personal Care and Service", exposure: -2.32, median_salary: "35,110", median_salary_change: '-$815', new_median_salary: '34,295', count: 0, time: 0, major: ["Business", "Education Administration and Teaching", "Fine Arts"], occupation: [9, 10, 7] },
        // { id: 41, name: "Sales and Related", exposure: -5.86, median_salary: "37,460", median_salary_change: '-$2,195', new_median_salary: '35,265', count: 0, time: 0, major: ["Business", "Social Sciences", "Communications"], occupation: [16, 1, 0] },
        // { id: 43, name: "Office and Administrative Support", exposure: -8.66, median_salary: "46,320", median_salary_change: '-$4,011', new_median_salary: '42,309', count: 0, time: 0, major: ["Business", "Social Sciences", "Education Administration and Teaching"], occupation: [1, 0, 15] },
        // { id: 45, name: "Farming, Fishing, and Forestry", exposure: -4.11, median_salary: "36,750", median_salary_change: '-$1,510', new_median_salary: '35,240', count: 0, time: 0, major: ["Agriculture", "Business", "Education Administration and Teaching"], occupation: [20, 18, 21] },
        // { id: 47, name: "Construction and Extraction", exposure: -1.78, median_salary: "58,360", median_salary_change: '-$1,039', new_median_salary: '57,321', count: 0, time: 0, major: ["Business", "Engineering", "Social Sciences"], occupation: [20, 19, 21] },
        // { id: 49, name: "Installation, Maintenance, and Repair", exposure: -2.12, median_salary: "58,230", median_salary_change: '-$1,234', new_median_salary: '56,996', count: 0, time: 0, major: ["Business", "Engineering", "Computer and Information Sciences"], occupation: [20, 18, 21] },
        // { id: 51, name: "Production", exposure: -6.34, median_salary: "45,960", median_salary_change: '-$2,914', new_median_salary: '43,046', count: 0, time: 0, major: ["Business", "Engineering", "Fine Arts"], occupation: [18, 19, 21] },
        // { id: 53, name: "Transportation and Material Moving", exposure: -6.88, median_salary: "42,740", median_salary_change: '-$2,941', new_median_salary: '39,799', count: 0, time: 0, major: ["Business", "Engineering", "Social Sciences"], occupation: [20, 18, 19] },
    ]
};

function AIExposureVisualization() {
    // The below opoerations help define states that are used to know when items are selected, track which terms are searched, when to change pages, how much time has elapsed, etc.
    // Used to store the current user-inputted search term
    const [searchTerm, setSearchTerm] = useState('');
    // Used to store the list of user-inputted searcg terms
    const [searchTerms, setSearchTerms] = useState('');
    // Used to store the sorted list of preffered occupations
    const [ranked, setRanked] = useState(null);
    // Used to track which occupation is being clicked on the second and thid pages
    const [selectedItem, setSelectedItem] = useState(null);
    // Used to store the list of preffered occupations
    const [list, setList] = useState([]);
    // Used to determine whether to disply the first page
    const [showSearch, setShowSearch] = useState(true);
    // Used to determine whether to disply the third page
    const [showTop, setShowTop] = useState(false);
    // Used to determine whether to disply the final page
    const [showEnd, setShowEnd] = useState(false);
    // Used to track the time spent on the current page
    const [timeSpent, setTimeSpent] = useState(0);
    // Used to track the time spent on each page
    const [timeSpentPages, setTimeSpentPages] = useState([0, 0, 0, 0]);
    // Used to track the start time for viewing an occupation's detailed information
    const [timeSpentDetailStart, setTimeSpentDetailStart] = useState(0);
    // Used to track the time spent on each occupation's detailed information
    const [timeSpentDetail, setTimeSpentDetail] = useState(mockData.occupations);

    // Get correct listing of elements. Ex. X, Y, and Z
    const listFormatter = new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' });

    // Define top 3 positive and negative occupations based on the occupation's id
    const most_positive = 3;
    const second_positive = 8;
    const third_positive = 13;
    const most_negative = 21;
    const second_negative = 15;
    const third_negative = 20;

    // Set timer to track how much time a user spends on each occupation and page
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent(prev => prev + 1);
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(timer);
    }, []);

    // Define the colors for occupations when they have postive, negative, and neutral projected wage changes
    // Color is red
    const negativeColor = ['#c0c0c0'];
    // Color is grey
    const neutralColor = ['#c0c0c0'];
    // Color is green
    const positiveColor = ['#c0c0c0'];

    // Assigns colors to occupations based on their exposure value
    // const getColor = (value) => {
    //     const colors = [negativeColor, neutralColor, positiveColor]
    //     if (value >= 1) {
    //         return colors[2];
    //     }
    //     // Occupations are assigned red if their predicted wage change is less than or equal to -1%
    //     else if (value <= -1) {
    //         return colors[0];
    //     }
    //     // Occupations are assigned grey if there predicted wage change is between -1% and 1%
    //     return colors[1];
    // };

    // Filter and sort data
    let data = [...mockData['occupations']];

    // Apply search filter
    if (searchTerm) {
        data = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Handle item selection
    const handleItemClick = (item) => {
        if (!list.find(i => i.name === item.name) & list.length < 6) {
            /* Adds the clicked occupation to the list of preffered occupations if the number
           of preffered occupation is not greater than 6 and the occupation is not already
           in the list
           */
            setList([...list, item]);
            /* Updates list of search terms the user has typed to search for occupations only
            if the user typed something in the search bar
            */
            if (searchTerms === '') {
                setSearchTerms(searchTerm);
            }
            else {
                setSearchTerms(searchTerms + ', ' + searchTerm);
            }
        }
    };

    // Updates the time spent looking at detailed information for each occupation
    const updateTimeSpentDetail = (indexToUpdate, newValue) => {
        setTimeSpentDetail(newtimeSpentDetail => newtimeSpentDetail.map(item =>
            item.id === indexToUpdate ? { ...item, time: item.time + newValue } : item
        ));
    };

    // Updates the time spent on each page of the visualization
    const updateTimeSpentPages = (indexToUpdate, newValue) => {
        setTimeSpentPages(timeSpentPages.map((item, index) => index === indexToUpdate ? newValue + item : item)); // Map to create a new array with the updated item
    };

    // Handles user trying to view the detailed information for an occupation
    const handleItemClickDetailed = (item) => {
        // Updates the time spent looking at each occupation's detailed information
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart);
        }
        // Updates the number of views on each occupation's detailed information
        if ((selectedItem && selectedItem !== item) || !selectedItem) {
            item.count++;
        }
        // Helps hide the detailed information if the same occupation is clicked twice
        setSelectedItem(selectedItem?.name === item.name ? null : item);
        /* Sets the start time for an occupation's detailed information.
        This is used to help calculate the total amount of time spent on 
        an occupation's detailed information.
        */
        setTimeSpentDetailStart(timeSpent);
    };

    // Handler to clear all items from the list
    const handleClearItems = () => {
        // Optional: confirm before clearing
        if (window.confirm('Are you sure you want to clear the list?')) {
            setList([]);
        }
    };

    // Handles removing an item from the list of preffered occupations
    const handleRemove = (id) => {
        setList(list.filter((item) => item.name !== id));
    };

    // Handles user clicking the submit button at the beginning of the visualization
    const handleSubmit = () => {
        // if (list.length === 6) {
        // Sorts the the preffered occupations in order of highest to lowest exposure
        const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name))
        setRanked(sortedList);
        // Hides the preffered occupations searcgh bar
        setShowSearch(false);
        // Updates the time spent on the first page
        updateTimeSpentPages(0, timeSpent);
        // Resets the time spent on a page back to zero
        setTimeSpent(0);
        // }
        // else {
        //     alert("You need to select 6 occupations before you can move on.");
        // }
    };

    // Handles user clicking the next button
    const handleNext = () => {
        // Displays the top 3 positively and negatively impacted occupations
        setShowTop(true);
        // Hides the second page information
        setRanked(null);
        // Updates the time spent looking at each occupation's detailed information
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart)
        }
        // Hides the detailed information if still being displayed when the next button is pushed
        setSelectedItem(null);
        // Updates the time spent on page 2
        updateTimeSpentPages(1, timeSpent);
        // Resets the time spent on a page back to zero
        setTimeSpent(0);
    };

    // Handles user clicking back button
    const handleBack = () => {
        // Hides the top 3 positively and negatively impacted occupations
        setShowTop(false);
        // Displays the second page
        handleSubmit();
        // Updates the time spent looking at each occupation's detailed information
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart)
        }
        // Hides the detailed information if still being displayed when the next button is pushed
        setSelectedItem(null);
        // Updates the time spent on page 3
        updateTimeSpentPages(2, timeSpent);
        // Resets the time spent on a page back to zero
        setTimeSpent(0);
    };

    // Handles user clicking the end button at the end of the visualization
    const handleEnd = () => {
        // Hide the top 3 positively and negatively impacted occupations
        setShowTop(false);
        // Updates the time spent looking at each occupation's detailed information
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart)
        }
        // Hides the detailed information if still being displayed when the next button is pushed
        setSelectedItem(null);
        // Updates the time spent on the third page
        updateTimeSpentPages(2, timeSpent);
        // Resets the time spent on a page back to zero
        setTimeSpent(0);
        // Displays a message to the browser to tell it to redisplay the Next button in Qualtrics
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
            {/* Displays overall header for the visualization*/}
            <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px',
                color: '#333'
            }}>
            </h1>
            {/* Displays additional header for the first page */}
            {showSearch && (
                <p style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: 'black'
                }}>
                    Please select the 6 occupations you previously entered. As a reminder, these are the top 6 occupations you would consider for your future career.
                </p>
            )}
            {/* Displays additional header for the second and third pages */}
            {(ranked || showTop) && (
                <p style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: 'black'
                }}>
                    Click on an occupation for detailed information.
                </p>
            )}

            {/* Displays the first page */}
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
                            {/* Handles user input in the search bar*/}
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
                            {/* Shows all the occupations based on the search terms*/}
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
                                        {item.name}
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
                                {/* Displays the items that the user has clicked on the first paege */}
                                <ol id="preferred_occupations">
                                    {list.map(item => (
                                        <li key={item.name}>{item.name}
                                            {/* Displays a remove item button */}
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
                                {/* Displays a clear all items button */}
                                <button
                                    onClick={handleClearItems}
                                    disabled={list.length === 0}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    Clear List
                                </button>
                                {/* Displays a submit button */}
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

            {/* Displays the second page */}
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
                            <p style={{
                                textAlign: 'center',
                                marginBottom: '30px',
                                color: 'black'
                            }}>
                                Here are the occupations you selected. </p>

                            They are ranked in alphabetical order.
                            <div>
                                {/* Displays the preffered occupations*/}
                                <ol style={{ paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: 'black' }}>
                                    {ranked.map((item, index) => {
                                        return (
                                            <li key={item.name} style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                                {/* Allows users to view the detailed informatiion for an occupation */}
                                                <button onClick={() => handleItemClickDetailed(item)}
                                                    style={{
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
                                                >{index + 1}. {item.name}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Displays the third page*/}
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
                            <p style={{
                                textAlign: 'center',
                                marginBottom: '30px',
                                color: 'black'
                            }}>Of all occupations, including occupations you did not select...</p>
                            ...here are the first 3 occupations in terms of alphabetical order.
                            <div>
                                <ol style={{ paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: 'black' }}>
                                    {/* Displays the top occupation in terms of alphabetical order */}
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        {/* Allows users to view the detailed informatiion for an occupation */}
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[most_positive])}
                                            style={{
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
                                        >
                                            1. {mockData.occupations[most_positive].name}
                                        </button>
                                    </li>
                                    {/* Displays the second top occupation in terms of alphabetical order */}
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        {/* Allows users to view the detailed informatiion for an occupation */}
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[second_positive])}
                                            style={{
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
                                        >
                                            2. {mockData.occupations[second_positive].name}
                                        </button>

                                    </li>
                                    {/* Displays the third top occupation in terms of alphabetical order */}
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        {/* Allows users to view the detailed informatiion for an occupation */}
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[third_positive])}
                                            style={{
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
                                        >
                                            3. {mockData.occupations[third_positive].name}
                                        </button>
                                    </li>
                                </ol>
                            </div>
                            ...here are the last 3 occupations in terms of alphabetical order.
                            <div>
                                <ol style={{ paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: 'black' }}>
                                    {/* Displays the bottom occupation in terms of alphabetical order */}
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        {/* Allows users to view the detailed informatiion for an occupation */}
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[most_negative])}
                                            style={{
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
                                        >
                                            1. {mockData.occupations[most_negative].name}
                                        </button></li>
                                    {/* Displays the second bottom occupation in terms of alphabetical order */}
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        {/* Allows users to view the detailed informatiion for an occupation */}
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[second_negative])}
                                            style={{
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
                                        >
                                            2. {mockData.occupations[second_negative].name}
                                        </button></li>
                                    {/* Displays the third bottom occupation in terms of alphabetical order */}
                                    <li style={{ listStyleType: 'none', marginBottom: '12px' }}>
                                        {/* Allows users to view the detailed informatiion for an occupation */}
                                        <button onClick={() => handleItemClickDetailed(mockData.occupations[third_negative])}
                                            style={{
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
                                        >
                                            3.  {mockData.occupations[third_negative].name}
                                        </button></li>
                                </ol>
                            </div>
                        </div >
                    </div >
                </>
            )}

            {/* Displays the end page */}
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
                            {/* Displays the tracking information. The tracking information includes the number of clicks and time spent on each occupation's
                            detailed information, the search terms used, and the time spent on each page.*/}
                            {/* <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}> */}
                            {/* Number of clicks and time spent on detailed information for each occupation */}
                            {/* </label> */}
                            {/* <div> */}
                            {/* <ul>
                                    {mockData.occupations.map(occupation => {
                                        return (
                                            <li key={occupation.name}>{occupation.name}: {occupation.count} clicks and {timeSpentDetail[occupation.id].time} seconds</li>
                                        )
                                    })}
                                </ul> */}
                            {/* </div> */}
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
            )}

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
                            <p style={{ lineHeight: '1.5', color: 'black' }}>
                                <strong>{`Occupations similar to ${selectedItem.name} are shown below.`}</strong>
                            </p>
                            <p style={{ lineHeight: '1.5', color: 'black' }}>
                                {/* Displays the related occupations */ }
                                <ol style={{ paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: 'black' }}>
                                    {(selectedItem.occupation).map(occupation_number => {
                                        return (
                                            <li><span style={{}}>
                                                {mockData.occupations[occupation_number].name}</span></li>
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
                                        {/*Determines whether to display that the selected occupation has a majority of workers with a bachelors degree, 
                                        a pluraity of workers with a bachelors degree, or a majoirty of workers without a college degree*/}
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
                                                {/*Determines whether to display that the related occupations have a majority of workers with a bachelors degree, 
                                                a pluraity of workers with a bachelors degree, or a majoirty of workers without a college degree*/}
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
                        </div>
                    </div>
                )
            }

            {/* Displays a next button*/}
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

            {/* Displays back and end buttons*/}
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