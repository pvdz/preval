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
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
let c = { x: tmpObjLitVal };
b = c.x;
const tmpCompObj = b;
const tmpBinLhs = tmpCompObj.y;
a = tmpBinLhs === 'Identifier';
$(a);
`````

## Output

`````js filename=intro
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
const c = { x: tmpObjLitVal };
b = c.x;
const tmpCompObj = b;
const tmpBinLhs = tmpCompObj.y;
a = tmpBinLhs === 'Identifier';
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
