# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) || $?.(1);
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  tmpIfTest = $(1);
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpIfTest$3 /*:boolean*/ = $ == null;
  if (tmpIfTest$3) {
    $(a);
  } else {
    $(1);
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
if (!($ == null)) {
  tmpIfTest = $(1);
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  if ($ == null) {
    $(a);
  } else {
    $(1);
    $(a);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  a = $( 1 );
}
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  $( c );
}
else {
  const d = $ == null;
  if (d) {
    $( c );
  }
  else {
    $( 1 );
    $( c );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
