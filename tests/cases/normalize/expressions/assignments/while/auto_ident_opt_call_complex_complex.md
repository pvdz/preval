# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($)?.($(1)))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($)?.($(1)))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpCallCallee = $dotCall;
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
    a = tmpChainElementCall$1;
  } else {
  }
  let tmpIfTest = a;
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
let a = undefined;
let $tmpLoopUnrollCheck = true;
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(100);
} else {
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
  a = tmpChainElementCall$1;
  if (tmpChainElementCall$1) {
    $(100);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    a = undefined;
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$2 = tmpChainElementCall$2 == null;
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpCalleeParam$1 = $(1);
      const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, tmpCalleeParam$1);
      a = tmpChainElementCall$4;
      if (tmpChainElementCall$4) {
        $(100);
      } else {
        break;
      }
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = true;
const c = $( $ );
const d = c == null;
if (d) {
  $( 100 );
}
else {
  const e = $( 1 );
  const f = $dotCall( c, $, e );
  a = f;
  if (f) {
    $( 100 );
  }
  else {
    b = false;
  }
}
if (b) {
  while ($LOOP_UNROLL_10) {
    a = undefined;
    const g = $( $ );
    const h = g == null;
    if (h) {
      $( 100 );
    }
    else {
      const i = $( 1 );
      const j = $dotCall( g, $, i );
      a = j;
      if (j) {
        $( 100 );
      }
      else {
        break;
      }
    }
  }
}
$( a );
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
