# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = { x: 1, y: 2, z: 3 });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = { x: 1, y: 2, z: 3 });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = { x: 1, y: 2, z: 3 };
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const a /*:object*/ = { x: 1, y: 2, z: 3 };
throw a;
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
