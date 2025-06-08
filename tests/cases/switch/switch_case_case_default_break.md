# Preval test case

# switch_case_case_default_break.md

> Switch > Switch case case default break
>
>

## Input

`````js filename=intro
function f(t, e, r) {
  switch (this.state) {
    case Yt.PARSING:
    case Yt.PARSED:
    default:
      break;
  }
}
$(f);
`````


## Settled


`````js filename=intro
const f /*:(unused, unused, unused)=>undefined*/ = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis /*:object*/ /*truthy*/ = this;
  debugger;
  const tmpSwitchValue /*:unknown*/ = tmpPrevalAliasThis.state;
  const tmpBinLhs /*:unknown*/ = Yt.PARSING;
  const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    return undefined;
  } else {
    Yt.PARSED;
    return undefined;
  }
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function ($$0, $$1, $$2) {
  const tmpSwitchValue = this.state;
  const tmpIfTest = Yt.PARSING === tmpSwitchValue;
  if (!tmpIfTest) {
    Yt.PARSED;
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = this;
  debugger;
  const c = b.state;
  const d = Yt.PARSING;
  const e = d === c;
  if (e) {
    return undefined;
  }
  else {
    Yt.PARSED;
    return undefined;
  }
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis = this;
  let t = $$0;
  let e = $$1;
  let r = $$2;
  debugger;
  let tmpSwitchValue = tmpPrevalAliasThis.state;
  let tmpSwitchCaseToStart = 2;
  const tmpBinLhs = Yt.PARSING;
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpBinLhs$1 = Yt.PARSED;
    const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
  return undefined;
};
$(f);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Yt


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
