# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > ident > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = undefined;
const x = bindingPatternObjRoot.x;
$('bad');
`````

## Output

`````js filename=intro
undefined.x;
$('bad');
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'cannotDestructureThis' of undefined ]>"];

Normalized calls: BAD?!
["<crash[ Cannot read property 'x' of undefined ]>"];

Final output calls: BAD!!
["<crash[ Cannot read property 'x' of undefined ]>"];

