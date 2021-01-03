# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternRest(objPatternNoDefault, []);
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternRest(objPatternNoDefault, []);
$(y);
`````