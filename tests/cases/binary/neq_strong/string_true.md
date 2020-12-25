# Preval test case

# string_true.md

> eq > string_true
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$('x' !== 'x');
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 'x' !== 'x';
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = false;
$(tmpArg);
`````