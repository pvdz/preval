# Preval test case

# double_dollar.md

> normalize > hoisting > var > double_dollar
>
> Duplicate var statements is legit but we should drop the duplicate version

#TODO

## Input

`````js filename=intro
var x = $(1);
var x = $(2);
$(x);
`````

## Normalized

`````js filename=intro
var x;
var x;
x = $(1);
x = $(2);
$(x);
`````

## Output

`````js filename=intro
var x;
var x;
x = $(1);
x = $(2);
$(x);
`````
