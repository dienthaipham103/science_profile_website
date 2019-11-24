module.exports.support_update = (updateFields, pID)=>{
    let str = '';
    let param = [];

    for(let key in updateFields){
        if(updateFields.hasOwnProperty(key)){
            str += `${key}` + ' = ' + `?` + `, `;
            param.push(updateFields[key]);
        }
    };
    
    param.push(pID);
    return [str.slice(0, -2), param];
}

module.exports.support_insert = (insertFields, pID)=>{
    insertFields.pID = pID;
    let fields = '';
    let values = '';
    let param = [];

    for(let key in insertFields){
	    fields += key + ', ';
        values += '?' + ', ';
        param.push(insertFields[key]);
    };
    const str = '(' + fields.slice(0,-2) + ') ' + 'values' + '(' + values.slice(0,-2) + ')';

    return [str, param];
};
