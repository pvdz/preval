# Preval test case

# string_obj.md

> Normalize > Spread > String obj
>
> Spread on number is an error

## Input

`````js filename=intro
const x = "hello";
$({...x});
`````

## Pre Normal


`````js filename=intro
const x = `hello`;
$({ ...x });
`````

## Normalized


`````js filename=intro
const x = `hello`;
const tmpCalleeParam = { ...x };
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [`0`]: `h`, [`1`]: `e`, [`2`]: `l`, [`3`]: `l`, [`4`]: `o` };
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  [ "0" ]: "h",
  [ "1" ]: "e",
  [ "2" ]: "l",
  [ "3" ]: "l",
  [ "4" ]: "o",
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"h"', 1: '"e"', 2: '"l"', 3: '"l"', 4: '"o"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
