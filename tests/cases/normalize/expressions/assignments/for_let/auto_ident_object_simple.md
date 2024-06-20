# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = { x: 1, y: 2, z: 3 }); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = { x: 1, y: 2, z: 3 });
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
a = { x: 1, y: 2, z: 3 };
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````

## Output


`````js filename=intro
const a = { x: 1, y: 2, z: 3 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(a);
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - 2: 1
 - 3: { x: '1', y: '2', z: '3' }
 - 4: 1
 - 5: { x: '1', y: '2', z: '3' }
 - 6: 1
 - 7: { x: '1', y: '2', z: '3' }
 - 8: 1
 - 9: { x: '1', y: '2', z: '3' }
 - 10: 1
 - 11: { x: '1', y: '2', z: '3' }
 - 12: 1
 - 13: { x: '1', y: '2', z: '3' }
 - 14: 1
 - 15: { x: '1', y: '2', z: '3' }
 - 16: 1
 - 17: { x: '1', y: '2', z: '3' }
 - 18: 1
 - 19: { x: '1', y: '2', z: '3' }
 - 20: 1
 - 21: { x: '1', y: '2', z: '3' }
 - 22: 1
 - 23: { x: '1', y: '2', z: '3' }
 - 24: 1
 - 25: { x: '1', y: '2', z: '3' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
