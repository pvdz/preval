# Preval test case

# ai_array_filter_opaque_callback.md

> Ai > Ai2 > Ai array filter opaque callback
>
> Test: Array filter method with an opaque callback.

## Input

`````js filename=intro
// Expected: [1,2,3].filter($('callback')) (or equivalent normalized form)
let arr = [1, 2, 3, 4];
let cb = $('opaque_filter_callback');
let result = arr.filter(cb);
$('result_array', result);
$('original_array', arr); // Check if original is mutated
`````


## Settled


`````js filename=intro
const cb /*:unknown*/ = $(`opaque_filter_callback`);
const arr /*:array*/ /*truthy*/ = [1, 2, 3, 4];
const tmpArrenow /*:unknown*/ = $dotCall(cb, undefined, undefined, 1, 0, arr);
const tmpArreout /*:array*/ /*truthy*/ = [];
if (tmpArrenow) {
  $dotCall($array_push, tmpArreout, `push`, 1);
} else {
}
const tmpArrin$1 /*:boolean*/ = 1 in arr;
if (tmpArrin$1) {
  const tmpArrel$1 /*:primitive*/ = arr[1];
  const tmpArrenow$1 /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpArrel$1, 1, arr);
  if (tmpArrenow$1) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$1);
  } else {
  }
} else {
}
const tmpArrin$2 /*:boolean*/ = 2 in arr;
if (tmpArrin$2) {
  const tmpArrel$2 /*:primitive*/ = arr[2];
  const tmpArrenow$2 /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpArrel$2, 2, arr);
  if (tmpArrenow$2) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$2);
  } else {
  }
} else {
}
const tmpArrin$3 /*:boolean*/ = 3 in arr;
if (tmpArrin$3) {
  const tmpArrel$3 /*:primitive*/ = arr[3];
  const tmpArrenow$3 /*:unknown*/ = $dotCall(cb, undefined, undefined, tmpArrel$3, 3, arr);
  if (tmpArrenow$3) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$3);
    $(`result_array`, tmpArreout);
    $(`original_array`, arr);
  } else {
    $(`result_array`, tmpArreout);
    $(`original_array`, arr);
  }
} else {
  $(`result_array`, tmpArreout);
  $(`original_array`, arr);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cb = $(`opaque_filter_callback`);
const arr = [1, 2, 3, 4];
const tmpArrenow = $dotCall(cb, undefined, undefined, 1, 0, arr);
const tmpArreout = [];
if (tmpArrenow) {
  $dotCall($array_push, tmpArreout, `push`, 1);
}
if (1 in arr) {
  const tmpArrel$1 = arr[1];
  if ($dotCall(cb, undefined, undefined, tmpArrel$1, 1, arr)) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$1);
  }
}
if (2 in arr) {
  const tmpArrel$2 = arr[2];
  if ($dotCall(cb, undefined, undefined, tmpArrel$2, 2, arr)) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$2);
  }
}
if (3 in arr) {
  const tmpArrel$3 = arr[3];
  if ($dotCall(cb, undefined, undefined, tmpArrel$3, 3, arr)) {
    $dotCall($array_push, tmpArreout, `push`, tmpArrel$3);
    $(`result_array`, tmpArreout);
    $(`original_array`, arr);
  } else {
    $(`result_array`, tmpArreout);
    $(`original_array`, arr);
  }
} else {
  $(`result_array`, tmpArreout);
  $(`original_array`, arr);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_filter_callback" );
const b = [ 1, 2, 3, 4 ];
const c = $dotCall( a, undefined, undefined, 1, 0, b );
const d = [];
if (c) {
  $dotCall( $array_push, d, "push", 1 );
}
const e = 1 in b;
if (e) {
  const f = b[ 1 ];
  const g = $dotCall( a, undefined, undefined, f, 1, b );
  if (g) {
    $dotCall( $array_push, d, "push", f );
  }
}
const h = 2 in b;
if (h) {
  const i = b[ 2 ];
  const j = $dotCall( a, undefined, undefined, i, 2, b );
  if (j) {
    $dotCall( $array_push, d, "push", i );
  }
}
const k = 3 in b;
if (k) {
  const l = b[ 3 ];
  const m = $dotCall( a, undefined, undefined, l, 3, b );
  if (m) {
    $dotCall( $array_push, d, "push", l );
    $( "result_array", d );
    $( "original_array", b );
  }
  else {
    $( "result_array", d );
    $( "original_array", b );
  }
}
else {
  $( "result_array", d );
  $( "original_array", b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3, 4];
let cb = $(`opaque_filter_callback`);
const tmpMCF = arr.filter;
let result = $dotCall(tmpMCF, arr, `filter`, cb);
$(`result_array`, result);
$(`original_array`, arr);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_filter
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_filter_callback'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
