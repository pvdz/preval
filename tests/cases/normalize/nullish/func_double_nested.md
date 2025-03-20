# Preval test case

# func_double_nested.md

> Normalize > Nullish > Func double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const a = $(1), b = $(2), c = $(3);
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj??a??b??c);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
$(3);
const tmpObjLitVal$3 /*:unknown*/ = $();
const tmpObjLitVal$1 /*:object*/ = { c: tmpObjLitVal$3 };
const tmpObjLitVal /*:object*/ = { b: tmpObjLitVal$1 };
const obj /*:object*/ = { a: tmpObjLitVal };
const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(obj);
$(tmpClusterSSA_tmpReturnArg$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(3);
const tmpObjLitVal$3 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
$($({ a: tmpObjLitVal }));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
const a = $();
const b = { c: a };
const c = { b: b };
const d = { a: c };
const e = $( d );
$( e );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 
 - 5: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - 6: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
