# Preval test case

# string_method_prop.md

> Ai > Ai5 > String method prop
>
> Test simplification of string method property access

## Input

`````js filename=intro
const obj = { "a": 1, "b": 2 };
const x = obj["a".trim()];
const y = obj["b".trim()];
$(x + y);

// Expected:
// const obj = { "a": 1, "b": 2 };
// const x = obj.a;
// const y = obj.b;
// $(x + y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:string*/ = $dotCall($string_trim, `a`, `trim`);
const tmpCalleeParam$1 /*:string*/ = $dotCall($string_trim, `b`, `trim`);
const obj /*:object*/ = { a: 1, b: 2 };
const x /*:unknown*/ = obj[tmpCalleeParam];
const y /*:unknown*/ = obj[tmpCalleeParam$1];
const tmpCalleeParam$3 /*:primitive*/ = x + y;
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $dotCall($string_trim, `a`, `trim`);
const tmpCalleeParam$1 = $dotCall($string_trim, `b`, `trim`);
const obj = { a: 1, b: 2 };
const x = obj[tmpCalleeParam];
$(x + obj[tmpCalleeParam$1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $string_trim, "a", "trim" );
const b = $dotCall( $string_trim, "b", "trim" );
const c = {
  a: 1,
  b: 2,
};
const d = c[ a ];
const e = c[ b ];
const f = d + e;
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { a: 1, b: 2 };
const tmpCompObj = obj;
const tmpMCF = $string_trim;
const tmpCalleeParam = $dotCall($string_trim, `a`, `trim`);
const x = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 = obj;
const tmpMCF$1 = $string_trim;
const tmpCalleeParam$1 = $dotCall($string_trim, `b`, `trim`);
const y = tmpCompObj$1[tmpCalleeParam$1];
let tmpCalleeParam$3 = x + y;
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_trim


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
