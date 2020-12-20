# Preval test case

# neg_zero_false.md

> eq > neg_zero_false
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

Note: weak and strict equals can not detect negative zero this way.

## Input

`````js filename=intro
$(-0 === 0);
`````

## Output

`````js filename=intro
$(true);
`````
