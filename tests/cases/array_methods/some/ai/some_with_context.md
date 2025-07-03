# Preval test case

# some_with_context.md

> Array methods > Some > Ai > Some with context
>
> Test: Array.some with context

## Input

`````js filename=intro
let ctx = {mult: 2};
let result = [];
const x = [1,2,3].some(function(x) { result.push(x * this.mult); }, ctx);
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
const tmpLambdaSomeNow /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
if (tmpLambdaSomeNow) {
  $(result, true);
} else {
  let tmpLambdaSomeOut /*:boolean*/ = false;
  let tmpClusterSSA_tmpLambdaSomeCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaSomeTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaSomeCounter < 3;
    if (tmpLambdaSomeTest$1) {
      const tmpLambdaSomeHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaSomeCounter in tmpMCOO;
      if (tmpLambdaSomeHas$1) {
        const tmpLambdaSomeVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaSomeCounter];
        const tmpLambdaSomeNow$1 /*:unknown*/ = $dotCall(
          tmpMCP,
          ctx,
          undefined,
          tmpLambdaSomeVal$1,
          tmpClusterSSA_tmpLambdaSomeCounter,
          tmpMCOO,
        );
        if (tmpLambdaSomeNow$1) {
          tmpLambdaSomeOut = true;
          break;
        } else {
        }
      } else {
      }
      tmpClusterSSA_tmpLambdaSomeCounter = tmpClusterSSA_tmpLambdaSomeCounter + 1;
    } else {
      break;
    }
  }
  $(result, tmpLambdaSomeOut);
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
  $(result, true);
} else {
  let tmpLambdaSomeOut = false;
  let tmpClusterSSA_tmpLambdaSomeCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaSomeCounter < 3) {
      if (tmpClusterSSA_tmpLambdaSomeCounter in tmpMCOO) {
        if ($dotCall(tmpMCP, ctx, undefined, tmpMCOO[tmpClusterSSA_tmpLambdaSomeCounter], tmpClusterSSA_tmpLambdaSomeCounter, tmpMCOO)) {
          tmpLambdaSomeOut = true;
          break;
        }
      }
      tmpClusterSSA_tmpLambdaSomeCounter = tmpClusterSSA_tmpLambdaSomeCounter + 1;
    } else {
      break;
    }
  }
  $(result, tmpLambdaSomeOut);
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
  $( a, true );
}
else {
  let j = false;
  let k = 1;
  while ($LOOP_UNROLL_10) {
    const l = k < 3;
    if (l) {
      const m = k in h;
      if (m) {
        const n = h[ k ];
        const o = $dotCall( b, g, undefined, n, k, h );
        if (o) {
          j = true;
          break;
        }
      }
      k = k + 1;
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
const tmpMCF = tmpMCOO.some;
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
const x = $dotCall(tmpMCF, tmpMCOO, `some`, tmpMCP, ctx);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) objects in isFree check
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 4, 6], false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
