# Preval test case

# if_flipping_regression.md

> Tofix > if flipping regression

it should not need the temp alias of h. if the ident crashes then so be
it but it cannot change the value of tmpReturnArg$39 when the call does
go through. so the alias is pointless.

## Input

`````js filename=intro
if (tmpIfTest$45) {
  tmpCalleeParam$127;
  const h /*:unknown*/ = tmpReturnArg$39;
  tmpSSA__0x2d5594;
  h(e, d);
  getParameterByName();
  unknown(297);
  alsoUnknown(310);
  const c /*:unknown*/ = $dotCall(a, document, undefined, b);
  $(c);
} else {
}
`````


## Settled


`````js filename=intro
if (tmpIfTest$45) {
  tmpCalleeParam$127;
  const h /*:unknown*/ = tmpReturnArg$39;
  tmpSSA__0x2d5594;
  h(e, d);
  getParameterByName();
  unknown(297);
  alsoUnknown(310);
  const c /*:unknown*/ = $dotCall(a, document, undefined, b);
  $(c);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (tmpIfTest$45) {
  tmpCalleeParam$127;
  const h = tmpReturnArg$39;
  tmpSSA__0x2d5594;
  h(e, d);
  getParameterByName();
  unknown(297);
  alsoUnknown(310);
  $($dotCall(a, document, undefined, b));
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (tmpIfTest$45) {
  tmpCalleeParam$127;
  const c = tmpReturnArg$39;
  tmpSSA__0x2d5594;
  c( e, d );
  getParameterByName();
  unknown( 297 );
  alsoUnknown( 310 );
  const f = $dotCall( a, document, undefined, b );
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if (tmpIfTest$45) {
  tmpCalleeParam$127;
  const h = tmpReturnArg$39;
  tmpSSA__0x2d5594;
  h(e, d);
  getParameterByName();
  unknown(297);
  alsoUnknown(310);
  const c = $dotCall(a, document, undefined, b);
  $(c);
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 11 implicit global bindings:

tmpIfTest$45, tmpCalleeParam$127, tmpReturnArg$39, tmpSSA__0x2d5594, e, d, getParameterByName, unknown, alsoUnknown, a, b


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
