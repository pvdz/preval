# Preval test case

# else_arr_empty_len.md

> Ifelse > Simple > Else arr empty len
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ([].length) $(1);
else $(2);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpIfTest = 0;
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
