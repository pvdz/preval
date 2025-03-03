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

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis = this;
  let t = $$0;
  let e = $$1;
  let r = $$2;
  debugger;
  tmpSwitchBreak: {
    const tmpSwitchDisc = tmpPrevalAliasThis.state;
    if (tmpSwitchDisc === Yt.PARSING || tmpSwitchDisc === Yt.PARSED) {
      break tmpSwitchBreak;
    } else {
    }
  }
};
$(f);
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis = this;
  let t = $$0;
  let e = $$1;
  let r = $$2;
  debugger;
  const tmpSwitchDisc = tmpPrevalAliasThis.state;
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = Yt.PARSING;
  let tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    return undefined;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    const tmpBinBothRhs$1 = Yt.PARSED;
    tmpIfTest = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    return undefined;
  }
};
$(f);
`````

## Output


`````js filename=intro
const f /*:(unused, unused, unused)=>undefined*/ = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpSwitchDisc /*:unknown*/ = tmpPrevalAliasThis.state;
  const tmpBinBothRhs /*:unknown*/ = Yt.PARSING;
  const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
  if (tmpIfTest) {
    return undefined;
  } else {
    Yt.PARSED;
    return undefined;
  }
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = this;
  debugger;
  const c = b.state;
  const d = Yt.PARSING;
  const e = c === d;
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

## Globals

BAD@! Found 1 implicit global bindings:

Yt

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
