# Preval test case

# const_ppx.md

> Incdec > Dec > Const ppx
>
>

## Input

`````js filename=intro
const x = $(0);
const y = --x;
$(y);
$(x);
`````

## Settled


`````js filename=intro
$(0);
throw `Preval: Cannot write to const binding \`x\``;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
throw `Preval: Cannot write to const binding \`x\``;
`````

## Pre Normal


`````js filename=intro
const x = $(0);
const y = --x;
$(y);
$(x);
`````

## Normalized


`````js filename=intro
const x = $(0);
x = x - 1;
let y = x;
$(y);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
throw "Preval: Cannot write to const binding `x`";
`````

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
