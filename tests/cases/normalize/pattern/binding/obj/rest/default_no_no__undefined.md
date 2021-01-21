# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > rest > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = undefined;
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = undefined;
const x = objPatternRest(bindingPatternObjRoot, [], 'x');
$(x);
`````

## Output

`````js filename=intro
const x = objPatternRest(undefined, [], 'x');
$(x);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'cannotDestructureThis' of undefined ]>

Normalized calls: Same

Final output calls: Same
