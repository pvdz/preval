# Preval test case

# auto_ident_unary_excl_complex.md

> normalize > expressions > assignments > logic_and_both > auto_ident_unary_excl_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = !$(100)) && (a = !$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = !tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
let SSA_a = !tmpUnaryArg;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = !tmpUnaryArg$1;
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
 - 1: 100
 - 2: false
 - 3: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
