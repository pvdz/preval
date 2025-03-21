# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Objlit init > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = this) });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: undefined };
$(tmpCalleeParam);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: undefined });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: undefined };
$( a );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: 'undefined' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
