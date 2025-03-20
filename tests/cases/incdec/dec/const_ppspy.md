# Preval test case

# const_ppspy.md

> Incdec > Dec > Const ppspy
>
>

## Input

`````js filename=intro
const x = $spy(0);
const y = --x;
$(y);
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(0);
$coerce(x, `number`);
throw `Preval: Cannot write to const binding \`x\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(0), `number`);
throw `Preval: Cannot write to const binding \`x\``;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 0 );
$coerce( a, "number" );
throw "Preval: Cannot write to const binding `x`";
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [0, 0]
 - 2: '$spy[1].valueOf()', 0
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
