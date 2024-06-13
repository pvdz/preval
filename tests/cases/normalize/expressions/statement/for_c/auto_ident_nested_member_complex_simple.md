# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Statement > For c > Auto ident nested member complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for (; $(1); $(b)[$("x")] = $(c)[$("y")] = d);
$(a, b, c, d);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(b)[$(`x`)] = $(c)[$(`y`)] = d;
  }
}
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpAssignComMemLhsObj = $(b);
    const tmpAssignComMemLhsProp = $(`x`);
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedProp = $(`y`);
    const varInitAssignLhsComputedRhs = d;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpAssignComputedRhs = varInitAssignLhsComputedRhs;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, b, c, d);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpAssignComMemLhsObj$1 = $(b);
      const tmpAssignComMemLhsProp$1 = $(`x`);
      const varInitAssignLhsComputedObj$1 = $(c);
      const varInitAssignLhsComputedProp$1 = $(`y`);
      varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
      tmpAssignComMemLhsObj$1[tmpAssignComMemLhsProp$1] = 3;
      tmpClusterSSA_tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a, b, c, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
const c = {
  a: 999,
  b: 1000,
};
const d = $( 1 );
if (d) {
  const e = $( a );
  const f = $( "x" );
  const g = $( b );
  const h = $( "y" );
  g[h] = 3;
  e[f] = 3;
  let i = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (i) {
      const j = $( a );
      const k = $( "x" );
      const l = $( b );
      const m = $( "y" );
      l[m] = 3;
      j[k] = 3;
      i = $( 1 );
    }
    else {
      break;
    }
  }
}
$( c, a, b, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 1
 - 7: { x: '3' }
 - 8: 'x'
 - 9: { y: '3' }
 - 10: 'y'
 - 11: 1
 - 12: { x: '3' }
 - 13: 'x'
 - 14: { y: '3' }
 - 15: 'y'
 - 16: 1
 - 17: { x: '3' }
 - 18: 'x'
 - 19: { y: '3' }
 - 20: 'y'
 - 21: 1
 - 22: { x: '3' }
 - 23: 'x'
 - 24: { y: '3' }
 - 25: 'y'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
