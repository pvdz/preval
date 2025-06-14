# Preval test case

# some_with_context.md

> Array methods > Every > Ai > Some with context
>
> Test: Array.every with context

## Input

`````js filename=intro
let ctx = {mult: 2};
let result = [];
const x = [1,2,3].every(function(x) { result.push(x * this.mult); }, ctx);
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unknown)=>undefined*/ = function ($$0) {
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
const tmpArrenow /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
if (tmpArrenow) {
  let tmpArreout /*:boolean*/ = true;
  let tmpClusterSSA_tmpArri /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 3;
    if (tmpArrc$1) {
      const tmpArrin$1 /*:boolean*/ = tmpClusterSSA_tmpArri in tmpMCOO;
      if (tmpArrin$1) {
        const tmpArrel$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpArri];
        const tmpArrenow$1 /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, tmpMCOO);
        if (tmpArrenow$1) {
        } else {
          tmpArreout = false;
          break;
        }
      } else {
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
    } else {
      break;
    }
  }
  $(result, tmpArreout);
} else {
  $(result, false);
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
  let tmpArreout = true;
  let tmpClusterSSA_tmpArri = 1;
  while (true) {
    if (tmpClusterSSA_tmpArri < 3) {
      if (tmpClusterSSA_tmpArri in tmpMCOO) {
        if (!$dotCall(tmpMCP, ctx, undefined, tmpMCOO[tmpClusterSSA_tmpArri], tmpClusterSSA_tmpArri, tmpMCOO)) {
          tmpArreout = false;
          break;
        }
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
    } else {
      break;
    }
  }
  $(result, tmpArreout);
} else {
  $(result, false);
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
  let j = true;
  let k = 1;
  while ($LOOP_UNROLL_10) {
    const l = k < 3;
    if (l) {
      const m = k in h;
      if (m) {
        const n = h[ k ];
        const o = $dotCall( b, g, undefined, n, k, h );
        if (o) {

        }
        else {
          j = false;
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
else {
  $( a, false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let ctx = { mult: 2 };
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.every;
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
const x = $dotCall(tmpMCF, tmpMCOO, `every`, tmpMCP, ctx);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) objects in isFree check
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2], false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
