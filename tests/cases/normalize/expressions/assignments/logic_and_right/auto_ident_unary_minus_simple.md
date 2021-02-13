# Preval test case

# auto_ident_unary_minus_simple.md

> normalize > expressions > assignments > logic_and_right > auto_ident_unary_minus_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$($(100) && (a = -arg));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = -arg;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = -arg;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: -1
 - 3: -1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
