# Preval test case

# unknown_with_primitive.md

> String fusing > Ai > Unknown with primitive
>
> Test concatenation of unknown type with primitive to exercise leftMbt/rightMbt logic

Expected Output

The string fusing reducer should detect that `"hello" + unknown()` should be fused into a template, and the leftMbt/rightMbt logic should correctly set `rightMbt = 'string'` for the function call expression.

## Options

- skipEval

## Input

`````js filename=intro
const unknown = $("test");
const result = "hello" + unknown();
$(result);
`````


## Settled


`````js filename=intro
const unknown /*:unknown*/ = $(`test`);
const tmpBinBothRhs /*:unknown*/ = unknown();
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const result /*:string*/ /*truthy*/ = `hello${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const unknown = $(`test`);
const tmpStringConcatL = unknown() + ``;
$(`hello${tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a();
const c = $coerce( b, "plustr" );
const d = `hello${c}`;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const unknown = $(`test`);
const tmpBinBothLhs = `hello`;
const tmpBinBothRhs = unknown();
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
