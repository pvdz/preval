# Preval test case

# simple_simple.md

> logical > and > simple_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = 1 && 2;
`````

## Normalized

`````js filename=intro
const x = 1 && 2;
`````

## Output

`````js filename=intro
1 && 2;
`````