# Preval test case

# object_method_prop.md

> Ai > Ai5 > Object method prop
>
> Test simplification of object method property access

## Input

`````js filename=intro
const obj = { "a": 1, "b": 2 };
const x = obj[Object.keys({a:1})[0]];
const y = obj[Object.keys({b:1})[0]];
$(x + y);

// Expected:
// const obj = { "a": 1, "b": 2 };
// const x = obj.a;
// const y = obj.b;
// $(x + y);
`````


## Settled


`````js filename=intro
const tmpMCP /*:object*/ = { a: 1 };
const tmpCompObj$1 /*:array*/ = $Object_keys(tmpMCP);
const tmpCalleeParam /*:unknown*/ = tmpCompObj$1[0];
const tmpMCP$1 /*:object*/ = { b: 1 };
const tmpCompObj$5 /*:array*/ = $Object_keys(tmpMCP$1);
const tmpCalleeParam$1 /*:unknown*/ = tmpCompObj$5[0];
const obj /*:object*/ = { a: 1, b: 2 };
const x /*:unknown*/ = obj[tmpCalleeParam];
const y /*:unknown*/ = obj[tmpCalleeParam$1];
const tmpCalleeParam$3 /*:primitive*/ = x + y;
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $Object_keys({ a: 1 })[0];
const tmpCalleeParam$1 = $Object_keys({ b: 1 })[0];
const obj = { a: 1, b: 2 };
const x = obj[tmpCalleeParam];
$(x + obj[tmpCalleeParam$1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: 1 };
const b = $Object_keys( a );
const c = b[ 0 ];
const d = { b: 1 };
const e = $Object_keys( d );
const f = e[ 0 ];
const g = {
  a: 1,
  b: 2,
};
const h = g[ c ];
const i = g[ f ];
const j = h + i;
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { a: 1, b: 2 };
const tmpCompObj = obj;
const tmpMCF = $Object_keys;
const tmpMCP = { a: 1 };
const tmpCompObj$1 = $dotCall(tmpMCF, $object_constructor, `keys`, tmpMCP);
const tmpCalleeParam = tmpCompObj$1[0];
const x = tmpCompObj[tmpCalleeParam];
const tmpCompObj$3 = obj;
const tmpMCF$1 = $Object_keys;
const tmpMCP$1 = { b: 1 };
const tmpCompObj$5 = $dotCall(tmpMCF$1, $object_constructor, `keys`, tmpMCP$1);
const tmpCalleeParam$1 = tmpCompObj$5[0];
const y = tmpCompObj$3[tmpCalleeParam$1];
let tmpCalleeParam$3 = x + y;
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_keys


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
