# Preval test case

# string_false.md

> eq > string_false
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$('a' <= 'b');
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 'a' <= 'b';
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = true;
$(tmpArg);
`````

## Result

Should call `$` with:
[[true], null];

Normalized calls: Same

Final output calls: Same
