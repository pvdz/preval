# Preval test case

# template_with_function_call_right.md

> String fusing > Ai > Template with function call right
>
> Test template literal concatenation with function call to trigger leftMbt/rightMbt bug

## Input

`````js filename=intro
const func = () => $("test");
const result = `hello` + func();
$(result);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(`test`);
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const result /*:string*/ /*truthy*/ = `hello${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL = $(`test`) + ``;
$(`hello${tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = $coerce( a, "plustr" );
const c = `hello${b}`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const func = function () {
  debugger;
  const tmpReturnArg = $(`test`);
  return tmpReturnArg;
};
const tmpBinBothLhs = `hello`;
const tmpBinBothRhs = func();
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'hellotest'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
