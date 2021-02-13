# Preval test case

# auto_ident_nested_member_complex_call.md

> normalize > expressions > statement > arr_element > auto_ident_nested_member_complex_call
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
($(b)[$("x")] = $(c)[$("y")] = $(d)) + ($(b)[$("x")] = $(c)[$("y")] = $(d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $('x');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $('y');
const varInitAssignLhsComputedRhs = $(d);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpAssignComputedRhs = varInitAssignLhsComputedRhs;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
const tmpAssignComMemLhsObj$1 = $(b);
const tmpAssignComMemLhsProp$1 = $('x');
const tmpAssignComputedObj$1 = tmpAssignComMemLhsObj$1;
const tmpAssignComputedProp$1 = tmpAssignComMemLhsProp$1;
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $('y');
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const tmpAssignComputedRhs$1 = varInitAssignLhsComputedRhs$1;
tmpAssignComputedObj$1[tmpAssignComputedProp$1] = tmpAssignComputedRhs$1;
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $('x');
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $('y');
const varInitAssignLhsComputedRhs = $(d);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = varInitAssignLhsComputedRhs;
const tmpAssignComMemLhsObj$1 = $(b);
const tmpAssignComMemLhsProp$1 = $('x');
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $('y');
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
tmpAssignComMemLhsObj$1[tmpAssignComMemLhsProp$1] = varInitAssignLhsComputedRhs$1;
$(a, b, c, d);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 3
 - 6: { x: '3' }
 - 7: 'x'
 - 8: { y: '3' }
 - 9: 'y'
 - 10: 3
 - 11: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
