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
while (true) {
  {
    $(100);
  }
  if ((1, 2, $(b))?.x) {
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
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
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
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let $tmpLoopUnrollCheck = true;
$(100);
let tmpIfTest = false;
const tmpChainRootProp = $(b);
const tmpIfTest$1 = tmpChainRootProp == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 = false;
    const tmpChainRootProp$1 = $(b);
    const tmpIfTest$4 = tmpChainRootProp$1 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementObject$1 = tmpChainRootProp$1.x;
      tmpIfTest$2 = tmpChainElementObject$1;
    }
    if (tmpIfTest$2) {
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
  b: 1000,
};
let c = true;
$( 100 );
let d = false;
const e = $( a );
const f = e == null;
if (f) {

}
else {
  const g = e.x;
  d = g;
}
if (d) {

}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let h = false;
    const i = $( a );
    const j = i == null;
    if (j) {

    }
    else {
      const k = i.x;
      h = k;
    }
    if (h) {

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
