# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident cond simple s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 ? (40, 50, 60) : $($(100))) + (a = 1 ? (40, 50, 60) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
$(120);
$(60);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(120);
$(60);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 120 );
$( 60 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 60;
const tmpBinBothLhs = a;
a = 60;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 120
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
