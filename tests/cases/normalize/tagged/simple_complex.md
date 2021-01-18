# Preval test case

# simple_complex.md

> normalize > templates > simple_complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ 10 } ${ $(20) } def`;
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = ['abc ', ' ', ' def'];
tmpArg_1 = $(20);
$(tmpArg, 10, tmpArg_1);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = ['abc ', ' ', ' def'];
tmpArg_1 = $(20);
$(tmpArg, 10, tmpArg_1);
`````

## Result

Should call `$` with:
[[20], [['abc ', ' ', ' def'], 10, null], null];

Normalized calls: Same

Final output calls: Same
