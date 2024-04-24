# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > For c > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $($)?.(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $($)?.(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
    } else {
    }
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpChainElementCall = $($);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    $dotCall(tmpChainElementCall, $, 1);
  }
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpChainElementCall$1 = $($);
      const tmpIfTest$2 = tmpChainElementCall$1 == null;
      if (tmpIfTest$2) {
      } else {
        $dotCall(tmpChainElementCall$1, $, 1);
      }
      tmpIfTest = $(1);
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
let a = $( 1 );
if (a) {
  const b = $( $ );
  const c = b == null;
  if (c) {

  }
  else {
    $dotCall( b, $, 1 );
  }
  a = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (a) {
      const d = $( $ );
      const e = d == null;
      if (e) {

      }
      else {
        $dotCall( d, $, 1 );
      }
      a = $( 1 );
    }
    else {
      break;
    }
  }
}
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: '<$>'
 - 6: 1
 - 7: 1
 - 8: '<$>'
 - 9: 1
 - 10: 1
 - 11: '<$>'
 - 12: 1
 - 13: 1
 - 14: '<$>'
 - 15: 1
 - 16: 1
 - 17: '<$>'
 - 18: 1
 - 19: 1
 - 20: '<$>'
 - 21: 1
 - 22: 1
 - 23: '<$>'
 - 24: 1
 - 25: 1
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
