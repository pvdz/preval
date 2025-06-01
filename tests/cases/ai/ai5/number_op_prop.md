# Preval test case

# number_op_prop.md

> Ai > Ai5 > Number op prop
>
> Test simplification of number operation property access

## Input

`````js filename=intro
const obj = { "1": 1, "2": 2 };
const x = obj[(1 + 0).toString()];
const y = obj[(2 + 0).toString()];
$(x + y);

// Expected:
// const obj = { "1": 1, "2": 2 };
// const x = obj["1"];
// const y = obj["2"];
// $(x + y);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { [`1`]: 1, [`2`]: 2 };
const x /*:unknown*/ = obj[`1`];
const y /*:unknown*/ = obj[`2`];
const tmpCalleeParam$3 /*:primitive*/ = x + y;
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = { [`1`]: 1, [`2`]: 2 };
const x = obj[`1`];
$(x + obj[`2`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ "1" ]: 1,
  [ "2" ]: 2,
};
const b = a[ "1" ];
const c = a[ "2" ];
const d = b + c;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`1`]: 1, [`2`]: 2 };
const tmpCompObj = obj;
const tmpMCOO = 1;
const tmpMCF = tmpMCOO.toString;
const tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `toString`);
const x = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 = obj;
const tmpMCOO$1 = 2;
const tmpMCF$1 = tmpMCOO$1.toString;
const tmpCalleeParam$1 = $dotCall(tmpMCF$1, tmpMCOO$1, `toString`);
const y = tmpCompObj$1[tmpCalleeParam$1];
let tmpCalleeParam$3 = x + y;
$(tmpCalleeParam$3);
`````


## Todos triggered


None


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
