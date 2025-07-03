# Preval test case

# some_this_primitive.md

> Array methods > Some > Ai > Some this primitive
>
> Test: Array.some with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].some(function(x) { $(this === 42); }, 42);
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
const tmpLambdaSomeNow /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
if (tmpLambdaSomeNow) {
  $(true);
} else {
  let tmpLambdaSomeOut /*:boolean*/ = false;
  let tmpClusterSSA_tmpLambdaSomeCounter /*:number*/ = 1;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  while ($LOOP_UNROLL_10) {
    const tmpLambdaSomeTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaSomeCounter < 3;
    if (tmpLambdaSomeTest$1) {
      const tmpLambdaSomeHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaSomeCounter in tmpMCOO;
      if (tmpLambdaSomeHas$1) {
        const tmpLambdaSomeNow$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
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
  $(tmpLambdaSomeOut);
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
  $(true);
} else {
  let tmpLambdaSomeOut = false;
  let tmpClusterSSA_tmpLambdaSomeCounter = 1;
  const tmpMCOO = [1, 2, 3];
  while (true) {
    if (tmpClusterSSA_tmpLambdaSomeCounter < 3) {
      if (tmpClusterSSA_tmpLambdaSomeCounter in tmpMCOO) {
        if ($dotCall(tmpMCP, 42, undefined)) {
          tmpLambdaSomeOut = true;
          break;
        }
      }
      tmpClusterSSA_tmpLambdaSomeCounter = tmpClusterSSA_tmpLambdaSomeCounter + 1;
    } else {
      break;
    }
  }
  $(tmpLambdaSomeOut);
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
  $( true );
}
else {
  let e = false;
  let f = 1;
  const g = [ 1, 2, 3 ];
  while ($LOOP_UNROLL_10) {
    const h = f < 3;
    if (h) {
      const i = f in g;
      if (i) {
        const j = $dotCall( a, 42, undefined );
        if (j) {
          e = true;
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
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.some;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `some`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
