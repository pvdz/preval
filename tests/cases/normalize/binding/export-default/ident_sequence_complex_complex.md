# Preval test case

# ident_sequence_complex_complex.md

> Normalize > Binding > Export-default > Ident sequence complex complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = ($(b), $(c)).x = $(c);
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 2,
  c = 3;
let a = (($(b), $(c)).x = $(c));
export { a };
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 2;
let c = 3;
$(b);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedRhs = $(c);
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
`````

## Output


`````js filename=intro
$(2);
const varInitAssignLhsComputedObj /*:unknown*/ = $(3);
const varInitAssignLhsComputedRhs /*:unknown*/ = $(3);
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const a /*:unknown*/ = varInitAssignLhsComputedRhs;
export { a };
$(varInitAssignLhsComputedRhs, 2, 3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
const b = $( 3 );
a.x = b;
const c = b;
export { c as a };
$( b, 2, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
