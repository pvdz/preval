# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident unary void simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

export let a = void arg;
$(a, arg);
`````

## Settled


`````js filename=intro
const a /*:undefined*/ = undefined;
export { a };
$(undefined, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = undefined;
export { a };
$(undefined, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = void arg;
export { a };
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = undefined;
export { a };
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = undefined;
export { a as a };
$( undefined, 1 );
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
