# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Bindings > Export > Auto ident c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

export let a = ($(1), $(2), $(x));
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const a /*:unknown*/ = $(1);
export { a };
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const a = $(1);
export { a };
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = ($(1), $(2), $(x));
export { a };
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
$(1);
$(2);
let a = $(x);
export { a };
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
export { a as a };
$( a, 1 );
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
