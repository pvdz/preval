# Preval test case

# opt_prop_nonopt_prop_opt_call_undef_method.md

> Normalize > Optional > Opt prop nonopt prop opt call undef method
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {}};
a?.b.c?.(1);
`````


## Settled


`````js filename=intro
const tmpChainElementObject$1 /*:unknown*/ = $Object_prototype.c;
const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal /*:object*/ = {};
  $dotCall(tmpChainElementObject$1, tmpObjLitVal, `c`, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementObject$1 = $Object_prototype.c;
if (!(tmpChainElementObject$1 == null)) {
  $dotCall(tmpChainElementObject$1, {}, `c`, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.c;
const b = a == null;
if (b) {

}
else {
  const c = {};
  $dotCall( a, c, "c", 1 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
