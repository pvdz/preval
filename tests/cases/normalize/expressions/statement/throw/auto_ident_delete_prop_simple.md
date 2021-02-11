# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > statement > throw > auto_ident_delete_prop_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
throw delete x.y;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg = delete x.y;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ true ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
