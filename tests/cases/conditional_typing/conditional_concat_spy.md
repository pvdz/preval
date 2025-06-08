# Preval test case

# conditional_concat_spy.md

> Conditional typing > Conditional concat spy
>
> Random example from Tenko

Ideally we could cut this down by moving stuff inside

## Input

`````js filename=intro
const lastType = $(2097173); 
function f() {
  const tmpBinBothLhs$253 = 'Parser error! ' + $spy();
  let tmpBinBothRhs$253 = undefined;
  const tmpIfTest$1787 = lastType === 2097173;
  if (tmpIfTest$1787) {
    tmpBinBothRhs$253 = ' (at EOF)';
  } else {
    tmpBinBothRhs$253 = '';
  }
  const fullErrmsg = tmpBinBothLhs$253 + tmpBinBothRhs$253;
  $('-->', fullErrmsg);
}
$(f());
`````


## Settled


`````js filename=intro
const lastType /*:unknown*/ = $(2097173);
const tmpBinBothRhs /*:unknown*/ = $spy();
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpIfTest$1787 /*:boolean*/ = lastType === 2097173;
if (tmpIfTest$1787) {
  const tmpClusterSSA_fullErrmsg /*:string*/ /*truthy*/ = `Parser error! ${tmpStringConcatL} (at EOF)`;
  $(`-->`, tmpClusterSSA_fullErrmsg);
  $(undefined);
} else {
  const tmpBinBothLhs$253 /*:string*/ /*truthy*/ = `Parser error! ${tmpStringConcatL}`;
  $(`-->`, tmpBinBothLhs$253);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const lastType = $(2097173);
const tmpStringConcatL = $coerce($spy(), `plustr`);
if (lastType === 2097173) {
  $(`-->`, `Parser error! ${tmpStringConcatL} (at EOF)`);
  $(undefined);
} else {
  $(`-->`, `Parser error! ${tmpStringConcatL}`);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2097173 );
const b = $spy();
const c = $coerce( b, "plustr" );
const d = a === 2097173;
if (d) {
  const e = `Parser error! ${c} (at EOF)`;
  $( "-->", e );
  $( undefined );
}
else {
  const f = `Parser error! ${c}`;
  $( "-->", f );
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpBinBothLhs = `Parser error! `;
  const tmpBinBothRhs = $spy();
  const tmpBinBothLhs$253 = tmpBinBothLhs + tmpBinBothRhs;
  let tmpBinBothRhs$253 = undefined;
  const tmpIfTest$1787 = lastType === 2097173;
  if (tmpIfTest$1787) {
    tmpBinBothRhs$253 = ` (at EOF)`;
  } else {
    tmpBinBothRhs$253 = ``;
  }
  const fullErrmsg = tmpBinBothLhs$253 + tmpBinBothRhs$253;
  $(`-->`, fullErrmsg);
  return undefined;
};
const lastType = $(2097173);
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2097173
 - 2: 'Creating spy', 1, 0, ['spy', 12345]
 - 3: '$spy[1].valueOf()'
 - 4: '-->', 'Parser error! 12345 (at EOF)'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
