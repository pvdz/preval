# Preval test case

# copy.md

> constants > copy
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = NaN;
const bar = foo;
$(bar)
`````

## Output

`````js filename=intro
$(NaN);
`````
