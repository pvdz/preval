# Preval test case

# find_this_primitive.md

> Array methods > FindIndex > Ai > Find this primitive
>
> Test: Array.findIndex with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].findIndex(function(x) { $(this === 42); }, 42);
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const tmpLambdaFindIndexNow /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
if (tmpLambdaFindIndexNow) {
  $(0);
} else {
  let tmpLambdaFindIndexOut /*:number*/ = -1;
  let tmpClusterSSA_tmpLambdaFindIndexCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaFindIndexTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindIndexCounter < 3;
    if (tmpLambdaFindIndexTest$1) {
      const tmpLambdaFindIndexNow$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
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
  $(tmpLambdaFindIndexOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis === 42);
};
if ($dotCall(tmpMCP, 42, undefined)) {
  $(0);
} else {
  let tmpLambdaFindIndexOut = -1;
  let tmpClusterSSA_tmpLambdaFindIndexCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaFindIndexCounter < 3) {
      if ($dotCall(tmpMCP, 42, undefined)) {
        tmpLambdaFindIndexOut = tmpClusterSSA_tmpLambdaFindIndexCounter;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
      }
    } else {
      break;
    }
  }
  $(tmpLambdaFindIndexOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b === 42;
  $( c );
  return undefined;
};
const d = $dotCall( a, 42, undefined );
if (d) {
  $( 0 );
}
else {
  let e = -1;
  let f = 1;
  while ($LOOP_UNROLL_10) {
    const g = f < 3;
    if (g) {
      const h = $dotCall( a, 42, undefined );
      if (h) {
        e = f;
        break;
      }
      else {
        f = f + 1;
      }
    }
    else {
      break;
    }
  }
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.findIndex;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `findIndex`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) do we want to support ArrayExpression as expression statement in free loops?
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
