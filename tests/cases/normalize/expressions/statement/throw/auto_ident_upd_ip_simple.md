# Preval test case

# auto_ident_upd_ip_simple.md

> normalize > expressions > statement > throw > auto_ident_upd_ip_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw b++;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b + 1;
let tmpThrowArg = tmpPostUpdArgIdent;
throw tmpThrowArg;
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
