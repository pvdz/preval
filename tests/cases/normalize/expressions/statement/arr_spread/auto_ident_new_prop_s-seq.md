# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Statement > Arr spread > Auto ident new prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
[...new (1, 2, b).$(1)];
$(a);
`````


## Settled


`````js filename=intro
const tmpArrElToSpread /*:object*/ = new $(1);
[...tmpArrElToSpread];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElToSpread = new $(1);
[...tmpArrElToSpread];
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
[ ...a ];
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
