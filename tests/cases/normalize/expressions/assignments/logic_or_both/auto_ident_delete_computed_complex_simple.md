# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > logic_or_both > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete $(arg)["y"]) || (a = delete $(arg)["y"]));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = 'y';
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpDeleteCompObj$1 = $(arg);
  const tmpDeleteCompProp$1 = 'y';
  const tmpNestedComplexRhs = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
let SSA_a = delete tmpDeleteCompObj['y'];
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  const tmpDeleteCompObj$1 = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteCompObj$1['y'];
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
