# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Call spread > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(...(a = b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
$(...(a = b.x = b.x = b.x = b.x = b.x = b.x = c));
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
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b, c);
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
$(...3);
$(3, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
