# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > assignments > logic_or_right > auto_ident_logic_and_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) || (a = $($(1)) && 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    tmpNestedComplexRhs = 2;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$1 = $(1);
  let tmpNestedComplexRhs = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    tmpNestedComplexRhs = 2;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same