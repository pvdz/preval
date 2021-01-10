# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
1 || $(2);
`````

## Normalized

`````js filename=intro
if (1) {
} else {
  $(2);
}
`````

## Uniformed

`````js filename=intro
if (8) {
} else {
  x(8);
}
`````

## Output

`````js filename=intro

`````
