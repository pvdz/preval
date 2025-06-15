# Preval test case

# expr.md

> Array methods > Some > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  arr.some($);
}
f();
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaSomeNow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  if (tmpLambdaSomeNow) {
    return undefined;
  } else {
    let tmpClusterSSA_tmpLambdaSomeCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaSomeTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaSomeCounter < 3;
      if (tmpLambdaSomeTest$1) {
        const tmpLambdaSomeHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaSomeCounter in arr;
        if (tmpLambdaSomeHas$1) {
          const tmpLambdaSomeVal$1 /*:primitive*/ = arr[tmpClusterSSA_tmpLambdaSomeCounter];
          const tmpLambdaSomeNow$1 /*:unknown*/ = $dotCall(
            $,
            undefined,
            undefined,
            tmpLambdaSomeVal$1,
            tmpClusterSSA_tmpLambdaSomeCounter,
            arr,
          );
          if (tmpLambdaSomeNow$1) {
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
  const tmpLambdaSomeNow = $dotCall($, undefined, undefined, 1, 0, arr);
  if (!tmpLambdaSomeNow) {
    let tmpClusterSSA_tmpLambdaSomeCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaSomeCounter < 3) {
        if (tmpClusterSSA_tmpLambdaSomeCounter in arr) {
          if ($dotCall($, undefined, undefined, arr[tmpClusterSSA_tmpLambdaSomeCounter], tmpClusterSSA_tmpLambdaSomeCounter, arr)) {
            break;
          }
        }
        tmpClusterSSA_tmpLambdaSomeCounter = tmpClusterSSA_tmpLambdaSomeCounter + 1;
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
        const f = d in b;
        if (f) {
          const g = b[ d ];
          const h = $dotCall( $, undefined, undefined, g, d, b );
          if (h) {
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
  const tmpMCF = arr.some;
  $dotCall(tmpMCF, arr, `some`, $);
  return undefined;
};
f();
$(f);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_some


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
