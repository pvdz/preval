# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Export default > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $($(0)) || $($(1)) || $($(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpAnonDefaultExport /*:unknown*/ = $(tmpCalleeParam);
if (tmpAnonDefaultExport) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpAnonDefaultExport = $(tmpCalleeParam$1);
  if (tmpAnonDefaultExport) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpAnonDefaultExport = $(tmpCalleeParam$3);
  }
}
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpAnonDefaultExport = $($(0));
if (!tmpAnonDefaultExport) {
  tmpAnonDefaultExport = $($(1));
  if (!tmpAnonDefaultExport) {
    tmpAnonDefaultExport = $($(2));
  }
}
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
export { b as default };
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
