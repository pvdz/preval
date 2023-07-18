# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > While > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($)?.(1)) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($)?.(1)) $(100);
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
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
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
let $tmpLoopUnrollCheck = true;
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(100);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
  if (tmpChainElementCall$1) {
    $(100);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$4 = tmpChainElementCall$2 == null;
    if (tmpIfTest$4) {
      $(100);
    } else {
      const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, 1);
      if (tmpChainElementCall$4) {
        $(100);
      } else {
        break;
      }
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
let a = true;
const b = $( $ );
const c = b == null;
if (c) {
  $( 100 );
}
else {
  const d = $dotCall( b, $, 1 );
  if (d) {
    $( 100 );
  }
  else {
    a = false;
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const e = $( $ );
    const f = e == null;
    if (f) {
      $( 100 );
    }
    else {
      const g = $dotCall( e, $, 1 );
      if (g) {
        $( 100 );
      }
      else {
        break;
      }
    }
  }
}
const h = {
a: 999,
b: 1000
;
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 100
 - 4: '<$>'
 - 5: 1
 - 6: 100
 - 7: '<$>'
 - 8: 1
 - 9: 100
 - 10: '<$>'
 - 11: 1
 - 12: 100
 - 13: '<$>'
 - 14: 1
 - 15: 100
 - 16: '<$>'
 - 17: 1
 - 18: 100
 - 19: '<$>'
 - 20: 1
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 100
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
