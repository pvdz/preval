# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > obj > obj > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} } = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = null;
const objPatternNoDefault = bindingPatternObjRoot.x;
$('bad');
`````

## Output

`````js filename=intro
null.x;
$('bad');
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'x' of null ]>"];

Normalized calls: Same

Final output calls: Same
