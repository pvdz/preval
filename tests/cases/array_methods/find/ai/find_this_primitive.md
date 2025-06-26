# Preval test case

# find_this_primitive.md

> Array methods > Find > Ai > Find this primitive
>
> Test: Array.find with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].find(function(x) { $(this === 42); }, 42);
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
const tmpLambdaFindNow /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
if (tmpLambdaFindNow) {
  $(1);
} else {
  let tmpLambdaFindOut /*:primitive*/ = undefined;
  let tmpClusterSSA_tmpLambdaFindCounter /*:number*/ = 1;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  while ($LOOP_UNROLL_10) {
    const tmpLambdaFindTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindCounter < 3;
    if (tmpLambdaFindTest$1) {
      const tmpLambdaFindVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaFindCounter];
      const tmpLambdaFindNow$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
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
  $(tmpLambdaFindOut);
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
  $(1);
} else {
  let tmpLambdaFindOut = undefined;
  let tmpClusterSSA_tmpLambdaFindCounter = 1;
  const tmpMCOO = [1, 2, 3];
  while (true) {
    if (tmpClusterSSA_tmpLambdaFindCounter < 3) {
      const tmpLambdaFindVal$1 = tmpMCOO[tmpClusterSSA_tmpLambdaFindCounter];
      if ($dotCall(tmpMCP, 42, undefined)) {
        tmpLambdaFindOut = tmpLambdaFindVal$1;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
      }
    } else {
      break;
    }
  }
  $(tmpLambdaFindOut);
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
  $( 1 );
}
else {
  let e = undefined;
  let f = 1;
  const g = [ 1, 2, 3 ];
  while ($LOOP_UNROLL_10) {
    const h = f < 3;
    if (h) {
      const i = g[ f ];
      const j = $dotCall( a, 42, undefined );
      if (j) {
        e = i;
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
const tmpMCF = tmpMCOO.find;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `find`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_find


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
