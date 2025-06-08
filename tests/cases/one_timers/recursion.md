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
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCalleeParam$11 = {};
let p = ``;
let tmpSSA_e = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const tmpCallCallee = tmpSSA_e;
  let tmpCalleeParam = $(2);
  tmpBinBothLhs = tmpSSA_e(tmpCalleeParam);
  return tmpBinBothLhs;
};
$(p);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
