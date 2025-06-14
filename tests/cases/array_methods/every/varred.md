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
  const tmpArrenow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  if (tmpArrenow) {
    let tmpArreout /*:boolean*/ = true;
    let tmpClusterSSA_tmpArri /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 3;
      if (tmpArrc$1) {
        const tmpArrin$1 /*:boolean*/ = tmpClusterSSA_tmpArri in arr;
        if (tmpArrin$1) {
          const tmpArrel$1 /*:primitive*/ = arr[tmpClusterSSA_tmpArri];
          const tmpArrenow$1 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, arr);
          if (tmpArrenow$1) {
          } else {
            tmpArreout = false;
            break;
          }
        } else {
        }
        tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
      } else {
        break;
      }
    }
    $(tmpArreout);
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
    let tmpArreout = true;
    let tmpClusterSSA_tmpArri = 1;
    while (true) {
      if (tmpClusterSSA_tmpArri < 3) {
        if (tmpClusterSSA_tmpArri in arr) {
          if (!$dotCall($, undefined, undefined, arr[tmpClusterSSA_tmpArri], tmpClusterSSA_tmpArri, arr)) {
            tmpArreout = false;
            break;
          }
        }
        tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
      } else {
        break;
      }
    }
    $(tmpArreout);
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
    while ($LOOP_UNROLL_10) {
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
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
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
