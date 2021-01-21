# Preval test case

# complex_complex.md

> normalize > templates > complex_complex
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ $(10) } ${ $(20) } def`);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = `abc ${$(10)} ${$(20)} def`;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = `abc ${$(10)} ${$(20)} def`;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: 20
 - 2: "abc 10 20 def"
 - 3: undefined

Normalized calls: Same

Final output calls: Same
