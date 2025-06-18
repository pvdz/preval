# Preval test case

# find_this_primitive.md

> Array methods > Findlast > Ai > Find this primitive
>
> Test: Array.findLast with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].findLast(function(x) { $(this === 42); }, 42);
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
const tmpLambdaFindLastNow /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
if (tmpLambdaFindLastNow) {
  $(3);
} else {
  let tmpLambdaFindLastOut /*:unknown*/ = undefined;
  let tmpClusterSSA_tmpLambdaFindLastCounter /*:number*/ = 1;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  while ($LOOP_UNROLL_10) {
    const tmpLambdaFindLastTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindLastCounter >= 0;
    if (tmpLambdaFindLastTest$1) {
      const tmpLambdaFindLastVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaFindLastCounter];
      const tmpLambdaFindLastNow$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
      if (tmpLambdaFindLastNow$1) {
        tmpLambdaFindLastOut = tmpLambdaFindLastVal$1;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindLastCounter = tmpClusterSSA_tmpLambdaFindLastCounter - 1;
      }
    } else {
      break;
    }
  }
  $(tmpLambdaFindLastOut);
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
  $(3);
} else {
  let tmpLambdaFindLastOut = undefined;
  let tmpClusterSSA_tmpLambdaFindLastCounter = 1;
  const tmpMCOO = [1, 2, 3];
  while (true) {
    if (tmpClusterSSA_tmpLambdaFindLastCounter >= 0) {
      const tmpLambdaFindLastVal$1 = tmpMCOO[tmpClusterSSA_tmpLambdaFindLastCounter];
      if ($dotCall(tmpMCP, 42, undefined)) {
        tmpLambdaFindLastOut = tmpLambdaFindLastVal$1;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindLastCounter = tmpClusterSSA_tmpLambdaFindLastCounter - 1;
      }
    } else {
      break;
    }
  }
  $(tmpLambdaFindLastOut);
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
  $( 3 );
}
else {
  let e = undefined;
  let f = 1;
  const g = [ 1, 2, 3 ];
  while ($LOOP_UNROLL_10) {
    const h = f >= 0;
    if (h) {
      const i = g[ f ];
      const j = $dotCall( a, 42, undefined );
      if (j) {
        e = i;
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
const tmpMCF = tmpMCOO.findLast;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `findLast`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_findLast


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
