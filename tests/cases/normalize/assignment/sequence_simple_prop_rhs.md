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
a = 'Identifier' === ((b = c.x), b).y;
$(a);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpBinaryRight;
let a = 0;
let b = 1;
tmpObjPropValue = { y: 10 };
let c = { x: tmpObjPropValue };
b = c.x;
tmpBinaryRight = b.y;
a = 'Identifier' === tmpBinaryRight;
$(a);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpBinaryRight;
let a = 0;
let b = 1;
tmpObjPropValue = { y: 10 };
let c = { x: tmpObjPropValue };
b = c.x;
tmpBinaryRight = b.y;
a = 'Identifier' === tmpBinaryRight;
$(a);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: undefined

Normalized calls: Same

Final output calls: Same
