# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > For let > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let xyz = (a = { x, y } = { x: $(3), y: $(4) }); ; $(1)) $(xyz);
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  let xyz = (a = { x: x, y: y } = { x: $(3), y: $(4) });
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a, x, y);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
$(tmpNestedAssignObjPatternRhs);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpNestedAssignObjPatternRhs);
  $(1);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = {
x: a,
y: b
;
$( c );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( c );
  $( 1 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { x: '3', y: '4' }
 - 4: 1
 - 5: { x: '3', y: '4' }
 - 6: 1
 - 7: { x: '3', y: '4' }
 - 8: 1
 - 9: { x: '3', y: '4' }
 - 10: 1
 - 11: { x: '3', y: '4' }
 - 12: 1
 - 13: { x: '3', y: '4' }
 - 14: 1
 - 15: { x: '3', y: '4' }
 - 16: 1
 - 17: { x: '3', y: '4' }
 - 18: 1
 - 19: { x: '3', y: '4' }
 - 20: 1
 - 21: { x: '3', y: '4' }
 - 22: 1
 - 23: { x: '3', y: '4' }
 - 24: 1
 - 25: { x: '3', y: '4' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
