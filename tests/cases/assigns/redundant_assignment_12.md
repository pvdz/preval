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
let tmpBinBothLhs /*:number*/ = 1;
if ($) {
} else {
  tmpBinBothLhs = 2;
}
const tmpBinBothRhs /*:unknown*/ = $(`prevent inlining`);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = 1;
if (!$) {
  tmpBinBothLhs = 2;
}
$(tmpBinBothLhs + $(`prevent inlining`));
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
