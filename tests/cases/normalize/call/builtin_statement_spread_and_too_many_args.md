# Preval test case

# builtin_statement_spread_and_too_many_args.md

> Normalize > Call > Builtin statement spread and too many args
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
isNaN(...$([1, 2, 3, 4]), $spy('b'), $spy('c'));
`````

## Pre Normal


`````js filename=intro
isNaN(...$([1, 2, 3, 4]), $spy(`b`), $spy(`c`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2, 3, 4];
const tmpArrSpread = tmpCallCallee(tmpCalleeParam);
const tmpCompObj = [...tmpArrSpread];
const tmpArgOverflow = tmpCompObj[0];
$spy(`b`);
$spy(`c`);
isNaN(tmpArgOverflow);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2, 3, 4];
const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam);
const tmpCompObj /*:array*/ = [...tmpArrSpread];
const tmpArgOverflow /*:unknown*/ = tmpCompObj[0];
$spy(`b`);
$spy(`c`);
isNaN(tmpArgOverflow);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
$spy( "b" );
$spy( "c" );
isNaN( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3, 4]
 - 2: 'Creating spy', 1, 1, ['b', 'b']
 - 3: 'Creating spy', 2, 1, ['c', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
