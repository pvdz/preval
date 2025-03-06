# Preval test case

# arr_mutation_hard_func.md

> Arr mutation > Arr mutation hard func
>
> There was a bug in arr_mutation where it would replace the
> initial `[0]` with `[d]`, introducing a TDZ throw.
> But in this case, especially with a back-to-back def and update, 
> we should still be able to do it. Just have to make sure we don't introduce
> another bug in arr_mutation

## Input

`````js filename=intro
let a = [0];
const d = $();
a[$] = d;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = [0];
const d = $();
a[$] = d;
$(a);
`````

## Normalized


`````js filename=intro
let a = [0];
const d = $();
a[$] = d;
$(a);
`````

## Output


`````js filename=intro
const d /*:unknown*/ = $();
const a /*:array*/ = [0];
a[$] = d;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = [ 0 ];
b[$] = a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: [0]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- switch me to ref tracking
- arr_mutation: implement array inlining analysis stuff