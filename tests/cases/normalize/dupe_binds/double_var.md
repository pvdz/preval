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
var x;
x = $(1);
x = $(2);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = x(8);
var x = x(8);
`````

## Output

`````js filename=intro
var x;
var x;
x = $(1);
x = $(2);
`````
