# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > statement > binary_both > auto_ident_unary_typeof_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
typeof $(arg) + typeof $(arg);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
typeof tmpUnaryArg;
const tmpUnaryArg$1 = $(arg);
typeof tmpUnaryArg$1;
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
typeof tmpUnaryArg;
const tmpUnaryArg$1 = $(arg);
typeof tmpUnaryArg$1;
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same