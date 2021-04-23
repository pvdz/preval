# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw (a = $(b));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
throw (a = $(b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
a = $(b);
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const a = $(1);
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
