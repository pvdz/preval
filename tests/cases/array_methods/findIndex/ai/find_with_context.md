# Preval test case

# find_with_context.md

> Array methods > FindIndex > Ai > Find with context
>
> Test: Array.findIndex with context

## Input

`````js filename=intro
let ctx = {mult: 2};
let result = [];
const x = [1,2,3].findIndex(function(x) { result.push(x * this.mult); }, ctx);
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unknown)=>undefined*/ = function ($$0 /*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const x$1 /*:unknown*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:unknown*/ = tmpPrevalAliasThis.mult;
  const tmpMCP$1 /*:number*/ = x$1 * tmpBinBothRhs;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const ctx /*:object*/ /*truthy*/ = { mult: 2 };
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpLambdaFindIndexNow /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
if (tmpLambdaFindIndexNow) {
  $(result, 0);
} else {
  let tmpLambdaFindIndexOut /*:number*/ = -1;
  let tmpClusterSSA_tmpLambdaFindIndexCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaFindIndexTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindIndexCounter < 3;
    if (tmpLambdaFindIndexTest$1) {
      const tmpLambdaFindIndexVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaFindIndexCounter];
      const tmpLambdaFindIndexNow$1 /*:unknown*/ = $dotCall(
        tmpMCP,
        ctx,
        undefined,
        tmpLambdaFindIndexVal$1,
        tmpClusterSSA_tmpLambdaFindIndexCounter,
        tmpMCOO,
      );
      if (tmpLambdaFindIndexNow$1) {
        tmpLambdaFindIndexOut = tmpClusterSSA_tmpLambdaFindIndexCounter;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
      }
    } else {
      break;
    }
  }
  $(result, tmpLambdaFindIndexOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function (x$1) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, x$1 * tmpPrevalAliasThis.mult);
};
const ctx = { mult: 2 };
const tmpMCOO = [1, 2, 3];
if ($dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO)) {
  $(result, 0);
} else {
  let tmpLambdaFindIndexOut = -1;
  let tmpClusterSSA_tmpLambdaFindIndexCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaFindIndexCounter < 3) {
      if (
        $dotCall(tmpMCP, ctx, undefined, tmpMCOO[tmpClusterSSA_tmpLambdaFindIndexCounter], tmpClusterSSA_tmpLambdaFindIndexCounter, tmpMCOO)
      ) {
        tmpLambdaFindIndexOut = tmpClusterSSA_tmpLambdaFindIndexCounter;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
      }
    } else {
      break;
    }
  }
  $(result, tmpLambdaFindIndexOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function($$0 ) {
  const c = this;
  const d = $$0;
  debugger;
  const e = c.mult;
  const f = d * e;
  $dotCall( $array_push, a, "push", f );
  return undefined;
};
const g = { mult: 2 };
const h = [ 1, 2, 3 ];
const i = $dotCall( b, g, undefined, 1, 0, h );
if (i) {
  $( a, 0 );
}
else {
  let j = -1;
  let k = 1;
  while ($LOOP_UNROLL_10) {
    const l = k < 3;
    if (l) {
      const m = h[ k ];
      const n = $dotCall( b, g, undefined, m, k, h );
      if (n) {
        j = k;
        break;
      }
      else {
        k = k + 1;
      }
    }
    else {
      break;
    }
  }
  $( a, j );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let ctx = { mult: 2 };
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.findIndex;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpBinBothLhs = x$1;
  const tmpBinBothRhs = tmpPrevalAliasThis.mult;
  const tmpMCP$1 = tmpBinBothLhs * tmpBinBothRhs;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `findIndex`, tmpMCP, ctx);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) objects in isFree check
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 4, 6], -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
