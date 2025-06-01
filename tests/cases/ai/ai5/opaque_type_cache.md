# Preval test case

# opaque_type_cache.md

> Ai > Ai5 > Opaque type cache
>
> Test caching of type checks for opaque values

## Input

`````js filename=intro
const x = $("test");
if (typeof x === "string") {
    const y = x.length;
    $(y);
}
if (typeof x === "string") {
    const z = x.toUpperCase();
    $(z);
}

// Expected:
// const x = $("test");
// const isString = typeof x === "string";
// if (isString) {
//     const y = x.length;
//     $(y);
// }
// if (isString) {
//     const z = x.toUpperCase();
//     $(z);
// }
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpBinLhs /*:string*/ = typeof x;
const tmpIfTest /*:boolean*/ = tmpBinLhs === `string`;
if (tmpIfTest) {
  const y /*:unknown*/ = x.length;
  $(y);
} else {
}
const tmpBinLhs$1 /*:string*/ = typeof x;
const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$1 === `string`;
if (tmpIfTest$1) {
  const tmpMCF /*:unknown*/ = x.toUpperCase;
  const z /*:unknown*/ = $dotCall(tmpMCF, x, `toUpperCase`);
  $(z);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
if (typeof x === `string`) {
  $(x.length);
}
if (typeof x === `string`) {
  $(x.toUpperCase());
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
const e = typeof a;
const f = e === "string";
if (f) {
  const g = a.toUpperCase;
  const h = $dotCall( g, a, "toUpperCase" );
  $( h );
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
}
const tmpBinLhs$1 = typeof x;
const tmpIfTest$1 = tmpBinLhs$1 === `string`;
if (tmpIfTest$1) {
  const tmpMCF = x.toUpperCase;
  const z = $dotCall(tmpMCF, x, `toUpperCase`);
  $(z);
} else {
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
 - 3: 'TEST'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
