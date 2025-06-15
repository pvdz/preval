# Preval test case

# varred.md

> Array methods > Some > Varred
>
> Make sure var init does not break

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  const x = arr.some($);
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
  const tmpLambdaSomeNow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  if (tmpLambdaSomeNow) {
    $(true);
    return undefined;
  } else {
    let tmpLambdaSomeOut /*:boolean*/ = false;
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
            tmpLambdaSomeOut = true;
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
    $(tmpLambdaSomeOut);
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
    $(true);
  } else {
    let tmpLambdaSomeOut = false;
    let tmpClusterSSA_tmpLambdaSomeCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaSomeCounter < 3) {
        if (tmpClusterSSA_tmpLambdaSomeCounter in arr) {
          if ($dotCall($, undefined, undefined, arr[tmpClusterSSA_tmpLambdaSomeCounter], tmpClusterSSA_tmpLambdaSomeCounter, arr)) {
            tmpLambdaSomeOut = true;
            break;
          }
        }
        tmpClusterSSA_tmpLambdaSomeCounter = tmpClusterSSA_tmpLambdaSomeCounter + 1;
      } else {
        break;
      }
    }
    $(tmpLambdaSomeOut);
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
    $( true );
    return undefined;
  }
  else {
    let d = false;
    let e = 1;
    while ($LOOP_UNROLL_10) {
      const f = e < 3;
      if (f) {
        const g = e in b;
        if (g) {
          const h = b[ e ];
          const i = $dotCall( $, undefined, undefined, h, e, b );
          if (i) {
            d = true;
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
  const tmpMCF = arr.some;
  const x$1 = $dotCall(tmpMCF, arr, `some`, $);
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
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: true
 - 3: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
