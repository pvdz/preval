# Preval test case

# auto_ident_unary_plus_complex.md

> normalize > expressions > statement > ternary_c > auto_ident_unary_plus_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(0) ? $(100) : +$(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpUnaryArg = $(100);
  +tmpUnaryArg;
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpUnaryArg = $(100);
  +tmpUnaryArg;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
