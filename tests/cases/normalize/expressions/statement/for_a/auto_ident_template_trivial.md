# Preval test case

# auto_ident_template_trivial.md

> Normalize > Expressions > Statement > For a > Auto ident template trivial
>
> Normalization of all kinds of expressions should work the same no matter where they are

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
