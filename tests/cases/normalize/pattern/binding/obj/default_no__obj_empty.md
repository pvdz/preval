# Preval test case

# default_no__obj_empty.md

> normalize > pattern >  > param > obj > default_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = {};
$('ok');
`````

## Normalized

`````js filename=intro
({});
$('ok');
`````

## Output

`````js filename=intro
({});
$('ok');
`````
