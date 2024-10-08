# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident object simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = { x: 1, y: 2, z: 3 };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { x: 1, y: 2, z: 3 };
$(a);
`````

## Normalized


`````js filename=intro
let a = { x: 1, y: 2, z: 3 };
$(a);
`````

## Output


`````js filename=intro
const a /*:object*/ = { x: 1, y: 2, z: 3 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
