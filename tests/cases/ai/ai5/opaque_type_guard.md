# Preval test case

# opaque_type_guard.md

> Ai > Ai5 > Opaque type guard
>
> Test preservation of opaque value type guards

## Input

`````js filename=intro
const x = $("test");
if (typeof x === "string") {
    const y = x.length;
    $(y);
} else {
    const y = String(x).length;
    $(y);
}

// Expected:
// const x = $("test");
// const y = typeof x === "string" ? x.length : String(x).length;
// $(y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpBinLhs /*:string*/ /*truthy*/ = typeof x;
const tmpIfTest /*:boolean*/ = tmpBinLhs === `string`;
if (tmpIfTest) {
  const y /*:unknown*/ = x.length;
  $(y);
} else {
  const tmpCompObj /*:string*/ = $coerce(x, `string`);
  const y$1 /*:number*/ = tmpCompObj.length;
  $(y$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
if (typeof x === `string`) {
  $(x.length);
} else {
  $($coerce(x, `string`).length);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = typeof a;
const c = b === "string";
if (c) {
  const d = a.length;
  $( d );
}
else {
  const e = $coerce( a, "string" );
  const f = e.length;
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const tmpBinLhs = typeof x;
const tmpIfTest = tmpBinLhs === `string`;
if (tmpIfTest) {
  const y = x.length;
  $(y);
} else {
  const tmpCompObj = $coerce(x, `string`);
  const y$1 = tmpCompObj.length;
  $(y$1);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
