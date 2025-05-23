# Preval test case

# template_with_primitive.md

> Pcode > Template with primitive
>
> This was hitting a code path where templates were assumed to have idents for expressions but it could still be a primitive too

## Input

`````js filename=intro
{
  const f = function() {
    const tmpReturnArg$303/*:string*/ = `${`abcd`}e`;
    return tmpReturnArg$303;
  }
  const t = f();
  $(t);
}
`````


## Settled


`````js filename=intro
$(`abcde`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abcde`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abcde" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $coerce(`abcd`, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
  const tmpReturnArg$303 = `${tmpStringConcatR}e`;
  return tmpReturnArg$303;
};
const t = f();
$(t);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abcde'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
