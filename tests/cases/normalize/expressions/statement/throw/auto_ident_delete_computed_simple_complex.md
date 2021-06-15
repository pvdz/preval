# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
throw delete arg[$("y")];
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
throw delete arg[$(`y`)];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
const tmpThrowArg = delete tmpDeleteCompObj[tmpDeleteCompProp];
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
const tmpThrowArg = delete arg[tmpDeleteCompProp];
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - eval returned: ('<crash[ true ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
