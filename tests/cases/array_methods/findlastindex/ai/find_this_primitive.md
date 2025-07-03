# Preval test case

# find_this_primitive.md

> Array methods > Findlastindex > Ai > Find this primitive
>
> Test: Array.findLastIndex with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].findLastIndex(function(x) { $(this === 42); }, 42);
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
const tmpLambdaFindLastIndexNow /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
if (tmpLambdaFindLastIndexNow) {
  $(2);
} else {
  let tmpLambdaFindLastIndexOut /*:number*/ = -1;
  let tmpClusterSSA_tmpLambdaFindLastIndexCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaFindLastIndexTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindLastIndexCounter >= 0;
    if (tmpLambdaFindLastIndexTest$1) {
      const tmpLambdaFindLastIndexNow$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
      if (tmpLambdaFindLastIndexNow$1) {
        tmpLambdaFindLastIndexOut = tmpClusterSSA_tmpLambdaFindLastIndexCounter;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindLastIndexCounter = tmpClusterSSA_tmpLambdaFindLastIndexCounter - 1;
      }
    } else {
      break;
    }
  }
  $(tmpLambdaFindLastIndexOut);
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
  $(2);
} else {
  let tmpLambdaFindLastIndexOut = -1;
  let tmpClusterSSA_tmpLambdaFindLastIndexCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaFindLastIndexCounter >= 0) {
      if ($dotCall(tmpMCP, 42, undefined)) {
        tmpLambdaFindLastIndexOut = tmpClusterSSA_tmpLambdaFindLastIndexCounter;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindLastIndexCounter = tmpClusterSSA_tmpLambdaFindLastIndexCounter - 1;
      }
    } else {
      break;
    }
  }
  $(tmpLambdaFindLastIndexOut);
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
  $( 2 );
}
else {
  let e = -1;
  let f = 1;
  while ($LOOP_UNROLL_10) {
    const g = f >= 0;
    if (g) {
      const h = $dotCall( a, 42, undefined );
      if (h) {
        e = f;
        break;
      }
      else {
        f = f - 1;
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
const tmpMCF = tmpMCOO.findLastIndex;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `findLastIndex`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) do we want to support ArrayExpression as expression statement in free loops?
- (todo) type trackeed tricks can possibly support static $array_findLastIndex


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
