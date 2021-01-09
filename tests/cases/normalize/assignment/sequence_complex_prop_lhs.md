# Preval test case

# sequence_simple_prop.md

> normalize > assignment > sequence_simple_prop
>
> An assignment with rhs of a property on a sequence that ends with a complex node

Relevant for intermediate artifacts.

#TODO

## Input

`````js filename=intro
let a = 0, b = 1, c = {x: {y: 10}};
a = ((b = c.x), $(b)).y === 'Identifier';
$(a);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpBinaryLeft;
var tmpComplexMemberObj;
let a = 0;
let b = 1;
tmpObjPropValue = { y: 10 };
let c = { x: tmpObjPropValue };
b = c.x;
tmpComplexMemberObj = $(b);
tmpBinaryLeft = tmpComplexMemberObj.y;
a = tmpBinaryLeft === 'Identifier';
$(a);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = 8;
var x = 8;
x = { x: 8 };
var x = { x: x };
x = x.x;
x = x(x);
x = x.x;
x = x * 'str';
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpBinaryLeft;
var tmpComplexMemberObj;
let a = 0;
let b = 1;
tmpObjPropValue = { y: 10 };
let c = { x: tmpObjPropValue };
b = c.x;
tmpComplexMemberObj = $(b);
tmpBinaryLeft = tmpComplexMemberObj.y;
a = tmpBinaryLeft === 'Identifier';
$(a);
`````
