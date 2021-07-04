# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = !$(100)) && (a = !$(100)));
$(a);
`````

## Pre Normal

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
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
let a = !tmpUnaryArg;
const tmpCalleeParam = a;
if (a) {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = !tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
