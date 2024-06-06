# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > Throw > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw /foo/;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw /foo/;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = /foo/;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpThrowArg = /foo/;
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/;
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ /foo/ ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
