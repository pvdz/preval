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

## Uniformed

`````js filename=intro
var x = 'str';
var x = x;
x(x);
`````

## Output

`````js filename=intro
$('five');
`````
