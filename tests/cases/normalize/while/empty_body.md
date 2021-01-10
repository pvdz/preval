# Preval test case

# empty_body.md

> normalize > while > empty_body
>
> A loop cannot be eliminated but can be normalized

#TODO

## Input

`````js filename=intro
do {

} while ($());
`````

## Normalized

`````js filename=intro
while ($()) {}
`````

## Uniformed

`````js filename=intro
while (x()) {}
`````

## Output

`````js filename=intro
while ($()) {}
`````
