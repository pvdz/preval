# Preval test case

# wowwhat.md

> Normalize > Compound > Wowwhat
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

## Input

`````js filename=intro
const spy = {
  valueOf(){ return 1; },
  toString(){ return 'a'; },
};
$('a' + spy === `a${spy}`);

`````

## Settled


`````js filename=intro
const spy /*:object*/ = {
  valueOf() {
    debugger;
    return 1;
  },
  toString() {
    debugger;
    return `a`;
  },
};
$coerce(spy, `plustr`);
$coerce(spy, `string`);
$(false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const spy = {
  valueOf() {
    return 1;
  },
  toString() {
    return `a`;
  },
};
$coerce(spy, `plustr`);
$coerce(spy, `string`);
$(false);
`````

## Pre Normal


`````js filename=intro
const spy = {
  valueOf() {
    debugger;
    return 1;
  },
  toString() {
    debugger;
    return `a`;
  },
};
$(`a` + spy === `a` + $coerce(spy, `string`) + ``);
`````

## Normalized


`````js filename=intro
const spy = {
  valueOf() {
    debugger;
    return 1;
  },
  toString() {
    debugger;
    return `a`;
  },
};
const tmpStringConcatL = $coerce(spy, `plustr`);
const tmpBinBothLhs = `a${tmpStringConcatL}`;
const tmpBinBothLhs$1 = `a`;
const tmpBinBothRhs$1 = $coerce(spy, `string`);
const tmpBinLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothRhs = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  valueOf(  ) {
    debugger;
    return 1;
  },
  toString(  ) {
    debugger;
    return "a";
  },
};
$coerce( a, "plustr" );
$coerce( a, "string" );
$( false );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
