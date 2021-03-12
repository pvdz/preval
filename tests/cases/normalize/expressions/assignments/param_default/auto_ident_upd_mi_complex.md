# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = --$($(b)).x)) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const varInitAssignLhsComputedObj = tmpCallCallee(tmpCalleeParam);
    const tmpBinLhs = varInitAssignLhsComputedObj.x;
    const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = $(b);
    const varInitAssignLhsComputedObj = $(tmpCalleeParam);
    const tmpBinLhs = varInitAssignLhsComputedObj.x;
    const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
    a = varInitAssignLhsComputedRhs;
  }
};
const b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: undefined
 - 4: 0, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
