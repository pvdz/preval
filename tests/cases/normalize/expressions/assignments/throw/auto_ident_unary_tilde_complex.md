# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = ~$(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = ~$(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = ~tmpUnaryArg;
throw a;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = ~a;
throw b;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ -101 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
