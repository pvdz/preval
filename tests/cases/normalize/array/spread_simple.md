# Preval test case

# spread_simple.md

> normalize > array > spread_simple
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
const x = "foo";
$([...x]);
`````

## Normalized

`````js filename=intro
var tmpArg;
const x = 'foo';
tmpArg = [...x];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = [...'foo'];
$(tmpArg);
`````
