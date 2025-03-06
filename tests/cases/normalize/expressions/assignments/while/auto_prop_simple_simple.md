# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > While > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = { b: $(1) })) $(100);
a.b = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = { b: $(1) })) $(100);
a.b = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
a.b = 2;
$(a);
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  $(100);
}
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  $( 100 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check