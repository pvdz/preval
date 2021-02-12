# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > assignments > logic_and_both > auto_ident_upd_mi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = --b) && (a = --b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs$1 = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$2;
  const tmpNestedCompoundLhs$1 = b;
  const tmpNestedComplexRhs$3 = tmpNestedCompoundLhs$1 - 1;
  b = tmpNestedComplexRhs$3;
  tmpNestedComplexRhs$2 = tmpNestedComplexRhs$3;
  a = tmpNestedComplexRhs$2;
  tmpCalleeParam = tmpNestedComplexRhs$2;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs$1 = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$2;
  const tmpNestedCompoundLhs$1 = b;
  const tmpNestedComplexRhs$3 = tmpNestedCompoundLhs$1 - 1;
  b = tmpNestedComplexRhs$3;
  tmpNestedComplexRhs$2 = tmpNestedComplexRhs$3;
  a = tmpNestedComplexRhs$2;
  tmpCalleeParam = tmpNestedComplexRhs$2;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
