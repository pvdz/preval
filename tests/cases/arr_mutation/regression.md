# Preval test case

# regression.md

> Arr mutation > Regression
>
> There was a bug in arr_mutation where it would replace the
> initial `[0]` with `[d]`, introducing a TDZ throw.

## Input

`````js filename=intro
let a = [0];
const d = $();
a[0] = d;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = [0];
const d = $();
a[0] = d;
$(a);
`````

## Normalized


`````js filename=intro
let a = [0];
const d = $();
a[0] = d;
$(a);
`````

## Output


`````js filename=intro
const d /*:unknown*/ = $();
const a /*:array*/ = [d];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = [ a ];
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: [undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
