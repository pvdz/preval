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
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
let c = { x: tmpObjLitVal };
let p = { x: 20 };
let q = 30;
p.x;
const tmpCompObj = $(q);
const tmpBinBothLhs = tmpCompObj.y;
b = c.x;
const tmpCompObj$1 = $(b);
const tmpBinBothRhs = tmpCompObj$1.y;
a = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
let c = { x: tmpObjLitVal };
let p = { x: 20 };
p.x;
const tmpCompObj = $(30);
const tmpBinBothLhs = tmpCompObj.y;
b = c.x;
const tmpCompObj$1 = $(b);
const tmpBinBothRhs = tmpCompObj$1.y;
a = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: { y: '10' }
 - 3: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
