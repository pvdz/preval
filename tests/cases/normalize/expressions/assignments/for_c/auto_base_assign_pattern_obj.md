# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > For c > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (; $(1); a = { b } = $({ b: $(2) }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = { b: b } = $({ b: $(2) });
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    a = tmpNestedAssignObjPatternRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let b /*:unknown*/ = {};
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(2);
  const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpObjLitVal$1 /*:unknown*/ = $(2);
      const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal$1 };
      const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
      b = tmpNestedAssignObjPatternRhs$1.b;
      a = tmpNestedAssignObjPatternRhs$1;
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {};
let b = {
  a: 999,
  b: 1000,
};
const c = $( 1 );
if (c) {
  const d = $( 2 );
  const e = { b: d };
  const f = $( e );
  a = f.b;
  b = f;
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( 2 );
      const i = { b: h };
      const j = $( i );
      a = j.b;
      b = j;
    }
    else {
      break;
    }
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: 1
 - 5: 2
 - 6: { b: '2' }
 - 7: 1
 - 8: 2
 - 9: { b: '2' }
 - 10: 1
 - 11: 2
 - 12: { b: '2' }
 - 13: 1
 - 14: 2
 - 15: { b: '2' }
 - 16: 1
 - 17: 2
 - 18: { b: '2' }
 - 19: 1
 - 20: 2
 - 21: { b: '2' }
 - 22: 1
 - 23: 2
 - 24: { b: '2' }
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
