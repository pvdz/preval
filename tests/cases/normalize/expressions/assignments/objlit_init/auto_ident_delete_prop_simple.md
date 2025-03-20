# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$({ x: (a = delete arg.y) });
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
const tmpCalleeParam /*:object*/ = { x: a };
$(tmpCalleeParam);
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const a = delete arg.y;
$({ x: a });
$(a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
const c = { x: b };
$( c );
$( b, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: 'true' }
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
