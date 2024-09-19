# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident object simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw { x: 1, y: 2, z: 3 };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw { x: 1, y: 2, z: 3 };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = { x: 1, y: 2, z: 3 };
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpThrowArg /*:object*/ = { x: 1, y: 2, z: 3 };
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
