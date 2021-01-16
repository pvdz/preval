# Preval test case

# diff_objs_diff_ids.md

> eq > diff_objs_diff_ids
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

#TODO

## Input

`````js filename=intro
const x = {};
const y = x;
$(x < y);
`````

## Normalized

`````js filename=intro
var tmpArg;
const x = {};
const y = x;
tmpArg = x < y;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
const x = {};
const y = x;
tmpArg = x < y;
$(tmpArg);
`````
