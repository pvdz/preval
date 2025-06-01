# Preval test case

# math_method_prop.md

> Ai > Ai5 > Math method prop
>
> Test simplification of math method property access

## Input

`````js filename=intro
const obj = { "1": 1, "2": 2 };
const x = obj[Math.abs(-1)];
const y = obj[Math.abs(-2)];
$(x + y);

// Expected:
// const obj = { "1": 1, "2": 2 };
// const x = obj["1"];
// const y = obj["2"];
// $(x + y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:number*/ = $Math_abs(-1);
const tmpCalleeParam$1 /*:number*/ = $Math_abs(-2);
const obj /*:object*/ = { [`1`]: 1, [`2`]: 2 };
const x /*:unknown*/ = obj[tmpCalleeParam];
const y /*:unknown*/ = obj[tmpCalleeParam$1];
const tmpCalleeParam$3 /*:primitive*/ = x + y;
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $Math_abs(-1);
const tmpCalleeParam$1 = $Math_abs(-2);
const obj = { [`1`]: 1, [`2`]: 2 };
const x = obj[tmpCalleeParam];
$(x + obj[tmpCalleeParam$1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Math_abs( -1 );
const b = $Math_abs( -2 );
const c = {
  [ "1" ]: 1,
  [ "2" ]: 2,
};
const d = c[ a ];
const e = c[ b ];
const f = d + e;
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`1`]: 1, [`2`]: 2 };
const tmpCompObj = obj;
const tmpMCF = $Math_abs;
const tmpCalleeParam = $Math_abs(-1);
const x = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 = obj;
const tmpMCF$1 = $Math_abs;
const tmpCalleeParam$1 = $Math_abs(-2);
const y = tmpCompObj$1[tmpCalleeParam$1];
let tmpCalleeParam$3 = x + y;
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
