# Preval test case

# regression.md

> If flipping > Regression
>
> This used to crash on finding a meta for _0x507e18
> The problem was that it would only delete a var decl and not the assign and
> then not do a full cycle, leading to incomplete meta.

## Input

`````js filename=intro
if (tmpIfTest$45) {
  const f = function() {
    const that = this;
    debugger;
    let g = tmpCalleeParam$127;
    let locked = undefined;
    if (tmpSSA__0x2d5594) {
      locked = function() {
        debugger;
        return undefined;
      };
    } else {
      locked = function() {
        const tmpPrevalAliasArgumentsAny$1 = arguments;
        debugger;
        if (g) {
          const result = g.apply(that, tmpPrevalAliasArgumentsAny$1);
          g = null;
          return result;
        } else {
          return undefined;
        }
      };
    }
    return tmpReturnArg$39;
  };
  const h = f();
  const ignored = h(e, d);
  const nothing = getParameterByName();
  const stuff = unknown(297);
  const morestuff = alsoUnknown(310);
  const c = $dotCall(a, document, undefined, b);
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
