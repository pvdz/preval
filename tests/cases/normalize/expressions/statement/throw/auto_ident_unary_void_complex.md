# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident unary void complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw void $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw void $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
const tmpThrowArg = undefined;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
$(100);
throw undefined;
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
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
