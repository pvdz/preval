# Preval test case

# spread_simple.md

> normalize > object > spread_simple
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
const obj = { foo: { bar: 10 } };
$({...obj});
`````

## Normalized

`````js filename=intro
var tmpArg;
const obj = { foo: { bar: 10 } };
tmpArg = { ...obj };
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
const obj = { foo: { bar: 10 } };
tmpArg = { ...obj };
$(tmpArg);
`````
