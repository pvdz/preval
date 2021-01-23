# Preval test case

# complex_complex.md

> normalize > templates > complex_complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ $(10) } ${ $(20) } def`;
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpArg$2;
tmpArg = ['abc ', ' ', ' def'];
tmpArg$1 = $(10);
tmpArg$2 = $(20);
$(tmpArg, tmpArg$1, tmpArg$2);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpArg$2;
tmpArg = ['abc ', ' ', ' def'];
tmpArg$1 = $(10);
tmpArg$2 = $(20);
$(tmpArg, tmpArg$1, tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: 20
 - 2: ["abc "," "," def"],10,20
 - 3: undefined

Normalized calls: Same

Final output calls: Same
