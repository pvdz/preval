# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > Param default > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
function f(p = (a = $(b)[$("x")] = $(c)[$("y")] = d + e)) {}
$(f());
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedProp = $('x');
    const varInitAssignLhsComputedObj$1 = $(c);
    const varInitAssignLhsComputedProp$1 = $('y');
    const varInitAssignLhsComputedRhs$1 = d + e;
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
};
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedProp = $('x');
    const varInitAssignLhsComputedObj$1 = $(c);
    const varInitAssignLhsComputedProp$1 = $('y');
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
    a = 7;
  }
};
const b = { x: 1 };
const c = { y: 2 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, c, 3, 4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: undefined
 - 6: 7, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
