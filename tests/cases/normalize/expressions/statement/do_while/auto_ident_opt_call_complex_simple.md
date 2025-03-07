# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($)?.(1));
$(a);
`````

## Settled


`````js filename=intro
$(100);
let tmpIfTest /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  tmpIfTest = tmpChainElementCall$1;
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 /*:unknown*/ = undefined;
    const tmpChainElementCall$2 /*:unknown*/ = $($);
    const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$2 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementCall$4 /*:unknown*/ = $dotCall(tmpChainElementCall$2, $, undefined, 1);
      tmpIfTest$2 = tmpChainElementCall$4;
    }
    if (tmpIfTest$2) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
let tmpIfTest = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  tmpIfTest = $dotCall(tmpChainElementCall, $, undefined, 1);
}
if (tmpIfTest) {
  while (true) {
    $(100);
    let tmpIfTest$2 = undefined;
    const tmpChainElementCall$2 = $($);
    if (!(tmpChainElementCall$2 == null)) {
      tmpIfTest$2 = $dotCall(tmpChainElementCall$2, $, undefined, 1);
    }
    if (!tmpIfTest$2) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($($)?.(1)) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, 1);
    tmpIfTest = tmpChainElementCall$1;
  } else {
  }
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
let a = undefined;
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  const d = $dotCall( b, $, undefined, 1 );
  a = d;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let e = undefined;
    const f = $( $ );
    const g = f == null;
    if (g) {

    }
    else {
      const h = $dotCall( f, $, undefined, 1 );
      e = h;
    }
    if (e) {

    }
    else {
      break;
    }
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 100
 - 5: '<$>'
 - 6: 1
 - 7: 100
 - 8: '<$>'
 - 9: 1
 - 10: 100
 - 11: '<$>'
 - 12: 1
 - 13: 100
 - 14: '<$>'
 - 15: 1
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 100
 - 20: '<$>'
 - 21: 1
 - 22: 100
 - 23: '<$>'
 - 24: 1
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
