# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > For b > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (; (a = { b } = $({ b: $(2) })); $(1));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  while ((a = { b: b } = $({ b: $(2) }))) {
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
let tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
let tmpClusterSSA_a = tmpNestedAssignObjPatternRhs;
if (tmpNestedAssignObjPatternRhs) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpObjLitVal$1 = $(2);
    const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
    const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$1);
    tmpClusterSSA_b = tmpNestedAssignObjPatternRhs$1.b;
    tmpClusterSSA_a = tmpNestedAssignObjPatternRhs$1;
    if (tmpNestedAssignObjPatternRhs$1) {
      $(1);
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = $( 2 );
const c = { b: b };
const d = $( c );
let e = d.b;
let f = d;
if (d) {
  $( 1 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const g = $( 2 );
    const h = { b: g };
    const i = $( h );
    e = i.b;
    f = i;
    if (i) {
      $( 1 );
    }
    else {
      break;
    }
  }
}
$( f, e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 1
 - 4: 2
 - 5: { b: '2' }
 - 6: 1
 - 7: 2
 - 8: { b: '2' }
 - 9: 1
 - 10: 2
 - 11: { b: '2' }
 - 12: 1
 - 13: 2
 - 14: { b: '2' }
 - 15: 1
 - 16: 2
 - 17: { b: '2' }
 - 18: 1
 - 19: 2
 - 20: { b: '2' }
 - 21: 1
 - 22: 2
 - 23: { b: '2' }
 - 24: 1
 - 25: 2
 - 26: { b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
