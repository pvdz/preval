# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj.a.b);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpMemberComplexObj;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj = obj.a;
tmpArg = tmpMemberComplexObj.b;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpMemberComplexObj;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj = obj.a;
tmpArg = tmpMemberComplexObj.b;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
