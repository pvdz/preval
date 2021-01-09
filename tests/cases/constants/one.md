# Preval test case

# one.md

> constants > one
>
> Single constant, nothing happens

## Input

`````js filename=intro
const foo = "five";
$(foo)
`````

## Normalized

`````js filename=intro
const foo = 'five';
$(foo);
`````

## Uniformed

`````js filename=intro
var x = 'str';
x(x);
`````

## Output

`````js filename=intro
$('five');
`````
