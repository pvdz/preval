# Preval test case

# default_no_no__obj_empty_str.md

> normalize > pattern >  > param > obj > ident > default_no_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = { x: '' };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: '' };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: '' };
const x = bindingPatternObjRoot.x;
$(x);
`````