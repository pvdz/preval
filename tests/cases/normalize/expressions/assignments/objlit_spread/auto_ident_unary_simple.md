# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = typeof x) });
$(a, x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [`0`]: `n`, [`1`]: `u`, [`2`]: `m`, [`3`]: `b`, [`4`]: `e`, [`5`]: `r` };
$(tmpCalleeParam);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`0`]: `n`, [`1`]: `u`, [`2`]: `m`, [`3`]: `b`, [`4`]: `e`, [`5`]: `r` });
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ "0" ]: "n",
  [ "1" ]: "u",
  [ "2" ]: "m",
  [ "3" ]: "b",
  [ "4" ]: "e",
  [ "5" ]: "r",
};
$( a );
$( "number", 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"n"', 1: '"u"', 2: '"m"', 3: '"b"', 4: '"e"', 5: '"r"' }
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
