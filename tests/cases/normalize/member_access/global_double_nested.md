# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj.a.b.c);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
var tmpArg;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
tmpObjPropValue_2 = $();
tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj_1 = obj.a;
tmpMemberComplexObj = tmpMemberComplexObj_1.b;
tmpArg = tmpMemberComplexObj.c;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
var tmpArg;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
tmpObjPropValue_2 = $();
tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj_1 = obj.a;
tmpMemberComplexObj = tmpMemberComplexObj_1.b;
tmpArg = tmpMemberComplexObj.c;
$(tmpArg);
`````

## Result

Should call `$` with:
[[], [null], null];

Normalized calls: Same

Final output calls: Same
