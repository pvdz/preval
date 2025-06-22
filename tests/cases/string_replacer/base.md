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
$(`then-string ~/ /`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`then-string ~/ /`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "then-string ~/ /" );
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


- (todo) Record this phase1.1 as a test case, please (A)
- (todo) find test case where template ends up with multiple expressions
- (todo) sticky flag, lastindex cases


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
