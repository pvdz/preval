# Preval test case

# call.md

> normalize > arguments > call
>
> Normalizing call args when they are not identifier or literal

#TODO

## Input

`````js filename=intro
$($());
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = $();
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = $();
$(tmpArg);
`````

## Result

Should call `$` with:
[[], [null], null];

Normalized calls: Same

Final output calls: Same
