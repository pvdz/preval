# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Bindings > Export > Auto ident regex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = /foo/;
$(a);
`````

## Settled


`````js filename=intro
const a /*:regex*/ = /foo/;
export { a };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = /foo/;
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = /foo/;
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let a = /foo/;
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /foo/;
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
