# Preval test case

# index_props.md

> Object literal > Index props
>
> Spread on number is an error

Normalize non-ident keys to be computed.

## Input

`````js filename=intro
const x = "hello";
const y = "world";
$({...x, ...y});
`````

## Pre Normal


`````js filename=intro
const x = `hello`;
const y = `world`;
$({ ...x, ...y });
`````

## Normalized


`````js filename=intro
const x = `hello`;
const y = `world`;
const tmpCallCallee = $;
const tmpCalleeParam = { ...x, ...y };
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { [`0`]: `w`, [`1`]: `o`, [`2`]: `r`, [`3`]: `l`, [`4`]: `d` };
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  [ "0" ]: "w",
  [ "1" ]: "o",
  [ "2" ]: "r",
  [ "3" ]: "l",
  [ "4" ]: "d",
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"w"', 1: '"o"', 2: '"r"', 3: '"l"', 4: '"d"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
