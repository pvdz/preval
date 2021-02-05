# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > assignments > ternary_b > auto_base_assign_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(1) ? (a = b = $(2)) : $(200));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs;
  const tmpNestedComplexRhs$1 = $(2);
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs;
  const tmpNestedComplexRhs$1 = $(2);
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
