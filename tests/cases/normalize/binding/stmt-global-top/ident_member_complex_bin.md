# Preval test case

# ident_member_complex_bin.md

> Normalize > Binding > Stmt-global-top > Ident member complex bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
let a = $(b).x = c + d;
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 2 },
  c = 3,
  d = 4;
let a = ($(b).x = c + d);
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedRhs = c + d;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
$(a, b, c);
`````

## Output


`````js filename=intro
const b = { x: 2 };
const varInitAssignLhsComputedObj = $(b);
varInitAssignLhsComputedObj.x = 7;
$(7, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
b.x = 7;
$( 7, a, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 7, { x: '7' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
