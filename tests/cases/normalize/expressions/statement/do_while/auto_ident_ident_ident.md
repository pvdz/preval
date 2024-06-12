# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Do while > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((b = 2));
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((b = 2)) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  b = 2;
  let tmpIfTest = b;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output


`````js filename=intro
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
