# Preval test case

# ident_logic_and_simple_complex2.md

> Normalize > Expressions > Assignments > Template > Ident logic and simple complex2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
const obj = {toString(){ $('toString'); return 'x'; }, valueOf(){ $('valueOf'); return 'y'; }};
let a = { a: 999, b: 1000 };
$(`before  ${(a = 1 && $($(obj)))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = {
  toString() {
    debugger;
    $(`toString`);
    return `x`;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return `y`;
  },
};
const tmpCalleeParam$3 /*:unknown*/ = $(obj);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$3);
const tmpBinBothRhs /*:string*/ = $coerce(tmpClusterSSA_a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $(
  $({
    toString() {
      $(`toString`);
      return `x`;
    },
    valueOf() {
      $(`valueOf`);
      return `y`;
    },
  }),
);
$(`before  ${tmpClusterSSA_a}  after`);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  toString(  ) {
    debugger;
    $( "toString" );
    return "x";
  },
  valueOf(  ) {
    debugger;
    $( "valueOf" );
    return "y";
  },
};
const b = $( a );
const c = $( b );
const d = $coerce( c, "string" );
const e = `before  ${d}  after`;
$( e );
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { toString: '"<function>"', valueOf: '"<function>"' }
 - 2: { toString: '"<function>"', valueOf: '"<function>"' }
 - 3: 'toString'
 - 4: 'before x after'
 - 5: { toString: '"<function>"', valueOf: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
