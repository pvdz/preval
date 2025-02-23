# Preval test case

# coerce_array.md

> Array > Manipulation > Reverse > Coerce array
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
$(`2,1`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "2,1" );
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
