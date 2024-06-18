# Preval test case

# regexp_constructor_one_string.md

> Regex > Constructor > Regexp constructor one string
>
> Edge case implemented to solve jsf*ck

## Input

`````js filename=intro
const y = RegExp(`x`);
$(y);
`````

## Pre Normal


`````js filename=intro
const y = RegExp(`x`);
$(y);
`````

## Normalized


`````js filename=intro
const y = /x/;
$(y);
`````

## Output


`````js filename=intro
const y = /x/;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /x/;
$( a );
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
