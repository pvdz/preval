# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Do while > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (({ b } = $({ b: $(2) })));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = { b: b } = $({ b: $(2) });
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCallCallee = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    tmpDoWhileFlag = tmpNestedAssignObjPatternRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
$(100);
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
let tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  $(100);
  const tmpObjLitVal$1 = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
  const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$1);
  tmpClusterSSA_b = tmpNestedAssignObjPatternRhs$1.b;
  let tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedAssignObjPatternRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag$1) {
      $(100);
      const tmpObjLitVal$2 = $(2);
      const tmpCalleeParam$2 = { b: tmpObjLitVal$2 };
      const tmpNestedAssignObjPatternRhs$2 = $(tmpCalleeParam$2);
      tmpClusterSSA_b = tmpNestedAssignObjPatternRhs$2.b;
      tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedAssignObjPatternRhs$2;
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( 2 );
const b = { b: a };
const c = $( b );
let d = c.b;
if (c) {
  $( 100 );
  const e = $( 2 );
  const f = { b: e };
  const g = $( f );
  d = g.b;
  let h = g;
  while ($LOOP_UNROLL_9) {
    if (h) {
      $( 100 );
      const i = $( 2 );
      const j = { b: i };
      const k = $( j );
      d = k.b;
      h = k;
    }
    else {
      break;
    }
  }
}
const l = {
a: 999,
b: 1000
;
$( l, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: { b: '2' }
 - 4: 100
 - 5: 2
 - 6: { b: '2' }
 - 7: 100
 - 8: 2
 - 9: { b: '2' }
 - 10: 100
 - 11: 2
 - 12: { b: '2' }
 - 13: 100
 - 14: 2
 - 15: { b: '2' }
 - 16: 100
 - 17: 2
 - 18: { b: '2' }
 - 19: 100
 - 20: 2
 - 21: { b: '2' }
 - 22: 100
 - 23: 2
 - 24: { b: '2' }
 - 25: 100
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
