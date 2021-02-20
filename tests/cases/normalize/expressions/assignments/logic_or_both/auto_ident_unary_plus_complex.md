# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident unary plus complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = +$(100)) || (a = +$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = +tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = +tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
let SSA_a = +tmpUnaryArg;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = +tmpUnaryArg$1;
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
 - 2: 100
 - 3: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
