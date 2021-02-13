# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > statement > ternary_c > auto_ident_unary_typeof_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(0) ? $(100) : typeof $(arg);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpUnaryArg = $(arg);
  typeof tmpUnaryArg;
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpUnaryArg = $(arg);
  typeof tmpUnaryArg;
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
