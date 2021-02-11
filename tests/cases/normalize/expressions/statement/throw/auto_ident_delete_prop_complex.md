# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > statement > throw > auto_ident_delete_prop_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
throw delete $(x).y;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(x);
let tmpThrowArg = delete tmpDeleteObj.y;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - eval returned: ('<crash[ true ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
