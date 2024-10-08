# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Throw > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = /foo/);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = /foo/);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const a /*:regex*/ = /foo/;
throw a;
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
