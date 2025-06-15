# Preval test case

# ai_array_findIndex_opaque_cb.md

> Ai > Ai2 > Ai array findIndex opaque cb
>
> Test: Array.prototype.findIndex with an opaque callback.

## Input

`````js filename=intro
// Expected: findIndex uses opaque predicate, returns index or -1.
let arr = [$('x'), $('y')];
let cb = $('opaque_findIndex_predicate');
let index = arr.findIndex(cb);
$('findIndex_result', index);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`x`);
const tmpArrElement$1 /*:unknown*/ = $(`y`);
const cb /*:unknown*/ = $(`opaque_findIndex_predicate`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const tmpArrnow /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpArrElement, 0, arr);
if (tmpArrnow) {
  $(`findIndex_result`, 0);
} else {
  let tmpArreout /*:unknown*/ = -1;
  let tmpClusterSSA_tmpArri /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 2;
    if (tmpArrc$1) {
      const tmpArrel$1 /*:unknown*/ = arr[tmpClusterSSA_tmpArri];
      const tmpArrnow$1 /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, arr);
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
  $(`findIndex_result`, tmpArreout);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`x`);
const tmpArrElement$1 = $(`y`);
const cb = $(`opaque_findIndex_predicate`);
const arr = [tmpArrElement, tmpArrElement$1];
if ($dotCall(cb, undefined, undefined, tmpArrElement, 0, arr)) {
  $(`findIndex_result`, 0);
} else {
  let tmpArreout = -1;
  let tmpClusterSSA_tmpArri = 1;
  while (true) {
    if (tmpClusterSSA_tmpArri < 2) {
      if ($dotCall(cb, undefined, undefined, arr[tmpClusterSSA_tmpArri], tmpClusterSSA_tmpArri, arr)) {
        tmpArreout = tmpClusterSSA_tmpArri;
        break;
      } else {
        tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
      }
    } else {
      break;
    }
  }
  $(`findIndex_result`, tmpArreout);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = $( "y" );
const c = $( "opaque_findIndex_predicate" );
const d = [ a, b ];
const e = $dotCall( c, undefined, undefined, a, 0, d );
if (e) {
  $( "findIndex_result", 0 );
}
else {
  let f = -1;
  let g = 1;
  while ($LOOP_UNROLL_10) {
    const h = g < 2;
    if (h) {
      const i = d[ g ];
      const j = $dotCall( c, undefined, undefined, i, g, d );
      if (j) {
        f = g;
        break;
      }
      else {
        g = g + 1;
      }
    }
    else {
      break;
    }
  }
  $( "findIndex_result", f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`x`);
const tmpArrElement$1 = $(`y`);
let arr = [tmpArrElement, tmpArrElement$1];
let cb = $(`opaque_findIndex_predicate`);
const tmpMCF = arr.findIndex;
let index = $dotCall(tmpMCF, arr, `findIndex`, cb);
$(`findIndex_result`, index);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_findIndex
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_findIndex
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - 3: 'opaque_findIndex_predicate'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
