# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident cond simple c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = 1 ? (40, 50, $(60)) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(60);
throw a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(60);
throw a;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(60);
const tmpThrowArg = a;
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - eval returned: ('<crash[ 60 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
