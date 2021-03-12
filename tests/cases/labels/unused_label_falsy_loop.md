# Preval test case

# unused_label_falsy_loop.md

> Labels > Unused label falsy loop
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: while (false) $(1);
`````

## Pre Normal

`````js filename=intro
foo: while (false) $(1);
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
