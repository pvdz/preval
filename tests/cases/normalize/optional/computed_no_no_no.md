# Preval test case

# computed_no_no_no.md

> normalize > optional > computed_no_no_no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a[b][c][d]);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
tmpObjPropValue_1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue_1 };
const a = { b: tmpObjPropValue };
const b = 'b';
const c = 'c';
const d = 'd';
tmpMemberComplexObj_1 = a[b];
tmpMemberComplexObj = tmpMemberComplexObj_1[c];
tmpArg = tmpMemberComplexObj[d];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
tmpObjPropValue_1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue_1 };
const a = { b: tmpObjPropValue };
tmpMemberComplexObj_1 = a.b;
tmpMemberComplexObj = tmpMemberComplexObj_1.c;
tmpArg = tmpMemberComplexObj.d;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
