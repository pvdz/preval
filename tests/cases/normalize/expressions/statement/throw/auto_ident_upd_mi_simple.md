# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > statement > throw > auto_ident_upd_mi_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw --b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b - 1;
let tmpThrowArg = b;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let b = 1;
const a = { a: 999, b: 1000 };
b = b - 1;
const tmpThrowArg = b;
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ 0 ]>')

Normalized calls: Same

Final output calls: Same
