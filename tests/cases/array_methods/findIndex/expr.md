# Preval test case

# expr.md

> Array methods > FindIndex > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  arr.findIndex($);
}
f();
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaFindIndexNow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  if (tmpLambdaFindIndexNow) {
    return undefined;
  } else {
    let tmpClusterSSA_tmpLambdaFindIndexCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaFindIndexTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindIndexCounter < 3;
      if (tmpLambdaFindIndexTest$1) {
        const tmpLambdaFindIndexVal$1 /*:primitive*/ = arr[tmpClusterSSA_tmpLambdaFindIndexCounter];
        const tmpLambdaFindIndexNow$1 /*:unknown*/ = $dotCall(
          $,
          undefined,
          undefined,
          tmpLambdaFindIndexVal$1,
          tmpClusterSSA_tmpLambdaFindIndexCounter,
          arr,
        );
        if (tmpLambdaFindIndexNow$1) {
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
        }
      } else {
        break;
      }
    }
    return undefined;
  }
};
f();
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const arr = [1, 2, 3];
  const tmpLambdaFindIndexNow = $dotCall($, undefined, undefined, 1, 0, arr);
  if (!tmpLambdaFindIndexNow) {
    let tmpClusterSSA_tmpLambdaFindIndexCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindIndexCounter < 3) {
        if ($dotCall($, undefined, undefined, arr[tmpClusterSSA_tmpLambdaFindIndexCounter], tmpClusterSSA_tmpLambdaFindIndexCounter, arr)) {
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
        }
      } else {
        break;
      }
    }
  }
};
f();
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  const c = $dotCall( $, undefined, undefined, 1, 0, b );
  if (c) {
    return undefined;
  }
  else {
    let d = 1;
    while ($LOOP_UNROLL_10) {
      const e = d < 3;
      if (e) {
        const f = b[ d ];
        const g = $dotCall( $, undefined, undefined, f, d, b );
        if (g) {
          break;
        }
        else {
          d = d + 1;
        }
      }
      else {
        break;
      }
    }
    return undefined;
  }
};
a();
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const arr = [1, 2, 3];
  const tmpMCF = arr.findIndex;
  $dotCall(tmpMCF, arr, `findIndex`, $);
  return undefined;
};
f();
$(f);
`````


## Todos triggered


- (todo) Support this node type in isFree: DebuggerStatement
- (todo) array reads var statement with init CallExpression
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
