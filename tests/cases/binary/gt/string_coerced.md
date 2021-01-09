# Preval test case

# string_false.md

> eq > string_false
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$('2' > '1');
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = '2' > '1';
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
tmpArg = true;
$(tmpArg);
`````
