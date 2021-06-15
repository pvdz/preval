# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw (a = typeof x);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
throw (a = typeof x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
throw `number`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ number ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
