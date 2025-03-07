# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident cond s-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  (10, 20, 30) ? (40, 50, $(60)) : $($(100));
  $(a);
}
`````

## Settled


`````js filename=intro
$(60);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(60);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  (10, 20, 30) ? (40, 50, $(60)) : $($(100));
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  $(60);
} else {
  const tmpCalleeParam = $(100);
  $(tmpCalleeParam);
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 60 );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 60
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
