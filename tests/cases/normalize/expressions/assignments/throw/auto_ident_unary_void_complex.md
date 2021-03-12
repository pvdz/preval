# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = void $(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = void $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
$(100);
throw undefined;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ undefined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
