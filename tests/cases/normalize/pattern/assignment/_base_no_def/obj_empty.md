# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ } = 1);
`````

## Normalized

`````js filename=intro
1;
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
