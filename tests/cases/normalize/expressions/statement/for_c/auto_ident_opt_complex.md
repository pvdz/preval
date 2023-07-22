# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > For c > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); $(b)?.x);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(b)?.x;
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = tmpChainElementCall.x;
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
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    tmpChainElementCall.x;
  }
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpChainElementCall$1 = $(b);
      const tmpIfTest$2 = tmpChainElementCall$1 == null;
      if (tmpIfTest$2) {
      } else {
        tmpChainElementCall$1.x;
      }
      tmpIfTest = $(1);
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
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
let c = $( 1 );
let d = true;
if (c) {
  const e = $( a );
  const f = e == null;
  if (f) {

  }
  else {
    e.x;
  }
  c = $( 1 );
}
else {
  d = false;
}
if (d) {
  while ($LOOP_UNROLL_10) {
    if (c) {
      const g = $( a );
      const h = g == null;
      if (h) {

      }
      else {
        g.x;
      }
      c = $( 1 );
    }
    else {
      break;
    }
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 1
 - 4: { x: '1' }
 - 5: 1
 - 6: { x: '1' }
 - 7: 1
 - 8: { x: '1' }
 - 9: 1
 - 10: { x: '1' }
 - 11: 1
 - 12: { x: '1' }
 - 13: 1
 - 14: { x: '1' }
 - 15: 1
 - 16: { x: '1' }
 - 17: 1
 - 18: { x: '1' }
 - 19: 1
 - 20: { x: '1' }
 - 21: 1
 - 22: { x: '1' }
 - 23: 1
 - 24: { x: '1' }
 - 25: 1
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
