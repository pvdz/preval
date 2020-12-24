# Preval test case

# call.md

> normalize > new > call
>
> Make sure negative function calls are not considered a literal

#TODO

## Input

`````js filename=intro
$([-$()]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = -$();
tmpArg = [tmpElement];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = -$();
tmpArg = [tmpElement];
$(tmpArg);
`````
