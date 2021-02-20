# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident delete prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
throw delete $(arg).y;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
const tmpThrowArg = delete tmpDeleteObj.y;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpThrowArg = delete tmpDeleteObj.y;
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - eval returned: ('<crash[ true ]>')

Normalized calls: Same

Final output calls: Same
