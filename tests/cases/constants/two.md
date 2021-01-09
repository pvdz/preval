# Preval test case

# two.md

> constants > two
>
> Two constants, nothing happens

## Input

`````js filename=intro
const foo = "five";
const bar = "six";
$(bar)
`````

## Normalized

`````js filename=intro
const foo = 'five';
const bar = 'six';
$(bar);
`````

## Uniformed

`````js filename=intro
var x = 'str';
var x = 'str';
x(x);
`````

## Output

`````js filename=intro
$('six');
`````
