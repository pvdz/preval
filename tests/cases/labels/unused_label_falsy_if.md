# Preval test case

# unused_label_falsy_if.md

> Labels > Unused label falsy if
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: if (false) $(1);
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

Normalized calls: Same

Final output calls: Same
