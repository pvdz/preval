# Preval test case

# default_no__undefined.md

> normalize > pattern >  > param > obj > default_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
undefined;
$('bad');
`````

## Output

`````js filename=intro
$('bad');
`````

## Result

Should call `$` with:
["<crash[ Cannot destructure 'undefined' as it is undefined. ]>"];

Normalized calls: BAD?!
[['bad'], null];

Final output calls: BAD!!
[['bad'], null];

