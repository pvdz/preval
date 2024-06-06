# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Call spread > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(...(b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
$(...(b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
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
const tmpCalleeParamSpread = varInitAssignLhsComputedRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b, c);
`````

## Output


`````js filename=intro
const b = { x: 3 };
const a = { a: 999, b: 1000 };
$(...3);
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
$( ... 3 );
$( b, a, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
