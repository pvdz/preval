# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > assignments > ternary_c > auto_ident_upd_mi_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = --$($(b)).x));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(b);
  const varInitAssignLhsComputedObj = tmpCallCallee$1(tmpCalleeParam$1);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpCalleeParam$1 = $(b);
  const varInitAssignLhsComputedObj = $(tmpCalleeParam$1);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 0
 - 5: 0, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
