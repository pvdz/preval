# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Do while > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

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
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = { a: a } = $({ a: 1, b: 2 });
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: 1, b: 2 };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    a = tmpNestedAssignObjPatternRhs.a;
    tmpDoWhileFlag = tmpNestedAssignObjPatternRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
let tmpSSA_a = tmpNestedAssignObjPatternRhs.a;
let tmpSSA_tmpDoWhileFlag = tmpNestedAssignObjPatternRhs;
if (tmpNestedAssignObjPatternRhs) {
  $(100);
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$1);
  tmpSSA_a = tmpNestedAssignObjPatternRhs$1.a;
  tmpSSA_tmpDoWhileFlag = tmpNestedAssignObjPatternRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$2 = { a: 1, b: 2 };
      const tmpNestedAssignObjPatternRhs$2 = $(tmpCalleeParam$2);
      tmpSSA_a = tmpNestedAssignObjPatternRhs$2.a;
      tmpSSA_tmpDoWhileFlag = tmpNestedAssignObjPatternRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = {
a: 1,
b: 2
;
const b = $( a );
let c = b.a;
let d = b;
if (b) {
  $( 100 );
  const e = {
a: 1,
b: 2
  ;
  const f = $( e );
  c = f.a;
  d = f;
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      const g = {
a: 1,
b: 2
      ;
      const h = $( g );
      c = h.a;
      d = h;
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
