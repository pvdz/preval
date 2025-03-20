# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident cond simple c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 ? (40, 50, $(60)) : $($(100))) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(60);
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(60);
$(a + $(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
const b = $( 100 );
const c = a + b;
$( c );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - 2: 100
 - 3: 160
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
