# Preval test case

# num_str.md

> eq > num_str
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$(2 >= '1');
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 2 >= '1';
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = 8 * 'str';
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = true;
$(tmpArg);
`````
