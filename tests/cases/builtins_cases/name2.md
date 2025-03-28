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
const tmpBinBothRhs$141 /*:unknown*/ = $dotCall($number_toString, 31, `toString`, `32`);
const tmpStringConcatL$2 /*:string*/ = $coerce(tmpBinBothRhs$141, `plustr`);
const tmpCalleeParam$1 /*:string*/ = `return e${tmpStringConcatL$2}al`;
const tmpCallComplexCallee /*:function*/ = Function(tmpCalleeParam$1);
const tmpCallCallee /*:unknown*/ = tmpCallComplexCallee();
tmpCallCallee(`$('win')`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL$2 = $coerce($dotCall($number_toString, 31, `toString`, `32`), `plustr`);
const tmpCallComplexCallee = Function(`return e${tmpStringConcatL$2}al`);
const tmpCallCallee = tmpCallComplexCallee();
tmpCallCallee(`$('win')`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $number_toString, 31, "toString", "32" );
const b = $coerce( a, "plustr" );
const c = `return e${b}al`;
const d = Function( c );
const e = d();
e( "$('win')" );
`````


## Todos triggered


- (todo) Missed opportunity to inline a type tracked trick for $number_toString


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
