# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = (10, 20, 30) ? (40, 50, 60) : $($(100))) });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: 60 };
$(tmpCalleeParam);
$(60);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 60 });
$(60);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 60 };
$( a );
$( 60 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '60' }
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
