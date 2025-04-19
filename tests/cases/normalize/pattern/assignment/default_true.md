# Preval test case

# default_true.md

> Normalize > Pattern > Assignment > Default true
>
> Assignment pattern with default

## Input

`````js filename=intro
let b
({
  a: b = $('default')
} = {
  
});
$(b);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Object_prototype.a;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_b /*:unknown*/ = $(`default`);
  $(tmpClusterSSA_b);
} else {
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Object_prototype.a;
if (tmpOPBD === undefined) {
  $($(`default`));
} else {
  $(tmpOPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.a;
const b = a === undefined;
if (b) {
  const c = $( "default" );
  $( c );
}
else {
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'default'
 - 2: 'default'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
