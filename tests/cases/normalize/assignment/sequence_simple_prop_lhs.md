# Preval test case

# sequence_simple_prop.md

> normalize > assignment > sequence_simple_prop
>
> An assignment with rhs of a property on a sequence that ends with a simple node

Relevant for intermediate artifacts.

#TODO

## Input

`````js filename=intro
let a = 0, b = 1, c = {x: {y: 10}};
a = ((b = c.x), b).y === 'Identifier';
$(a);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpBinaryLeft;
let a = 0;
let b = 1;
tmpObjPropValue = { y: 10 };
let c = { x: tmpObjPropValue };
b = c.x;
tmpBinaryLeft = b.y;
a = tmpBinaryLeft === 'Identifier';
$(a);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpBinaryLeft;
let a = 0;
let b = 1;
tmpObjPropValue = { y: 10 };
let c = { x: tmpObjPropValue };
b = c.x;
tmpBinaryLeft = b.y;
a = tmpBinaryLeft === 'Identifier';
$(a);
`````
