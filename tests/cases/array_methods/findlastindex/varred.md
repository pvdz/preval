# Preval test case

# varred.md

> Array methods > Findlastindex > Varred
>
> Make sure var init does not break

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  const x = arr.findLastIndex($);
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
  const tmpLambdaFindLastIndexNow /*:unknown*/ = $dotCall($, undefined, undefined, 3, 2, arr);
  if (tmpLambdaFindLastIndexNow) {
    $(2);
    return undefined;
  } else {
    let tmpLambdaFindLastIndexOut /*:number*/ = -1;
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
          tmpLambdaFindLastIndexOut = tmpClusterSSA_tmpLambdaFindLastIndexCounter;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastIndexCounter = tmpClusterSSA_tmpLambdaFindLastIndexCounter - 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindLastIndexOut);
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
  if ($dotCall($, undefined, undefined, 3, 2, arr)) {
    $(2);
  } else {
    let tmpLambdaFindLastIndexOut = -1;
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
          tmpLambdaFindLastIndexOut = tmpClusterSSA_tmpLambdaFindLastIndexCounter;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastIndexCounter = tmpClusterSSA_tmpLambdaFindLastIndexCounter - 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindLastIndexOut);
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
  const c = $dotCall( $, undefined, undefined, 3, 2, b );
  if (c) {
    $( 2 );
    return undefined;
  }
  else {
    let d = -1;
    let e = 1;
    while ($LOOP_UNROLL_10) {
      const f = e >= 0;
      if (f) {
        const g = b[ e ];
        const h = $dotCall( $, undefined, undefined, g, e, b );
        if (h) {
          d = e;
          break;
        }
        else {
          e = e - 1;
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
  const tmpMCF = arr.findLastIndex;
  const x$1 = $dotCall(tmpMCF, arr, `findLastIndex`, $);
  $(x$1);
  return undefined;
};
f();
$(f);
$(x);
`````


## Todos triggered


- (todo) Support this node type in isFree: DebuggerStatement
- (todo) array reads var statement with init CallExpression
- (todo) regular property access of an ident feels tricky;
- (todo) type trackeed tricks can possibly support static $array_findLastIndex


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 3, 2, [1, 2, 3]
 - 2: 2
 - 3: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
