import React, { useEffect, useState, useRef, useCallback } from 'react'
import PocketBase from 'pocketbase'
import CourseBox from './CourseBox';
import { useNavigate , Navigate } from 'react-router-dom';
import CourseAdder from './CourseAdder';
import useDebounce from './useDebounce';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const pb = new PocketBase('https://pb.jjus.dev');


function CoursesList() {
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    const animatedComponents = makeAnimated();

    if (!token) {
        { return <Navigate to='/' /> }

    }
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const [coursesList, setCoursesList] = useState<any>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);

    const [tagArray, settagArray] = useState([])
    

    /*
    const handleScroll = () => {
        let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;

    if (userScrollHeight >= windowBottomHeight) {
        
        setCurrentPage(count => count + 1)
        console.log("Page: "+currentPage)
        getCoursesList(search)
    }
    };
    */
    const filterOptions = [
         
        {value: '1okzq0iwh34nk0y', label: 'Mathematics'},
        {value: 'uhngxqgqn21vye3', label: 'Sciences'},
        {value: 'p8v2nympnp6e16v', label: 'Technology'},
        {value: 'wx09yyvxv6pemyf', label: 'Civic'},
        {value: 'wuxyjpwxnan3s43', label: 'Languages'},
        {value: 'wglhcidl0fnpux3', label: 'Geology'},
        {value: 'gsmg93ecip4ga4b', label: 'Management'},
    ]


    
    
    

    var rolefilter = "";
    if (pb.authStore.model!.role.includes('instructor')) {
        rolefilter = 'instructor ~ "' + pb.authStore.model!.id + '"'
    }




    const getCoursesList = async (search: string) => {
        let filterArray = []
        if (rolefilter) { filterArray.push(rolefilter) }
        if (search) { filterArray.push(`(name ~ "${search}" || instructor.name ~ "${search}")`) }
        if (tagArray) {  }
        console.log(filterArray.join(" && "));
        await pb.collection('courses').getList(currentPage, 10, {
            filter: filterArray.join(" && "),
            expand: 'instructor,tag,student'
        }).then((resultList: {items:any}) => {
            setCoursesList([...coursesList, ...resultList.items])
            setHasMore(resultList.items.length > 0)
            setLoading(false)

        })
        
        
    }

    useDebounce(() => {
        /*
        setCoursesList([])
        setLoading(true)
        setCurrentPage(1)
        */
        getCoursesList(search);
    }, [search, tagArray], 500
    );

    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getCoursesList(search);
    }, [])

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4]'>
            <div className='flex flex-col p-6 md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>

                {pb.authStore.model!.role.includes('instructor') && <CourseAdder />}

                <div>
                    <label className="block font-['DelaGothicOne'] text-[1.5rem] py-4 overflow-hidden whitespace-pre-line">
                        Courses
                    </label>
                </div>

                <div className='flex flex-col w-full justify-center'>
                    <div className="flex justify-center ">   
                        <input type="text" id="search" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={search} placeholder="Search" onChange={(e) => {setSearch(e.target.value); setCoursesList([]); setLoading(true); setCurrentPage(1);}}/>
                    </div>
                </div>

                <div>
                    <label className="block text-[1.2rem] py-4 overflow-hidden whitespace-pre-line">
                        Filter
                    </label>
                    <Select className='z-40' closeMenuOnSelect={false} isMulti components={animatedComponents} options={filterOptions} placeholder="Select Filters" onChange={(inputValue:any) => {settagArray(inputValue); setCoursesList([]); setLoading(true); setCurrentPage(1);}} />
                </div>

                <div className='max-w-full'>

                    {loading && <div className="min-h-64 mt-8"><Skeleton /></div>
                    }
                    {!loading &&
                        coursesList.map((data: any, index: number) => {
                            return <CourseBox key={index} id={data.id} name={data.name} instructor={data.expand.instructor.name} data={data} tag={data.expand.tag}/>
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default CoursesList