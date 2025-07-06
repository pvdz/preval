# Preval test case

# math_tan_pi_half.md

> Math > Ai > Math tan pi half
>
> Math.tan at pi/2 and -pi/2 (should be large, not Infinity)

## Input

`````js filename=intro
const a = $(Math.tan(Math.PI / 2));
const b = $(Math.tan(-Math.PI / 2));
$(a);
$(b);
// Should be large positive and large negative numbers
`````


## Settled


`````js filename=intro
const tmpFree$1 /*:()=>number*/ = function $free() {
  debugger;
  const tmpBinLhs$1 /*:number*/ = -$Math_PI;
  const tmpMCP$1 /*:number*/ = tmpBinLhs$1 / 2;
  const tmpRet$3 /*:number*/ = $Math_tan(tmpMCP$1);
  return tmpRet$3;
};
const tmpMCP /*:number*/ = $Math_PI / 2;
const tmpCalleeParam /*:number*/ = $Math_tan(tmpMCP);
const a /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = $frfr(tmpFree$1);
const b /*:unknown*/ = $(tmpCalleeParam$1);
$(a);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free() {
  const tmpRet$3 = $Math_tan(-$Math_PI / 2);
  return tmpRet$3;
};
const a = $($Math_tan($Math_PI / 2));
const b = $(tmpFree$1());
$(a);
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free() {
  debugger;
  const b = -$Math_PI;
  const c = b / 2;
  const d = $Math_tan( c );
  return d;
};
const e = $Math_PI / 2;
const f = $Math_tan( e );
const g = $( f );
const h = i( a );
const j = $( h );
$( g );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_tan;
const tmpBinLhs = $Math_PI;
const tmpMCP = tmpBinLhs / 2;
let tmpCalleeParam = $dotCall(tmpMCF, Math, `tan`, tmpMCP);
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_tan;
const tmpUnaryArg = $Math_PI;
const tmpBinLhs$1 = -tmpUnaryArg;
const tmpMCP$1 = tmpBinLhs$1 / 2;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, Math, `tan`, tmpMCP$1);
const b = $(tmpCalleeParam$1);
$(a);
$(b);
`````


## Todos triggered


- (todo) We should be able to resolve the $frfr call but pcode failed to complete with a Node, hasExplicitGlobal=false
- (todo) free with zero args, we can eliminate this?
- (todo) type trackeed tricks can possibly support static $Math_tan


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 16331239353195370
 - 2: -16331239353195370
 - 3: 16331239353195370
 - 4: -16331239353195370
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
