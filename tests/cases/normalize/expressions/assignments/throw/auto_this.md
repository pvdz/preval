# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Throw > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = this);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = undefined);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
throw undefined;
`````

## PST Output

With rename=true

`````js filename=intro
throw undefined;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ undefined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
