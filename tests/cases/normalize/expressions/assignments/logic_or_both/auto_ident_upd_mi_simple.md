# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > assignments > logic_or_both > auto_ident_upd_mi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = --b) || (a = --b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  b = b - 1;
  let tmpNestedComplexRhs$1 = b;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let SSA_b = 0;
let SSA_a = 0;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  SSA_b = SSA_b - 1;
  const tmpNestedComplexRhs$1 = SSA_b;
  SSA_a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
$(tmpCalleeParam);
$(SSA_a, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - 2: -1, -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
