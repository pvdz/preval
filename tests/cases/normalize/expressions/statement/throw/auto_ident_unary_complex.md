# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > statement > throw > auto_ident_unary_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw typeof $(x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
let tmpThrowArg = typeof tmpUnaryArg;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ number ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
