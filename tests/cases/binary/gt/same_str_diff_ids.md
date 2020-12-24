# Preval test case

# diff_objs_diff_ids.md

> eq > diff_objs_diff_ids
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = 'xyz';
const y = x;
$(x > y);
`````

## Normalized

`````js filename=intro
var tmpArg;
const x = 'xyz';
const y = x;
tmpArg = x > y;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = false;
$(tmpArg);
`````
