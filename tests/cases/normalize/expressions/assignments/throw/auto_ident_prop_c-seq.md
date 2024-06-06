# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Throw > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw (a = (1, 2, $(b)).c);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
throw (a = (1, 2, $(b)).c);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsProp = $(b);
const tmpClusterSSA_a = tmpAssignRhsProp.c;
throw tmpClusterSSA_a;
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
throw c;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
