# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
((10, 20, $(30)) ? (40, 50, $(60)) : $($(100))).a;
$(a);
`````


## Settled


`````js filename=intro
let tmpCompObj /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  tmpCompObj = $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpCompObj = $(tmpCalleeParam);
}
tmpCompObj.a;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCompObj = undefined;
if ($(30)) {
  tmpCompObj = $(60);
} else {
  tmpCompObj = $($(100));
}
tmpCompObj.a;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
a.a;
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpCompObj = $(60);
} else {
  let tmpCalleeParam = $(100);
  tmpCompObj = $(tmpCalleeParam);
}
tmpCompObj.a;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
