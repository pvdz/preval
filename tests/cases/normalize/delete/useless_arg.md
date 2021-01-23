# Preval test case

# useless_arg.md

> normalize > delete > useless_arg
>
> Delete on non-property is valid but useless

#TODO

## Input

`````js filename=intro
$(delete $(1));
`````

## Normalized

`````js filename=intro
var tmpArg;
$(1);
tmpArg = true;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
$(1);
tmpArg = true;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: true
 - 2: undefined

Normalized calls: Same

Final output calls: Same
