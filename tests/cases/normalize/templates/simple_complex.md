# Preval test case

# simple_complex.md

> normalize > templates > simple_complex
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ 10 } ${ $(20) } def`);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = `abc ${10} ${$(20)} def`;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = `abc ${10} ${$(20)} def`;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 20
 - 1: "abc 10 20 def"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
