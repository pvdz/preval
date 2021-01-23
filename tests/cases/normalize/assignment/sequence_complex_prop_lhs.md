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
var tmpBinaryLeft;
var tmpMemberComplexObj;
var tmpObjPropValue;
let a = 0;
let b = 1;
tmpObjPropValue = { y: 10 };
let c = { x: tmpObjPropValue };
b = c.x;
tmpMemberComplexObj = $(b);
tmpBinaryLeft = tmpMemberComplexObj.y;
a = tmpBinaryLeft === 'Identifier';
$(a);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpMemberComplexObj;
var tmpObjPropValue;
let a = 0;
let b = 1;
tmpObjPropValue = { y: 10 };
let c = { x: tmpObjPropValue };
b = c.x;
tmpMemberComplexObj = $(b);
tmpBinaryLeft = tmpMemberComplexObj.y;
a = tmpBinaryLeft === 'Identifier';
$(a);
`````

## Result

Should call `$` with:
 - 0: {"y":10}
 - 1: false
 - 2: undefined

Normalized calls: Same

Final output calls: Same
