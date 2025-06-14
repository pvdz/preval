# Preval test case

# ai_array_every_opaque_cb.md

> Ai > Ai2 > Ai array every opaque cb
>
> Test: Array.prototype.every with an opaque callback.

## Input

`````js filename=intro
// Expected: Every uses opaque predicate, short-circuits if predicate returns false.
let arr = [$('e1'), $('e2')];
let cb = $('opaque_every_predicate');
let allMatch = arr.every(cb);
$('every_result', allMatch);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`e1`);
const tmpArrElement$1 /*:unknown*/ = $(`e2`);
const cb /*:unknown*/ = $(`opaque_every_predicate`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const tmpArrenow /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpArrElement, 0, arr);
if (tmpArrenow) {
  let tmpArreout /*:boolean*/ = true;
  let tmpClusterSSA_tmpArri /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 2;
    if (tmpArrc$1) {
      const tmpArrin$1 /*:boolean*/ = tmpClusterSSA_tmpArri in arr;
      if (tmpArrin$1) {
        const tmpArrel$1 /*:unknown*/ = arr[tmpClusterSSA_tmpArri];
        const tmpArrenow$1 /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, arr);
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
  $(`every_result`, tmpArreout);
} else {
  $(`every_result`, false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`e1`);
const tmpArrElement$1 = $(`e2`);
const cb = $(`opaque_every_predicate`);
const arr = [tmpArrElement, tmpArrElement$1];
if ($dotCall(cb, undefined, undefined, tmpArrElement, 0, arr)) {
  let tmpArreout = true;
  let tmpClusterSSA_tmpArri = 1;
  while (true) {
    if (tmpClusterSSA_tmpArri < 2) {
      if (tmpClusterSSA_tmpArri in arr) {
        if (!$dotCall(cb, undefined, undefined, arr[tmpClusterSSA_tmpArri], tmpClusterSSA_tmpArri, arr)) {
          tmpArreout = false;
          break;
        }
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
    } else {
      break;
    }
  }
  $(`every_result`, tmpArreout);
} else {
  $(`every_result`, false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "e1" );
const b = $( "e2" );
const c = $( "opaque_every_predicate" );
const d = [ a, b ];
const e = $dotCall( c, undefined, undefined, a, 0, d );
if (e) {
  let f = true;
  let g = 1;
  while ($LOOP_UNROLL_10) {
    const h = g < 2;
    if (h) {
      const i = g in d;
      if (i) {
        const j = d[ g ];
        const k = $dotCall( c, undefined, undefined, j, g, d );
        if (k) {

        }
        else {
          f = false;
          break;
        }
      }
      g = g + 1;
    }
    else {
      break;
    }
  }
  $( "every_result", f );
}
else {
  $( "every_result", false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`e1`);
const tmpArrElement$1 = $(`e2`);
let arr = [tmpArrElement, tmpArrElement$1];
let cb = $(`opaque_every_predicate`);
const tmpMCF = arr.every;
let allMatch = $dotCall(tmpMCF, arr, `every`, cb);
$(`every_result`, allMatch);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_every
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_every
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'e1'
 - 2: 'e2'
 - 3: 'opaque_every_predicate'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
