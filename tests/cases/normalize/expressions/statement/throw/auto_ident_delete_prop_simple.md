# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > statement > throw > auto_ident_delete_prop_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
throw delete arg.y;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpThrowArg = delete arg.y;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpThrowArg = delete arg.y;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ true ]>')

Normalized calls: Same

Final output calls: Same