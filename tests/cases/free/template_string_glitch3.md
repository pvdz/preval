# Preval test case

# template_string_glitch3.md

> Free > Template string glitch3
>
> This is a test case that managed to introduce TemplateLiterals with unbalanced expression:quasi ratios and it took forever to find the cause.
> It hits a very specific case inside freeNested where it merges a template with
> two expressions and it was assuming only one expression would be necessary.

## Input

`````js filename=intro
const tmpFree$157/*:(string, string)=>string*/ = function $free(a, b) {
  const tmpBinLhs/*:string*/ = `/${a}`;
  const tmpBinBothLhs$2/*:string*/ = `${tmpBinLhs}/`;
  const tmpBinLhs$2/*:string*/ = tmpBinBothLhs$2 + b;
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
