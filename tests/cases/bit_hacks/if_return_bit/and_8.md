# Preval test case

# and_8.md

> Bit hacks > If return bit > And 8
>
> Just making sure this got fixed

## Input

`````js filename=intro
function f(y) {
  const x = y & 8;
  if (x) { return 8; }
  else { return 0; }
}
$(f($(7)));
$(f($(8)));
$(f($(9)));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(7);
const tmpCalleeParam /*:number*/ = tmpCalleeParam$1 & 8;
$(tmpCalleeParam);
const tmpCalleeParam$5 /*:unknown*/ = $(8);
const tmpCalleeParam$3 /*:number*/ = tmpCalleeParam$5 & 8;
$(tmpCalleeParam$3);
const tmpCalleeParam$9 /*:unknown*/ = $(9);
const tmpCalleeParam$7 /*:number*/ = tmpCalleeParam$9 & 8;
$(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(7) & 8);
$($(8) & 8);
$($(9) & 8);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 7 );
const b = a & 8;
$( b );
const c = $( 8 );
const d = c & 8;
$( d );
const e = $( 9 );
const f = e & 8;
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7
 - 2: 0
 - 3: 8
 - 4: 8
 - 5: 9
 - 6: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
