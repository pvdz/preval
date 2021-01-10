# Preval test case

# sequence.md

> normalize > while > sequence
>
> Test should be normalized

#TODO

## Input

`````js filename=intro
while (((x = x * 'str'), (x = x * 8), (x = x), (x = x * x), (x = x.x), x.x(x))) {}
`````

## Normalized

`````js filename=intro
while (((x = x * 'str'), (x = x * 8), (x = x), (x = x * x), (x = x.x), x.x(x))) {}
`````

## Uniformed

`````js filename=intro
while (
  ((x = x * 'str'), (x = x * 8), (x = x), (x = x * x), (x = x.x), x.x(x))
) {}
`````

## Output

`````js filename=intro
while (((x = x * 'str'), (x = x * 8), (x = x), (x = x * x), (x = x.x), x.x(x))) {}
`````
