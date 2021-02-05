# Preval test case

# double_var.md

> normalize > dupe_binds > double_var
>
> Vars can be redeclared many times. Doesn't matter.

#TODO

## Input

`````js filename=intro
var x = $(1);
var x = $(2);
`````

## Normalized

`````js filename=intro
var x;
x = $(1);
x = $(2);
`````

## Output

`````js filename=intro
var x;
x = $(1);
x = $(2);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
