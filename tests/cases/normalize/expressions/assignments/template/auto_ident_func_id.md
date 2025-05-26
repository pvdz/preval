# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Template > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = function f() {})}  after`);
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(`before  function(){}  after`);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
$(`before  function(){}  after`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( "before  function(){}  after" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const f = function () {
  debugger;
  return undefined;
};
a = f;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) free with zero args, we can eliminate this?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before function() {return undefined;} after'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
