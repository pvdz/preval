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
  const tmpArrnow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  if (tmpArrnow) {
    $(0);
    return undefined;
  } else {
    let tmpArreout /*:unknown*/ = -1;
    let tmpClusterSSA_tmpArri /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 3;
      if (tmpArrc$1) {
        const tmpArrel$1 /*:primitive*/ = arr[tmpClusterSSA_tmpArri];
        const tmpArrnow$1 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, arr);
        if (tmpArrnow$1) {
          tmpArreout = tmpClusterSSA_tmpArri;
          break;
        } else {
          tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
        }
      } else {
        break;
      }
    }
    $(tmpArreout);
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
    let tmpArreout = -1;
    let tmpClusterSSA_tmpArri = 1;
    while (true) {
      if (tmpClusterSSA_tmpArri < 3) {
        if ($dotCall($, undefined, undefined, arr[tmpClusterSSA_tmpArri], tmpClusterSSA_tmpArri, arr)) {
          tmpArreout = tmpClusterSSA_tmpArri;
          break;
        } else {
          tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
        }
      } else {
        break;
      }
    }
    $(tmpArreout);
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
