# Preval test case

# complex_simple.md

> normalize > templates > complex_simple
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ $(10) } ${ 20 } def`);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = `abc ${$(10)} ${20} def`;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = `abc ${$(10)} ${20} def`;
$(tmpArg);
`````

## Result

Should call `$` with:
[[10], ['abc undefined 20 def'], null];

Normalized calls: Same

Final output calls: Same
