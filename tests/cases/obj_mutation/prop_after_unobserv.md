# Preval test case

# prop_after_unobserv.md

> Obj mutation > Prop after unobserv
>

Property read of tmpObjLitVal.y should be inlined and not be blocked by intermediate statements if they are unobservable.
The test shoudl end with an infinite loop calling $(1)

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (; (a = b?.x?.y); $(1));
$(a);
`````

## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(1);
}
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

## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
