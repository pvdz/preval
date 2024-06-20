# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = [1, 2, 3]); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = [1, 2, 3]);
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
a = [1, 2, 3];
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````

## Output


`````js filename=intro
const a = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(a);
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 1
 - 3: [1, 2, 3]
 - 4: 1
 - 5: [1, 2, 3]
 - 6: 1
 - 7: [1, 2, 3]
 - 8: 1
 - 9: [1, 2, 3]
 - 10: 1
 - 11: [1, 2, 3]
 - 12: 1
 - 13: [1, 2, 3]
 - 14: 1
 - 15: [1, 2, 3]
 - 16: 1
 - 17: [1, 2, 3]
 - 18: 1
 - 19: [1, 2, 3]
 - 20: 1
 - 21: [1, 2, 3]
 - 22: 1
 - 23: [1, 2, 3]
 - 24: 1
 - 25: [1, 2, 3]
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
