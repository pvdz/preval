# Preval test case

# string_num.md

> eq > string_num
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$('x' !== 2);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 'x' !== 2;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = 'str' * 8;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = true;
$(tmpArg);
`````
