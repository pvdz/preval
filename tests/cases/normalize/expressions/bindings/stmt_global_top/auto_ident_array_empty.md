# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident array empty
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = [];
$(a);
`````

## Settled


`````js filename=intro
const a /*:array*/ = [];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
`````

## Pre Normal


`````js filename=intro
let a = [];
$(a);
`````

## Normalized


`````js filename=intro
let a = [];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
