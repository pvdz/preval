# Preval test case

# base_16.md

> Bit hacks > If return bit > Base 16
>
> When an if checks whether a single bit is set and then returns a literal it should be replaced with that value

## Input

`````js filename=intro
function f(a) {
  const x = a & 16;
  if (x) return 16;
  else return 0;
}
$((f($(16))));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(16);
const tmpCalleeParam /*:number*/ = tmpCalleeParam$1 & 16;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(16) & 16);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 16 );
const b = a & 16;
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 16
 - 2: 16
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
