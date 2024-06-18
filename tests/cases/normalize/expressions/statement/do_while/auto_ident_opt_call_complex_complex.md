# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($)?.($(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($($)?.($(1))) {
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
    const tmpCallCallee = $dotCall;
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
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

## Output


`````js filename=intro
$(100);
let tmpIfTest = false;
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
  tmpIfTest = tmpChainElementCall$1;
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 = false;
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$4 = tmpChainElementCall$2 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpCalleeParam$1 = $(1);
      const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, tmpCalleeParam$1);
      tmpIfTest$2 = tmpChainElementCall$4;
    }
    if (tmpIfTest$2) {
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
let a = false;
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  const d = $( 1 );
  const e = $dotCall( b, $, d );
  a = e;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let f = false;
    const g = $( $ );
    const h = g == null;
    if (h) {

    }
    else {
      const i = $( 1 );
      const j = $dotCall( g, $, i );
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
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: '<$>'
 - 7: 1
 - 8: 1
 - 9: 100
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: 100
 - 14: '<$>'
 - 15: 1
 - 16: 1
 - 17: 100
 - 18: '<$>'
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
