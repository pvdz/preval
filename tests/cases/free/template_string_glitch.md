# Preval test case

# template_string_glitch.md

> Free > Template string glitch
>
> This is a test case that managed to introduce TemplateLiterals with unbalanced expression:quasi ratios and it took forever to find the cause.
> It hits a very specific case inside freeNested where it merges a template with
> two expressions and it was assuming only one expression would be necessary.

## Input

`````js filename=intro
{
  const tmpFree$157 = function $free($$0, $$1) {
    const $dlr_$$749 = $$0;
    const $dlr_$$751 = $$1;
    debugger;
    const tmpBinBothRhs$4 = $dlr_$$749;
    const tmpBinLhs$4 = `/${tmpBinBothRhs$4}`;
    const tmpBinBothLhs$2 = `${tmpBinLhs$4}/`;
    const tmpBinBothRhs$2 = $dlr_$$751;
    const tmpBinLhs$2 = tmpBinBothLhs$2 + tmpBinBothRhs$2;
    return tmpBinLhs$2;
  };
  const x = $();
  const xs = $coerce(x, `string`);
  const y = $();
  const ys = $coerce(y, `string`);
  const fxy = $frfr(tmpFree$157, xs, ys);
  $(fxy);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $();
const xs /*:string*/ = $coerce(x, `string`);
const y /*:unknown*/ = $();
const ys /*:string*/ = $coerce(y, `string`);
const fxy /*:string*/ /*truthy*/ = `/${xs}/${ys}`;
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
  const $dlr_$$749 = $dlr_$$0;
  const $dlr_$$751 = $dlr_$$1;
  const tmpBinBothRhs$4 = $dlr_$$749;
  const tmpBinBothLhs = `/`;
  const tmpBinBothRhs = $coerce(tmpBinBothRhs$4, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpBinLhs$4 = $coerce(tmpBinLhs, `plustr`);
  const tmpBinBothLhs$1 = ``;
  const tmpBinBothRhs$1 = $coerce(tmpBinLhs$4, `string`);
  const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
  const tmpBinBothLhs$2 = `${tmpStringConcatR}/`;
  const tmpBinBothRhs$2 = $dlr_$$751;
  const tmpBinLhs$2 = tmpBinBothLhs$2 + tmpBinBothRhs$2;
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
