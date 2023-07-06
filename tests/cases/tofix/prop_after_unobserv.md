# Preval test case

# prop_after_unobserv.md

> Tofix > Prop after unobserv
>

Property read of tmpObjLitVal.y should be inliend and not be blocked by intermediate statements if they are unobservable.
This test used to be unrolled and now it's not.

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (; (a = b?.x?.y); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
{
  while ((a = b?.x?.y)) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$1 = tmpChainElementObject.y;
      a = tmpChainElementObject$1;
    } else {
    }
  } else {
  }
  let tmpIfTest = a;
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
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
let $tmpLoopUnrollCheck = $LOOP_UNROLL_10;
const tmpChainElementObject$1 = tmpObjLitVal.y;
let tmpClusterSSA_a = tmpChainElementObject$1;
if (tmpChainElementObject$1) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
while ($tmpLoopUnrollCheck) {
  tmpClusterSSA_a = undefined;
  const tmpChainElementObject$2 = b.x;
  const tmpIfTest$1 = tmpChainElementObject$2 == null;
  if (tmpIfTest$1) {
    $(1);
  } else {
    const tmpChainElementObject$4 = tmpChainElementObject$2.y;
    tmpClusterSSA_a = tmpChainElementObject$4;
    if (tmpChainElementObject$4) {
      $(1);
    } else {
      break;
    }
  }
}
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
