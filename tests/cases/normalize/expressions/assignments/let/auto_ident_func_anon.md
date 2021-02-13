# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > assignments > let > auto_ident_func_anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = function () {});
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {};
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {};
let xyz = a;
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: 'function'
 - 2: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same