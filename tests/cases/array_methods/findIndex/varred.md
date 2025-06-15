# Preval test case

# varred.md

> Array methods > FindIndex > Varred
>
> Make sure var init does not break

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  const x = arr.findIndex($);
  $(x);
}
f();
$(f);
$(x);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaFindIndexNow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  if (tmpLambdaFindIndexNow) {
    $(0);
    return undefined;
  } else {
    let tmpLambdaFindIndexOut /*:unknown*/ = -1;
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
          tmpLambdaFindIndexOut = tmpClusterSSA_tmpLambdaFindIndexCounter;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindIndexOut);
    return undefined;
  }
};
f();
$(f);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const arr = [1, 2, 3];
  if ($dotCall($, undefined, undefined, 1, 0, arr)) {
    $(0);
  } else {
    let tmpLambdaFindIndexOut = -1;
    let tmpClusterSSA_tmpLambdaFindIndexCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindIndexCounter < 3) {
        if ($dotCall($, undefined, undefined, arr[tmpClusterSSA_tmpLambdaFindIndexCounter], tmpClusterSSA_tmpLambdaFindIndexCounter, arr)) {
          tmpLambdaFindIndexOut = tmpClusterSSA_tmpLambdaFindIndexCounter;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindIndexOut);
  }
};
f();
$(f);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  const c = $dotCall( $, undefined, undefined, 1, 0, b );
  if (c) {
    $( 0 );
    return undefined;
  }
  else {
    let d = -1;
    let e = 1;
    while ($LOOP_UNROLL_10) {
      const f = e < 3;
      if (f) {
        const g = b[ e ];
        const h = $dotCall( $, undefined, undefined, g, e, b );
        if (h) {
          d = e;
          break;
        }
        else {
          e = e + 1;
        }
      }
      else {
        break;
      }
    }
    $( d );
    return undefined;
  }
};
a();
$( a );
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const arr = [1, 2, 3];
  const tmpMCF = arr.findIndex;
  const x$1 = $dotCall(tmpMCF, arr, `findIndex`, $);
  $(x$1);
  return undefined;
};
f();
$(f);
$(x);
`````


## Todos triggered


- (todo) Support this node type in isFree: DebuggerStatement
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 0
 - 3: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
