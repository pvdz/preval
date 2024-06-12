# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ([$(1), 2, $(3)]);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ([$(1), 2, $(3)]) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$3 = $(3);
  const tmpIfTest = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
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
$(1);
$(3);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  $(1);
  $(3);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 1 );
$( 3 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  $( 1 );
  $( 3 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 3
 - 4: 100
 - 5: 1
 - 6: 3
 - 7: 100
 - 8: 1
 - 9: 3
 - 10: 100
 - 11: 1
 - 12: 3
 - 13: 100
 - 14: 1
 - 15: 3
 - 16: 100
 - 17: 1
 - 18: 3
 - 19: 100
 - 20: 1
 - 21: 3
 - 22: 100
 - 23: 1
 - 24: 3
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
