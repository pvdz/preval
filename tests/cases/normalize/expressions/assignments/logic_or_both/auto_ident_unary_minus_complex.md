# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = -$(100)) || (a = -$(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = -$(100)) || (a = -$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = -tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
let tmpSSA_a = -tmpUnaryArg;
let tmpCalleeParam = tmpSSA_a;
if (tmpCalleeParam) {
} else {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = -tmpUnaryArg$1;
  tmpSSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -100
 - 3: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
