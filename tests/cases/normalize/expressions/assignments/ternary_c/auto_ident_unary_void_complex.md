# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = void $(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = void $(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  $(100);
  const tmpNestedComplexRhs = undefined;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  $(100);
  a = undefined;
  tmpCalleeParam = undefined;
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 100
 - 3: undefined
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
