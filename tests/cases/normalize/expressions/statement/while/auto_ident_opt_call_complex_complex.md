# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($)?.($(1))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($)?.($(1))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
    tmpIfTest = tmpChainElementCall$1;
  } else {
  }
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
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
      const tmpCalleeParam$1 /*:unknown*/ = $(1);
      const tmpChainElementCall$4 /*:unknown*/ = $dotCall(tmpChainElementCall$2, $, undefined, tmpCalleeParam$1);
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

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  const d = $( 1 );
  const e = $dotCall( b, $, undefined, d );
  a = e;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let f = undefined;
    const g = $( $ );
    const h = g == null;
    if (h) {

    }
    else {
      const i = $( 1 );
      const j = $dotCall( g, $, undefined, i );
      f = j;
    }
    if (f) {

    }
    else {
      break;
    }
  }
}
const k = {
  a: 999,
  b: 1000,
};
$( k );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 100
 - 5: '<$>'
 - 6: 1
 - 7: 1
 - 8: 100
 - 9: '<$>'
 - 10: 1
 - 11: 1
 - 12: 100
 - 13: '<$>'
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 1
 - 20: 100
 - 21: '<$>'
 - 22: 1
 - 23: 1
 - 24: 100
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
