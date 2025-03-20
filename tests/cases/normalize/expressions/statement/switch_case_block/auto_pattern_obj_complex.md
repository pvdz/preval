# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Switch case block > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    $({ a: 1, b: 2 });
  }
}
$(a);
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
  $(tmpCalleeParam);
  $(999);
} else {
  $(999);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  $({ a: 1, b: 2 });
  $(999);
} else {
  $(999);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = {
    a: 1,
    b: 2,
  };
  $( d );
  $( 999 );
}
else {
  $( 999 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '1', b: '2' }
 - 4: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
