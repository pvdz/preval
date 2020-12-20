# Preval test case

# string_false.md

> eq > string_false
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$('x' <= 'y');
`````

## Output

`````js filename=intro
$(true);
`````
