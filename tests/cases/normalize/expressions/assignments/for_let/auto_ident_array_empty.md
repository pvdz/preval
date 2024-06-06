# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > For let > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = []); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = []);
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
a = [];
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output


`````js filename=intro
const a = [];
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(a);
  $(1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( 1 );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: 1
 - 3: []
 - 4: 1
 - 5: []
 - 6: 1
 - 7: []
 - 8: 1
 - 9: []
 - 10: 1
 - 11: []
 - 12: 1
 - 13: []
 - 14: 1
 - 15: []
 - 16: 1
 - 17: []
 - 18: 1
 - 19: []
 - 20: 1
 - 21: []
 - 22: 1
 - 23: []
 - 24: 1
 - 25: []
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
