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
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
let c = { x: tmpObjLitVal };
const tmpBinBothLhs = 'Identifier';
b = c.x;
const tmpCompObj = $(b);
const tmpBinBothRhs = tmpCompObj.y;
a = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
let c = { x: tmpObjLitVal };
const tmpBinBothLhs = 'Identifier';
b = c.x;
const tmpCompObj = $(b);
const tmpBinBothRhs = tmpCompObj.y;
a = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: { y: '10' }
 - 2: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
