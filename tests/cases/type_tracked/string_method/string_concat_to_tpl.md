# Preval test case

# string_concat_to_tpl.md

> Type tracked > String method > String concat to tpl

This should become a template

## Input

`````js filename=intro
const x = 'foo'.concat(a, b); // `foo${a}${b}`
$(x);
`````

## Pre Normal


`````js filename=intro
const x = `foo`.concat(a, b);
$(x);
`````

## Normalized


`````js filename=intro
const x = `foo`.concat(a, b);
$(x);
`````

## Output


`````js filename=intro
const x /*:string*/ = `foo${a}${b}`;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const c = `foo${a}${b}`;
$( c );
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, b

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
