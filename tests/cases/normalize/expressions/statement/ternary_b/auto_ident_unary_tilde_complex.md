# Preval test case

# auto_ident_unary_tilde_complex.md

> normalize > expressions > statement > ternary_b > auto_ident_unary_tilde_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? ~$(100) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpUnaryArg = $(100);
  ~tmpUnaryArg;
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpUnaryArg = $(100);
  ~tmpUnaryArg;
} else {
  $(200);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same