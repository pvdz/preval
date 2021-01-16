# Preval test case

# copy.md

> constants > copy
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = "five";
const bar = foo;
$(bar)
`````

## Normalized

`````js filename=intro
const foo = 'five';
const bar = foo;
$(bar);
`````

## Output

`````js filename=intro
$('five');
`````
