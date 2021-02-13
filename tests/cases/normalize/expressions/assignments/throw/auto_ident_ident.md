# Preval test case

# auto_ident_ident.md

> normalize > expressions > assignments > throw > auto_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw (a = b);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
a = b;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
a = b;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same