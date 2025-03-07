# Preval test case

# sequence_ident.md

> Normalize > Member access > Statement > Func > Sequence ident
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  let b = "foo";
  ($(1), b).length;
}
$(f());
`````

## Settled


`````js filename=intro
$(1);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = `foo`;
  ($(1), b).length;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = `foo`;
  $(1);
  const tmpCompObj = b;
  tmpCompObj.length;
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
