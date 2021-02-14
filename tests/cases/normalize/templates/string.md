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
$(`foo`);
`````

## Output

`````js filename=intro
$(`foo`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
