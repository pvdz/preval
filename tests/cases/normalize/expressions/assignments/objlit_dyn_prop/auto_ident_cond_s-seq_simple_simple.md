# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident cond s-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = (10, 20, 30) ? $(2) : $($(100)))]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { [a]: 10 };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(2);
$({ [a]: 10 });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { [ a ]: 10 };
$( b );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { 2: '10' }
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
