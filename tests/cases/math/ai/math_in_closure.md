# Preval test case

# math_in_closure.md

> Math > Ai > Math in closure
>
> Math in closure, capturing variable

## Input

`````js filename=intro
function makeRounder(n) {
  return x => Math.round(x * n) / n;
}
const round2 = makeRounder(100);
const a = $(round2(1.2345));
$(a);
// Should be 1.23
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1.23);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1.23));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1.23 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let makeRounder = function ($$0) {
  let n = $$0;
  debugger;
  const tmpReturnArg = function ($$0) {
    let x = $$0;
    debugger;
    const tmpMCF = $Math_round;
    const tmpMCP = x * n;
    const tmpBinLhs = $dotCall(tmpMCF, Math, `round`, tmpMCP);
    const tmpReturnArg$1 = tmpBinLhs / n;
    return tmpReturnArg$1;
  };
  return tmpReturnArg;
};
const round2 = makeRounder(100);
let tmpCalleeParam = round2(1.2345);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_round


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.23
 - 2: 1.23
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
