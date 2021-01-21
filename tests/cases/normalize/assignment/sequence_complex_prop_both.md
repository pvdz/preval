# Preval test case

# sequence_simple_prop.md

> normalize > assignment > sequence_simple_prop
>
> An assignment with rhs of a property on a sequence that ends with a complex node

Relevant for intermediate artifacts.

#TODO

## Input

`````js filename=intro
let a = 0, b = 1, c = {x: {y: 10}}, p = {x: 20}, q = 30;
a = (p.x, $(q)).y === ((b = c.x), $(b)).y;
$(a);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
let a = 0;
let b = 1;
tmpObjPropValue = { y: 10 };
let c = { x: tmpObjPropValue };
let p = { x: 20 };
let q = 30;
p.x;
tmpMemberComplexObj = $(q);
tmpBinaryLeft = tmpMemberComplexObj.y;
b = c.x;
tmpMemberComplexObj_1 = $(b);
tmpBinaryRight = tmpMemberComplexObj_1.y;
a = tmpBinaryLeft === tmpBinaryRight;
$(a);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
let a = 0;
let b = 1;
tmpObjPropValue = { y: 10 };
let c = { x: tmpObjPropValue };
let p = { x: 20 };
p.x;
tmpMemberComplexObj = $(30);
tmpBinaryLeft = tmpMemberComplexObj.y;
b = c.x;
tmpMemberComplexObj_1 = $(b);
tmpBinaryRight = tmpMemberComplexObj_1.y;
a = tmpBinaryLeft === tmpBinaryRight;
$(a);
`````

## Result

Should call `$` with:
 - 0: 30
 - 1: {"y":10}
 - 2: false
 - 3: undefined

Normalized calls: Same

Final output calls: Same
