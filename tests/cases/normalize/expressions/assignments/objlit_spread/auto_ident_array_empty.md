# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = []) });
$(a);
`````


## Settled


`````js filename=intro
const a /*:array*/ = [];
const tmpCalleeParam /*:object*/ = { ...a };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [];
$({ ...a });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = { ... a };
$( b );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
