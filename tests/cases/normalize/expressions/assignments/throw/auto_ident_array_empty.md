# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Throw > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = []);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = []);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const a = [];
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[  ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
