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


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const tmpStringConcatL$1 /*:string*/ = $coerce(desc$1, `plustr`);
  const tmpIfTest$1787 /*:boolean*/ = lastType === 2097173;
  if (tmpIfTest$1787) {
    const tmpClusterSSA_fullErrmsg /*:string*/ = `Parser error! ${tmpStringConcatL$1} (at EOF)`;
    _THROW(tmpClusterSSA_fullErrmsg, tokenStart$5, tokenStop$5, ``);
  } else {
    const tmpBinBothLhs$253 /*:string*/ = `Parser error! ${tmpStringConcatL$1}`;
    _THROW(tmpBinBothLhs$253, tokenStart$5, tokenStop$5, ``);
  }
  throw `Preval: the previous call always throws`;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  const tmpStringConcatL$1 = $coerce(desc$1, `plustr`);
  if (lastType === 2097173) {
    _THROW(`Parser error! ${tmpStringConcatL$1} (at EOF)`, tokenStart$5, tokenStop$5, ``);
  } else {
    _THROW(`Parser error! ${tmpStringConcatL$1}`, tokenStart$5, tokenStop$5, ``);
  }
  throw `Preval: the previous call always throws`;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $coerce( desc$1, "plustr" );
  const c = lastType === 2097173;
  if (c) {
    const d = `Parser error! ${b} (at EOF)`;
    _THROW( d, tokenStart$5, tokenStop$5, "" );
  }
  else {
    const e = `Parser error! ${b}`;
    _THROW( e, tokenStart$5, tokenStop$5, "" );
  }
  throw "Preval: the previous call always throws";
};
$( a );
`````


## Globals


BAD@! Found 5 implicit global bindings:

desc$1, lastType, _THROW, tokenStart$5, tokenStop$5


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
