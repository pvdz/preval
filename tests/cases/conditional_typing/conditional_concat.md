# Preval test case

# conditional_concat.md

> Conditional typing > Conditional concat
>
> Random example from Tenko

Ideally we could cut this down by moving stuff inside

## Input

`````js filename=intro
function f() {
  const tmpBinBothLhs$253 = 'Parser error! ' + desc$1;
  let tmpBinBothRhs$253 = undefined;
  const tmpIfTest$1787 = lastType === 2097173;
  if (tmpIfTest$1787) {
    tmpBinBothRhs$253 = ' (at EOF)';
  } else {
    tmpBinBothRhs$253 = '';
  }
  const fullErrmsg = tmpBinBothLhs$253 + tmpBinBothRhs$253;
  _THROW(fullErrmsg, tokenStart$5, tokenStop$5, '');
  throw 'Preval: the previous call always throws';
}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const tmpBinBothLhs$253 = `Parser error! ` + desc$1;
  let tmpBinBothRhs$253 = undefined;
  const tmpIfTest$1787 = lastType === 2097173;
  if (tmpIfTest$1787) {
    tmpBinBothRhs$253 = ` (at EOF)`;
  } else {
    tmpBinBothRhs$253 = ``;
  }
  const fullErrmsg = tmpBinBothLhs$253 + tmpBinBothRhs$253;
  _THROW(fullErrmsg, tokenStart$5, tokenStop$5, ``);
  throw `Preval: the previous call always throws`;
};
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpStringConcatL = $coerce(desc$1, `plustr`);
  const tmpBinBothLhs$253 = `Parser error! ${tmpStringConcatL}`;
  let tmpBinBothRhs$253 = undefined;
  const tmpIfTest$1787 = lastType === 2097173;
  if (tmpIfTest$1787) {
    tmpBinBothRhs$253 = ` (at EOF)`;
  } else {
    tmpBinBothRhs$253 = ``;
  }
  const fullErrmsg = tmpBinBothLhs$253 + tmpBinBothRhs$253;
  _THROW(fullErrmsg, tokenStart$5, tokenStop$5, ``);
  throw `Preval: the previous call always throws`;
};
$(f);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const tmpStringConcatL = $coerce(desc$1, `plustr`);
  const tmpIfTest$1787 = lastType === 2097173;
  if (tmpIfTest$1787) {
    const tmpClusterSSA_fullErrmsg = `Parser error! ${tmpStringConcatL} (at EOF)`;
    _THROW(tmpClusterSSA_fullErrmsg, tokenStart$5, tokenStop$5, ``);
  } else {
    const tmpBinBothLhs$253 = `Parser error! ${tmpStringConcatL}`;
    _THROW(tmpBinBothLhs$253, tokenStart$5, tokenStop$5, ``);
  }
  throw `Preval: the previous call always throws`;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $coerce( desc$1, "plustr" );
  const c = lastType === 2097173;
  if (c) {
    const d = `Parser error! ${tmpStringConcatL} (at EOF)`;
    _THROW( d, tokenStart$5, tokenStop$5, "" );
  }
  else {
    const e = `Parser error! ${tmpStringConcatL}`;
    _THROW( e, tokenStart$5, tokenStop$5, "" );
  }
  throw "Preval: the previous call always throws";
};
$( a );
`````

## Globals

BAD@! Found 5 implicit global bindings:

desc$1, lastType, _THROW, tokenStart$5, tokenStop$5

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
