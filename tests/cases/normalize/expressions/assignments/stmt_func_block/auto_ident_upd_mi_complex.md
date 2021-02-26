# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = { a: 999, b: 1000 };
    a = --$($(b)).x;
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  $(a, b);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { x: 1 };
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  $(tmpNestedPropCompoundComplexRhs, b);
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 0, { x: '0' }
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
