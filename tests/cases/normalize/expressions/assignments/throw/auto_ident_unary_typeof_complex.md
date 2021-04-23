# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
throw (a = typeof $(arg));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
throw (a = typeof $(arg));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
throw a;
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
