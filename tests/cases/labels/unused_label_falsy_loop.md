# Preval test case

# unused_label.md

> labels > unused_label
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: while (false) $(1);
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
