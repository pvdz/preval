# Preval test case

# some_without_context.md

> Array methods > Some > Ai > Some without context
>
> Test: Array.some without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].some(function(x) { result.push(this === undefined); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpLambdaSomeNow /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, 1, 0, tmpMCOO);
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
          undefined,
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
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, tmpPrevalAliasThis === undefined);
};
const tmpMCOO = [1, 2, 3];
if ($dotCall(tmpMCP, undefined, undefined, 1, 0, tmpMCOO)) {
  $(result, true);
} else {
  let tmpLambdaSomeOut = false;
  let tmpClusterSSA_tmpLambdaSomeCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaSomeCounter < 3) {
      if (tmpClusterSSA_tmpLambdaSomeCounter in tmpMCOO) {
        if (
          $dotCall(tmpMCP, undefined, undefined, tmpMCOO[tmpClusterSSA_tmpLambdaSomeCounter], tmpClusterSSA_tmpLambdaSomeCounter, tmpMCOO)
        ) {
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
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
const e = [ 1, 2, 3 ];
const f = $dotCall( b, undefined, undefined, 1, 0, e );
if (f) {
  $( a, true );
}
else {
  let g = false;
  let h = 1;
  while ($LOOP_UNROLL_10) {
    const i = h < 3;
    if (i) {
      const j = h in e;
      if (j) {
        const k = e[ h ];
        const l = $dotCall( b, undefined, undefined, k, h, e );
        if (l) {
          g = true;
          break;
        }
      }
      h = h + 1;
    }
    else {
      break;
    }
  }
  $( a, g );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.some;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `some`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [true, true, true], false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
