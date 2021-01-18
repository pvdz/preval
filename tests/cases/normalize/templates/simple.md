# Preval test case

# simple.md

> normalize > templates > simple
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ $(1) } def`);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = `abc ${$(1)} def`;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = `abc ${$(1)} def`;
$(tmpArg);
`````

## Result

Should call `$` with:
[[1], ['abc undefined def'], null];

Normalized calls: Same

Final output calls: Same
