# Preval test case

# method_call_call_unknown.md

> Array > Static props > Method call call unknown
>
> Getting the length of an array can be tricky, and sometimes be done

In this case the array escapes so we bail.

#TODO

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.splice.call(arr, $(1), 2, 10, 20);
$(arr.length);
`````

## Pre Normal

`````js filename=intro
const arr = [1, 2, 3];
arr.splice.call(arr, $(1), 2, 10, 20);
$(arr.length);
`````

## Normalized

`````js filename=intro
const arr = [1, 2, 3];
const tmpCallObj = arr.splice;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam = arr;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = 2;
const tmpCalleeParam$5 = 10;
const tmpCalleeParam$7 = 20;
$dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
const tmpCallCallee = $;
const tmpCalleeParam$9 = arr.length;
tmpCallCallee(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const arr = [1, 2, 3];
const tmpCallObj = arr.splice;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam$1 = $(1);
$dotCall(tmpCallVal, tmpCallObj, arr, tmpCalleeParam$1, 2, 10, 20);
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = a.splice;
const c = b.call;
const d = $( 1 );
$dotCall( c, b, a, d, 2, 10, 20 );
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
