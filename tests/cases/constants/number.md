# Preval test case

# copy.md

> constants > copy
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = 5;
const bar = foo;
$(bar)
`````

## Normalized

`````js filename=intro
const foo = 5;
const bar = foo;
$(bar);
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = x;
x(x);
`````

## Output

`````js filename=intro
$(5);
`````
