# Preval test case

# expr.md

> Array methods > Every > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  arr.every($);
}
f();
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaEveryWas /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  if (tmpLambdaEveryWas) {
    let tmpClusterSSA_tmpLambdaEveryCounter /*:number*/ = 1;
    while ($LOOP_UNROLLS_LEFT_10) {
      const tmpLambdaEveryTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaEveryCounter < 3;
      if (tmpLambdaEveryTest$1) {
        const tmpLambdaEveryHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaEveryCounter in arr;
        if (tmpLambdaEveryHas$1) {
          const tmpLambdaEveryVal$1 /*:primitive*/ = arr[tmpClusterSSA_tmpLambdaEveryCounter];
          const tmpLambdaEveryWas$1 /*:unknown*/ = $dotCall(
            $,
            undefined,
            undefined,
            tmpLambdaEveryVal$1,
            tmpClusterSSA_tmpLambdaEveryCounter,
            arr,
          );
          if (tmpLambdaEveryWas$1) {
          } else {
            break;
          }
        } else {
        }
        tmpClusterSSA_tmpLambdaEveryCounter = tmpClusterSSA_tmpLambdaEveryCounter + 1;
      } else {
        break;
      }
    }
    return undefined;
  } else {
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
  if ($dotCall($, undefined, undefined, 1, 0, arr)) {
    let tmpClusterSSA_tmpLambdaEveryCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaEveryCounter < 3) {
        if (tmpClusterSSA_tmpLambdaEveryCounter in arr) {
          if (!$dotCall($, undefined, undefined, arr[tmpClusterSSA_tmpLambdaEveryCounter], tmpClusterSSA_tmpLambdaEveryCounter, arr)) {
            break;
          }
        }
        tmpClusterSSA_tmpLambdaEveryCounter = tmpClusterSSA_tmpLambdaEveryCounter + 1;
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
    let d = 1;
    while ($LOOP_UNROLLS_LEFT_10) {
      const e = d < 3;
      if (e) {
        const f = d in b;
        if (f) {
          const g = b[ d ];
          const h = $dotCall( $, undefined, undefined, g, d, b );
          if (h) {

          }
          else {
            break;
          }
        }
        d = d + 1;
      }
      else {
        break;
      }
    }
    return undefined;
  }
  else {
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
  const tmpMCF = arr.every;
  $dotCall(tmpMCF, arr, `every`, $);
  return undefined;
};
f();
$(f);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 2, 1, [1, 2, 3]
 - 3: 3, 2, [1, 2, 3]
 - 4: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
