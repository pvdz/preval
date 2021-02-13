# Preval test case

# auto_ident_unary_plus_complex.md

> normalize > expressions > statement > objlit_dyn_prop > auto_ident_unary_plus_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ [+$(100)]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
+tmpUnaryArg;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
+tmpUnaryArg;
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same