# Preval test case

# unused_label_truthy_if.md

> Labels > Unused label truthy if
>
> Labels should not throw

#TODO

## Input

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

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
