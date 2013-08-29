function O(el)
{
    if(!el)
    {
        return null;
    }
    else if(typeof el=='string')
    {
        return document.getElementById(el);
    }
    else if(typeof el=='object')
    {
        return el;
    }
}
//对象数组
function $A(els){
    var _els=[];
    if(els instanceof Array){
        for(var i=0; i!=els.length; i++){
            _els[_els.length] = O(els[i]);
        }
    }else if(typeof els=='object' && typeof els['length']!="undefined" && els['length']>0 ){
        for(var i=0; i!=els.length; i++){
            _els[_els.length] = O(els[i]);

        }
    }else{
        _els[0] = O(els);
    }
    return _els;
}
