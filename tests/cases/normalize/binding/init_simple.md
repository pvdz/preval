# Preval test case

# init_simple.md

> normalize > binding > init_simple
>
> Binding declaration with a simple init should not be outlined

#TODO

## Input

`````js filename=intro
let x = Infinity;
$(x);
`````

## Normalized

`````js filename=intro
let x = Infinity;
$(x);
`````

## Uniformed

`````js filename=intro
var x = x;
x(x);
`````

## Output

`````js filename=intro
$(Infinity);
`````
