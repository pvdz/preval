# Preval test case

# spread.md

> normalize > call > spread
>
> Spread should be fine

#TODO

## Input

`````js filename=intro
$(...[1, 2, 3]);
`````

## Normalized

`````js filename=intro
var tmpCallSpreadArg;
tmpCallSpreadArg = [1, 2, 3];
$(...tmpCallSpreadArg);
`````

## Output

`````js filename=intro
var tmpCallSpreadArg;
tmpCallSpreadArg = [1, 2, 3];
$(...tmpCallSpreadArg);
`````
