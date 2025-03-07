# Preval test case

# out_if_inside_if.md

> Ssa > Single scope > Out if inside if
>
> This should be SSA'd

## Input

`````js filename=intro
let dedupeMe = !tmpUnaryArg$83;
if (dedupeMe) {
  $(true, 'abc');
} else {
  const c = props$15.children;
  dedupeMe = c == null;
  $(dedupeMe, 'xyz');
}
`````

## Settled


`````js filename=intro
if (tmpUnaryArg$83) {
  const c /*:unknown*/ = props$15.children;
  const tmpClusterSSA_dedupeMe /*:boolean*/ = c == null;
  $(tmpClusterSSA_dedupeMe, `xyz`);
} else {
  $(true, `abc`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (tmpUnaryArg$83) {
  $(props$15.children == null, `xyz`);
} else {
  $(true, `abc`);
}
`````

## Pre Normal


`````js filename=intro
let dedupeMe = !tmpUnaryArg$83;
if (dedupeMe) {
  $(true, `abc`);
} else {
  const c = props$15.children;
  dedupeMe = c == null;
  $(dedupeMe, `xyz`);
}
`````

## Normalized


`````js filename=intro
let dedupeMe = !tmpUnaryArg$83;
if (dedupeMe) {
  $(true, `abc`);
} else {
  const c = props$15.children;
  dedupeMe = c == null;
  $(dedupeMe, `xyz`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
if (tmpUnaryArg$83) {
  const a = props$15.children;
  const b = a == null;
  $( b, "xyz" );
}
else {
  $( true, "abc" );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

tmpUnaryArg$83, props$15

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
