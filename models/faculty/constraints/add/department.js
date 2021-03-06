import departmentUtils from 'models/faculty/utils/department.js';

const DepartmentValidationConstraints = {
    type: {
        presence:     true,
        type:     {
            type: value => departmentUtils.isSupportedId( value ),
        },
    },
};

export default DepartmentValidationConstraints;
