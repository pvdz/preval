# Preval test case

# auto_ident_new_complex.md

> normalize > expressions > assignments > logic_and_both > auto_ident_new_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = new ($($))(1)) && (a = new ($($))(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNewCallee = $($);
a = new tmpNewCallee(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNewCallee$1 = $($);
  const tmpNestedComplexRhs = new tmpNewCallee$1(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
let SSA_a = new tmpNewCallee(1);
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const tmpNewCallee$1 = $($);
  const tmpNestedComplexRhs = new tmpNewCallee$1(1);
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
 - 5: {}
 - 6: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
