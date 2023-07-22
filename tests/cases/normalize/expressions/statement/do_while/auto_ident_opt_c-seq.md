# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Do while > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((1, 2, $(b))?.x);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = (1, 2, $(b))?.x;
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    tmpDoWhileFlag = undefined;
    const tmpChainRootProp = $(b);
    const tmpIfTest = tmpChainRootProp != null;
    if (tmpIfTest) {
      const tmpChainElementObject = tmpChainRootProp.x;
      tmpDoWhileFlag = tmpChainElementObject;
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
const b = { x: 1 };
const a = { a: 999, b: 1000 };
$(100);
let tmpDoWhileFlag = false;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpDoWhileFlag = tmpChainElementObject;
}
let $tmpLoopUnrollCheck = true;
if (tmpDoWhileFlag) {
  $(100);
  tmpDoWhileFlag = false;
  const tmpChainRootProp$1 = $(b);
  const tmpIfTest$1 = tmpChainRootProp$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
    tmpDoWhileFlag = tmpChainElementObject$1;
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      tmpDoWhileFlag = false;
      const tmpChainRootProp$2 = $(b);
      const tmpIfTest$2 = tmpChainRootProp$2 == null;
      if (tmpIfTest$2) {
      } else {
        const tmpChainElementObject$2 = tmpChainRootProp$2.x;
        tmpDoWhileFlag = tmpChainElementObject$2;
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
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
$( 100 );
let c = false;
const d = $( a );
const e = d == null;
if (e) {

}
else {
  const f = d.x;
  c = f;
}
let g = true;
if (c) {
  $( 100 );
  c = false;
  const h = $( a );
  const i = h == null;
  if (i) {

  }
  else {
    const j = h.x;
    c = j;
  }
}
else {
  g = false;
}
if (g) {
  while ($LOOP_UNROLL_9) {
    if (c) {
      $( 100 );
      c = false;
      const k = $( a );
      const l = k == null;
      if (l) {

      }
      else {
        const m = k.x;
        c = m;
      }
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
