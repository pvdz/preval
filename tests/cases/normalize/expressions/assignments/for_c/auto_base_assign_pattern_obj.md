# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > For c > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

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
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    a = tmpNestedAssignObjPatternRhs;
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let b = {};
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpObjLitVal$1 = $(2);
      const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
      const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$1);
      b = tmpNestedAssignObjPatternRhs$1.b;
      tmpClusterSSA_tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {};
const b = $( 1 );
if (b) {
  const c = $( 2 );
  const d = { b: c };
  const e = $( d );
  a = e.b;
  let f = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (f) {
      const g = $( 2 );
      const h = { b: g };
      const i = $( h );
      a = i.b;
      f = $( 1 );
    }
    else {
      break;
    }
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j, a );
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
