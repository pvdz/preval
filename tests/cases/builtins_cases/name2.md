# Preval test case

# name2.md

> Builtins cases > Name2
>
> Function(eval())()

## Input

`````js filename=intro
const tmpBinBothRhs$205= String.name;
const tmpStringConcatL/*:string*/ = $coerce(tmpBinBothRhs$205, `plustr`);
const tmpCallCompProp$1/*:string*/ = `to${tmpStringConcatL}`;
const tmpCallCompVal$1= (31)[tmpCallCompProp$1];
const tmpBinBothRhs$141= $dotCall(tmpCallCompVal$1, 31, 'toString', `32`);
const tmpStringConcatL$2/*:string*/ = $coerce(tmpBinBothRhs$141, `plustr`);
const tmpCalleeParam$1/*:string*/ = `return e${tmpStringConcatL$2}al`;
const tmpCallComplexCallee= Function(tmpCalleeParam$1);
const tmpCallCallee= tmpCallComplexCallee();
tmpCallCallee(`$('win')`);
`````


## Settled


`````js filename=intro
eval(`$('win')`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
eval(`$('win')`);
`````


## PST Settled
With rename=true

`````js filename=intro
eval( "$('win')" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothRhs$205 = `String`;
const tmpStringConcatL = $coerce(tmpBinBothRhs$205, `plustr`);
const tmpBinBothLhs = `to`;
const tmpBinBothRhs = $coerce(tmpStringConcatL, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCallCompProp$1 = $coerce(tmpBinLhs, `plustr`);
const tmpCallCompVal$1 = $Number_prototype[tmpCallCompProp$1];
const tmpBinBothRhs$141 = $dotCall(tmpCallCompVal$1, 31, `toString`, `32`);
const tmpStringConcatL$2 = $coerce(tmpBinBothRhs$141, `plustr`);
const tmpBinBothLhs$1 = `return e`;
const tmpBinBothRhs$1 = $coerce(tmpStringConcatL$2, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpCalleeParam$1 = `${tmpStringConcatR}al`;
const tmpCallComplexCallee = $function_constructor(tmpCalleeParam$1);
const tmpCallCallee = tmpCallComplexCallee();
tmpCallCallee(`$('win')`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - !1: 'win'
 - !eval returned: undefined

Denormalized calls: BAD!!
 - !1: 'win'
 - !eval returned: undefined
