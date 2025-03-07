# Preval test case

# ident_simple.md

> Normalize > Binding > Export-default > Ident simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = b;
$(a, b, c);
`````

## Settled


`````js filename=intro
const a /*:number*/ = 2;
export { a };
$(2, 2, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 2;
export { a };
$(2, 2, 3);
`````

## Pre Normal


`````js filename=intro
let b = 2,
  c = 3;
let a = b;
export { a };
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 2;
let c = 3;
let a = b;
export { a };
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 2;
export { a as a };
$( 2, 2, 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
