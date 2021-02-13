# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > statement > binary_right > auto_ident_func_anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + function () {};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
(function () {});
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
(function () {});
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same