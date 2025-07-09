# Preval test case

# template_bug.md

> Return > Template bug
>
> Regression could lead to returning a complex template

This was caused by replacing the `return str` with the template.
Since that's a complex node, it violated normalization rules, so it broke.

## Input

`````js filename=intro
const tmpReturnArg/*:(unknown)=>string*/ = function() {
  debugger;
  const x/*:unknown*/ = $();
  let str/*:string*/ = `${x}B`;
  if (str) {
    return str;
  } else {
    str = ``;
    return ``;
  }
};
$(tmpReturnArg);

`````


## Settled


`````js filename=intro
const tmpReturnArg /*:()=>string*/ = function () {
  debugger;
  const x /*:unknown*/ = $();
  const tmpBinBothRhs$2 /*:string*/ = $coerce(x, `string`);
  const tmpReadOnce /*:string*/ /*truthy*/ = `${tmpBinBothRhs$2}B`;
  return tmpReadOnce;
};
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  const tmpReadOnce = `${$()}B`;
  return tmpReadOnce;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $();
  const c = $coerce( b, "string" );
  const d = `${c}B`;
  return d;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpReturnArg = function () {
  debugger;
  const x = $();
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $coerce(x, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
  let str = `${tmpStringConcatR}B`;
  if (str) {
    return str;
  } else {
    str = ``;
    return ``;
  }
};
$(tmpReturnArg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
