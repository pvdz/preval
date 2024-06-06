# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Do while > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = ($(1), $(2), x)));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = ($(1), $(2), x))) {
  } else {
    break;
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  $(1);
  $(2);
  a = x;
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, x);
`````

## Output


`````js filename=intro
$(100);
$(1);
$(2);
$(100);
$(1);
$(2);
$(100);
$(1);
$(2);
$(100);
$(1);
$(2);
$(100);
$(1);
$(2);
$(100);
$(1);
$(2);
$(100);
$(1);
$(2);
$(100);
$(1);
$(2);
$(100);
$(1);
$(2);
$(100);
$(1);
$(2);
$(100);
$(1);
$(2);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  $(1);
  $(2);
}
$(1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 1 );
$( 2 );
$( 100 );
$( 1 );
$( 2 );
$( 100 );
$( 1 );
$( 2 );
$( 100 );
$( 1 );
$( 2 );
$( 100 );
$( 1 );
$( 2 );
$( 100 );
$( 1 );
$( 2 );
$( 100 );
$( 1 );
$( 2 );
$( 100 );
$( 1 );
$( 2 );
$( 100 );
$( 1 );
$( 2 );
$( 100 );
$( 1 );
$( 2 );
$( 100 );
$( 1 );
$( 2 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  $( 1 );
  $( 2 );
}
$( 1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 100
 - 8: 1
 - 9: 2
 - 10: 100
 - 11: 1
 - 12: 2
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 100
 - 20: 1
 - 21: 2
 - 22: 100
 - 23: 1
 - 24: 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
