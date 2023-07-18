# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
throw (a = void arg);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
throw (a = void arg);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = undefined;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
throw undefined;
`````

## PST Output

With rename=true

`````js filename=intro
throw undefined;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ undefined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
