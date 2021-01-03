# Preval test case

# multiple_let_init.md

> normalize > var > multiple_let_init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

#TODO

## Input

`````js filename=intro
let a = $(1), b = $(2), c = $(3);
`````

## Normalized

`````js filename=intro
let a = $(1);
let b = $(2);
let c = $(3);
`````

## Output

`````js filename=intro

`````