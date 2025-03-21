# Preval test case

# string_obj_twice.md

> Normalize > Spread > String obj twice
>
> Spread on number is an error

## Input

`````js filename=intro
const x = "hello";
const y = "world";
$({...x, ...y});
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [`0`]: `w`, [`1`]: `o`, [`2`]: `r`, [`3`]: `l`, [`4`]: `d` };
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`0`]: `w`, [`1`]: `o`, [`2`]: `r`, [`3`]: `l`, [`4`]: `d` });
`````


## PST Settled
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"w"', 1: '"o"', 2: '"r"', 3: '"l"', 4: '"d"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
