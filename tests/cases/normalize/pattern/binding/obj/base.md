# Preval test case

# base.md

> normalize > pattern > param > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = { a: 1, b: 2, c: 3 };
$('ok');
`````

## Normalized

`````js filename=intro
({ a: 1, b: 2, c: 3 });
$('ok');
`````

## Uniformed

`````js filename=intro
({ x: 8, x: 8, x: 8 });
x('str');
`````

## Output

`````js filename=intro
({ a: 1, b: 2, c: 3 });
$('ok');
`````
