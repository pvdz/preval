# Preval test case

# find_without_context.md

> Array methods > Find > Ai > Find without context
>
> Test: Array.find without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].find(function(x) { result.push(this === undefined); });
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
const tmpLambdaFindNow /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
if (tmpLambdaFindNow) {
  $(result, 1);
} else {
  let tmpLambdaFindOut /*:unknown*/ = undefined;
  let tmpClusterSSA_tmpLambdaFindCounter /*:number*/ = 1;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  while ($LOOP_UNROLL_10) {
    const tmpLambdaFindTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindCounter < 3;
    if (tmpLambdaFindTest$1) {
      const tmpLambdaFindVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaFindCounter];
      const tmpLambdaFindNow$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
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
  $(result, tmpLambdaFindOut);
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
  $(result, 1);
} else {
  let tmpLambdaFindOut = undefined;
  let tmpClusterSSA_tmpLambdaFindCounter = 1;
  const tmpMCOO = [1, 2, 3];
  while (true) {
    if (tmpClusterSSA_tmpLambdaFindCounter < 3) {
      const tmpLambdaFindVal$1 = tmpMCOO[tmpClusterSSA_tmpLambdaFindCounter];
      if ($dotCall(tmpMCP, undefined, undefined)) {
        tmpLambdaFindOut = tmpLambdaFindVal$1;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
      }
    } else {
      break;
    }
  }
  $(result, tmpLambdaFindOut);
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
  $( a, 1 );
}
else {
  let f = undefined;
  let g = 1;
  const h = [ 1, 2, 3 ];
  while ($LOOP_UNROLL_10) {
    const i = g < 3;
    if (i) {
      const j = h[ g ];
      const k = $dotCall( b, undefined, undefined );
      if (k) {
        f = j;
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
const tmpMCF = tmpMCOO.find;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `find`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_find


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [true, true, true], undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
