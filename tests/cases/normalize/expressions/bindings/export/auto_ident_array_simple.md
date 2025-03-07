# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident array simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = [1, 2, 3];
$(a);
`````

## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
export { a };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [1, 2, 3];
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = [1, 2, 3];
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let a = [1, 2, 3];
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
export { a as a };
$( a );
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
