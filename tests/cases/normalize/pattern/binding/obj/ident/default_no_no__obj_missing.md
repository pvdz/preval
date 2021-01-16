# Preval test case

# default_no_no__obj_missing.md

> normalize > pattern >  > param > obj > ident > default_no_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = { b: 2, c: 3 };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { b: 2, c: 3 };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { b: 2, c: 3 };
const x = bindingPatternObjRoot.x;
$(x);
`````
