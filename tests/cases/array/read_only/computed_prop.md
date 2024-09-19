# Preval test case

# computed_prop.md

> Array > Read only > Computed prop
>
> As computed prop. Of itself. Should not trigger the arrrr case.

## Input

`````js filename=intro
const arr = [1, , 3, 4];
$(arr[1]);
$(arr[arr]);
$(`${arr[2]}xyz`);
`````

## Pre Normal


`````js filename=intro
const arr = [1, , 3, 4];
$(arr[1]);
$(arr[arr]);
$(`` + $coerce(arr[2], `string`) + `xyz`);
`````

## Normalized


`````js filename=intro
const arr = [1, , 3, 4];
const tmpCallCallee = $;
const tmpCalleeParam = arr[1];
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = arr[arr];
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpBinBothLhs = ``;
const tmpCallCallee$5 = arr[2];
const tmpBinBothRhs = $coerce(tmpCallCallee$5, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam$3 = `${tmpStringConcatR}xyz`;
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
$(undefined);
const arr /*:array*/ = [1, , 3, 4];
const tmpCalleeParam$1 = arr[`1,[object Object],3,4`];
$(tmpCalleeParam$1);
$(`3xyz`);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
const a = [ 1, ,, 3, 4 ];
const b = a[ "1,[object Object],3,4" ];
$( b );
$( "3xyz" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - 3: '3xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
