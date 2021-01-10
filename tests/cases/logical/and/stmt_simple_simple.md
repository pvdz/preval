# Preval test case

# simple_simple.md

> logical > and > simple_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
1 && 2;
`````

## Normalized

`````js filename=intro
if (1) {
  2;
}
`````

## Uniformed

`````js filename=intro
if (8) {
  8;
}
`````

## Output

`````js filename=intro

`````
