# Preval test case

# coerce_array.md

> Tests > Tofix > Coerce array
>
> We can do this kind of contrived cases tho

## Input

`````js filename=intro
const arr = [1, 2];
const rra = arr.reverse();
const s = $coerce(rra, `string`);
$(s)
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2];
const rra = arr.reverse();
const s = $coerce(rra, `string`);
$(s);
`````

## Normalized


`````js filename=intro
const arr = [1, 2];
const rra = arr.reverse();
const s = $coerce(rra, `string`);
$(s);
`````

## Output


`````js filename=intro
const arr /*:array*/ = [1, 2];
const rra = arr.reverse();
const s /*:string*/ = $coerce(rra, `string`);
$(s);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2 ];
const b = a.reverse();
const c = $coerce( b, "string" );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '2,1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
