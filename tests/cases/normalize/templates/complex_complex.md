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

## Uniformed

`````js filename=intro
var x;
x = `abc ${x(8)} ${x(8)} def`;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = `abc ${$(10)} ${$(20)} def`;
$(tmpArg);
`````
