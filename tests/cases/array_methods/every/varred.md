# Preval test case

# varred.md

> Array methods > Every > Varred
>
> Make sure var init does not break

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  const x = arr.every($);
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
  const tmpLambdaEveryWas /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  if (tmpLambdaEveryWas) {
    let tmpLambdaEveryOut /*:boolean*/ = true;
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
    $(tmpLambdaEveryOut);
    return undefined;
  } else {
    $(false);
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
    let tmpLambdaEveryOut = true;
    let tmpClusterSSA_tmpLambdaEveryCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaEveryCounter < 3) {
        if (tmpClusterSSA_tmpLambdaEveryCounter in arr) {
          if (!$dotCall($, undefined, undefined, arr[tmpClusterSSA_tmpLambdaEveryCounter], tmpClusterSSA_tmpLambdaEveryCounter, arr)) {
            tmpLambdaEveryOut = false;
            break;
          }
        }
        tmpClusterSSA_tmpLambdaEveryCounter = tmpClusterSSA_tmpLambdaEveryCounter + 1;
      } else {
        break;
      }
    }
    $(tmpLambdaEveryOut);
  } else {
    $(false);
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
    let d = true;
    let e = 1;
    while ($LOOP_UNROLLS_LEFT_10) {
      const f = e < 3;
      if (f) {
        const g = e in b;
        if (g) {
          const h = b[ e ];
          const i = $dotCall( $, undefined, undefined, h, e, b );
          if (i) {

          }
          else {
            d = false;
            break;
          }
        }
        e = e + 1;
      }
      else {
        break;
      }
    }
    $( d );
    return undefined;
  }
  else {
    $( false );
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
  const tmpMCF = arr.every;
  const x$1 = $dotCall(tmpMCF, arr, `every`, $);
  $(x$1);
  return undefined;
};
f();
$(f);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 2, 1, [1, 2, 3]
 - 3: 3, 2, [1, 2, 3]
 - 4: true
 - 5: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
