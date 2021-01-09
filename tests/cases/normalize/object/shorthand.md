# Preval test case

# shorthand.md

> normalize > object > shorthand
>
> Shorthand should normalize to a regular property

#TODO

## Input

`````js filename=intro
const x = 10;
const obj = {x};
$(obj);
`````

## Normalized

`````js filename=intro
const x = 10;
const obj = { x: x };
$(obj);
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = { x: x };
x(x);
`````

## Output

`````js filename=intro
const obj = { x: 10 };
$(obj);
`````
