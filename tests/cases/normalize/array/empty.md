# Preval test case

# call.md

> normalize > new > call
>
> Make sure empty array works

## Input

`````js filename=intro
$([]);
`````

## Normalized

`````js filename=intro
$([]);
`````

## Output

`````js filename=intro
$([]);
`````

## Result

Should call `$` with:
 - 0: []
 - 1: undefined

Normalized calls: Same

Final output calls: Same
