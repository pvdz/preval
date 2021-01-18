# Preval test case

# concat.md

> base > concat
>
> Simple string concat

## Input

`````js filename=intro
$('a' + 'b')
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 'a' + 'b';
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'ab';
$(tmpArg);
`````

## Result

Should call `$` with:
[['ab'], null];

Normalized calls: Same

Final output calls: Same
