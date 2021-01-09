# Preval test case

# copy.md

> constants > copy
>
> Copy one constant into another. Should fold them.

#TODO

## Input

`````js filename=intro
const foo = -Infinity;
const bar = foo;
$(bar)
`````

## Normalized

`````js filename=intro
const foo = -Infinity;
const bar = foo;
$(bar);
`````

## Uniformed

`````js filename=intro
var x = -x;
var x = x;
x(x);
`````

## Output

`````js filename=intro
const foo = -Infinity;
const bar = foo;
$(bar);
`````
