# Preval test case

# arr_mutation_hard_len_0.md

> Arr mutation > Arr mutation hard len 0
>
> There was a bug in arr_mutation where it would replace the
> initial `[0]` with `[d]`, introducing a TDZ throw.
> But in this case, especially with a back-to-back def and update, 
> we should still be able to do it. Just have to make sure we don't introduce
> another bug in arr_mutation

## Input

`````js filename=intro
let a = [1, 2, 3, 4, 5];
const d = $();
a.length = 0;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = [1, 2, 3, 4, 5];
const d = $();
a.length = 0;
$(a);
`````

## Normalized


`````js filename=intro
let a = [1, 2, 3, 4, 5];
const d = $();
a.length = 0;
$(a);
`````

## Output


`````js filename=intro
$();
const a /*:array*/ = [];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$();
const a = [];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- switch me to ref tracking