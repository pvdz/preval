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
a = 'Identifier' === ((b = c.x), $(b)).y;
$(a);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpComplexMemberObj;
let a = 0;
let b = 1;
let c = { x: { y: 10 } };
b = c.x;
tmpComplexMemberObj = $(b);
tmpBinaryRight = tmpComplexMemberObj.y;
a = 'Identifier' === tmpBinaryRight;
$(a);
`````

## Output

`````js filename=intro
var tmpBinaryRight;
var tmpComplexMemberObj;
let a = 0;
let b = 1;
let c = { x: { y: 10 } };
b = c.x;
tmpComplexMemberObj = $(b);
tmpBinaryRight = tmpComplexMemberObj.y;
a = 'Identifier' === tmpBinaryRight;
$(a);
`````
