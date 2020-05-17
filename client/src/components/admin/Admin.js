import React from 'react';
import HeaderAdmin from './HeaderAdmin';
import SideAdmin from './SideAdmin';
import ContentAdmin from './ContentAdmin';

export default function (props){

    return(
        <div className="container-admin">
            <HeaderAdmin/>
            <SideAdmin />
            <ContentAdmin>
                {props.children}    
            </ContentAdmin>
        </div>
    )
};
