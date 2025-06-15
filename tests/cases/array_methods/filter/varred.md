# Preval test case

# varred.md

> Array methods > Filter > Varred
>
> Make sure var init does not break

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  const x = arr.filter($);
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
  const tmpArreout /*:array*/ /*truthy*/ = [];
  if (tmpArrenow) {
    $dotCall($array_push, tmpArreout, `push`, 1);
  } else {
  }
  const tmpArrin$1 /*:boolean*/ = 1 in arr;
  if (tmpArrin$1) {
    const tmpArrel$1 /*:primitive*/ = arr[1];
    const tmpArrenow$1 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$1, 1, arr);
    if (tmpArrenow$1) {
      $dotCall($array_push, tmpArreout, `push`, tmpArrel$1);
    } else {
    }
  } else {
  }
  const tmpArrin$2 /*:boolean*/ = 2 in arr;
  if (tmpArrin$2) {
    const tmpArrel$2 /*:primitive*/ = arr[2];
    const tmpArrenow$2 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$2, 2, arr);
    if (tmpArrenow$2) {
      $dotCall($array_push, tmpArreout, `push`, tmpArrel$2);
      $(tmpArreout);
      return undefined;
    } else {
      $(tmpArreout);
      return undefined;
    }
  } else {
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
  const tmpArrenow = $dotCall($, undefined, undefined, 1, 0, arr);
  const tmpArreout = [];
  if (tmpArrenow) {
    $dotCall($array_push, tmpArreout, `push`, 1);
  }
  if (1 in arr) {
    const tmpArrel$1 = arr[1];
    if ($dotCall($, undefined, undefined, tmpArrel$1, 1, arr)) {
      $dotCall($array_push, tmpArreout, `push`, tmpArrel$1);
    }
  }
  if (2 in arr) {
    const tmpArrel$2 = arr[2];
    if ($dotCall($, undefined, undefined, tmpArrel$2, 2, arr)) {
      $dotCall($array_push, tmpArreout, `push`, tmpArrel$2);
      $(tmpArreout);
    } else {
      $(tmpArreout);
    }
  } else {
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
  const d = [];
  if (c) {
    $dotCall( $array_push, d, "push", 1 );
  }
  const e = 1 in b;
  if (e) {
    const f = b[ 1 ];
    const g = $dotCall( $, undefined, undefined, f, 1, b );
    if (g) {
      $dotCall( $array_push, d, "push", f );
    }
  }
  const h = 2 in b;
  if (h) {
    const i = b[ 2 ];
    const j = $dotCall( $, undefined, undefined, i, 2, b );
    if (j) {
      $dotCall( $array_push, d, "push", i );
      $( d );
      return undefined;
    }
    else {
      $( d );
      return undefined;
    }
  }
  else {
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
  const tmpMCF = arr.filter;
  const x$1 = $dotCall(tmpMCF, arr, `filter`, $);
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
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 2, 1, [1, 2, 3]
 - 3: 3, 2, [1, 2, 3]
 - 4: [1, 2, 3]
 - 5: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
