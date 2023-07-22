# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

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
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = $($)?.($(1));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    tmpDoWhileFlag = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    const tmpIfTest = tmpChainElementCall != null;
    if (tmpIfTest) {
      const tmpCallCallee = $dotCall;
      const tmpCalleeParam = tmpChainElementCall;
      const tmpCalleeParam$1 = tmpChainRootCall;
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
      tmpDoWhileFlag = tmpChainElementCall$1;
    } else {
    }
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
let tmpDoWhileFlag = false;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
  tmpDoWhileFlag = tmpChainElementCall$1;
}
let $tmpLoopUnrollCheck = true;
if (tmpDoWhileFlag) {
  $(100);
  tmpDoWhileFlag = false;
  const tmpChainElementCall$2 = $($);
  const tmpIfTest$1 = tmpChainElementCall$2 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, tmpCalleeParam$1);
    tmpDoWhileFlag = tmpChainElementCall$4;
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      tmpDoWhileFlag = false;
      const tmpChainElementCall$3 = $($);
      const tmpIfTest$2 = tmpChainElementCall$3 == null;
      if (tmpIfTest$2) {
      } else {
        const tmpCalleeParam$2 = $(1);
        const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, tmpCalleeParam$2);
        tmpDoWhileFlag = tmpChainElementCall$5;
      }
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
let f = true;
if (a) {
  $( 100 );
  a = false;
  const g = $( $ );
  const h = g == null;
  if (h) {

  }
  else {
    const i = $( 1 );
    const j = $dotCall( g, $, i );
    a = j;
  }
}
else {
  f = false;
}
if (f) {
  while ($LOOP_UNROLL_9) {
    if (a) {
      $( 100 );
      a = false;
      const k = $( $ );
      const l = k == null;
      if (l) {

      }
      else {
        const m = $( 1 );
        const n = $dotCall( k, $, m );
        a = n;
      }
    }
    else {
      break;
    }
  }
}
const o = {
a: 999,
b: 1000
;
$( o );
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
