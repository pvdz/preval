# Preval test case

# spread_string.md

> normalize > spread > spread_string
>
> Spreading an array literal can be resolved statically

#TODO

## Input

`````js filename=intro
const x = [...[1, 2, 3, 4]];
$(x);
`````

## Normalized

`````js filename=intro
const x = [1, 2, 3, 4];
$(x);
`````

## Output

`````js filename=intro
const x = [1, 2, 3, 4];
$(x);
`````

## Result

Should call `$` with:
 - 1: [1, 2, 3, 4]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
