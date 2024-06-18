# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident logic and simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 && 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 && 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = 1;
if (tmpThrowArg) {
  tmpThrowArg = 2;
} else {
}
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
