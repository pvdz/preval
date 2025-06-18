# Preval test case

# every_without_context.md

> Array methods > Every > Ai > Every without context
>
> Test: Array.every without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].every(function(x) { result.push(this === undefined); });
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
const tmpLambdaEveryWas /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
if (tmpLambdaEveryWas) {
  let tmpLambdaEveryOut /*:boolean*/ = true;
  let tmpClusterSSA_tmpLambdaEveryCounter /*:number*/ = 1;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  while ($LOOP_UNROLL_10) {
    const tmpLambdaEveryTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaEveryCounter < 3;
    if (tmpLambdaEveryTest$1) {
      const tmpLambdaEveryHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaEveryCounter in tmpMCOO;
      if (tmpLambdaEveryHas$1) {
        const tmpLambdaEveryWas$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
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
  $(result, tmpLambdaEveryOut);
} else {
  $(result, false);
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
  let tmpLambdaEveryOut = true;
  let tmpClusterSSA_tmpLambdaEveryCounter = 1;
  const tmpMCOO = [1, 2, 3];
  while (true) {
    if (tmpClusterSSA_tmpLambdaEveryCounter < 3) {
      if (tmpClusterSSA_tmpLambdaEveryCounter in tmpMCOO) {
        if (!$dotCall(tmpMCP, undefined, undefined)) {
          tmpLambdaEveryOut = false;
          break;
        }
      }
      tmpClusterSSA_tmpLambdaEveryCounter = tmpClusterSSA_tmpLambdaEveryCounter + 1;
    } else {
      break;
    }
  }
  $(result, tmpLambdaEveryOut);
} else {
  $(result, false);
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
  let f = true;
  let g = 1;
  const h = [ 1, 2, 3 ];
  while ($LOOP_UNROLL_10) {
    const i = g < 3;
    if (i) {
      const j = g in h;
      if (j) {
        const k = $dotCall( b, undefined, undefined );
        if (k) {

        }
        else {
          f = false;
          break;
        }
      }
      g = g + 1;
    }
    else {
      break;
    }
  }
  $( a, f );
}
else {
  $( a, false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.every;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `every`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [true], false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
