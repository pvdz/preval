# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Statement > Throw > Auto ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw b;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
throw b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
throw b;
`````

## Output

`````js filename=intro
throw 1;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
