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

## Uniformed

`````js filename=intro
var x;
x = [8, 8, 8];
x(...x);
`````

## Output

`````js filename=intro
var tmpCallSpreadArg;
tmpCallSpreadArg = [1, 2, 3];
$(...tmpCallSpreadArg);
`````
