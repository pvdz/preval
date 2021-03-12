# Preval test case

# unused_label_plain.md

> Labels > Unused label plain
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: $(1);
`````

## Pre Normal

`````js filename=intro
foo: $(1);
`````

## Normalized

`````js filename=intro
$(1);
`````

## Output

`````js filename=intro
$(1);
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
