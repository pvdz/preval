# Preval test case

# string.md

> normalize > templates > string
>
> A tagged template that is just a string

#TODO

## Input

`````js filename=intro
$`foo`;
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ['foo'];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = ['foo'];
$(tmpArg);
`````

## Result

Should call `$` with:
[[['foo']], null];

Normalized calls: Same

Final output calls: Same
