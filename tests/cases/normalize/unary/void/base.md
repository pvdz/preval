# Preval test case

# base.md

> normalize > void > base
>
> Void is really just undefined

#TODO

## Input

`````js filename=intro
$(void 5);
`````

## Normalized

`````js filename=intro
var tmpArg;
5;
tmpArg = undefined;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = undefined;
$(tmpArg);
`````
