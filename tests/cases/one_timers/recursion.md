# Preval test case

# recursion.md

> One timers > Recursion
>
> When trying to inline itself into itself...

## Input

`````js filename=intro
const tmpCalleeParam$11 = {};
let p = '';
let tmpSSA_e = function($$0) {
  debugger;
  tmpBinBothLhs = tmpSSA_e($(2));
  return tmpBinBothLhs;
};
$(p);
`````


## Settled


`````js filename=intro
const tmpSSA_e /*:()=>unknown*/ = function () {
  debugger;
  $(2);
  tmpBinBothLhs = tmpSSA_e();
  return tmpBinBothLhs;
};
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_e = function () {
  $(2);
  tmpBinBothLhs = tmpSSA_e();
  return tmpBinBothLhs;
};
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 2 );
  tmpBinBothLhs = a();
  return tmpBinBothLhs;
};
$( "" );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

tmpBinBothLhs


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
