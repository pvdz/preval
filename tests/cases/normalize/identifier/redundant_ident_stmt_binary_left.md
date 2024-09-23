# Preval test case

# redundant_ident_stmt_binary_left.md

> Normalize > Identifier > Redundant ident stmt binary left
>
> When an ident statement is also the next "first" expression to be evaluated, the statement is redundant.

The idea is to leave the expression statement with just the identifier to make sure TDZ (and implicit global) errors still trigger if they would have.

However, if the next statement will immediately use them anyways, this is unnecessary.

## Input

`````js filename=intro
drop1; // Can be eliminated
drop1 + 1;

drop2;
const x = drop2 + 1;
$(x);

let y = $();
drop3;
y = drop3 + 1;
$(y);
`````

## Pre Normal


`````js filename=intro
drop1;
drop1 + 1;
drop2;
const x = drop2 + 1;
$(x);
let y = $();
drop3;
y = drop3 + 1;
$(y);
`````

## Normalized


`````js filename=intro
drop1 + 0;
const x = drop2 + 1;
$(x);
let y = $();
y = drop3 + 1;
$(y);
`````

## Output


`````js filename=intro
drop1 + 0;
const x /*:primitive*/ = drop2 + 1;
$(x);
$();
const y /*:primitive*/ = drop3 + 1;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
drop1 + 0;
const a = drop2 + 1;
$( a );
$();
const b = drop3 + 1;
$( b );
`````

## Globals

BAD@! Found 3 implicit global bindings:

drop1, drop2, drop3

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
