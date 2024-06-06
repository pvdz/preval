# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
throw (a = delete arg.y);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
throw (a = delete arg.y);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete arg.y;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
throw true;
`````

## PST Output

With rename=true

`````js filename=intro
throw true;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ true ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
