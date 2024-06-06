# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Arr element > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(
  (a = b.x = b.x = b.x = b.x = b.x = b.x = c) +
    (a = b.x = b.x = b.x = b.x = b.x = b.x = c)
);
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
$((a = b.x = b.x = b.x = b.x = b.x = b.x = c) + (a = b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const varInitAssignLhsComputedRhs$7 = c;
b.x = varInitAssignLhsComputedRhs$7;
const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
b.x = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
b.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpBinBothLhs = a;
const varInitAssignLhsComputedRhs$17 = c;
b.x = varInitAssignLhsComputedRhs$17;
const varInitAssignLhsComputedRhs$15 = varInitAssignLhsComputedRhs$17;
b.x = varInitAssignLhsComputedRhs$15;
const varInitAssignLhsComputedRhs$13 = varInitAssignLhsComputedRhs$15;
b.x = varInitAssignLhsComputedRhs$13;
const varInitAssignLhsComputedRhs$11 = varInitAssignLhsComputedRhs$13;
b.x = varInitAssignLhsComputedRhs$11;
const varInitAssignLhsComputedRhs$9 = varInitAssignLhsComputedRhs$11;
b.x = varInitAssignLhsComputedRhs$9;
const tmpNestedAssignPropRhs$1 = varInitAssignLhsComputedRhs$9;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
b.x = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output


`````js filename=intro
$(6);
const b = { x: 3 };
$(3, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 6 );
const a = { x: 3 };
$( 3, a, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 6
 - 2: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
