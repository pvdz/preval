# Preval test case

# default_no__123.md

> normalize > pattern >  > param > obj > default_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({} = 1);
$('ok');
`````

## Normalized

`````js filename=intro
1;
$('ok');
`````

## Output

`````js filename=intro
$('ok');
`````