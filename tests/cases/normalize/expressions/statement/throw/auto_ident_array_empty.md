# Preval test case

# auto_ident_array_empty.md

> normalize > expressions > statement > throw > auto_ident_array_empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw [];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = [];
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpThrowArg = [];
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[  ]>')

Normalized calls: Same

Final output calls: Same
