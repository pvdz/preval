# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > statement > throw > auto_ident_ident_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
throw (b = 2);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
let tmpThrowArg = b;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = 2;
let tmpThrowArg = b;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 2 ]>')

Normalized calls: Same

Final output calls: Same
