# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Binary both > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
(b.x = b.x = b.x = b.x = b.x = b.x = c) +
  (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
(b.x = b.x = b.x = b.x = b.x = b.x = c) + (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedRhs$9 = c;
b.x = varInitAssignLhsComputedRhs$9;
const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$9;
b.x = varInitAssignLhsComputedRhs$7;
const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
b.x = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
b.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
const tmpBinBothLhs = varInitAssignLhsComputedRhs;
const varInitAssignLhsComputedRhs$21 = c;
b.x = varInitAssignLhsComputedRhs$21;
const varInitAssignLhsComputedRhs$19 = varInitAssignLhsComputedRhs$21;
b.x = varInitAssignLhsComputedRhs$19;
const varInitAssignLhsComputedRhs$17 = varInitAssignLhsComputedRhs$19;
b.x = varInitAssignLhsComputedRhs$17;
const varInitAssignLhsComputedRhs$15 = varInitAssignLhsComputedRhs$17;
b.x = varInitAssignLhsComputedRhs$15;
const varInitAssignLhsComputedRhs$13 = varInitAssignLhsComputedRhs$15;
b.x = varInitAssignLhsComputedRhs$13;
const varInitAssignLhsComputedRhs$11 = varInitAssignLhsComputedRhs$13;
b.x = varInitAssignLhsComputedRhs$11;
const tmpBinBothRhs = varInitAssignLhsComputedRhs$11;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b, c);
`````

## Output


`````js filename=intro
const b = { x: 3 };
const a = { a: 999, b: 1000 };
$(a, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 3 };
const b = {
a: 999,
b: 1000
;
$( b, a, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
