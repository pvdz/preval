# Preval test case

# redundant_assignment_01.md

> Assigns > Redundant assignment 01
>
> We should eliminate the writes when we know they're redundant

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = 0;
} else {
  x = 1;
}
$(x + $('prevent inlining'));
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:number*/ = 0;
if ($) {
} else {
  tmpBinBothLhs = 1;
}
const tmpBinBothRhs /*:unknown*/ = $(`prevent inlining`);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = 0;
if (!$) {
  tmpBinBothLhs = 1;
}
$(tmpBinBothLhs + $(`prevent inlining`));
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
if ($) {

}
else {
  a = 1;
}
const b = $( "prevent inlining" );
const c = a + b;
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prevent inlining'
 - 2: '0prevent inlining'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
