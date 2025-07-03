# Preval test case

# ai_array_find_opaque_cb.md

> Ai > Ai2 > Ai array find opaque cb
>
> Test: Array.prototype.find with an opaque callback.

## Input

`````js filename=intro
// Expected: Find uses opaque predicate, returns element or undefined.
let arr = [$('a'), $('b'), $('c')];
let cb = $('opaque_find_predicate');
let found = arr.find(cb);
$('find_result', found);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`a`);
const tmpArrElement$1 /*:unknown*/ = $(`b`);
const tmpArrElement$3 /*:unknown*/ = $(`c`);
const cb /*:unknown*/ = $(`opaque_find_predicate`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpLambdaFindNow /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpArrElement, 0, arr);
if (tmpLambdaFindNow) {
  $(`find_result`, tmpArrElement);
} else {
  let tmpLambdaFindOut /*:unknown*/ = undefined;
  let tmpClusterSSA_tmpLambdaFindCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaFindTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindCounter < 3;
    if (tmpLambdaFindTest$1) {
      const tmpLambdaFindVal$1 /*:unknown*/ = arr[tmpClusterSSA_tmpLambdaFindCounter];
      const tmpLambdaFindNow$1 /*:unknown*/ = $dotCall(
        cb,
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
  $(`find_result`, tmpLambdaFindOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
const tmpArrElement$3 = $(`c`);
const cb = $(`opaque_find_predicate`);
const arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
if ($dotCall(cb, undefined, undefined, tmpArrElement, 0, arr)) {
  $(`find_result`, tmpArrElement);
} else {
  let tmpLambdaFindOut = undefined;
  let tmpClusterSSA_tmpLambdaFindCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaFindCounter < 3) {
      const tmpLambdaFindVal$1 = arr[tmpClusterSSA_tmpLambdaFindCounter];
      if ($dotCall(cb, undefined, undefined, tmpLambdaFindVal$1, tmpClusterSSA_tmpLambdaFindCounter, arr)) {
        tmpLambdaFindOut = tmpLambdaFindVal$1;
        break;
      } else {
        tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
      }
    } else {
      break;
    }
  }
  $(`find_result`, tmpLambdaFindOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = $( "c" );
const d = $( "opaque_find_predicate" );
const e = [ a, b, c ];
const f = $dotCall( d, undefined, undefined, a, 0, e );
if (f) {
  $( "find_result", a );
}
else {
  let g = undefined;
  let h = 1;
  while ($LOOP_UNROLL_10) {
    const i = h < 3;
    if (i) {
      const j = e[ h ];
      const k = $dotCall( d, undefined, undefined, j, h, e );
      if (k) {
        g = j;
        break;
      }
      else {
        h = h + 1;
      }
    }
    else {
      break;
    }
  }
  $( "find_result", g );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`a`);
const tmpArrElement$1 = $(`b`);
const tmpArrElement$3 = $(`c`);
let arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let cb = $(`opaque_find_predicate`);
const tmpMCF = arr.find;
let found = $dotCall(tmpMCF, arr, `find`, cb);
$(`find_result`, found);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_find
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) array reads var statement with init CallExpression
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_find
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'opaque_find_predicate'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
