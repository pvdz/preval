# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident logic or simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = 0 || 2;
$(a);
`````

## Settled


`````js filename=intro
const a /*:number*/ = 2;
export { a };
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 2;
export { a };
$(2);
`````

## Pre Normal


`````js filename=intro
let a = 0 || 2;
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let a = 0;
if (a) {
} else {
  a = 2;
}
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 2;
export { a as a };
$( 2 );
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
