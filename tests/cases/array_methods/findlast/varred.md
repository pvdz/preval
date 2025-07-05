# Preval test case

# varred.md

> Array methods > Findlast > Varred
>
> Make sure var init does not break

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  const x = arr.findLast($);
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
  const tmpLambdaFindLastNow /*:unknown*/ = $dotCall($, undefined, undefined, 3, 2, arr);
  if (tmpLambdaFindLastNow) {
    $(3);
    return undefined;
  } else {
    let tmpLambdaFindLastOut /*:primitive*/ = undefined;
    let tmpClusterSSA_tmpLambdaFindLastCounter /*:number*/ = 1;
    while ($LOOP_UNROLLS_LEFT_10) {
      const tmpLambdaFindLastTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindLastCounter >= 0;
      if (tmpLambdaFindLastTest$1) {
        const tmpLambdaFindLastVal$1 /*:primitive*/ = arr[tmpClusterSSA_tmpLambdaFindLastCounter];
        const tmpLambdaFindLastNow$1 /*:unknown*/ = $dotCall(
          $,
          undefined,
          undefined,
          tmpLambdaFindLastVal$1,
          tmpClusterSSA_tmpLambdaFindLastCounter,
          arr,
        );
        if (tmpLambdaFindLastNow$1) {
          tmpLambdaFindLastOut = tmpLambdaFindLastVal$1;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastCounter = tmpClusterSSA_tmpLambdaFindLastCounter - 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindLastOut);
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
    $(3);
  } else {
    let tmpLambdaFindLastOut = undefined;
    let tmpClusterSSA_tmpLambdaFindLastCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindLastCounter >= 0) {
        const tmpLambdaFindLastVal$1 = arr[tmpClusterSSA_tmpLambdaFindLastCounter];
        if ($dotCall($, undefined, undefined, tmpLambdaFindLastVal$1, tmpClusterSSA_tmpLambdaFindLastCounter, arr)) {
          tmpLambdaFindLastOut = tmpLambdaFindLastVal$1;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastCounter = tmpClusterSSA_tmpLambdaFindLastCounter - 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindLastOut);
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
    $( 3 );
    return undefined;
  }
  else {
    let d = undefined;
    let e = 1;
    while ($LOOP_UNROLLS_LEFT_10) {
      const f = e >= 0;
      if (f) {
        const g = b[ e ];
        const h = $dotCall( $, undefined, undefined, g, e, b );
        if (h) {
          d = g;
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
  const tmpMCF = arr.findLast;
  const x$1 = $dotCall(tmpMCF, arr, `findLast`, $);
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
- (todo) type trackeed tricks can possibly support static $array_findLast


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 3, 2, [1, 2, 3]
 - 2: 3
 - 3: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
