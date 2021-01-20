# Preval test case

# default_no_no__obj_123.md

> normalize > pattern >  > param > obj > rest > default_no_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = { x: 1, b: 2, c: 3 };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
const x = objPatternRest(bindingPatternObjRoot, []);
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
const x = objPatternRest(bindingPatternObjRoot, []);
$(x);
`````

## Result

Should call `$` with:
[[{ x: 1, b: 2, c: 3 }], null];

Normalized calls: Same

Final output calls: Same
