# Preval test case

# base.md

> String replacer > Base
>
> Case that triggered this reducer

## Input

`````js filename=intro
const callback = function(matchPart, matchGroup) {
  if (matchGroup === '/') {
    return `then-string ${matchPart} ${matchGroup}`;
  } else {
    return `else-string ${matchPart} ${matchGroup}`;
  }
};
const getString = function() {
  const regex = new $regex_constructor(`^~([a-z]+|\\/)`, ``);
  return `~/`.replace(regex, callback);
};
$(getString());
`````


## Settled


`````js filename=intro
const callback /*:(unknown, unknown)=>string*/ = function ($$0, $$1) {
  const matchPart /*:unknown*/ = $$0;
  const matchGroup /*:unknown*/ = $$1;
  debugger;
  const tmpBinBothRhs$4 /*:string*/ = $coerce(matchPart, `string`);
  const tmpIfTest /*:boolean*/ = matchGroup === `/`;
  if (tmpIfTest) {
    const tmpReturnArg /*:string*/ /*truthy*/ = `then-string ${tmpBinBothRhs$4} /`;
    return tmpReturnArg;
  } else {
    const tmpBinBothRhs$6 /*:string*/ = $coerce(matchGroup, `string`);
    const tmpReturnArg$1 /*:string*/ /*truthy*/ = `else-string ${tmpBinBothRhs$4} ${tmpBinBothRhs$6}`;
    return tmpReturnArg$1;
  }
};
const regex /*:regex*/ /*truthy*/ = new $regex_constructor(`^~([a-z]+|\\/)`, ``);
const tmpReturnArg$3 /*:string*/ = $dotCall($string_replace, `~/`, `replace`, regex, callback);
$(tmpReturnArg$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const callback = function (matchPart, matchGroup) {
  const tmpBinBothRhs$4 = $coerce(matchPart, `string`);
  if (matchGroup === `/`) {
    const tmpReturnArg = `then-string ${tmpBinBothRhs$4} /`;
    return tmpReturnArg;
  } else {
    const tmpBinBothRhs$6 = $coerce(matchGroup, `string`);
    const tmpReturnArg$1 = `else-string ${tmpBinBothRhs$4} ${tmpBinBothRhs$6}`;
    return tmpReturnArg$1;
  }
};
$($dotCall($string_replace, `~/`, `replace`, new $regex_constructor(`^~([a-z]+|\\/)`, ``), callback));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = $coerce( b, "string" );
  const e = c === "/";
  if (e) {
    const f = `then-string ${d} /`;
    return f;
  }
  else {
    const g = $coerce( c, "string" );
    const h = `else-string ${d} ${g}`;
    return h;
  }
};
const i = new $regex_constructor( "^~([a-z]+|\\/)", "" );
const j = $dotCall( $string_replace, "~/", "replace", i, a );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const callback = function ($$0, $$1) {
  let matchPart = $$0;
  let matchGroup = $$1;
  debugger;
  const tmpIfTest = matchGroup === `/`;
  if (tmpIfTest) {
    const tmpBinBothLhs$1 = `then-string `;
    const tmpBinBothRhs$1 = $coerce(matchPart, `string`);
    const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
    const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
    const tmpBinBothLhs = `${tmpStringConcatR} `;
    const tmpBinBothRhs = $coerce(matchGroup, `string`);
    const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
    const tmpReturnArg = $coerce(tmpBinLhs, `plustr`);
    return tmpReturnArg;
  } else {
    const tmpBinBothLhs$5 = `else-string `;
    const tmpBinBothRhs$5 = $coerce(matchPart, `string`);
    const tmpBinLhs$5 = tmpBinBothLhs$5 + tmpBinBothRhs$5;
    const tmpStringConcatR$1 = $coerce(tmpBinLhs$5, `plustr`);
    const tmpBinBothLhs$3 = `${tmpStringConcatR$1} `;
    const tmpBinBothRhs$3 = $coerce(matchGroup, `string`);
    const tmpBinLhs$3 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
    const tmpReturnArg$1 = $coerce(tmpBinLhs$3, `plustr`);
    return tmpReturnArg$1;
  }
};
const getString = function () {
  debugger;
  const regex = new $regex_constructor(`^~([a-z]+|\\/)`, ``);
  const tmpMCF = $string_replace;
  const tmpReturnArg$3 = $dotCall($string_replace, `~/`, `replace`, regex, callback);
  return tmpReturnArg$3;
};
let tmpCalleeParam = getString();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'then-string ~/ /'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
