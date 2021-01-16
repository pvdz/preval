# Preval test case

# string.md

> normalize > templates > string
>
> A template that is just a string

#TODO

## Input

`````js filename=intro
$(`foo`);
`````

## Normalized

`````js filename=intro
$('foo');
`````

## Output

`````js filename=intro
$('foo');
`````
