# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > While > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ([$(1), 2, $(3)]) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ([$(1), 2, $(3)]) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$3 = $(3);
  const tmpIfTest = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
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
$(1);
$(3);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  $(3);
  $(100);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 3 );
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  $( 3 );
  $( 100 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 100
 - 4: 1
 - 5: 3
 - 6: 100
 - 7: 1
 - 8: 3
 - 9: 100
 - 10: 1
 - 11: 3
 - 12: 100
 - 13: 1
 - 14: 3
 - 15: 100
 - 16: 1
 - 17: 3
 - 18: 100
 - 19: 1
 - 20: 3
 - 21: 100
 - 22: 1
 - 23: 3
 - 24: 100
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
