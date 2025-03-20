# Preval test case

# var_body_complex.md

> Normalize > Dowhile > Var body complex
>
> Regression specific to using this kind of init

## Input

`````js filename=intro
do var a = $($(2));
while (0);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(2);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
