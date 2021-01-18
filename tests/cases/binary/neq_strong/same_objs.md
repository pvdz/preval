# Preval test case

# same_objs.md

> eq > same_objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

#TODO

## Input

`````js filename=intro
const x = {};
$(x !== x);
`````

## Normalized

`````js filename=intro
var tmpArg;
const x = {};
tmpArg = x !== x;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
const x = {};
tmpArg = x !== x;
$(tmpArg);
`````

## Result

Should call `$` with:
[[false], null];

Normalized calls: Same

Final output calls: Same
