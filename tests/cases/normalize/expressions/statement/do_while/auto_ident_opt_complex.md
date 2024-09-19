# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($(b)?.x);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($(b)?.x) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainElementCall.x;
    tmpIfTest = tmpChainElementObject;
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
const b /*:object*/ = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 = false;
    const tmpChainElementCall$1 = $(b);
    const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementObject$1 = tmpChainElementCall$1.x;
      tmpIfTest$2 = tmpChainElementObject$1;
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
$( 100 );
let a = false;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = c.x;
  a = e;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let f = false;
    const g = $( b );
    const h = g == null;
    if (h) {

    }
    else {
      const i = g.x;
      f = i;
    }
    if (f) {

    }
    else {
      break;
    }
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 100
 - 4: { x: '1' }
 - 5: 100
 - 6: { x: '1' }
 - 7: 100
 - 8: { x: '1' }
 - 9: 100
 - 10: { x: '1' }
 - 11: 100
 - 12: { x: '1' }
 - 13: 100
 - 14: { x: '1' }
 - 15: 100
 - 16: { x: '1' }
 - 17: 100
 - 18: { x: '1' }
 - 19: 100
 - 20: { x: '1' }
 - 21: 100
 - 22: { x: '1' }
 - 23: 100
 - 24: { x: '1' }
 - 25: 100
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
