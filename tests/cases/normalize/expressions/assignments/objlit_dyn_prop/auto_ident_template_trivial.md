# Preval test case

# auto_ident_template_trivial.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident template trivial
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = `foo`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = `foo`;
$(a);
`````

## Normalized


`````js filename=intro
let a = `foo`;
$(a);
`````

## Output


`````js filename=intro
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
