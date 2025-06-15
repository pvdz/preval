# Preval test case

# expr.md

> Array methods > Find > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  arr.find($);
}
f();
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaFindNow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  if (tmpLambdaFindNow) {
    return undefined;
  } else {
    let tmpClusterSSA_tmpLambdaFindCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaFindTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindCounter < 3;
      if (tmpLambdaFindTest$1) {
        const tmpLambdaFindVal$1 /*:primitive*/ = arr[tmpClusterSSA_tmpLambdaFindCounter];
        const tmpLambdaFindNow$1 /*:unknown*/ = $dotCall(
          $,
          undefined,
          undefined,
          tmpLambdaFindVal$1,
          tmpClusterSSA_tmpLambdaFindCounter,
          arr,
        );
        if (tmpLambdaFindNow$1) {
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
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
  const tmpLambdaFindNow = $dotCall($, undefined, undefined, 1, 0, arr);
  if (!tmpLambdaFindNow) {
    let tmpClusterSSA_tmpLambdaFindCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindCounter < 3) {
        if ($dotCall($, undefined, undefined, arr[tmpClusterSSA_tmpLambdaFindCounter], tmpClusterSSA_tmpLambdaFindCounter, arr)) {
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
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
  const tmpMCF = arr.find;
  $dotCall(tmpMCF, arr, `find`, $);
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
- (todo) type trackeed tricks can possibly support static $array_find


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
