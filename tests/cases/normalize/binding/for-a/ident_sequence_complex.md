# Preval test case

# ident_sequence_complex.md

> Normalize > Binding > For-a > Ident sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let a = ($(b), $(c));false;) $(a, b, c);
`````


## Settled


`````js filename=intro
$(2);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
$(b);
let a$1 = $(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
