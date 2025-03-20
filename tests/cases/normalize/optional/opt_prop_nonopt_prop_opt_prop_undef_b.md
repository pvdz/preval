# Preval test case

# opt_prop_nonopt_prop_opt_prop_undef_b.md

> Normalize > Optional > Opt prop nonopt prop opt prop undef b
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {};
$(a?.b.c?.d);
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Object_prototype.b;
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementObject$1.d;
  $(tmpChainElementObject$3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementObject$1 = $Object_prototype.b.c;
if (tmpChainElementObject$1 == null) {
  $(undefined);
} else {
  $(tmpChainElementObject$1.d);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
const c = b == null;
if (c) {
  $( undefined );
}
else {
  const d = b.d;
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
