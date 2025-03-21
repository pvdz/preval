# Preval test case

# if_sequence_prop.md

> Normalize > Sequence > If sequence prop
>
> Conditional sequence with property

## Input

`````js filename=intro
if (($(1), $(2)).foo) $(3);
`````


## Settled


`````js filename=intro
$(1);
const tmpCompObj /*:unknown*/ = $(2);
const tmpIfTest /*:unknown*/ = tmpCompObj.foo;
if (tmpIfTest) {
  $(3);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($(2).foo) {
  $(3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = a.foo;
if (b) {
  $( 3 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
