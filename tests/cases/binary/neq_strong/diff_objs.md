# Preval test case

# diff_objs.md

> eq > diff_objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

#TODO

## Input

`````js filename=intro
$({} !== {});
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = {} !== {};
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = {} !== {};
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: undefined

Normalized calls: Same

Final output calls: Same
