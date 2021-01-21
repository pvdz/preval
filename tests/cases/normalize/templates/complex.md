# Preval test case

# complex.md

> normalize > templates > complex
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ 10 } def`);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = `abc ${10} def`;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = `abc ${10} def`;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "abc 10 def"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
