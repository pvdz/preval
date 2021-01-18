# Preval test case

# default_no_no__empty_str.md

> normalize > pattern >  > param > obj > rest > default_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = '';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = '';
const x = objPatternRest(bindingPatternObjRoot, []);
$(x);
`````

## Output

`````js filename=intro
const x = objPatternRest('', []);
$(x);
`````

## Result

Should call `$` with:
[[{}], null];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

