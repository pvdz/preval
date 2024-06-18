# Preval test case

# auto_ident_c-opt_complex_complex2.md

> Normalize > Expressions > Statement > For b > Auto ident c-opt complex complex2
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
for (; $(b)?.[$("x")]; $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
{
  while ($(b)?.[$(`x`)]) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
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
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const b = { x: 1 };
let tmpIfTest = false;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  $(1);
  while ($LOOP_UNROLL_10) {
    let tmpIfTest$2 = false;
    const tmpChainElementCall$1 = $(b);
    const tmpIfTest$4 = tmpChainElementCall$1 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainRootComputed$1 = $(`x`);
      const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
      tmpIfTest$2 = tmpChainElementObject$1;
    }
    if (tmpIfTest$2) {
      $(1);
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
const a = {
  a: 999,
  b: 1000,
};
const b = { x: 1 };
let c = false;
const d = $( b );
const e = d == null;
if (e) {

}
else {
  const f = $( "x" );
  const g = d[ f ];
  c = g;
}
if (c) {
  $( 1 );
  while ($LOOP_UNROLL_10) {
    let h = false;
    const i = $( b );
    const j = i == null;
    if (j) {

    }
    else {
      const k = $( "x" );
      const l = i[ k ];
      h = l;
    }
    if (h) {
      $( 1 );
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
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: { x: '1' }
 - 5: 'x'
 - 6: 1
 - 7: { x: '1' }
 - 8: 'x'
 - 9: 1
 - 10: { x: '1' }
 - 11: 'x'
 - 12: 1
 - 13: { x: '1' }
 - 14: 'x'
 - 15: 1
 - 16: { x: '1' }
 - 17: 'x'
 - 18: 1
 - 19: { x: '1' }
 - 20: 'x'
 - 21: 1
 - 22: { x: '1' }
 - 23: 'x'
 - 24: 1
 - 25: { x: '1' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
