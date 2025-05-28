# Preval test case

# redundant_assignment_12.md

> Assigns > Redundant assignment 12
>
> We should eliminate the writes when we know they're redundant

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = 1;
} else {
  x = 2;
}
$(x + $('prevent inlining'));
`````


## Settled


`````js filename=intro
let x /*:number*/ /*ternaryConst*/ = 1;
if ($) {
} else {
  x = 2;
}
const tmpBinBothRhs /*:unknown*/ = $(`prevent inlining`);
const tmpCalleeParam /*:primitive*/ = x + tmpBinBothRhs;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
if (!$) {
  x = 2;
}
$(x + $(`prevent inlining`));
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
if ($) {

}
else {
  a = 2;
}
const b = $( "prevent inlining" );
const c = a + b;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
if ($) {
  x = 1;
} else {
  x = 2;
}
const tmpBinBothLhs = x;
const tmpBinBothRhs = $(`prevent inlining`);
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prevent inlining'
 - 2: '1prevent inlining'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
