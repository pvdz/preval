# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > statement > throw > auto_ident_array_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw [1, 2, 3];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = [1, 2, 3];
throw tmpThrowArg;
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1,2,3 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
