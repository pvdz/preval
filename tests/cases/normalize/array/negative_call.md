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
var tmpUnaryArg;
tmpUnaryArg = $();
tmpElement = -tmpUnaryArg;
tmpArg = [tmpElement];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpUnaryArg;
tmpUnaryArg = $();
tmpElement = -tmpUnaryArg;
tmpArg = [tmpElement];
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: [null]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
