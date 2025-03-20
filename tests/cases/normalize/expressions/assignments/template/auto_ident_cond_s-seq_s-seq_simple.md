# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = (10, 20, 30) ? (40, 50, 60) : $($(100)))}  after`);
$(a);
`````


## Settled


`````js filename=intro
$(`before  60  after`);
$(60);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  60  after`);
$(60);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  60  after" );
$( 60 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before 60 after'
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
