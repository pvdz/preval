# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Throw > Auto ident ident
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

## Pre Normal

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
throw 1;
`````

## PST Output

With rename=true

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
