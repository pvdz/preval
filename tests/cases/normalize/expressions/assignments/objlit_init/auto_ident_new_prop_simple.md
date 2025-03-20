# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident new prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$({ x: (a = new b.$(1)) });
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:object*/ = new $(1);
const tmpCalleeParam /*:object*/ = { x: tmpClusterSSA_a };
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = new $(1);
$({ x: tmpClusterSSA_a });
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
const b = { x: a };
$( b );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '{}' }
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
