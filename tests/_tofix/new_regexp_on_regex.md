# Preval test case

# new_regexp_on_regex.md

> Tofix > New regexp on regex
>
> This looks silly but I think it's just the same

## Input

`````js filename=intro
const x = /abc/g;
const newLineRegex = new RegExp(x); // -> same as regex literal 
$(newLineRegex);
`````

## Pre Normal


`````js filename=intro
const x = /abc/g;
const newLineRegex = new RegExp(x);
$(newLineRegex);
`````

## Normalized


`````js filename=intro
const x = /abc/g;
const newLineRegex = new RegExp(x);
$(newLineRegex);
`````

## Output


`````js filename=intro
const x /*:regex*/ = /abc/g;
const newLineRegex /*:object*/ = new RegExp(x);
$(newLineRegex);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /abc/g;
const b = new RegExp( a );
$( b );
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
