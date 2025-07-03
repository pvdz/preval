# Preval test case

# find_with_context.md

> Array methods > Find > Ai > Find with context
>
> Test: Array.find with context

## Input

`````js filename=intro
let ctx = {mult: 2};
let result = [];
const x = [1,2,3].find(function(x) { result.push(x * this.mult); }, ctx);
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
const tmpLambdaFindNow /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
if (tmpLambdaFindNow) {
  $(result, 1);
} else {
  let tmpLambdaFindOut /*:primitive*/ = undefined;
  let tmpClusterSSA_tmpLambdaFindCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaFindTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindCounter < 3;
    if (tmpLambdaFindTest$1) {
      const tmpLambdaFindVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaFindCounter];
      const tmpLambdaFindNow$1 /*:unknown*/ = $dotCall(
        tmpMCP,
        ctx,
        undefined,
        tmpLambdaFindVal$1,
        tmpClusterSSA_tmpLambdaFindCounter,
        tmpMCOO,
      );
      if (tmpLambdaFindNow$1) {
        tmpLambdaFindOut = tmpLambdaFindVal$1;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
      }
    } else {
      break;
    }
  }
  $(result, tmpLambdaFindOut);
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
  $(result, 1);
} else {
  let tmpLambdaFindOut = undefined;
  let tmpClusterSSA_tmpLambdaFindCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaFindCounter < 3) {
      const tmpLambdaFindVal$1 = tmpMCOO[tmpClusterSSA_tmpLambdaFindCounter];
      if ($dotCall(tmpMCP, ctx, undefined, tmpLambdaFindVal$1, tmpClusterSSA_tmpLambdaFindCounter, tmpMCOO)) {
        tmpLambdaFindOut = tmpLambdaFindVal$1;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
      }
    } else {
      break;
    }
  }
  $(result, tmpLambdaFindOut);
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
  $( a, 1 );
}
else {
  let j = undefined;
  let k = 1;
  while ($LOOP_UNROLL_10) {
    const l = k < 3;
    if (l) {
      const m = h[ k ];
      const n = $dotCall( b, g, undefined, m, k, h );
      if (n) {
        j = m;
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
const tmpMCF = tmpMCOO.find;
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
const x = $dotCall(tmpMCF, tmpMCOO, `find`, tmpMCP, ctx);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) objects in isFree check
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_find


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 4, 6], undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
