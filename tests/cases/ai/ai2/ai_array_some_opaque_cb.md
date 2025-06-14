# Preval test case

# ai_array_some_opaque_cb.md

> Ai > Ai2 > Ai array some opaque cb
>
> Test: Array.prototype.some with an opaque callback.

## Input

`````js filename=intro
// Expected: Some uses opaque predicate, short-circuits if predicate returns true.
let arr = [$('v1'), $('v2')];
let cb = $('opaque_some_predicate');
let hasSome = arr.some(cb);
$('some_result', hasSome);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`v1`);
const tmpArrElement$1 /*:unknown*/ = $(`v2`);
const cb /*:unknown*/ = $(`opaque_some_predicate`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const tmpArrenow /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpArrElement, 0, arr);
if (tmpArrenow) {
  $(`some_result`, true);
} else {
  let tmpArreout /*:boolean*/ = false;
  let tmpClusterSSA_tmpArri /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 2;
    if (tmpArrc$1) {
      const tmpArrin$1 /*:boolean*/ = tmpClusterSSA_tmpArri in arr;
      if (tmpArrin$1) {
        const tmpArrel$1 /*:unknown*/ = arr[tmpClusterSSA_tmpArri];
        const tmpArrenow$1 /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, arr);
        if (tmpArrenow$1) {
          tmpArreout = true;
          break;
        } else {
        }
      } else {
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
    } else {
      break;
    }
  }
  $(`some_result`, tmpArreout);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`v1`);
const tmpArrElement$1 = $(`v2`);
const cb = $(`opaque_some_predicate`);
const arr = [tmpArrElement, tmpArrElement$1];
if ($dotCall(cb, undefined, undefined, tmpArrElement, 0, arr)) {
  $(`some_result`, true);
} else {
  let tmpArreout = false;
  let tmpClusterSSA_tmpArri = 1;
  while (true) {
    if (tmpClusterSSA_tmpArri < 2) {
      if (tmpClusterSSA_tmpArri in arr) {
        if ($dotCall(cb, undefined, undefined, arr[tmpClusterSSA_tmpArri], tmpClusterSSA_tmpArri, arr)) {
          tmpArreout = true;
          break;
        }
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
    } else {
      break;
    }
  }
  $(`some_result`, tmpArreout);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "v1" );
const b = $( "v2" );
const c = $( "opaque_some_predicate" );
const d = [ a, b ];
const e = $dotCall( c, undefined, undefined, a, 0, d );
if (e) {
  $( "some_result", true );
}
else {
  let f = false;
  let g = 1;
  while ($LOOP_UNROLL_10) {
    const h = g < 2;
    if (h) {
      const i = g in d;
      if (i) {
        const j = d[ g ];
        const k = $dotCall( c, undefined, undefined, j, g, d );
        if (k) {
          f = true;
          break;
        }
      }
      g = g + 1;
    }
    else {
      break;
    }
  }
  $( "some_result", f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`v1`);
const tmpArrElement$1 = $(`v2`);
let arr = [tmpArrElement, tmpArrElement$1];
let cb = $(`opaque_some_predicate`);
const tmpMCF = arr.some;
let hasSome = $dotCall(tmpMCF, arr, `some`, cb);
$(`some_result`, hasSome);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_some
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_some
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'v1'
 - 2: 'v2'
 - 3: 'opaque_some_predicate'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
