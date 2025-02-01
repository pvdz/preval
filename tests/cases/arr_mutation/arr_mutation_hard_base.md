# Preval test case

# arr_mutation_hard_base.md

> Arr mutation > Arr mutation hard base
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
const d = $();
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

## Denormalized

(This ought to be the final result)


`````js filename=intro
const d = $();
$([d]);
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

Post settled calls: Same

Denormalized calls: Same
