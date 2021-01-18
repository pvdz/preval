# Preval test case

# string_num.md

> eq > string_num
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$('x' === 2);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 'x' === 2;
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
