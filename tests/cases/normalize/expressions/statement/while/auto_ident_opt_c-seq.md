# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > While > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ((1, 2, $(b))?.x) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while ((1, 2, $(b))?.x) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
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
const tmpChainRootProp = $(b);
const tmpIfTest$1 = tmpChainRootProp == null;
if (tmpIfTest$1) {
  $(100);
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  if (tmpChainElementObject) {
    $(100);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpChainRootProp$1 = $(b);
    const tmpIfTest$4 = tmpChainRootProp$1 == null;
    if (tmpIfTest$4) {
      $(100);
    } else {
      const tmpChainElementObject$1 = tmpChainRootProp$1.x;
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
  const f = d.x;
  if (f) {
    $( 100 );
  }
  else {
    c = false;
  }
}
if (c) {
  while ($LOOP_UNROLL_10) {
    const g = $( a );
    const h = g == null;
    if (h) {
      $( 100 );
    }
    else {
      const i = g.x;
      if (i) {
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
 - 2: 100
 - 3: { x: '1' }
 - 4: 100
 - 5: { x: '1' }
 - 6: 100
 - 7: { x: '1' }
 - 8: 100
 - 9: { x: '1' }
 - 10: 100
 - 11: { x: '1' }
 - 12: 100
 - 13: { x: '1' }
 - 14: 100
 - 15: { x: '1' }
 - 16: 100
 - 17: { x: '1' }
 - 18: 100
 - 19: { x: '1' }
 - 20: 100
 - 21: { x: '1' }
 - 22: 100
 - 23: { x: '1' }
 - 24: 100
 - 25: { x: '1' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
