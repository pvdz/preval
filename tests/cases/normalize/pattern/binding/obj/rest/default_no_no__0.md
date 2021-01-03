# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > rest > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = 0;
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 0;
const x = objPatternRest(bindingPatternObjRoot, []);
$(x);
`````

## Output

`````js filename=intro
const x = objPatternRest(0, []);
$(x);
`````