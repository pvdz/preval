# Preval test case

# nested.md

> Labels > Nested
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
a: b: c: break a;
`````

## Pre Normal

`````js filename=intro
a: b: c: break a;
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## PST Output

With rename=true

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
