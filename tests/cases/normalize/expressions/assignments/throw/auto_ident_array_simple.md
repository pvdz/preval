# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = [1, 2, 3]);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = [1, 2, 3]);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const a = [1, 2, 3];
throw a;
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1,2,3 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
