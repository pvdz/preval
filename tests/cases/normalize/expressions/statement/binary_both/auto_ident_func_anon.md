# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > statement > binary_both > auto_ident_func_anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(function () {} + function () {});
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
(function () {});
(function () {});
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
(function () {});
(function () {});
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same