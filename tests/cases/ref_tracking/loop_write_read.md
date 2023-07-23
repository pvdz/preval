# Preval test case

# loop_write_read.md

> Ref tracking > Loop write read
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  $(x);
}
`````

## Pre Normal

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  $(x);
}
`````

## Output

`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(7);
$(8);
$(9);
$(10);
let x = 11;
$(11);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  x = x + 1;
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
$( 4 );
$( 5 );
$( 6 );
$( 7 );
$( 8 );
$( 9 );
$( 10 );
let a = 11;
$( 11 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a = a + 1;
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: 7
 - 8: 8
 - 9: 9
 - 10: 10
 - 11: 11
 - 12: 12
 - 13: 13
 - 14: 14
 - 15: 15
 - 16: 16
 - 17: 17
 - 18: 18
 - 19: 19
 - 20: 20
 - 21: 21
 - 22: 22
 - 23: 23
 - 24: 24
 - 25: 25
 - 26: 26
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same