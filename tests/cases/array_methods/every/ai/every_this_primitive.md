# Preval test case

# every_this_primitive.md

> Array methods > Every > Ai > Every this primitive
>
> Test: Array.every with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].every(function(x) { $(this === 42); }, 42);
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
const tmpLambdaEveryWas /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
if (tmpLambdaEveryWas) {
  let tmpLambdaEveryOut /*:boolean*/ = true;
  let tmpClusterSSA_tmpLambdaEveryCounter /*:number*/ = 1;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  while ($LOOP_UNROLL_10) {
    const tmpLambdaEveryTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaEveryCounter < 3;
    if (tmpLambdaEveryTest$1) {
      const tmpLambdaEveryHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaEveryCounter in tmpMCOO;
      if (tmpLambdaEveryHas$1) {
        const tmpLambdaEveryWas$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
        if (tmpLambdaEveryWas$1) {
        } else {
          tmpLambdaEveryOut = false;
          break;
        }
      } else {
      }
      tmpClusterSSA_tmpLambdaEveryCounter = tmpClusterSSA_tmpLambdaEveryCounter + 1;
    } else {
      break;
    }
  }
  $(tmpLambdaEveryOut);
} else {
  $(false);
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
  let tmpLambdaEveryOut = true;
  let tmpClusterSSA_tmpLambdaEveryCounter = 1;
  const tmpMCOO = [1, 2, 3];
  while (true) {
    if (tmpClusterSSA_tmpLambdaEveryCounter < 3) {
      if (tmpClusterSSA_tmpLambdaEveryCounter in tmpMCOO) {
        if (!$dotCall(tmpMCP, 42, undefined)) {
          tmpLambdaEveryOut = false;
          break;
        }
      }
      tmpClusterSSA_tmpLambdaEveryCounter = tmpClusterSSA_tmpLambdaEveryCounter + 1;
    } else {
      break;
    }
  }
  $(tmpLambdaEveryOut);
} else {
  $(false);
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
  let e = true;
  let f = 1;
  const g = [ 1, 2, 3 ];
  while ($LOOP_UNROLL_10) {
    const h = f < 3;
    if (h) {
      const i = f in g;
      if (i) {
        const j = $dotCall( a, 42, undefined );
        if (j) {

        }
        else {
          e = false;
          break;
        }
      }
      f = f + 1;
    }
    else {
      break;
    }
  }
  $( e );
}
else {
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.every;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `every`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
