# Preval test case

# copy.md

> constants > copy
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = "five";
const bar = foo;
const wow = bar;
$(wow)
`````

## Output

`````js filename=intro
const foo = "five";
const bar = "five";
const wow = "five";
$("five");
`````
