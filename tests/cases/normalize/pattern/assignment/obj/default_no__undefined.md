# Preval test case

# default_no__undefined.md

> normalize > pattern >  > param > obj > default_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({} = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
undefined;
$('bad');
`````

## Uniformed

`````js filename=intro
x;
x('str');
`````

## Output

`````js filename=intro
$('bad');
`````
