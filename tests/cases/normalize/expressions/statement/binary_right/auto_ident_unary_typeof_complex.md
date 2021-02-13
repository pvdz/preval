# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > statement > binary_right > auto_ident_unary_typeof_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(100) + typeof $(arg);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(100);
const tmpUnaryArg = $(arg);
typeof tmpUnaryArg;
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
const tmpUnaryArg = $(1);
typeof tmpUnaryArg;
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
