# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw $(b);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpThrowArg = $(b);
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpThrowArg = $(1);
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
