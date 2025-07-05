# Preval test case

# find_without_context.md

> Array methods > FindIndex > Ai > Find without context
>
> Test: Array.findIndex without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].findIndex(function(x) { result.push(this === undefined); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpLambdaFindIndexNow /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
if (tmpLambdaFindIndexNow) {
  $(result, 0);
} else {
  let tmpLambdaFindIndexOut /*:number*/ = -1;
  let tmpClusterSSA_tmpLambdaFindIndexCounter /*:number*/ = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpLambdaFindIndexTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindIndexCounter < 3;
    if (tmpLambdaFindIndexTest$1) {
      const tmpLambdaFindIndexNow$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
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
const tmpMCP = function () {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, tmpPrevalAliasThis === undefined);
};
if ($dotCall(tmpMCP, undefined, undefined)) {
  $(result, 0);
} else {
  let tmpLambdaFindIndexOut = -1;
  let tmpClusterSSA_tmpLambdaFindIndexCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaFindIndexCounter < 3) {
      if ($dotCall(tmpMCP, undefined, undefined)) {
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
const b = function() {
  const c = this;
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
const e = $dotCall( b, undefined, undefined );
if (e) {
  $( a, 0 );
}
else {
  let f = -1;
  let g = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const h = g < 3;
    if (h) {
      const i = $dotCall( b, undefined, undefined );
      if (i) {
        f = g;
        break;
      }
      else {
        g = g + 1;
      }
    }
    else {
      break;
    }
  }
  $( a, f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.findIndex;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `findIndex`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init CallExpression
- (todo) do we want to support ArrayExpression as expression statement in free loops?
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [true, true, true], -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
