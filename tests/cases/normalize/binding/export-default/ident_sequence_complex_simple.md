# Preval test case

# ident_sequence_complex_simple.md

> Normalize > Binding > Export-default > Ident sequence complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = ($(b), $(c)).x = c;
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 2,
  c = 3;
let a = (($(b), $(c)).x = c);
export { a };
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 2;
let c = 3;
$(b);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedRhs = c;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
`````

## Output


`````js filename=intro
$(2);
const varInitAssignLhsComputedObj /*:unknown*/ = $(3);
varInitAssignLhsComputedObj.x = 3;
const a /*:number*/ = 3;
export { a };
$(3, 2, 3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
a.x = 3;
const b = 3;
export { b as a };
$( 3, 2, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
