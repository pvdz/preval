# Preval test case

# auto_ident_object_empty.md

> normalize > expressions > statement > throw > auto_ident_object_empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw {};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = {};
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = {};
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ [object Object] ]>')

Normalized calls: Same

Final output calls: Same