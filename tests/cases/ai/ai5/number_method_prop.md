# Preval test case

# number_method_prop.md

> Ai > Ai5 > Number method prop
>
> Test simplification of number method property access

## Input

`````js filename=intro
const obj = { "1": 1, "2": 2 };
const x = obj[1..toString()];
const y = obj[2..toString()];
$(x + y);

// Expected:
// const obj = { "1": 1, "2": 2 };
// const x = obj["1"];
// const y = obj["2"];
// $(x + y);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { [`1`]: 1, [`2`]: 2 };
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
const tmpMCF = $number_toString;
const tmpCalleeParam = `1`;
const x = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 = obj;
const tmpMCF$1 = $number_toString;
const tmpCalleeParam$1 = `2`;
const y = tmpCompObj$1[tmpCalleeParam$1];
let tmpCalleeParam$3 = x + y;
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) precision loss detected 4


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
