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

## Output

`````js filename=intro
const foo = -Infinity;
const bar = foo;
$(bar);
`````
