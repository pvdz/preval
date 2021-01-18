# Preval test case

# call.md

> normalize > new > call
>
> Make sure empty array works

## Input

`````js filename=intro
$([100, $()]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = $();
tmpArg = [100, tmpElement];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = $();
tmpArg = [100, tmpElement];
$(tmpArg);
`````

## Result

Should call `$` with:
[[], [[100, null]], null];

Normalized calls: Same

Final output calls: Same
