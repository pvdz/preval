# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Stmt global top > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
$(a);
`````

## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
