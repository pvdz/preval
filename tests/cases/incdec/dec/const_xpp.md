# Preval test case

# const_xpp.md

> Incdec > Dec > Const xpp
>
>

## Input

`````js filename=intro
const x = $(0);
const y = x--;
$(y);
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(0);
$coerce(x, `number`);
throw `Preval: Cannot write to const binding \`x\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(0), `number`);
throw `Preval: Cannot write to const binding \`x\``;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
$coerce( a, "number" );
throw "Preval: Cannot write to const binding `x`";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(0);
const tmpPostUpdArgIdent = $coerce(x, `number`);
x = tmpPostUpdArgIdent - 1;
const y = tmpPostUpdArgIdent;
$(tmpPostUpdArgIdent);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
