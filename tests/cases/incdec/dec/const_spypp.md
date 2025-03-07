# Preval test case

# const_spypp.md

> Incdec > Dec > Const spypp
>
>

## Input

`````js filename=intro
const x = $spy(0);
const y = x--;
$(y);
$(x);
`````

## Settled


`````js filename=intro
$spy(0);
throw `Preval: Cannot write to const binding \`x\``;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$spy(0);
throw `Preval: Cannot write to const binding \`x\``;
`````

## Pre Normal


`````js filename=intro
const x = $spy(0);
const y = x--;
$(y);
$(x);
`````

## Normalized


`````js filename=intro
const x = $spy(0);
const tmpPostUpdArgIdent = x;
x = x - 1;
const y = tmpPostUpdArgIdent;
$(y);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$spy( 0 );
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

Post settled calls: BAD!!
 - 1: 'Creating spy', 1, 1, [0, 0]
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Denormalized calls: BAD!!
 - 1: 'Creating spy', 1, 1, [0, 0]
 - eval returned: ('<crash[ Assignment to constant variable. ]>')
