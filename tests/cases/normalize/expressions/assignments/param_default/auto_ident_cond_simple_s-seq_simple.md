# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident cond simple s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = 1 ? (40, 50, 60) : $($(100)))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
$(60);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(60);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 60 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
