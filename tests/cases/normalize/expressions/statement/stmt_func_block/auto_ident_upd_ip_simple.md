# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = { a: 999, b: 1000 };
    b++;
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 2);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 }, 2);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( a, 2 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = 1;
  let a = { a: 999, b: 1000 };
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent + 1;
  $(a, b);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
