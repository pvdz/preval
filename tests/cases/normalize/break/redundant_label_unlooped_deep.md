# Preval test case

# redundant_label_unlooped_deep.md

> Normalize > Break > Redundant label unlooped deep
>
> If a labeled break does the same thing without the label then the label should be dropped

## Input

`````js filename=intro
let x = $(2);
exit: {
  {
    $(1);
    
    if ($(1)) {
      x = $(3);
    }
    if (x) {
      break exit;
    } else {
      x = $(4);
    }
  }
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(2);
$(1);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  x = $(3);
} else {
}
if (x) {
} else {
  $(4);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(2);
$(1);
if ($(1)) {
  x = $(3);
}
if (!x) {
  $(4);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 2 );
$( 1 );
const b = $( 1 );
if (b) {
  a = $( 3 );
}
if (a) {

}
else {
  $( 4 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 1
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
