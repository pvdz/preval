# Preval test case

# literal.md

> Normalize > Member access > Statement > Global > Literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
'foo'.length;
`````

## Pre Normal

`````js filename=intro
`foo`.length;
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
