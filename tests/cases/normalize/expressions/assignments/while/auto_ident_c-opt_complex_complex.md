# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ((a = $(b)?.[$("x")])) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while ((a = $(b)?.[$(`x`)])) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    a = tmpChainElementObject;
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
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(100);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  a = tmpChainElementObject;
  if (tmpChainElementObject) {
    $(100);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    a = undefined;
    const tmpChainElementCall$1 = $(b);
    const tmpIfTest$2 = tmpChainElementCall$1 == null;
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpChainRootComputed$1 = $(`x`);
      const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
      a = tmpChainElementObject$1;
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
let a = undefined;
let b = true;
const c = { x: 1 };
const d = $( c );
const e = d == null;
if (e) {
  $( 100 );
}
else {
  const f = $( "x" );
  const g = d[ f ];
  a = g;
  if (g) {
    $( 100 );
  }
  else {
    b = false;
  }
}
if (b) {
  while ($LOOP_UNROLL_10) {
    a = undefined;
    const h = $( c );
    const i = h == null;
    if (i) {
      $( 100 );
    }
    else {
      const j = $( "x" );
      const k = h[ j ];
      a = k;
      if (k) {
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
