# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $($)?.($(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $($)?.($(1));
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpCalleeParam = tmpChainElementCall;
      const tmpCalleeParam$1 = tmpChainRootCall;
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
      a = tmpChainElementCall$1;
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
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  a = undefined;
  const tmpChainElementCall /*:unknown*/ = $($);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpChainElementCall$1 /*:unknown*/ = $($);
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
      if (tmpIfTest$4) {
      } else {
        const tmpCalleeParam$1 /*:unknown*/ = $(1);
        $dotCall(tmpChainElementCall$1, $, undefined, tmpCalleeParam$1);
      }
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  a = undefined;
  const c = $( $ );
  const d = c == null;
  if (d) {

  }
  else {
    const e = $( 1 );
    $dotCall( c, $, undefined, e );
  }
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( $ );
      const h = g == null;
      if (h) {

      }
      else {
        const i = $( 1 );
        $dotCall( g, $, undefined, i );
      }
    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: '<$>'
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: '<$>'
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: '<$>'
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check