# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) && (a = $($)(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) && (a = $($)(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $($);
a = tmpCallCallee$1(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCallCallee$3 = $($);
  const tmpNestedComplexRhs = tmpCallCallee$3(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCallCallee$1 = $($);
let SSA_a = tmpCallCallee$1(1);
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const tmpCallCallee$3 = $($);
  const tmpNestedComplexRhs = tmpCallCallee$3(1);
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
