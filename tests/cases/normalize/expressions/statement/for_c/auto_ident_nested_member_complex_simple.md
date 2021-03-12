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
    $(b)[$('x')] = $(c)[$('y')] = d;
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
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpAssignComMemLhsObj = $(b);
    const tmpAssignComMemLhsProp = $('x');
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedProp = $('y');
    const varInitAssignLhsComputedRhs = d;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpAssignComputedRhs = varInitAssignLhsComputedRhs;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
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
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpAssignComMemLhsObj = $(b);
    const tmpAssignComMemLhsProp = $('x');
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedProp = $('y');
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
    tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
  } else {
    break;
  }
}
$(a, b, c, 3);
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
