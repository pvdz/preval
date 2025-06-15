# Preval test case

# expr.md

> Array methods > Findlastindex > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  arr.findLastIndex($);
}
f();
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaFindLastIndexNow /*:unknown*/ = $dotCall($, undefined, undefined, 3, 2, arr);
  if (tmpLambdaFindLastIndexNow) {
    return undefined;
  } else {
    let tmpClusterSSA_tmpLambdaFindLastIndexCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaFindLastIndexTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindLastIndexCounter >= 0;
      if (tmpLambdaFindLastIndexTest$1) {
        const tmpLambdaFindLastIndexVal$1 /*:primitive*/ = arr[tmpClusterSSA_tmpLambdaFindLastIndexCounter];
        const tmpLambdaFindLastIndexNow$1 /*:unknown*/ = $dotCall(
          $,
          undefined,
          undefined,
          tmpLambdaFindLastIndexVal$1,
          tmpClusterSSA_tmpLambdaFindLastIndexCounter,
          arr,
        );
        if (tmpLambdaFindLastIndexNow$1) {
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastIndexCounter = tmpClusterSSA_tmpLambdaFindLastIndexCounter - 1;
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
  const tmpLambdaFindLastIndexNow = $dotCall($, undefined, undefined, 3, 2, arr);
  if (!tmpLambdaFindLastIndexNow) {
    let tmpClusterSSA_tmpLambdaFindLastIndexCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindLastIndexCounter >= 0) {
        if (
          $dotCall(
            $,
            undefined,
            undefined,
            arr[tmpClusterSSA_tmpLambdaFindLastIndexCounter],
            tmpClusterSSA_tmpLambdaFindLastIndexCounter,
            arr,
          )
        ) {
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastIndexCounter = tmpClusterSSA_tmpLambdaFindLastIndexCounter - 1;
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
  const c = $dotCall( $, undefined, undefined, 3, 2, b );
  if (c) {
    return undefined;
  }
  else {
    let d = 1;
    while ($LOOP_UNROLL_10) {
      const e = d >= 0;
      if (e) {
        const f = b[ d ];
        const g = $dotCall( $, undefined, undefined, f, d, b );
        if (g) {
          break;
        }
        else {
          d = d - 1;
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
  const tmpMCF = arr.findLastIndex;
  $dotCall(tmpMCF, arr, `findLastIndex`, $);
  return undefined;
};
f();
$(f);
`````


## Todos triggered


- (todo) Support this node type in isFree: DebuggerStatement
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_findLastIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, 2, [1, 2, 3]
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
