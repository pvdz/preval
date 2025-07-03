# Preval test case

# varred.md

> Array methods > Find > Varred
>
> Make sure var init does not break

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  const x = arr.find($);
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
  const tmpLambdaFindNow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  if (tmpLambdaFindNow) {
    $(1);
    return undefined;
  } else {
    let tmpLambdaFindOut /*:primitive*/ = undefined;
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
          tmpLambdaFindOut = tmpLambdaFindVal$1;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindOut);
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
    $(1);
  } else {
    let tmpLambdaFindOut = undefined;
    let tmpClusterSSA_tmpLambdaFindCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindCounter < 3) {
        const tmpLambdaFindVal$1 = arr[tmpClusterSSA_tmpLambdaFindCounter];
        if ($dotCall($, undefined, undefined, tmpLambdaFindVal$1, tmpClusterSSA_tmpLambdaFindCounter, arr)) {
          tmpLambdaFindOut = tmpLambdaFindVal$1;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindOut);
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
    $( 1 );
    return undefined;
  }
  else {
    let d = undefined;
    let e = 1;
    while ($LOOP_UNROLL_10) {
      const f = e < 3;
      if (f) {
        const g = b[ e ];
        const h = $dotCall( $, undefined, undefined, g, e, b );
        if (h) {
          d = g;
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
  const tmpMCF = arr.find;
  const x$1 = $dotCall(tmpMCF, arr, `find`, $);
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
- (todo) type trackeed tricks can possibly support static $array_find


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 1
 - 3: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
