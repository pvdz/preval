# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > obj > rest > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ ...x } = null);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = null;
x = objPatternRest(objAssignPatternRhs, []);
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = null;
x = objPatternRest(objAssignPatternRhs, []);
$('bad');
`````

## Result

Should call `$` with:
["<crash[ Cannot destructure 'null' as it is null. ]>"];

Normalized calls: BAD?!
[['bad'], null];

Final output calls: BAD!!
[['bad'], null];

