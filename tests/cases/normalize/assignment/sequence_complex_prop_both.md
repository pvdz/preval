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
var tmpBinaryLeft;
var tmpComplexMemberObj;
var tmpBinaryRight;
var tmpComplexMemberObj_1;
let a = 0;
let b = 1;
let c = { x: { y: 10 } };
let p = { x: 20 };
let q = 30;
p.x;
tmpComplexMemberObj = $(q);
tmpBinaryLeft = tmpComplexMemberObj.y;
b = c.x;
tmpComplexMemberObj_1 = $(b);
tmpBinaryRight = tmpComplexMemberObj_1.y;
a = tmpBinaryLeft === tmpBinaryRight;
$(a);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpComplexMemberObj;
var tmpBinaryRight;
var tmpComplexMemberObj_1;
let a = 0;
let b = 1;
let c = { x: { y: 10 } };
let p = { x: 20 };
p.x;
tmpComplexMemberObj = $(30);
tmpBinaryLeft = tmpComplexMemberObj.y;
b = c.x;
tmpComplexMemberObj_1 = $(b);
tmpBinaryRight = tmpComplexMemberObj_1.y;
a = tmpBinaryLeft === tmpBinaryRight;
$(a);
`````
