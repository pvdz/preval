# Preval test case

# ai_rule331_for_of_opaque_closure_capture.md

> Ai > Ai3 > Ai rule331 for of opaque closure capture
>
> Test: for...of over opaque iterable, loop var captured in closure.

## Input

`````js filename=intro
// Expected: let arr = []; for (const x of $('iterable')) { arr.push(() => $('captured', x)); } arr[0](); arr[1](); (if iterable had two items)
let funcs = [];
let iterable = $('iterable', [$('item1'), $('item2')]); // Test runner makes $('iterable') a string
for (const x of iterable) {
  funcs.push(() => $('captured_value', x));
}
// Assuming iterable has at least two items based on the input to $('iterable', ...)
if (funcs.length > 0) funcs[0]();
if (funcs.length > 1) funcs[1]();
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`item1`);
const tmpArrElement$1 /*:unknown*/ = $(`item2`);
const tmpCalleeParam /*:array*/ = [tmpArrElement, tmpArrElement$1];
const iterable /*:unknown*/ = $(`iterable`, tmpCalleeParam);
const tmpForOfGenNext /*:unknown*/ = $forOf(iterable);
const funcs /*:array*/ = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x /*:unknown*/ = tmpForOfNext.value;
    const tmpMCP /*:()=>unknown*/ = function () {
      debugger;
      const tmpReturnArg /*:unknown*/ = $(`captured_value`, x);
      return tmpReturnArg;
    };
    $dotCall($array_push, funcs, `push`, tmpMCP);
  }
}
const tmpBinLhs /*:number*/ = funcs.length;
const tmpIfTest$1 /*:boolean*/ = tmpBinLhs > 0;
if (tmpIfTest$1) {
  const tmpMCF$1 /*:primitive*/ = funcs[0];
  $dotCall(tmpMCF$1, funcs, undefined);
} else {
}
const tmpBinLhs$1 /*:number*/ = funcs.length;
const tmpIfTest$3 /*:boolean*/ = tmpBinLhs$1 > 1;
if (tmpIfTest$3) {
  const tmpMCF$3 /*:primitive*/ = funcs[1];
  $dotCall(tmpMCF$3, funcs, undefined);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`item1`);
const tmpArrElement$1 = $(`item2`);
const tmpForOfGenNext = $forOf($(`iterable`, [tmpArrElement, tmpArrElement$1]));
const funcs = [];
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    const x = tmpForOfNext.value;
    $dotCall($array_push, funcs, `push`, function () {
      const tmpReturnArg = $(`captured_value`, x);
      return tmpReturnArg;
    });
  }
}
if (funcs.length > 0) {
  funcs[0]();
}
if (funcs.length > 1) {
  funcs[1]();
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "item1" );
const b = $( "item2" );
const c = [ a, b ];
const d = $( "iterable", c );
const e = $forOf( d );
const f = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = e();
  const h = g.done;
  if (h) {
    break;
  }
  else {
    const i = g.value;
    const j = function() {
      debugger;
      const k = $( "captured_value", i );
      return k;
    };
    $dotCall( $array_push, f, "push", j );
  }
}
const l = f.length;
const m = l > 0;
if (m) {
  const n = f[ 0 ];
  $dotCall( n, f, undefined );
}
const o = f.length;
const p = o > 1;
if (p) {
  const q = f[ 1 ];
  $dotCall( q, f, undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let funcs = [];
const tmpArrElement = $(`item1`);
const tmpArrElement$1 = $(`item2`);
let tmpCalleeParam = [tmpArrElement, tmpArrElement$1];
let iterable = $(`iterable`, tmpCalleeParam);
const tmpForOfGenNext = $forOf(iterable);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGenNext();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x = tmpForOfNext.value;
    const tmpMCF = funcs.push;
    const tmpMCP = function () {
      debugger;
      const tmpReturnArg = $(`captured_value`, x);
      return tmpReturnArg;
    };
    $dotCall(tmpMCF, funcs, `push`, tmpMCP);
  }
}
const tmpBinLhs = funcs.length;
const tmpIfTest$1 = tmpBinLhs > 0;
if (tmpIfTest$1) {
  const tmpMCF$1 = funcs[0];
  $dotCall(tmpMCF$1, funcs, undefined);
} else {
}
const tmpBinLhs$1 = funcs.length;
const tmpIfTest$3 = tmpBinLhs$1 > 1;
if (tmpIfTest$3) {
  const tmpMCF$3 = funcs[1];
  $dotCall(tmpMCF$3, funcs, undefined);
} else {
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'item1'
 - 2: 'item2'
 - 3: 'iterable', ['item1', 'item2']
 - 4: 'captured_value', 'i'
 - 5: 'captured_value', 't'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
