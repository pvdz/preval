# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > obj > ident > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = null);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = null;
x = objAssignPatternRhs.x;
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = null;
x = objAssignPatternRhs.x;
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'cannotDestructureThis' of null ]>

Normalized calls: BAD?!
["<crash[ Cannot read property 'x' of null ]>"];

Final output calls: BAD!!
["<crash[ Cannot read property 'x' of null ]>"];

