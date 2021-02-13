# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > statement > arr_spread > auto_ident_func_anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...function () {}];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElToSpread = function () {};
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElToSpread = function () {};
[...tmpArrElToSpread];
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same