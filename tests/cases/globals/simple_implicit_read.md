# Preval test case

# simple_implicit_read.md

> globals > simple_implicit_read
>
> Reading from an implicit global

#TODO

## Input

`````js filename=intro
$(a);
`````

## Normalized

`````js filename=intro
$(a);
`````

## Output

`````js filename=intro
$(a);
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same