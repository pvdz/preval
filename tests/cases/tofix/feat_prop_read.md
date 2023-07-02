# Preval test case

# feat_prop_read.md

> Tofix > Feat prop read
>
> Normalization of all kinds of expressions should work the same no matter where they are

de referentie naar b.x zou opgelost moeten kunnen worden.

## Input

`````js filename=intro
let b = { x: 1 };
for (; b?.["x"]; $(1));
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
{
  while (b?.[`x`]) {
    $(1);
  }
}
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = `x`;
    const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
    tmpIfTest = tmpChainElementObject;
  } else {
  }
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
const b = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpChainElementObject$1 = b.x;
  if (tmpChainElementObject$1) {
    $(1);
  } else {
    break;
  }
}
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
