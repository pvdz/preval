# Preval test case

# regexp_constructor_no_args.md

> Regex > Constructor > Regexp constructor no args
>
> Edge case implemented to solve jsf*ck

#TODO

## Input

`````js filename=intro
const y = RegExp();
$(y);
`````

## Pre Normal


`````js filename=intro
const y = RegExp();
$(y);
`````

## Normalized


`````js filename=intro
const y = /(?:)/;
$(y);
`````

## Output


`````js filename=intro
const y = /(?:)/;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /(?:)/;
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
