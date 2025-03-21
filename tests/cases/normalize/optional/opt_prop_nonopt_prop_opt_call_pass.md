# Preval test case

# opt_prop_nonopt_prop_opt_call_pass.md

> Normalize > Optional > Opt prop nonopt prop opt call pass
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {c: $}};
a?.b.c?.(1);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal /*:object*/ = { c: $ };
  $dotCall($, tmpObjLitVal, `c`, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!($ == null)) {
  $dotCall($, { c: $ }, `c`, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {

}
else {
  const b = { c: $ };
  $dotCall( $, b, "c", 1 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
