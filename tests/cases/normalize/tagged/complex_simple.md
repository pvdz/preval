# Preval test case

# complex_simple.md

> normalize > templates > complex_simple
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ $(10) } ${ 20 } def`;
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = ['abc ', ' ', ' def'];
tmpArg_1 = $(10);
$(tmpArg, tmpArg_1, 20);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = ['abc ', ' ', ' def'];
tmpArg_1 = $(10);
$(tmpArg, tmpArg_1, 20);
`````

## Result

Should call `$` with:
[[10], [['abc ', ' ', ' def'], null, 20], null];

Normalized calls: Same

Final output calls: Same
