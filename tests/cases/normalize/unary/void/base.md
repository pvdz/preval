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

## Result

Should call `$` with:
[[null], null];

Normalized calls: Same

Final output calls: Same
