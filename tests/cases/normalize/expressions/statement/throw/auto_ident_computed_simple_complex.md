# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > statement > throw > auto_ident_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw b[$("c")];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $('c');
let tmpThrowArg = tmpCompObj[tmpCompProp];
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $('c');
let tmpThrowArg = tmpCompObj[tmpCompProp];
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - 1: 'c'
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
