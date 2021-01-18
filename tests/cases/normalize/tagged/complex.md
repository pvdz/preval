# Preval test case

# complex.md

> normalize > templates > complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ 10 } def`;
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ['abc ', ' def'];
$(tmpArg, 10);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = ['abc ', ' def'];
$(tmpArg, 10);
`````

## Result

Should call `$` with:
[[['abc ', ' def'], 10], null];

Normalized calls: Same

Final output calls: Same
