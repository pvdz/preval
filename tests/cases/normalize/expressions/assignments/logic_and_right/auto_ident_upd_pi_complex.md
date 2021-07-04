# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) && (a = ++$($(b)).x));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(100) && (a = ++$($(b)).x));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(b);
  const varInitAssignLhsComputedObj = tmpCallCallee$1(tmpCalleeParam$1);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
const b = { x: 1 };
if (tmpCalleeParam) {
  const tmpCalleeParam$1 = $(b);
  const varInitAssignLhsComputedObj = $(tmpCalleeParam$1);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
} else {
  $(tmpCalleeParam);
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 2
 - 5: 2, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
