# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(60);
  $(a);
  $(undefined);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  $(a);
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(30);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(60);
  $(a);
  $(undefined);
} else {
  $($(100));
  $(a);
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpIfTest = $(30);
  if (tmpIfTest) {
    $(60);
    $(a);
    return undefined;
  } else {
    const tmpCalleeParam = $(100);
    $(tmpCalleeParam);
    $(a);
    return undefined;
  }
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 60 );
  $( b );
  $( undefined );
}
else {
  const c = $( 100 );
  $( c );
  $( b );
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
