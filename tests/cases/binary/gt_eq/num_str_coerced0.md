# Preval test case

# num_str.md

> eq > num_str
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$(0 >= '1');
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 0 >= '1';
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = false;
$(tmpArg);
`````

## Result

Should call `$` with:
[[false], null];

Normalized calls: Same

Final output calls: Same
