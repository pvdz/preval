# Preval test case

# ident_to_itself.md

> Normalize > Assign > Ident to itself
>
> An ident that assigns to itself should be considered a noop

Since we don't consider idents to have observable side effects, this should be a noop.

Not very likely to happen in the wild, though it may be an artifact after some normalization / reduction.

## Input

`````js filename=intro
let a = $(10);
a = a;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $(10);
a = a;
$(a);
`````

## Normalized


`````js filename=intro
let a = $(10);
$(a);
`````

## Output


`````js filename=intro
const a = $(10);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
