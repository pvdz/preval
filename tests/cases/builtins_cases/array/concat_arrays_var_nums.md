# Preval test case

# concat_arrays_var_nums.md

> Builtins cases > Array > Concat arrays var nums
>
> const a = [];

## Input

`````js filename=intro
const a = [1];
const b = [2];
const c = a.concat(b);
const d = '' + c;
$(d);
`````

## Pre Normal


`````js filename=intro
const a = [1];
const b = [2];
const c = a.concat(b);
const d = `` + c;
$(d);
`````

## Normalized


`````js filename=intro
const a = [1];
const b = [2];
const c = a.concat(b);
const d = $coerce(c, `plustr`);
$(d);
`````

## Output


`````js filename=intro
$(`1,2`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "1,2" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1,2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
