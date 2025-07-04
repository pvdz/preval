# Preval test case

# template_with_tagged_template.md

> String fusing > Ai > Template with tagged template
>
> Test templates with tagged template expressions that should not be resolved statically

## Input

`````js filename=intro
const tag = (strings, ...values) => values.join('');
const value = $("tagged");
const template = `result: ${tag`${value}`}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
const tag /*:(unused, array)=>string*/ = function ($$0, ...$$1 /*:array*/) {
  const values /*:array*/ /*truthy*/ = $$1;
  debugger;
  const tmpReturnArg /*:string*/ = $dotCall($array_join, values, `join`, ``);
  return tmpReturnArg;
};
const value /*:unknown*/ = $(`tagged`);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [``, ``];
const tmpBinBothRhs /*:string*/ = tag(tmpCalleeParam$1, value);
const result /*:string*/ /*truthy*/ = `result: ${tmpBinBothRhs}end`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tag = function ($$0, ...$$1 /*:array*/) {
  const tmpReturnArg = $dotCall($array_join, $$1, `join`, ``);
  return tmpReturnArg;
};
const value = $(`tagged`);
const tmpBinBothRhs = tag([``, ``], value);
$(`result: ${tmpBinBothRhs}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$1;
  debugger;
  const c = $dotCall( $array_join, b, "join", "" );
  return c;
};
const d = $( "tagged" );
const e = [ "", "" ];
const f = a( e, d );
const g = `result: ${f}end`;
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tag = function ($$0, ...$$1 /*:array*/) {
  let strings = $$0;
  let values = $$1;
  debugger;
  const tmpMCF = values.join;
  const tmpReturnArg = $dotCall(tmpMCF, values, `join`, ``);
  return tmpReturnArg;
};
const value = $(`tagged`);
const tmpBinBothLhs = `result: `;
const tmpCallCallee = tag;
let tmpCalleeParam$1 = [``, ``];
let tmpCalleeParam$3 = value;
let tmpCalleeParam = tag(tmpCalleeParam$1, value);
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const template = $coerce(tmpBinLhs, `plustr`);
const tmpStringConcatR = $coerce(template, `plustr`);
const result = `${tmpStringConcatR}end`;
$(result);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_join
- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'tagged'
 - 2: 'result: taggedend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
