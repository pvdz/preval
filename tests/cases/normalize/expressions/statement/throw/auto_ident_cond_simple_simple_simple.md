# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident cond simple simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 ? 2 : $($(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 ? 2 : $($(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
tmpThrowArg = 2;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
throw 2;
`````

## PST Output

With rename=true

`````js filename=intro
throw 2;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
