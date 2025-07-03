# Preval test case

# math_with_function_returning_math.md

> Math > Ai > Math with function returning math
>
> Function returning Math result, used in another Math call

## Input

`````js filename=intro
function f(x) { return Math.sin(x); }
const a = $(Math.abs(f(-Math.PI / 2)));
$(a);
// Should be 1
`````


## Settled


`````js filename=intro
const tmpFree /*:()=>number*/ = function $free() {
  debugger;
  const tmpBinLhs /*:number*/ = -$Math_PI;
  const tmpCalleeParam$1 /*:number*/ = tmpBinLhs / 2;
  const tmpMCP /*:number*/ = $Math_sin(tmpCalleeParam$1);
  const tmpRet$1 /*:number*/ = $Math_abs(tmpMCP);
  return tmpRet$1;
};
const tmpCalleeParam /*:number*/ = $frfr(tmpFree);
const a /*:unknown*/ = $(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(
  $(
    (function $free() {
      const tmpRet$1 = $Math_abs($Math_sin(-$Math_PI / 2));
      return tmpRet$1;
    })(),
  ),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = -$Math_PI;
  const d = c / 2;
  const e = $Math_sin( d );
  const f = $Math_abs( e );
  return f;
};
const g = h( a );
const i = $( g );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const tmpMCF = $Math_sin;
  const tmpReturnArg = $Math_sin(x);
  return tmpReturnArg;
};
const tmpMCF$1 = $Math_abs;
const tmpCallCallee = f;
const tmpUnaryArg = $Math_PI;
const tmpBinLhs = -tmpUnaryArg;
let tmpCalleeParam$1 = tmpBinLhs / 2;
const tmpMCP = f(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF$1, Math, `abs`, tmpMCP);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) We should be able to resolve the $frfr call but pcode failed to complete with a Node, hasExplicitGlobal=false
- (todo) free with zero args, we can eliminate this?
- (todo) type trackeed tricks can possibly support static $Math_abs
- (todo) type trackeed tricks can possibly support static $Math_sin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
