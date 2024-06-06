# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Statement > For let > Auto ident logic or simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = 0 || 2; ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = 0 || 2;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 0;
if (xyz) {
} else {
  xyz = 2;
}
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output


`````js filename=intro
$(2);
$(1);
$(2);
$(1);
$(2);
$(1);
$(2);
$(1);
$(2);
$(1);
$(2);
$(1);
$(2);
$(1);
$(2);
$(1);
$(2);
$(1);
$(2);
$(1);
$(2);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(2);
  $(1);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
$( 1 );
$( 2 );
$( 1 );
$( 2 );
$( 1 );
$( 2 );
$( 1 );
$( 2 );
$( 1 );
$( 2 );
$( 1 );
$( 2 );
$( 1 );
$( 2 );
$( 1 );
$( 2 );
$( 1 );
$( 2 );
$( 1 );
$( 2 );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 2 );
  $( 1 );
}
const a = {
a: 999,
b: 1000
;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 2
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 2
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
