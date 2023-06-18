import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/rootStore';

const Breadcrumbs: React.FC = observer(() => {
    const { path, setBreadcrumbs } = useRootStore();

    const handleBreadcrumbClick = (index: number) => {
        const newPath = [...path];
        newPath.splice(index+1);
        setBreadcrumbs(newPath);
    }

    return (
        <ul>
            <li key={0} onClick={() => handleBreadcrumbClick(-1)}>
                Home
            </li>
            {path.map((item, index) => (
                <li key={index+1} onClick={() => handleBreadcrumbClick(index)}>
                    {item.value}
                </li>
            ))}
        </ul>
    );
});

export default Breadcrumbs;