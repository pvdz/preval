# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > statement > throw > auto_ident_func_anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw function () {};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = function () {};
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpThrowArg = function () {};
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ function() {} ]>')

Normalized calls: Same

Final output calls: Same
