# Preval test case

# concat.md

> base > concat
>
> Simple string concat

## Input

`````js filename=intro
$('a' + 'b')
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 'a' + 'b';
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = 'str' * 'str';
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'ab';
$(tmpArg);
`````
