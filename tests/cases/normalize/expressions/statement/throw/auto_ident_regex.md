# Preval test case

# auto_ident_regex.md

> normalize > expressions > statement > throw > auto_ident_regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw /foo/;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = /foo/;
throw tmpThrowArg;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
throw /foo/;
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ /foo/ ]>')

Normalized calls: Same

Final output calls: Same
