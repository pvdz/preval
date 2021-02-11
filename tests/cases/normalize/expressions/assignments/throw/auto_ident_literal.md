# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > throw > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = "foo");
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
a = 'foo';
tmpThrowArg = 'foo';
throw tmpThrowArg;
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ foo ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
