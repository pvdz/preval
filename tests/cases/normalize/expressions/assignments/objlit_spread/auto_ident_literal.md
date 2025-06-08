# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = "foo") });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [`0`]: `f`, [`1`]: `o`, [`2`]: `o` };
$(tmpCalleeParam);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`0`]: `f`, [`1`]: `o`, [`2`]: `o` });
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ "0" ]: "f",
  [ "1" ]: "o",
  [ "2" ]: "o",
};
$( a );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
const tmpObjSpread = a;
let tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"f"', 1: '"o"', 2: '"o"' }
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
