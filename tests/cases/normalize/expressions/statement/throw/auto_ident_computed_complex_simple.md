# Preval test case

# auto_ident_computed_complex_simple.md

> normalize > expressions > statement > throw > auto_ident_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw $(b)["c"];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpThrowArg = tmpCompObj.c;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpThrowArg = tmpCompObj.c;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
