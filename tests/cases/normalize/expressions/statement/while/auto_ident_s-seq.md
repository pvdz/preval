# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Statement > While > Auto ident s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
while (($(1), $(2), x)) $(100);
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (($(1), $(2), x)) $(100);
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(1);
  $(2);
  const tmpIfTest = x;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, x);
`````

## Output


`````js filename=intro
$(1);
$(2);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  $(2);
  $(100);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  $( 2 );
  $( 100 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: 1
 - 5: 2
 - 6: 100
 - 7: 1
 - 8: 2
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 100
 - 16: 1
 - 17: 2
 - 18: 100
 - 19: 1
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
