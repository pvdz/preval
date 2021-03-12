# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Throw > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
throw (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
throw (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedRhs$5 = c;
b.x = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$4 = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$4;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
b.x = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
b.x = varInitAssignLhsComputedRhs$2;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
b.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
const tmpThrowArg = varInitAssignLhsComputedRhs;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const b = { x: 1 };
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
b.x = 3;
throw 3;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ 3 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
