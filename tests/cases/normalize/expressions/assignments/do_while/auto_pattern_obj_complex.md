# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Do while > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
do {
  $(100);
} while (({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (({ a: a } = $({ a: 1, b: 2 }))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
while (true) {
  $(100);
  let tmpIfTest = undefined;
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpIfTest = tmpNestedAssignObjPatternRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
$(100);
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
let tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
    const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
    tmpClusterSSA_a = tmpNestedAssignObjPatternRhs$1.a;
    if (tmpNestedAssignObjPatternRhs$1) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
let c = b.a;
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = {
      a: 1,
      b: 2,
    };
    const e = $( d );
    c = e.a;
    if (e) {

    }
    else {
      break;
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '1', b: '2' }
 - 3: 100
 - 4: { a: '1', b: '2' }
 - 5: 100
 - 6: { a: '1', b: '2' }
 - 7: 100
 - 8: { a: '1', b: '2' }
 - 9: 100
 - 10: { a: '1', b: '2' }
 - 11: 100
 - 12: { a: '1', b: '2' }
 - 13: 100
 - 14: { a: '1', b: '2' }
 - 15: 100
 - 16: { a: '1', b: '2' }
 - 17: 100
 - 18: { a: '1', b: '2' }
 - 19: 100
 - 20: { a: '1', b: '2' }
 - 21: 100
 - 22: { a: '1', b: '2' }
 - 23: 100
 - 24: { a: '1', b: '2' }
 - 25: 100
 - 26: { a: '1', b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
