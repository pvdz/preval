# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident array simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = [1, 2, 3];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = [1, 2, 3];
$(a);
`````

## Normalized


`````js filename=intro
let a = [1, 2, 3];
$(a);
`````

## Output


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
