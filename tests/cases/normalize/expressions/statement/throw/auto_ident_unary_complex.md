# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw typeof $(x);
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
throw typeof $(x);
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
const tmpThrowArg = typeof tmpUnaryArg;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(1);
const tmpThrowArg = typeof tmpUnaryArg;
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
throw b;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ number ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
