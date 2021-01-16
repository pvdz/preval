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
var tmpArg;
tmpArg = [1, 2, 3];
$(...tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = [1, 2, 3];
$(...tmpArg);
`````
