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
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
