# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = function f() {};
}
$(a);
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const f /*:()=>undefined*/ = function () {
    debugger;
    return undefined;
  };
  $(f);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  $(function () {});
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = function() {
    debugger;
    return undefined;
  };
  $( d );
}
else {
  const e = {
    a: 999,
    b: 1000,
  };
  $( e );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
