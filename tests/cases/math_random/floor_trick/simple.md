# Preval test case

# simple.md

> Math random > Floor trick > Simple
>
>

## Input

`````js filename=intro
const rnd = Math.random();
const rnd62 = rnd * 62;
const int62 = Math.floor(rnd62);
const chr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(int62);
$(chr);
`````

## Pre Normal


`````js filename=intro
const rnd = Math.random();
const rnd62 = rnd * 62;
const int62 = Math.floor(rnd62);
const chr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(int62);
$(chr);
`````

## Normalized


`````js filename=intro
const rnd = 0.12556649118791485;
const rnd62 = rnd * 62;
const int62 = $Math_floor(rnd62);
const chr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(int62);
$(chr);
`````

## Output


`````js filename=intro
$(`H`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "H" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'H'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
