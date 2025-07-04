# Preval test case

# string_with_yield_expression.md

> String fusing > Ai > String with yield expression
>
> Test string concatenation with yield expressions

## Input

`````js filename=intro
function* generator() {
  yield $("yielded");
}
const gen = generator();
const result = "value: " + gen.next().value;
$(result);
`````


## Settled


`````js filename=intro
const generator /*:()=>object*/ = function* () {
  debugger;
  const tmpYieldArg /*:unknown*/ = $(`yielded`);
  yield tmpYieldArg;
  return undefined;
};
const gen /*:object*/ /*truthy*/ = generator();
const tmpMCF /*:unknown*/ = gen.next;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF, gen, `next`);
const tmpBinBothRhs /*:unknown*/ = tmpCompObj.value;
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const result /*:string*/ /*truthy*/ = `value: ${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const generator = function* () {
  const tmpYieldArg = $(`yielded`);
  yield tmpYieldArg;
};
const gen = generator();
const tmpStringConcatL = gen.next().value + ``;
$(`value: ${tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function *() {
  debugger;
  const b = $( "yielded" );
  yield ( b );
  return undefined;
};
const c = a();
const d = c.next;
const e = $dotCall( d, c, "next" );
const f = e.value;
const g = $coerce( f, "plustr" );
const h = `value: ${g}`;
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let generator = function* () {
  debugger;
  const tmpYieldArg = $(`yielded`);
  yield tmpYieldArg;
  return undefined;
};
const gen = generator();
const tmpBinBothLhs = `value: `;
const tmpMCF = gen.next;
const tmpCompObj = $dotCall(tmpMCF, gen, `next`);
const tmpBinBothRhs = tmpCompObj.value;
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


- (todo) inline generator functions safely (because yield)


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'yielded'
 - 2: 'value: yielded'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
