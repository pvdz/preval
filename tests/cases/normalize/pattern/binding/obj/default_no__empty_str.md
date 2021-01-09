# Preval test case

# default_no__empty_str.md

> normalize > pattern >  > param > obj > default_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = '';
$('ok');
`````

## Normalized

`````js filename=intro
('');
$('ok');
`````

## Uniformed

`````js filename=intro
('str');
x('str');
`````

## Output

`````js filename=intro
$('ok');
`````
