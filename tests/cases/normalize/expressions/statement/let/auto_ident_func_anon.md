# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > statement > let > auto_ident_func_anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = function () {};
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = function () {};
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = function () {};
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
