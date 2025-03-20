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


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [`0`]: `h`, [`1`]: `e`, [`2`]: `l`, [`3`]: `l`, [`4`]: `o` };
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`0`]: `h`, [`1`]: `e`, [`2`]: `l`, [`3`]: `l`, [`4`]: `o` });
`````


## PST Settled
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


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"h"', 1: '"e"', 2: '"l"', 3: '"l"', 4: '"o"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
