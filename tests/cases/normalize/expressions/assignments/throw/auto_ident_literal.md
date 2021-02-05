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
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
a = 'foo';
tmpThrowArg = 'foo';
throw tmpThrowArg;
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ foo ]>')

Normalized calls: Same

Final output calls: Same
