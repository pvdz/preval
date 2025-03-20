# Preval test case

# pst_output_renaming_gone_wrong.md

> Tofix > pst output renaming gone wrong
>
> The PST output is renaming a var to a global that was seen. It should not use `a`

## Input

`````js filename=intro
{
  let x = 20;
  {
    $(a); // 20
    if ($(1)) {
      $(x); // 20
      x = 30; // overwrites the 20
    }
    $(x); // 20, 30
    if ($(2)) {
      $(x); // 20, 30
      x = 40; // overwrites the 20 and 30
    }
    $(x); // 20, 30, 40
  }
}
`````


## Settled


`````js filename=intro
let x /*:number*/ = 20;
$(a);
const tmpIfTest /*:unknown*/ = $(1);
$(20);
if (tmpIfTest) {
  x = 30;
  $(30);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(2);
$(x);
if (tmpIfTest$1) {
  $(40);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 20;
$(a);
const tmpIfTest = $(1);
$(20);
if (tmpIfTest) {
  x = 30;
  $(30);
}
const tmpIfTest$1 = $(2);
$(x);
if (tmpIfTest$1) {
  $(40);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let b = 20;
$( a );
const c = $( 1 );
$( 20 );
if (c) {
  b = 30;
  $( 30 );
}
const d = $( 2 );
$( b );
if (d) {
  $( 40 );
}
`````


## Globals


BAD@! Found 1 implicit global bindings:

a


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
