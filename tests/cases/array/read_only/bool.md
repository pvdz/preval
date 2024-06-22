# Preval test case

# bool.md

> Array > Read only > Bool
>
> Arrays where it only reads properties

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
$(arr[1]);
$(arr[3]);
$(`${arr[2]}xyz`);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3, 4];
$(arr[1]);
$(arr[3]);
$(`` + $coerce(arr[2], `string`) + `xyz`);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3, 4];
const tmpCallCallee = $;
const tmpCalleeParam = arr[1];
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = arr[3];
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
$(2);
$(4);
$(`3xyz`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
$( 4 );
$( "3xyz" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 4
 - 3: '3xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
