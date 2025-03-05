# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > For let > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (let xyz = ({ b } = $({ b: $(2) })); ; $(1)) $(xyz);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  let xyz = ({ b: b } = $({ b: $(2) }));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
xyz = tmpNestedAssignObjPatternRhs;
while (true) {
  $(xyz);
  $(1);
}
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
tmpNestedAssignObjPatternRhs.b;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpNestedAssignObjPatternRhs);
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
c.b;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( c );
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }
 - 4: 1
 - 5: { b: '2' }
 - 6: 1
 - 7: { b: '2' }
 - 8: 1
 - 9: { b: '2' }
 - 10: 1
 - 11: { b: '2' }
 - 12: 1
 - 13: { b: '2' }
 - 14: 1
 - 15: { b: '2' }
 - 16: 1
 - 17: { b: '2' }
 - 18: 1
 - 19: { b: '2' }
 - 20: 1
 - 21: { b: '2' }
 - 22: 1
 - 23: { b: '2' }
 - 24: 1
 - 25: { b: '2' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
