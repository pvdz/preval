# Preval test case

# regexp_constructor_two_strings.md

> Regex > Constructor > Regexp constructor two strings
>
> Edge case implemented to solve jsf*ck

#TODO

## Input

`````js filename=intro
const y = RegExp(`x`, `g`);
$(y);
`````

## Pre Normal

`````js filename=intro
const y = RegExp(`x`, `g`);
$(y);
`````

## Normalized

`````js filename=intro
const y = /x/g;
$(y);
`````

## Output

`````js filename=intro
const y = /x/g;
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
