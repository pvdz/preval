# Preval test case

# get_regex_constructor.md

> Regex > Constructor > Get regex constructor
>
> Edge case implemented to solve jsf*ck

#TODO

## Input

`````js filename=intro
const x = /foo/
const c = x.constructor;
const y = c('x', 'g');
$(y); // the regex `/x/g`
`````

## Pre Normal

`````js filename=intro
const x = /foo/;
const c = x.constructor;
const y = c(`x`, `g`);
$(y);
`````

## Normalized

`````js filename=intro
const x = /foo/;
const c = x.constructor;
const y = c(`x`, `g`);
$(y);
`````

## Output

`````js filename=intro
const y = /x/g;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /x/g;
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
