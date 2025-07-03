# Preval test case

# template_string_glitch2.md

> Free > Template string glitch2
>
> This is a test case that managed to introduce TemplateLiterals with unbalanced expression:quasi ratios and it took forever to find the cause.
> It hits a very specific case inside freeNested where it merges a template with
> two expressions and it was assuming only one expression would be necessary.

## Input

`````js filename=intro
const func = function(a, b) {
  const slashA = `/${a}`;
  const slashAslash = `${slashA}/`;
  const slashAslashB = slashAslash + b;
  return slashAslashB;
};
const x = $('a');
const xs = $coerce(x, `string`);
const y = $('b');
const ys = $coerce(y, `string`);
const fxy = func(xs, ys);
$(fxy);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
const xs /*:string*/ = $coerce(x, `string`);
const y /*:unknown*/ = $(`b`);
const ys /*:string*/ = $coerce(y, `string`);
const slashAslashB /*:string*/ /*truthy*/ = `/${xs}/${ys}`;
$(slashAslashB);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const xs = String($(`a`));
const ys = String($(`b`));
$(`/${xs}/${ys}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $coerce( a, "string" );
const c = $( "b" );
const d = $coerce( c, "string" );
const e = `/${b}/${d}`;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const func = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpBinBothLhs = `/`;
  const tmpBinBothRhs = $coerce(a, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const slashA = $coerce(tmpBinLhs, `plustr`);
  const tmpBinBothLhs$1 = ``;
  const tmpBinBothRhs$1 = $coerce(slashA, `string`);
  const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
  const slashAslash = `${tmpStringConcatR}/`;
  const slashAslashB = slashAslash + b;
  return slashAslashB;
};
const x = $(`a`);
const xs = $coerce(x, `string`);
const y = $(`b`);
const ys = $coerce(y, `string`);
const fxy = func(xs, ys);
$(fxy);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: '/a/b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
