# Preval test case

# unused_label_truthy_if.md

> Labels > Unused label truthy if
>
> Labels should not throw

## Input

`````js filename=intro
foo: if (true) $(1);
`````

## Pre Normal


`````js filename=intro
foo: if (true) $(1);
`````

## Normalized


`````js filename=intro
$(1);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
