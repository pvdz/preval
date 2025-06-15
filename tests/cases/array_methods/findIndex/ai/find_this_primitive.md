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
const tmpMCP /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpLambdaFindIndexNow /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, 1, 0, tmpMCOO);
if (tmpLambdaFindIndexNow) {
  $(0);
} else {
  let tmpLambdaFindIndexOut /*:unknown*/ = -1;
  let tmpClusterSSA_tmpLambdaFindIndexCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaFindIndexTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindIndexCounter < 3;
    if (tmpLambdaFindIndexTest$1) {
      const tmpLambdaFindIndexVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaFindIndexCounter];
      const tmpLambdaFindIndexNow$1 /*:unknown*/ = $dotCall(
        tmpMCP,
        42,
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
  $(tmpLambdaFindIndexOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis === 42);
};
const tmpMCOO = [1, 2, 3];
if ($dotCall(tmpMCP, 42, undefined, 1, 0, tmpMCOO)) {
  $(0);
} else {
  let tmpLambdaFindIndexOut = -1;
  let tmpClusterSSA_tmpLambdaFindIndexCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaFindIndexCounter < 3) {
      if (
        $dotCall(tmpMCP, 42, undefined, tmpMCOO[tmpClusterSSA_tmpLambdaFindIndexCounter], tmpClusterSSA_tmpLambdaFindIndexCounter, tmpMCOO)
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
  $(tmpLambdaFindIndexOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  debugger;
  const c = b === 42;
  $( c );
  return undefined;
};
const d = [ 1, 2, 3 ];
const e = $dotCall( a, 42, undefined, 1, 0, d );
if (e) {
  $( 0 );
}
else {
  let f = -1;
  let g = 1;
  while ($LOOP_UNROLL_10) {
    const h = g < 3;
    if (h) {
      const i = d[ g ];
      const j = $dotCall( a, 42, undefined, i, g, d );
      if (j) {
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
  $( f );
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


- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
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
