# Preval test case

# string.md

> Spying > String
>
> Apply String to a spy

## Input

`````js filename=intro
$(String($spy()));

$(String($spy(1, 2)));

$(String($spy('x', 'y')));
`````

## Pre Normal


`````js filename=intro
$(String($spy()));
$(String($spy(1, 2)));
$(String($spy(`x`, `y`)));
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $spy();
const tmpCalleeParam = $coerce(tmpStringFirstArg, `string`);
$(tmpCalleeParam);
const tmpStringFirstArg$1 = $spy(1, 2);
const tmpCalleeParam$1 = $coerce(tmpStringFirstArg$1, `string`);
$(tmpCalleeParam$1);
const tmpStringFirstArg$3 = $spy(`x`, `y`);
const tmpCalleeParam$3 = $coerce(tmpStringFirstArg$3, `string`);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $spy();
const tmpCalleeParam /*:string*/ = $coerce(tmpStringFirstArg, `string`);
$(tmpCalleeParam);
const tmpStringFirstArg$1 /*:unknown*/ = $spy(1, 2);
const tmpCalleeParam$1 /*:string*/ = $coerce(tmpStringFirstArg$1, `string`);
$(tmpCalleeParam$1);
const tmpStringFirstArg$3 /*:unknown*/ = $spy(`x`, `y`);
const tmpCalleeParam$3 /*:string*/ = $coerce(tmpStringFirstArg$3, `string`);
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "string" );
$( b );
const c = $spy( 1, 2 );
const d = $coerce( c, "string" );
$( d );
const e = $spy( "x", "y" );
const f = $coerce( e, "string" );
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].toString()'
 - 3: 'spy'
 - 4: 'Creating spy', 2, 2, [1, 2]
 - 5: '$spy[2].toString()', 1
 - 6: '1'
 - 7: 'Creating spy', 3, 2, ['x', 'y']
 - 8: '$spy[3].toString()', 'x'
 - 9: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
