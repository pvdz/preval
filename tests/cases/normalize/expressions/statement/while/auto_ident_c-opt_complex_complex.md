# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ($(b)?.[$("x")]) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while ($(b)?.[$(`x`)]) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    tmpIfTest = tmpChainElementObject;
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
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let $tmpLoopUnrollCheck = true;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(100);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject) {
    $(100);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpChainElementCall$1 = $(b);
    const tmpIfTest$4 = tmpChainElementCall$1 == null;
    if (tmpIfTest$4) {
      $(100);
    } else {
      const tmpChainRootComputed$1 = $(`x`);
      const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
      if (tmpChainElementObject$1) {
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
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
let c = true;
const d = $( a );
const e = d == null;
if (e) {
  $( 100 );
}
else {
  const f = $( "x" );
  const g = d[ f ];
  if (g) {
    $( 100 );
  }
  else {
    c = false;
  }
}
if (c) {
  while ($LOOP_UNROLL_10) {
    const h = $( a );
    const i = h == null;
    if (i) {
      $( 100 );
    }
    else {
      const j = $( "x" );
      const k = h[ j ];
      if (k) {
        $( 100 );
      }
      else {
        break;
      }
    }
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 100
 - 4: { x: '1' }
 - 5: 'x'
 - 6: 100
 - 7: { x: '1' }
 - 8: 'x'
 - 9: 100
 - 10: { x: '1' }
 - 11: 'x'
 - 12: 100
 - 13: { x: '1' }
 - 14: 'x'
 - 15: 100
 - 16: { x: '1' }
 - 17: 'x'
 - 18: 100
 - 19: { x: '1' }
 - 20: 'x'
 - 21: 100
 - 22: { x: '1' }
 - 23: 'x'
 - 24: 100
 - 25: { x: '1' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
