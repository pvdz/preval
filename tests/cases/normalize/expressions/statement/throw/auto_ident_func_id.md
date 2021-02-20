# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Statement > Throw > Auto ident func id
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw function f() {};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = function f() {};
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpThrowArg = function f() {};
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ function f() {} ]>')

Normalized calls: Same

Final output calls: Same
