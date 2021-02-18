# Preval test case

# stmt_no_id.md

> normalize > function > expr > stmt_no_id
>
> A function expression that is a statement should be dropped.

#TODO

## Input

`````js filename=intro
(function(){});
`````

## Normalized

`````js filename=intro
undefined;
`````

## Output

`````js filename=intro
undefined;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
