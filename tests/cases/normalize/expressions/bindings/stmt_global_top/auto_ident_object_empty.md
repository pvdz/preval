# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident object empty
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = {};
$(a);
`````

## Pre Normal


`````js filename=intro
let a = {};
$(a);
`````

## Normalized


`````js filename=intro
let a = {};
$(a);
`````

## Output


`````js filename=intro
const a /*:object*/ = {};
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
