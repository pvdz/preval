# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) && (a = $?.(1)));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  a = $(1);
}
if (a) {
  const tmpIfTest$1 /*:boolean*/ = $ == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpNestedComplexRhs /*:unknown*/ = $(1);
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if (!($ == null)) {
  a = $(1);
}
if (a) {
  if ($ == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpNestedComplexRhs = $(1);
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  $(a);
  $(a);
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
if (a) {
  const c = $ == null;
  if (c) {
    $( undefined );
    $( undefined );
  }
  else {
    const d = $( 1 );
    $( d );
    $( d );
  }
}
else {
  $( a );
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
