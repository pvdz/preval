# Preval test case

# template_string_glitch4.md

> Free > Template string glitch4
>
> This is a test case that managed to introduce TemplateLiterals with unbalanced expression:quasi ratios and it took forever to find the cause.
> It hits a very specific case inside freeNested where it merges a template with
> two expressions and it was assuming only one expression would be necessary.

## Input

`````js filename=intro
const tmpFree$157/*:(string, string)=>string*/ = function $free($dlr_$$0, $dlr_$$1) {
  const tmpBinLhs/*:string*/ = `/${$dlr_$$0}`;
  tmpBinLhs;
  const tmpBinBothLhs$2/*:string*/ = `${tmpBinLhs}/`;
  const tmpBinLhs$2/*:string*/ = tmpBinBothLhs$2 + $dlr_$$1;
  return tmpBinLhs$2;
};
const x/*:unknown*/ = $();
const xs/*:string*/ = $coerce(x, `string`);
const y/*:unknown*/ = $();
const ys/*:string*/ = $coerce(y, `string`);
const fxy/*:string*/ = $frfr(tmpFree$157, xs, ys);
$(fxy);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $();
const xs /*:string*/ = $coerce(x, `string`);
const y /*:unknown*/ = $();
const ys /*:string*/ = $coerce(y, `string`);
const fxy /*:string*/ = `/${xs}/${ys}`;
$(fxy);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const xs = $coerce($(), `string`);
const ys = $coerce($(), `string`);
$(`/${xs}/${ys}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = $coerce( a, "string" );
const c = $();
const d = $coerce( c, "string" );
const e = `/${b}/${d}`;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree$157 = function $free($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const tmpBinBothLhs = `/`;
  const tmpBinBothRhs = $coerce($dlr_$$0, `string`);
  const tmpBinLhs$1 = tmpBinBothLhs + tmpBinBothRhs;
  const tmpBinLhs = $coerce(tmpBinLhs$1, `plustr`);
  const tmpBinBothLhs$1 = ``;
  const tmpBinBothRhs$1 = $coerce(tmpBinLhs, `string`);
  const tmpBinLhs$3 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  const tmpStringConcatR = $coerce(tmpBinLhs$3, `plustr`);
  const tmpBinBothLhs$2 = `${tmpStringConcatR}/`;
  const tmpBinLhs$2 = tmpBinBothLhs$2 + $dlr_$$1;
  return tmpBinLhs$2;
};
const x = $();
const xs = $coerce(x, `string`);
const y = $();
const ys = $coerce(y, `string`);
const fxy = $frfr(tmpFree$157, xs, ys);
$(fxy);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - 3: '/undefined/undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
