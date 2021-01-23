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
var tmpArg$1;
tmpArg = ['abc ', ' ', ' def'];
tmpArg$1 = $(20);
$(tmpArg, 10, tmpArg$1);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
tmpArg = ['abc ', ' ', ' def'];
tmpArg$1 = $(20);
$(tmpArg, 10, tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: 20
 - 1: ["abc "," "," def"],10,20
 - 2: undefined

Normalized calls: Same

Final output calls: Same
