# Preval test case

# regression_trips.md

> Static arg ops > Binary > Regression trips
>
>

## Input

`````js filename=intro
const _0x2751bd$3 = function(_0x1a6934, _0x37f449) {
  const tmpCalleeParam$1763 = _0x37f449 - (-1034);
  const tmpReturnArg$489 = $(_0x1a6934, tmpCalleeParam$1763);
  $(tmpReturnArg$489);
};
const tmpCallCompProp$449 = _0x2751bd$3(112, 528);
const tmpCallCompProp$451 = _0x2751bd$3(859, 656);
$(tmpCallCompProp$449)
$(tmpCallCompProp$451)
`````


## Settled


`````js filename=intro
const _0x2751bd$3 /*:(number, number)=>undefined*/ = function ($$0, $$1) {
  const _0x1a6934 /*:number*/ = $$0;
  const tmpOutlinedParam /*:number*/ = $$1;
  debugger;
  const tmpReturnArg$489 /*:unknown*/ = $(_0x1a6934, tmpOutlinedParam);
  $(tmpReturnArg$489);
  return undefined;
};
_0x2751bd$3(112, 1562);
_0x2751bd$3(859, 1690);
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const _0x2751bd$3 = function (_0x1a6934, tmpOutlinedParam) {
  $($(_0x1a6934, tmpOutlinedParam));
};
_0x2751bd$3(112, 1562);
_0x2751bd$3(859, 1690);
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = $( b, c );
  $( d );
  return undefined;
};
a( 112, 1562 );
a( 859, 1690 );
$( undefined );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 112, 1562
 - 2: 112
 - 3: 859, 1690
 - 4: 859
 - 5: undefined
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
