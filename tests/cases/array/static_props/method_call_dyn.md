# Preval test case

# method_call_dyn.md

> Array > Static props > Method call dyn
>
> Getting the length of an array can be tricky, and sometimes be done

We have no idea whether anything is happening to the array so we must bail.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr[$('splice')](1, 2, 20);
$(arr.length);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
arr[$(`splice`)](1, 2, 20);
$(arr.length);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const tmpCallCompObj = arr;
const tmpCallCompProp = $(`splice`);
tmpCallCompObj[tmpCallCompProp](1, 2, 20);
const tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`splice`);
const arr /*:array*/ = [1, 2, 3];
arr[tmpCallCompProp](1, 2, 20);
const tmpCalleeParam /*:number*/ = arr.length;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "splice" );
const b = [ 1, 2, 3 ];
b[ a ]( 1, 2, 20 );
const c = b.length;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'splice'
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
